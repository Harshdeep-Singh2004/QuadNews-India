const dotenv = require("dotenv");
const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const port = process.env.PORT || 8000;
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = async () => {
    await mongoose.connect(config.connectionString)
    .then(() => {
        console.log("MongoDB connected")
        app.listen(port, () => {
            console.log("Server started")
        });
        module.exports = app;
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
}
connectDB();
// Import the schedule
require('./scheduler');

const User = require("./models/user.model");
const Note = require("./models/note.model");
const News = require("./models/news.model");


const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
    cors({ origin: "*" })
)

app.get("/", (req, res) => {
    res.json({ data: "hello" })
});

// Create Account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) return res.status(400).json({ error: true, message: "Full Name is required" });
    if (!email) return res.status(400).json({ error: true, message: "Email is required" });
    if (!password) return res.status(400).json({ error: true, message: "Password is required" });

    const isUser = await User.findOne({ email: email });
    if (isUser) return res.status(400).json({ error: true, message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = new User({
        fullName,
        email,
        password: hashedPassword,
    });
    await user.save();

    const accessToken = jwt.sign(
        { user: user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "36000m" }
    )
    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });

});

// Login
app.post("/login", async (req, res) => {
    // both email and password are fetched the user's login request
    // user data is recieved from the client's side to the server side
    // data recieved !!!
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    const userInfo = await User.findOne({ email: email });
    if (!userInfo) return res.status(400).json({ message: "User not found" });

    const isPasswordMatch = await bcrypt.compare(password, userInfo.password)
    if (userInfo.email === email &&  isPasswordMatch) {
        const accessToken = jwt.sign(
            { user: userInfo },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "36000m", }
        )
        // response : {
        //   data: {},     // Parsed response body (shown above)
        //   status: 200,  // HTTP status code
        //   headers: {},   // Response headers
        //   config: {},    // Axios request config
        //   request: {}    // Underlying HTTP request object
        // }
        // response.data
        return res.json({
            error: false,
            email,
            accessToken,
            message: "Login Successful",
        })
    }
    else {
        // error.response.data
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        })
    }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    // req.user is from authenticateToken because after login/signUp
    // token is setup inside user's local storage 
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
        return res.sendStatus(401);
    }

    // response.data
    return res.json({
        user: {
            fullName: isUser.fullName,
            email: isUser.email,
            _id: isUser._id,
            createdOn: isUser.createdOn,
        },
        message: "",
    });

});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user; // req.user is the user from the token in the local storage

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required" });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required" });
    }

    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });

        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note added Successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Edit Note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(400).json({ error: true, message: "Note not found" });
        }
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }
    catch {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Get All Notes
app.get("/get-all-notes/", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }
        await Note.deleteOne({ _id: noteId, userId: user._id });
        return res.json({
            error: false,
            message: "Note deleted successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Update Note Pinned
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(400).json({ error: true, message: "Note not found" });
        }

        // if (isPinned !== note.isPinned) note.isPinned = isPinned;
        note.isPinned = isPinned;

        await note.save();
        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    }
    catch {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

// Search note
app.get('/search-notes', authenticateToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Search query is required" });
    }

    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } }
            ],
        });
        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrived successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

app.get('/get-news', async (req, res) => {
    const { genre } = req.query;

    try {
        const genreNews = await News.find({genre: genre});
        return res.json({
            error: false,
            genreNews,
            message: "Done",
        });
    }
    catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
})

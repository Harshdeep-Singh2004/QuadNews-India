const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken,
};


// JWT stands for JSON Web Token. Mainly consist of 3 components:
// 1. Header (contain information of encryption algorithm - HS256)
// 2. Payload (simply data, usually email as email is unique)
// 3. Signature

// JWT is never encrypted, it is signed
// Anyone can decode the jwt, but can never change the payload(user-data), as the signature will break
// As it is signed, decryption can't be done, verification is done using the secret key !!!

// How does JWT work?
// 1. When a user logs in, the server creates a JWT with the user info and signs it.
// 2. The JWT is sent to the client using cookie | then saved to the client side.
// 3. The client sends this JWT with every request (usually in the Authorization header).
// 4. The server verifies the token’s signature to check if it’s valid.
// 5. If valid, the server processes the request as an authenticated user.
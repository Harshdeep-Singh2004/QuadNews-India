# QuadNews India

Quadnews is a full-stack MERN web app aggregating India's top news headlines and AI-summarized articles using Cheerio for scraping and Gemini-inspired summarization. It ensures security with JWT authentication and bcrypt hashing, while offering user authentication and an inbuilt notes feature for personalized engagement and content management.

## Live Demo

Visit the application at: [QuadNews India](https://quadnews-india.onrender.com/)

## Key Features & Benefits

### 🚀 Smart News Aggregation
- Automated news collection from multiple sources
- Real-time updates every 30 minutes
- AI-powered content processing and summarization
- Categorized news sections for easy navigation

### 👤 User Experience
- Clean, modern interface built with React and Tailwind CSS
- Responsive design for all devices
- Fast loading with Vite build system
- Intuitive navigation and search functionality

### 🔒 User Management
- Secure user authentication with JWT
- Password encryption using bcrypt
- Personalized user profiles
- Note-taking feature for saving important news

### 📱 Modern Tech Stack
- React 19 with latest features
- Node.js backend with Express
- MongoDB for efficient data storage
- Google AI integration for smart content processing

### 🔄 Automated Updates
- Scheduled news fetching every 30 minutes
- Automatic content categorization
- Real-time news updates
- Background processing with node-cron

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- React Icons
- Axios
- Moment.js

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Google Generative AI
- Node-cron for scheduling
- Cheerio for web scraping
- JWT for authentication
- Bcrypt for password hashing

## Features

- Real-time news aggregation
- User authentication
- News categorization
- Responsive design
- Web scraping for news updates
- AI-powered content processing
- Automated news updates using cron jobs

## Project Structure

```
quadnews-india/
├── frontend/
│   └── quadnews-app/         # React frontend application
│       ├── src/             # Source code
│       ├── public/          # Static assets
│       └── package.json     # Frontend dependencies
└── backend/
    ├── index.js            # Main server file
    ├── scheduler.js        # News update scheduler
    ├── models/            # Database models
    ├── fetcher/           # News fetching logic
    ├── newsUpdater/       # News update handlers
    ├── summarizers/       # Content summarization
    └── package.json       # Backend dependencies
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend/quadnews-app
   npm install
   ```

3. Set up environment variables in backend:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_AI_KEY=your_google_ai_key
   ```

4. Start the development servers:
   ```bash
   # Backend
   cd backend
   npm start

   # Frontend
   cd frontend/quadnews-app
   npm run dev
   ```

## Author

Harshdeep Singh

## License

ISC

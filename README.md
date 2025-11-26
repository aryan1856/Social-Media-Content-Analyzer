# 📊 ContentIQ — Social Media Content Analyzer

> Transform your social media content with AI-powered insights. Upload PDFs or images, extract text using advanced OCR, and receive actionable recommendations to boost engagement.

[![Live Demo]<img width="1919" height="971" alt="image" src="https://github.com/user-attachments/assets/9a808043-6909-4819-a071-ffedd8c649e3" />
)](https://social-media-content-analyzer-smoky.vercel.app)

---

## ✨ Overview

ContentIQ is a full-stack MERN application that leverages AI and OCR technology to analyze social media content. Simply upload your content as a PDF or image, and let our Gemini AI-powered system provide personalized recommendations to maximize your engagement.

### 🎯 Key Highlights

- **Smart Text Extraction** — Advanced OCR for images + PDF parsing
- **AI-Powered Insights** — Gemini AI generates tailored recommendations
- **Secure Authentication** — JWT-based user authentication with protected routes
- **Cloud Storage** — Reliable media storage via Cloudinary
- **Analysis History** — Track and review all your past insights

---

## 🚀 Tech Stack

<table>
<tr>
<td width="50%">

### Frontend
- ⚛️ **React 18** with Vite
- 🎨 **Tailwind CSS** for styling
- 🔄 **Context API** for state management
- 📡 **Axios** for API calls
- 🛣️ **React Router** for navigation

</td>
<td width="50%">

### Backend
- 🟢 **Node.js** + **Express.js**
- 🍃 **MongoDB** with **Mongoose ODM**
- 🔐 **JWT** authentication
- ☁️ **Cloudinary** media storage
- 🤖 **Gemini AI API** integration

</td>
</tr>
</table>

### 🧠 AI & Processing

- **Gemini AI API** — Generates content recommendations
- **PDF-Parse** — Extracts text from PDF documents
- **Tesseract.js OCR** — Optical character recognition for images

---

## 🔐 Features

| Feature | Description |
|---------|-------------|
| 🔑 **User Authentication** | Secure registration, login, and JWT-based session management |
| 📤 **File Upload** | Support for PDF documents and image files (PNG, JPG, JPEG) |
| 📝 **Text Extraction** | Automatic text extraction using PDF parsing and OCR technology |
| 🤖 **AI Insights** | Gemini AI analyzes content and generates engagement strategies |
| 🔒 **Protected Routes** | Secure endpoints with authentication middleware |
| ☁️ **Cloud Storage** | Reliable file storage and retrieval via Cloudinary |

---

## 📂 Project Structure

### Backend Architecture
```
Server/
├── controllers/
│   ├── authController.js      # User authentication logic
│   └── insightController.js   # Insight generation & retrieval
│
├── middleware/
│   ├── authMiddleware.js      # JWT verification
│   └── uploadMiddleware.js    # Multer file upload config
│
├── models/
│   ├── User.js                # User schema
│   └── Insight.js             # Insight schema
│
├── routes/
│   ├── authRoutes.js          # Auth endpoints
│   └── insightRoutes.js       # Insight endpoints
│
├── utils/
│   ├── cloudinary.js          # Cloudinary configuration
│   ├── db_config.js           # MongoDB connection
│   ├── extract_text.js        # PDF & OCR text extraction
│   ├── generate_token.js      # JWT token generation
│   └── recommendations.js     # Gemini AI integration
│
├── index.js                   # Express app entry point
└── .env                       # Environment variables
```

### Frontend Architecture
```
Client/
├── src/
│   ├── assets/                # Static assets (images, icons)
│   │
│   ├── components/
│   │   ├── AnalysisResults.jsx   # Display AI insights
│   │   ├── Header.jsx            # Navigation header
│   │   ├── Login.jsx             # Login form
│   │   └── Register.jsx          # Registration form
│   │
│   ├── context/
│   │   └── authContext.jsx       # Global auth state
│   │
│   ├── hooks/
│   │   ├── useAnalyzeFile.js     # File analysis hook
│   │   ├── useLogin.js           # Login logic
│   │   ├── useLogout.js          # Logout logic
│   │   └── useRegister.js        # Registration logic
│   │
│   ├── pages/
│   │   ├── Auth.jsx              # Authentication page
│   │   └── Home.jsx              # Main dashboard
│   │
│   ├── App.jsx                   # Root component
│   ├── App.css                   # Global styles
│   ├── index.css                 # Tailwind directives
│   └── main.jsx                  # React entry point
│
├── vite.config.js                # Vite configuration
├── package.json                  # Dependencies
└── .env                          # Environment variables
```

---

## 🔄 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |

### Insight Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/insights/analyze` | Upload & analyze file | ✅ |
| GET | `/api/insights` | Get all user insights | ✅ |

---

## 👨‍💻 Author

**Aryan Diwakar**

- GitHub: [@aryan1856](https://github.com/aryan1856)
- LinkedIn: [Aryan Diwakar](https://www.linkedin.com/in/aryan1856/)
- Email: aryan.diwakar1856@gmail.com

---

## 🙏 Acknowledgments

- [Gemini AI](https://ai.google.dev/) for powerful AI capabilities
- [Cloudinary](https://cloudinary.com/) for reliable media storage
- [Tesseract.js](https://tesseract.projectnaptha.com/) for OCR technology
- [MongoDB](https://www.mongodb.com/) for database solutions

---

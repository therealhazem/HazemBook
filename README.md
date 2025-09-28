<div align="center">

![HazemBook](photos/H.png)

# 📱 HazemBook

**Connect, Share, and Engage**

A modern social media platform where users can create posts, share images, connect with others, and build meaningful conversations through comments and interactions.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

## 🌐 **LIVE PREVIEW**

[![🚀 View Live Demo](https://img.shields.io/badge/🚀_View_Live_Demo-FF6B6B?style=for-the-badge&logo=netlify&logoColor=white)](https://hazembook.netlify.app/)

**👉 [https://hazembook.netlify.app/](https://hazembook.netlify.app/) 👈**

*Experience the full social media platform with real user interactions and dynamic content*

</div>

---

## 📋 Table of Contents

- [🤖 Introduction](#-introduction)
- [⚙️ Tech Stack](#️-tech-stack)
- [🔋 Features](#-features)
- [🤸 Quick Start](#-quick-start)
- [🕸️ Project Structure](#️-project-structure)
- [🔗 API Integration](#-api-integration)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)

---

## 🤖 Introduction

HazemBook is a comprehensive social media platform designed for modern digital communication, enabling users to:

- **Create & Share** posts with images and rich text content
- **Connect** with other users through profiles and interactions
- **Engage** through comments and real-time discussions
- **Manage** their own content with edit and delete capabilities
- **Discover** trending posts and user-generated content

Built with modern web technologies and a focus on user experience, this platform provides a seamless environment for social networking and content sharing.

---

## ⚙️ Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Custom styling and responsive design
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **Bootstrap 5** - Responsive UI framework and components
- **Bootstrap Icons** - Icon library for enhanced UI

### Backend Integration
- **Axios** - HTTP client for API communication
- **Tarmeez Academy API** - Backend services for user management and content
- **Local Storage** - Client-side data persistence

### Development Tools
- **Netlify** - Static site hosting and deployment
- **Git** - Version control and collaboration
- **Responsive Design** - Mobile-first approach

---

## 🔋 Features

### 🎯 Core Functionality
- **👉 User Authentication**: Secure login and registration system
- **👉 Post Management**: Create, edit, and delete posts with images
- **👉 Real-time Comments**: Interactive commenting system on posts
- **👉 User Profiles**: Comprehensive user profiles with post history
- **👉 Infinite Scroll**: Seamless content loading with pagination

### 🎨 User Experience
- **👉 Responsive Design**: Mobile-first approach with Bootstrap
- **👉 Modern UI**: Clean, intuitive interface with smooth animations
- **👉 Loading States**: Custom loading animations and feedback
- **👉 Toast Notifications**: Real-time user feedback for all actions
- **👉 Modal Dialogs**: Elegant popup forms for user interactions

### 📊 Content Management
- **👉 Image Upload**: Support for profile photos and post images
- **👉 Rich Text Posts**: Title and body content with formatting
- **👉 Tag System**: Categorization and organization of posts
- **👉 User Statistics**: Post and comment counts on profiles
- **👉 Content Moderation**: Edit and delete permissions for post owners

### 🔧 Technical Features
- **👉 API Integration**: RESTful API communication with error handling
- **👉 Local Storage**: Persistent user sessions and data
- **👉 Dynamic Routing**: URL-based navigation for posts and profiles
- **👉 Error Handling**: Comprehensive error management and user feedback
- **👉 Performance Optimization**: Efficient loading and caching strategies

---

## 🤸 Quick Start

### 🌐 **Try It Live First!**

**Before setting up locally, check out the live demo:**
👉 **[https://hazembook.netlify.app/](https://hazembook.netlify.app/)** 👈

*See the platform in action with real user posts, profiles, and all interactive features!*

### Prerequisites

Make sure you have the following installed on your machine:

- **Git** - Version control system
- **Node.js** (v14 or higher) - JavaScript runtime
- **npm** (v6 or higher) - Package manager
- **Web Server** - Local development server (Live Server, http-server, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/therealhazem/HazemBook.git
   cd HazemBook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start a local server**
   ```bash
   # Using Live Server (VS Code extension)
   # Right-click on index.html and select "Open with Live Server"
   
   # Or using http-server
   npx http-server
   
   # Or using Python
   python -m http.server 8000
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or your server's port)

---

## 🕸️ Project Structure

```
HazemBook/
├── index.html                 # Main homepage with feed
├── postdetails.html          # Individual post view with comments
├── profile.html              # User profile pages
├── scripts.js                # Main JavaScript functionality
├── profile.js                # Profile-specific JavaScript
├── package.json              # Project dependencies and scripts
├── photos/                   # Application images and assets
│   ├── H.png                # Logo and branding
│   └── 1.jpg                # Default post images
├── profiles/                 # Default profile images
│   ├── 1.jpg
│   ├── 2.jpg
│   └── 3.jpg
├── favicon_io/              # Favicon and app icons
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── site.webmanifest
└── node_modules/            # Dependencies
    ├── bootstrap/           # Bootstrap framework
    ├── bootstrap-icons/     # Icon library
    └── axios/              # HTTP client
```

---

## 🔗 API Integration

The application integrates with the Tarmeez Academy API for backend services:

### Authentication Endpoints
- `POST /api/v1/login` - User authentication
- `POST /api/v1/register` - User registration

### Content Endpoints
- `GET /api/v1/posts` - Fetch posts with pagination
- `POST /api/v1/posts` - Create new post
- `PUT /api/v1/posts/{id}` - Update existing post
- `DELETE /api/v1/posts/{id}` - Delete post
- `GET /api/v1/posts/{id}` - Get specific post with comments

### User Endpoints
- `GET /api/v1/users/{id}` - Get user profile data
- `GET /api/v1/users/{id}/posts` - Get user's posts
- `POST /api/v1/posts/{id}/comments` - Add comment to post

### Features
- **Bearer Token Authentication** - Secure API access
- **Form Data Support** - File upload capabilities
- **Error Handling** - Comprehensive error management
- **Pagination** - Efficient data loading

---

## 🚀 Deployment

### Netlify (Current Deployment)

The application is currently deployed on Netlify:

1. **Automatic Deployment** - Connected to GitHub repository
2. **Custom Domain** - hazembook.netlify.app
3. **HTTPS** - Secure connection enabled
4. **CDN** - Global content delivery

### Other Deployment Options

The application can be deployed to any static hosting service:

- **Vercel** - Zero-config deployment
- **GitHub Pages** - Free hosting for public repositories
- **Firebase Hosting** - Google's hosting platform
- **AWS S3 + CloudFront** - Scalable cloud hosting

### Deployment Steps

1. **Build the project** (if using build tools)
2. **Upload files** to your hosting service
3. **Configure domain** and SSL certificate
4. **Set up environment variables** (if needed)

---


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure responsive design compatibility

### Code Style

- Use consistent indentation (2 spaces)
- Comment complex JavaScript functions
- Follow Bootstrap class naming conventions
- Maintain clean HTML structure

---

<div align="center">

**Made with ❤️ by Hazem Elgindy** 

*Fueled by Egyptian Songs & a Lot of Coffee*

**🌐 Check my [Portfolio](https://hazemelgindy.me)**

[⭐ Star this repo](https://github.com/therealhazem/HazemBook) • [🐛 Report Bug](https://github.com/therealhazem/HazemBook/issues) • [💡 Request Feature](https://github.com/therealhazem/HazemBook/issues)

</div>

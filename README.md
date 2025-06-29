# 🔐 PassForge - Next-Level Password Generator

A sleek, modern password generator built with React, featuring beautiful animations, dark mode support, and advanced customization options.

![PassForge Preview](https://images.pexels.com/photos/5240547/pexels-photo-5240547.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🎛️ Core Functionality
- **Customizable Password Length**: Slider control from 4 to 50 characters
- **Character Type Selection**: Toggle uppercase, lowercase, numbers, and special characters
- **One-Click Generation**: Generate secure passwords instantly
- **Copy to Clipboard**: Easy copying with animated feedback
- **Password Visibility Toggle**: Show/hide generated passwords
- **Real-time Strength Indicator**: Visual feedback on password security

### 🎨 User Experience
- **Dark/Light Mode**: Automatic system detection with manual toggle
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Toast Notifications**: Elegant feedback for user actions
- **Password History**: Local storage of last 3 generated passwords
- **Glassmorphism UI**: Modern design with backdrop blur effects

### 🔧 Technical Features
- **React Hooks**: Modern functional components with custom hooks
- **Local Storage**: Persistent theme and password history
- **Modular Architecture**: Clean, maintainable component structure
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance Optimized**: Efficient re-renders with useCallback

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/passforge.git
cd passforge
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

## 📦 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── BackgroundElements.jsx
│   ├── Footer.jsx
│   ├── PasswordHistory.jsx
│   ├── PasswordStrengthIndicator.jsx
│   ├── ThemeToggle.jsx
│   └── Toast.jsx
├── hooks/               # Custom React hooks
│   ├── useLocalStorage.js
│   └── useTheme.js
├── utils/               # Helper functions
│   └── passwordGenerator.js
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Usage

### Basic Password Generation
1. Adjust the password length using the slider (4-50 characters)
2. Select desired character types (uppercase, lowercase, numbers, special)
3. Click "Generate Password" to create a new secure password
4. Use the copy button to copy to clipboard

### Advanced Features
- **Theme Toggle**: Switch between light, dark, and system themes
- **Password History**: View and copy from recently generated passwords
- **Strength Indicator**: Monitor password security in real-time
- **Show/Hide**: Toggle password visibility for security

## 🔒 Security Features

- **Client-Side Generation**: All passwords generated locally in browser
- **No Data Transmission**: Passwords never sent to external servers
- **Strong Randomization**: Cryptographically secure random generation
- **Character Requirements**: Ensures inclusion of selected character types
- **Strength Analysis**: Real-time security assessment

## 🎨 Design Philosophy

PassForge follows modern design principles:

- **Minimalism**: Clean, uncluttered interface
- **Accessibility**: High contrast ratios and keyboard navigation
- **Responsive**: Mobile-first design approach
- **Micro-interactions**: Delightful animations for better UX
- **Visual Hierarchy**: Clear information architecture

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow existing code style and structure
- Add comments for complex logic
- Test features across different devices
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Tailwind CSS** for rapid styling
- **Lucide React** for beautiful icons
- **Pexels** for high-quality stock photos

---

<div align="center">

**© 2025 Designed & Developed by P I Y U $ H**

*Crafting secure passwords with style* 🔐

</div>
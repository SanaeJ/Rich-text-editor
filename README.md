React-Vite Rich Text Editor with Tiptap

🚀 Project Overview

This is a React-Vite application featuring a rich text editor built with Tiptap. It includes:

A customizable Tiptap editor.

Two custom marks for additional formatting.

A fast and lightweight setup using Vite.

📦 Installation & Setup

1️⃣ Clone the Repository

git clone <your-repository-url>
cd <your-project-folder>

2️⃣ Install Dependencies

yarn install  # or npm install

3️⃣ Start the Development Server

yarn dev  # or npm run dev

The app should now be running on http://localhost:5173/ (or a different port if specified).

🛠️ Project Structure

📂 your-project-folder
├── 📂 src
│   ├── 📂 components
│   │   ├── Editor.jsx  # Main Tiptap editor component
│   │   ├── Toolbar.jsx # Custom toolbar for text formatting
│   ├── 📂 extensions
│   │   ├── CustomMark1.js # First custom mark
│   │   ├── CustomMark2.js # Second custom mark
│   ├── main.jsx  # Entry point
│   ├── App.jsx   # Main App component
├── 📄 index.html  # Root HTML file
├── 📄 package.json  # Project dependencies
└── 📄 vite.config.js  # Vite configuration

✨ Features

Rich Text Editing using Tiptap.

Custom Marks for additional formatting.

Lightweight & Fast with Vite.

Easy Setup for local development.

🛠️ Custom Marks

This project includes two custom marks for enhanced text formatting. You can find their implementations inside the src/extensions/ folder.

📌 How to Use Custom Marks

Select text in the editor.

Apply a mark using the toolbar button.

The mark will be applied to the selected text.

🔧 Build & Deployment

Create a Production Build

yarn build  # or npm run build

The output will be in the dist/ folder, ready for deployment.

Preview Production Build

yarn preview  # or npm run preview

🤝 Contributing

Feel free to fork the project and submit a pull request. Contributions are always welcome! 🚀

📜 License

This project is open-source and available under the MIT License.


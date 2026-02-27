# ☁️ Cloudbin

Cloudbin is a modern cloud file manager inspired by Google Drive and Dropbox.  
It allows users to upload, organize, preview, and manage files with a fast and clean UI.

🔗 **Live demo:** https://cloudbin-nine.vercel.app  
📦 **Repository:** https://github.com/diegovilhalva/cloudbin

---

## ✨ Features

- 📂 Folder-based file organization
- 🧭 Breadcrumb navigation (Drive-like experience)
- 🖼️ Image preview with transformations
- 🎥 Video preview
- 📄 PDF preview (with automatic thumbnails)
- 🧾 File details modal
- ⚡ Fast uploads using ImageKit
- - 🧠 Optimized API (Appwrite used only for auth & backend logic)
- 📱 Responsive layout
- 🎨 UI built with shadcn/ui + Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **TypeScript**
- **React Router (Data APIs)**
- **Tailwind CSS**
- **shadcn/ui**

### Backend
- **Vercel Serverless Functions**
- **ImageKit API**
- **Appwrite**
### File Handling
**ImageKit** for uploads, CDN delivery, thumbnails, previews, and AI-powered transformations

---

## 🖼️ File Preview Support

| File Type | Preview |
|---------|--------|
Images | ✅ (with transformations) |
Videos | ✅ |
PDFs | ✅ (iframe preview + thumbnail) |
Other files | ℹ️ Metadata only |

---

## 🔐 Environment Variables

Create a `.env` file and configure the following variables:

```env
#Appwrite
APPWRITE_PROJECT_ID=your_appwrite_project_id
APPWRITE_PROJECT_NAME=appwrite_project_name
APPWRITE_ENDPOINT=appwrite_cloud_endpoint
APPWRITE_FN_ID=appwrite_function_id
# ImageKit
VITE_IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_API_ENDPOINT="https://api.imagekit.io/v1/files"
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
IMAGEKIT_PRIVATE_KEY=your_private_key
#Project endpoint
VITE_BASE_URL=http://localhost:5173
````



## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/diegovilhalva/cloudbin.git
cd cloudbin
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

The app will be available at:
👉 `http://localhost:5173`

---

## 📁 Project Structure (Simplified)

```txt
src/
├── components/
│   ├── FileCard.tsx
│   ├── FileDetails.tsx
│   ├── FilePreview.tsx
│   └── ...
├── routes/
│   └── drive/
│       └── folders/
├── lib/
├── types/
└── pages/
```

---

## 🧠 Architecture Notes

* File previews are handled via **modal dialogs**
* Folder navigation is route-based
* Breadcrumbs are generated from route params
* Appwrite is used for authentication and backend logic only
* File storage and delivery are handled exclusively by ImageKit

---

## 📌 Future Improvements

* 🔍 Search inside folders
* ⭐ Favorite folders
* 🗂️ Subfolder creation & management
* 🖱️ Context menu (rename / delete)
* ⬇️ Secure downloads
* 🔄 Drag & drop uploads
* 📄 PDF page navigation

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Author

**Diego Vilhalva**
GitHub: [https://github.com/diegovilhalva](https://github.com/diegovilhalva)

---

If you like this project, feel free to ⭐ star the repo!


# Sumsur Portfolio

A modern, elegant portfolio website built with Next.js 14, featuring a complete Content Management System.

## Features

- 📝 **Blog/Articles** - Write and publish essays
- ✍️ **Poetry** - Showcase poems in Hindi and English
- 📷 **Photo Gallery** - Categorized photography portfolio
- 👤 **About Page** - Personal introduction
- 🔐 **Admin CMS** - Secure content management system

## 🚀 Quick Start

### For Viewing the Site

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### For Managing Content (CMS)

1. **Set your password** in `.env.local`:
   ```bash
   ADMIN_PASSWORD=your_secure_password
   ```

2. **Start the server**:
   ```bash
   npm run dev
   ```

3. **Access the CMS**:
   ```
   http://localhost:3000/admin
   ```

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get started with the CMS in 2 minutes
- **[CMS_DOCUMENTATION.md](./CMS_DOCUMENTATION.md)** - Complete technical documentation
- **[CMS_SUMMARY.md](./CMS_SUMMARY.md)** - Implementation details and features

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **Authentication:** iron-session
- **Forms:** React Hook Form
- **Image Optimization:** Sharp
- **Language:** TypeScript

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # CMS admin panel
│   ├── api/admin/         # CMS API routes
│   ├── writings/          # Blog/articles pages
│   ├── poems/             # Poetry pages
│   └── photos/            # Photo gallery
├── components/            # React components
│   └── admin/            # CMS management components
├── data/                  # Content data (JSON, MD, TS)
├── public/photos/         # Photo gallery images
└── lib/                   # Utilities and helpers
```

## 🎨 CMS Features

- **Articles Management** - Create, edit, delete blog posts with markdown
- **Poems Management** - Manage poetry in multiple languages
- **Photo Gallery** - Upload and organize photos by category
- **Settings** - Edit About page and social links
- **Secure** - Password-protected with session authentication
- **Beautiful UI** - Glassmorphic design matching portfolio aesthetic

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add environment variables:
   ```
   ADMIN_PASSWORD=your_password
   SESSION_SECRET=32_char_random_string
   NODE_ENV=production
   ```
4. Deploy

**Note:** Photo uploads require Vercel Blob Storage or external storage (S3, R2) in production.

### VPS/Server

```bash
git clone <repository>
cd sumsur-site
npm install
npm run build
npm start
```

Create `.env.local` with production credentials.

## 📝 License

All rights reserved.

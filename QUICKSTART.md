# 🚀 CMS Quick Start Guide

## What Was Built

A **complete, secure Content Management System** for your portfolio website with:

✅ **Password-protected admin panel** (`/admin`)  
✅ **Articles management** - Create, edit, delete blog posts with markdown  
✅ **Poems management** - Add Hindi/English poems with images  
✅ **Photo gallery** - Upload photos to categories with auto-optimization  
✅ **Settings** - Edit About page and social links  
✅ **Secure authentication** - Session-based with httpOnly cookies  
✅ **Beautiful UI** - Glassmorphic design matching your portfolio  

---

## 🎯 Getting Started (2 Minutes)

### 1. **Set Your Password**

The CMS is already configured with a temporary password. **Change it immediately:**

```bash
# Edit .env.local file
ADMIN_PASSWORD=your_new_secure_password_here
```

### 2. **Start the Server**

```bash
cd projects/sumsur-site
npm run dev
```

### 3. **Access the CMS**

Open your browser and go to:
```
http://localhost:3000/admin
```

Login with your password from `.env.local`.

---

## 📚 How to Use

### **Managing Articles**

1. Click the **Articles** tab
2. Click **+ New Article**
3. Fill in the form:
   - Title auto-generates the slug
   - Date format: "February 20, 2026"
   - Content supports **Markdown**
4. Click **Create Article**
5. Edit or delete from the list below

### **Managing Poems**

1. Click the **Poems** tab
2. Click **+ New Poem**
3. Choose language (Hindi/English)
4. Add optional image path (e.g., `/poems/mypoem.jpg`)
5. Click **Create Poem**

### **Managing Photos**

1. Click the **Photos** tab
2. Select a category (nature, cities, people, wildlife, smell-good, bw)
3. Click **Choose Files** and select images
4. Photos are **automatically optimized** and added to the gallery
5. Hover over photos to delete

### **Editing Settings**

1. Click the **Settings** tab
2. Edit **About Page** (markdown) or **Social Links**
3. Click **Save Settings**

---

## 🔐 Security Notes

### Current Password
- Default: `sumeet2026secure` (in `.env.local`)
- **Change this immediately!**

### Changing Password

1. Edit `.env.local`:
   ```bash
   ADMIN_PASSWORD=new_secure_password
   ```

2. Restart the dev server:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

3. Login with new password

### Session Duration
- Sessions last **7 days**
- Auto-logout after inactivity
- Click **Logout** button to end session manually

---

## 📁 Data Storage

All your content is stored in these files:

```
data/
├── articles.json          # All blog posts
├── poems.ts               # All poems
├── settings.json          # Site settings
└── about.md               # About page content

public/photos/
├── nature/                # Nature photos
├── cities/                # City photos
├── people/                # People photos
├── wildlife/              # Wildlife photos
├── smell-good/            # Smell-good category
└── bw/                    # Black & white photos

lib/
└── photo-index.json       # Photo index (auto-updated)
```

**Backup regularly!** Copy these folders to keep your content safe.

---

## 🚀 Deploying to Production

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables:
   ```
   ADMIN_PASSWORD=your_production_password
   SESSION_SECRET=random_32_char_string
   NODE_ENV=production
   ```
4. Deploy!

**Note:** Photo uploads won't work on Vercel (read-only filesystem). Options:
- Use Vercel Blob Storage (requires code changes)
- Upload photos manually to `public/photos/` before deploying
- Use AWS S3 or Cloudflare R2

### Option 2: VPS/Server

1. Clone repository on server
2. Create `.env.local` with production passwords
3. Install dependencies: `npm install`
4. Build: `npm run build`
5. Start: `npm start` or use PM2

---

## 🛠️ Troubleshooting

### Can't login?
- Check `.env.local` exists
- Verify password is correct
- Clear browser cookies
- Restart dev server

### Photos not uploading?
- Ensure `public/photos/[category]/` directories exist
- Check file permissions
- Verify Sharp is installed: `npm list sharp`

### Changes not saving?
- Check browser console for errors
- Verify file permissions on `data/` folder
- Ensure server has write access

### Session expired?
- Sessions last 7 days
- Login again
- Check cookies aren't blocked

---

## 📖 Full Documentation

See **CMS_DOCUMENTATION.md** for:
- Complete API reference
- Advanced customization
- Security best practices
- Production deployment details
- Adding new content types

---

## 🎨 Customization

### Change Photo Categories

Edit `components/admin/PhotosManager.tsx`:
```javascript
const categories = ['nature', 'cities', 'people', 'wildlife', 'smell-good', 'bw'];
```

Then create matching directories in `public/photos/`.

### Change Colors

All components use Tailwind CSS. Primary colors:
- Purple gradient: `from-purple-600 to-pink-600`
- Background: `from-slate-900 via-purple-900 to-slate-900`

Edit in component files to customize.

---

## ✅ What's Next?

1. **Change the password** in `.env.local`
2. **Test the CMS** - Create a test article
3. **Backup your data** - Copy `data/` and `public/photos/`
4. **Deploy to production** - Follow deployment guide above
5. **Customize** - Add your own categories or content types

---

## 🙏 Support

If you encounter issues:
1. Check **CMS_DOCUMENTATION.md**
2. Review browser console
3. Check server logs
4. Reach out to your developer

---

**Built with:** Next.js 14, React Hook Form, Iron Session, Sharp, TailwindCSS

**Security:** Session-based auth, httpOnly cookies, CSRF protection, secure middleware

**Your portfolio, your control. Happy publishing! ✨**

# Sumsur Portfolio CMS Documentation

## Overview

A secure, full-featured Content Management System built for your Next.js portfolio site. Manage articles, poems, photos, and site settings through an intuitive admin interface.

## Features

### 🔐 Security
- Password-protected admin panel
- Session-based authentication with httpOnly cookies
- Secure middleware for all admin routes
- CSRF protection via iron-session

### 📝 Content Management
- **Articles**: Full CRUD operations with markdown editor
- **Poems**: Support for Hindi and English, with optional images and context
- **Photos**: Upload to categories (nature/cities/people/wildlife/smell-good/bw) with automatic optimization
- **Settings**: Edit about page and social links (LinkedIn, Instagram, Email)

### 🎨 UI/UX
- Glassmorphic design matching portfolio aesthetic
- Responsive layout
- Toast notifications for all actions
- Loading states throughout
- Tab-based navigation

## Setup

### 1. Environment Variables

Create a `.env.local` file in the project root:

```bash
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=at_least_32_characters_long_random_string
NODE_ENV=production
```

**Important:** 
- Use a strong, unique password for `ADMIN_PASSWORD`
- Generate a random 32+ character string for `SESSION_SECRET`
- Never commit `.env.local` to version control

### 2. Install Dependencies

All dependencies are already installed:
- `iron-session` - Secure session management
- `react-hook-form` - Form handling
- `sharp` - Image optimization
- `uuid` - Unique ID generation

### 3. Directory Structure

```
projects/sumsur-site/
├── app/
│   ├── admin/
│   │   ├── page.tsx                 # Login page
│   │   └── dashboard/
│   │       └── page.tsx             # Main dashboard
│   └── api/admin/
│       ├── auth/
│       │   ├── login/route.ts       # Login endpoint
│       │   └── logout/route.ts      # Logout endpoint
│       ├── articles/route.ts        # Articles CRUD
│       ├── poems/route.ts           # Poems CRUD
│       ├── photos/
│       │   ├── route.ts             # Photo listing/deletion
│       │   └── upload/route.ts      # Photo upload
│       └── settings/route.ts        # Settings management
├── components/admin/
│   ├── ArticlesManager.tsx
│   ├── PoemsManager.tsx
│   ├── PhotosManager.tsx
│   └── SettingsManager.tsx
├── lib/
│   ├── auth.ts                      # Authentication utilities
│   └── photo-index.json             # Photo index (auto-updated)
├── data/
│   ├── articles.json                # Articles data
│   ├── poems.ts                     # Poems data
│   ├── settings.json                # Site settings (auto-created)
│   └── about.md                     # About page content (auto-created)
└── middleware.ts                    # Route protection
```

## Usage

### Accessing the CMS

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin`

3. Enter your admin password (from `.env.local`)

4. You'll be redirected to the dashboard

### Managing Content

#### Articles

1. Click the **Articles** tab
2. Click **+ New Article** to create
3. Fill in:
   - **Title**: Auto-generates slug
   - **Date**: Human-readable format (e.g., "February 20, 2026")
   - **Category**: e.g., "Essay", "Blog"
   - **Excerpt**: Short summary (first 150 chars)
   - **Content**: Full markdown content
4. Click **Create Article** or **Update Article**
5. Edit/Delete from the list below

#### Poems

1. Click the **Poems** tab
2. Click **+ New Poem**
3. Fill in:
   - **Title**
   - **Language**: Hindi or English
   - **Date**: Optional (e.g., "2024")
   - **Image Path**: Optional (e.g., `/poems/image.jpg`)
   - **Context**: Optional background story
   - **Poem Text**: Full poem content
4. Click **Create Poem** or **Update Poem**

#### Photos

1. Click the **Photos** tab
2. Select a category tab (nature/cities/people/wildlife/smell-good/bw)
3. Click **Choose Files** and select images
4. Photos are automatically:
   - Uploaded to `public/photos/[category]/`
   - Optimized with Sharp (max 3840px, 85% quality)
   - Added to `photo-index.json`
5. Hover over photos to delete

#### Settings

1. Click the **Settings** tab
2. **About Page**: Edit markdown content
3. **Social Links**: Add/update LinkedIn, Instagram, Email URLs
4. Click **Save Settings**

### Logging Out

Click the **Logout** button in the top-right corner.

## Data Persistence

### Articles
- Stored in: `data/articles.json`
- Format: JSON array with id, title, slug, excerpt, content, date, category

### Poems
- Stored in: `data/poems.ts`
- Format: TypeScript file with exported `poems` array
- Note: File is regenerated on each save to maintain TypeScript structure

### Photos
- Files: `public/photos/[category]/[filename]`
- Index: `lib/photo-index.json` (tracks all photos by category)
- Optimized: Automatically resized and compressed on upload

### Settings
- Stored in: `data/settings.json` (social links)
- About content: `data/about.md` (markdown file)

## Security Best Practices

1. **Change Default Password**: Immediately set a strong `ADMIN_PASSWORD`
2. **Secure Session Secret**: Use a cryptographically random 32+ character string
3. **HTTPS in Production**: Always use HTTPS to protect session cookies
4. **Regular Backups**: Backup `data/` and `public/photos/` directories
5. **Update Dependencies**: Keep packages up-to-date for security patches

## Changing the Admin Password

1. Edit `.env.local`:
   ```bash
   ADMIN_PASSWORD=new_secure_password
   ```
2. Restart the development server
3. Log in with the new password

**Note:** If you're already logged in, logout first or clear cookies.

## Troubleshooting

### Can't Login
- Check `.env.local` exists and has `ADMIN_PASSWORD`
- Verify password is correct
- Clear browser cookies
- Restart dev server

### Photos Not Uploading
- Check `public/photos/[category]/` directories exist
- Ensure write permissions
- Verify Sharp is installed: `npm list sharp`

### Data Not Saving
- Check file permissions on `data/` directory
- Ensure server has write access
- Check browser console for errors

### Session Expires Quickly
- Session lasts 7 days by default
- Configured in `lib/auth.ts` → `sessionOptions.cookieOptions.maxAge`

## Production Deployment

### Environment Variables

Set these in your hosting platform (Vercel, Netlify, etc.):

```bash
ADMIN_PASSWORD=your_production_password
SESSION_SECRET=your_production_secret_32_chars_min
NODE_ENV=production
```

### Vercel Deployment

1. Push to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### File Uploads in Production

**Important:** Most serverless platforms (Vercel, Netlify) have read-only file systems. Photo uploads work in development but need adjustments for production:

**Option 1: Use Cloud Storage**
- Modify `app/api/admin/photos/upload/route.ts` to upload to AWS S3, Cloudflare R2, or similar
- Update photo serving logic

**Option 2: Use Vercel Blob Storage**
- Install `@vercel/blob`
- Replace `fs.writeFile` with Vercel Blob API

### Build Command

```bash
npm run build
```

### Start Command

```bash
npm start
```

## Customization

### Changing Photo Categories

Edit in:
1. `components/admin/PhotosManager.tsx` → `categories` array
2. Create corresponding directories in `public/photos/`

### Adding New Content Types

1. Create data file (e.g., `data/projects.json`)
2. Create manager component (e.g., `components/admin/ProjectsManager.tsx`)
3. Create API route (e.g., `app/api/admin/projects/route.ts`)
4. Add tab to `app/admin/dashboard/page.tsx`

### Styling

All components use Tailwind CSS with glassmorphic theme. Colors:
- Primary: Purple gradient (`from-purple-600 to-pink-600`)
- Background: Dark gradient (`from-slate-900 via-purple-900 to-slate-900`)
- Glass: `backdrop-blur-lg bg-white/10 border border-white/10`

## API Reference

### Authentication

#### POST `/api/admin/auth/login`
- Body: `{ password: string }`
- Response: `{ success: true }` or `{ error: string }`

#### POST `/api/admin/auth/logout`
- Response: `{ success: true }`

### Articles

#### GET `/api/admin/articles`
- Response: `Article[]`

#### POST `/api/admin/articles`
- Body: `{ title, slug, excerpt, content, date, category }`
- Response: Created article with id

#### PUT `/api/admin/articles?id={id}`
- Body: Article fields to update
- Response: Updated article

#### DELETE `/api/admin/articles?id={id}`
- Response: `{ success: true }`

### Poems

#### GET `/api/admin/poems`
- Response: `Poem[]`

#### POST `/api/admin/poems`
- Body: `{ title, language, text, image?, date?, context? }`
- Response: Created poem with id

#### PUT `/api/admin/poems?id={id}`
- Body: Poem fields to update
- Response: Updated poem

#### DELETE `/api/admin/poems?id={id}`
- Response: `{ success: true }`

### Photos

#### GET `/api/admin/photos`
- Response: Photo index by category

#### POST `/api/admin/photos/upload`
- Body: FormData with `photos` (files) and `category`
- Response: `{ success: true, files: string[], count: number }`

#### DELETE `/api/admin/photos?category={cat}&filename={name}`
- Response: `{ success: true }`

### Settings

#### GET `/api/admin/settings`
- Response: `{ about: string, social: { linkedin, instagram, email } }`

#### PUT `/api/admin/settings`
- Body: Settings object
- Response: `{ success: true }`

## Support

For issues or questions:
1. Check this documentation first
2. Review browser console for errors
3. Check server logs
4. Verify environment variables

## License

Built for Sumsur Portfolio. All rights reserved.

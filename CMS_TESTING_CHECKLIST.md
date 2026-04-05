# CMS Testing Checklist

Use this checklist to verify that all CMS features are working correctly.

## \ud83d\udd11 Initial Setup

- [ ] Created/verified `.env.local` file exists
- [ ] Set custom `ADMIN_PASSWORD` (not default)
- [ ] Started dev server: `npm run dev`
- [ ] Opened browser to `http://localhost:3000/admin`

## \ud83d\udd10 Authentication

### Login
- [ ] Login page loads correctly
- [ ] Login with **wrong password** shows error message
- [ ] Login with **correct password** redirects to dashboard
- [ ] Session persists after page refresh
- [ ] Visiting `/admin/dashboard` directly (when logged in) works

### Security
- [ ] Visiting `/admin/dashboard` when **not logged in** redirects to login
- [ ] Visiting `/api/admin/articles` without login returns 401 error
- [ ] Logout button clears session and redirects to login

## \ud83d\udcdd Articles Management

### Create
- [ ] Click **Articles** tab
- [ ] Click **+ New Article** button
- [ ] Form appears with all fields
- [ ] Enter title - slug auto-generates
- [ ] Fill in date (e.g., "April 5, 2026")
- [ ] Fill in category (e.g., "Test")
- [ ] Fill in excerpt (short summary)
- [ ] Write markdown content
- [ ] Click **Create Article**
- [ ] Success toast appears
- [ ] Article appears in list below
- [ ] Verify `data/articles.json` updated

### Edit
- [ ] Click **Edit** on an article
- [ ] Form pre-fills with article data
- [ ] Modify title, content, etc.
- [ ] Click **Update Article**
- [ ] Success toast appears
- [ ] Changes reflected in article list
- [ ] Verify `data/articles.json` updated

### Delete
- [ ] Click **Delete** on an article
- [ ] Confirmation dialog appears
- [ ] Click OK
- [ ] Success toast appears
- [ ] Article removed from list
- [ ] Verify `data/articles.json` updated

### Cancel
- [ ] Click **+ New Article**
- [ ] Fill in some fields
- [ ] Click **Cancel**
- [ ] Form closes
- [ ] No data saved

## \u270d\ufe0f Poems Management

### Create
- [ ] Click **Poems** tab
- [ ] Click **+ New Poem**
- [ ] Form appears
- [ ] Enter title
- [ ] Select language (Hindi/English)
- [ ] Enter poem text
- [ ] (Optional) Add image path
- [ ] (Optional) Add date
- [ ] (Optional) Add context
- [ ] Click **Create Poem**
- [ ] Success toast appears
- [ ] Poem appears in list
- [ ] Verify `data/poems.ts` updated

### Edit
- [ ] Click **Edit** on a poem
- [ ] Form pre-fills with poem data
- [ ] Modify text or other fields
- [ ] Click **Update Poem**
- [ ] Success toast appears
- [ ] Changes reflected in poem list

### Delete
- [ ] Click **Delete** on a poem
- [ ] Confirm deletion
- [ ] Success toast appears
- [ ] Poem removed from list
- [ ] Verify `data/poems.ts` updated

## \ud83d\udcf7 Photos Management

### Category Navigation
- [ ] Click **Photos** tab
- [ ] See all category tabs (nature, cities, people, wildlife, smell-good, bw)
- [ ] Click each category tab
- [ ] Photo count displays for each category

### Upload Single Photo
- [ ] Select a category (e.g., nature)
- [ ] Click **Choose Files**
- [ ] Select 1 image
- [ ] Upload starts (loading message)
- [ ] Success toast appears
- [ ] Photo appears in grid
- [ ] Verify file in `public/photos/[category]/`
- [ ] Verify `lib/photo-index.json` updated

### Upload Multiple Photos
- [ ] Select a category
- [ ] Click **Choose Files**
- [ ] Select multiple images (3-5)
- [ ] Upload starts
- [ ] Success toast shows count
- [ ] All photos appear in grid

### Image Optimization
- [ ] Upload a large image (>5MB)
- [ ] Verify file size reduced in `public/photos/[category]/`
- [ ] Image displays correctly in grid
- [ ] Image loads on frontend

### Delete Photo
- [ ] Hover over a photo in grid
- [ ] Delete button appears
- [ ] Click Delete
- [ ] Confirm deletion
- [ ] Success toast appears
- [ ] Photo removed from grid
- [ ] Verify file deleted from `public/photos/[category]/`
- [ ] Verify `lib/photo-index.json` updated

### Category Switching
- [ ] Upload photo to "nature"
- [ ] Switch to "cities" tab
- [ ] Upload photo to "cities"
- [ ] Switch back to "nature"
- [ ] Verify correct photos display

## \u2699\ufe0f Settings Management

### About Page
- [ ] Click **Settings** tab
- [ ] Click **About Page** sub-tab
- [ ] Textarea pre-fills with current content (or empty)
- [ ] Write markdown content
- [ ] Click **Save Settings**
- [ ] Success toast appears
- [ ] Verify `data/about.md` created/updated

### Social Links
- [ ] Click **Social Links** sub-tab
- [ ] Fill in LinkedIn URL
- [ ] Fill in Instagram URL
- [ ] Fill in Email
- [ ] Click **Save Settings**
- [ ] Success toast appears
- [ ] Verify `data/settings.json` created/updated
- [ ] Refresh page - links persist

## \ud83c\udfa8 UI/UX Testing

### Responsive Design
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test mobile view (375px width)
- [ ] Test tablet view (768px width)
- [ ] Test desktop view (1920px width)
- [ ] All elements visible and usable

### Toast Notifications
- [ ] Create an article - see success toast
- [ ] Delete an article - see success toast
- [ ] Try wrong action - see error toast (if applicable)
- [ ] Toasts auto-dismiss after 3 seconds

### Loading States
- [ ] Upload large photo - see loading message
- [ ] Create article - button shows "Saving..."
- [ ] Form buttons disable during submission

### Tab Navigation
- [ ] Click all main tabs (Articles, Poems, Photos, Settings)
- [ ] Active tab highlights correctly
- [ ] Content switches correctly
- [ ] No errors in browser console

## \ud83d\udd0d Browser Testing

### Chrome/Edge
- [ ] Login works
- [ ] All features function
- [ ] No console errors

### Firefox
- [ ] Login works
- [ ] All features function
- [ ] No console errors

### Safari (if available)
- [ ] Login works
- [ ] All features function

## \ud83d\udee0\ufe0f Error Handling

### Network Errors
- [ ] Stop dev server while logged in
- [ ] Try to create article
- [ ] Error toast appears
- [ ] Restart server - functionality restored

### Invalid Data
- [ ] Try to submit article with empty title
- [ ] Validation error shows
- [ ] Form doesn't submit
- [ ] Fill in title - form submits

### Session Expiration
- [ ] Wait 5 minutes (or manually delete cookie)
- [ ] Try to perform action
- [ ] Redirects to login page

## \ud83d\udcca Data Integrity

### File Verification
- [ ] Create/edit article - check `data/articles.json`
- [ ] Create/edit poem - check `data/poems.ts`
- [ ] Upload photo - check `public/photos/[category]/`
- [ ] Update settings - check `data/settings.json` and `data/about.md`

### JSON Validity
- [ ] Open `data/articles.json`
- [ ] Verify valid JSON (no syntax errors)
- [ ] Open `data/poems.ts`
- [ ] Verify valid TypeScript

### Photo Index
- [ ] Open `lib/photo-index.json`
- [ ] Verify all categories present
- [ ] Verify filenames match actual files in `public/photos/`

## \u2705 Final Checks

- [ ] Can manage all content types (articles, poems, photos, settings)
- [ ] All data persists after server restart
- [ ] No errors in browser console
- [ ] No errors in terminal/server logs
- [ ] UI looks good on desktop
- [ ] UI looks good on mobile
- [ ] Ready for production deployment

---

## \ud83d\udc1b Found an Issue?

1. Check browser console (F12 > Console)
2. Check server terminal for errors
3. Verify `.env.local` is configured
4. Review `CMS_DOCUMENTATION.md` for troubleshooting
5. Check file permissions on `data/` and `public/photos/`

---

## \ud83c\udf89 All Tests Pass?

**Congratulations!** Your CMS is fully functional and ready to use.

**Next Steps:**
1. Change admin password to something secure
2. Backup your data regularly
3. Deploy to production
4. Start creating content!

---

**Testing Date:** __________  
**Tested By:** __________  
**Status:** \u2610 All Pass \u2610 Issues Found \u2610 Not Tested

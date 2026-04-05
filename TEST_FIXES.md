# Testing Guide for CMS Fixes

## Quick Test Checklist

### ✅ Issue 1: Poems Section Crash
**What to test:**
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Click on "Poems" tab
- [ ] Verify poems list displays without errors
- [ ] Check browser console (F12) - should be no red errors
- [ ] Try clicking "Edit" on any poem - form should load

**Expected behavior:**
- Poems list loads smoothly
- No "Application error: a client-side exception has occurred"
- Console shows no parsing errors
- All poem data displays correctly

---

### ✅ Issue 2: Poem Image Upload
**What to test:**
- [ ] In Poems tab, click "+ New Poem"
- [ ] Look for "Poem Image (optional)" field
- [ ] Verify it's a file upload input (not text input)
- [ ] Click to select an image file OR drag & drop an image
- [ ] Watch for upload progress message
- [ ] Verify success message shows with file path

**Expected behavior:**
- File upload button with "Choose File" or similar
- Drag & drop works
- Shows "Uploading image..." during upload
- Shows "✓ Uploaded: /poems/[filename]" on success
- Image path auto-fills in form
- Can submit poem with uploaded image

**How to verify:**
1. Upload a test image
2. Fill in poem details
3. Click "Create Poem"
4. Check `public/poems/` directory for new file
5. View poem on frontend - image should display

---

### ✅ Issue 3: Settings Prepopulation
**What to test:**
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] Click on "Settings" tab
- [ ] Click "About Page" sub-tab
- [ ] Verify text area is pre-filled (not empty)
- [ ] Click "Social Links" sub-tab
- [ ] Verify all three fields are pre-filled:
  - LinkedIn: `https://www.linkedin.com/in/suranasumeet`
  - Instagram: `https://instagram.com/sum.sur`
  - Email: `sumeet9surana@gmail.com`

**Expected behavior:**
- About page content appears immediately (5 paragraphs)
- Social links all have values
- No empty fields that should have data
- Editing and saving works
- Reloading page shows saved changes

---

## Manual Testing Commands

### Test poems parsing (backend):
```bash
cd /home/ubuntu/.openclaw/workspace/projects/sumsur-site
node -e "
const fs = require('fs');
const data = fs.readFileSync('data/poems.ts', 'utf-8');
const match = data.match(/export const poems: Poem\[\] = (\[[\s\S]*\]);?\s*$/m);
if (match) {
  const poems = JSON.parse(match[1]);
  console.log('✓ Poems parsed successfully:', poems.length, 'poems found');
} else {
  console.log('✗ Failed to parse poems');
}
"
```

### Test settings files exist:
```bash
cd /home/ubuntu/.openclaw/workspace/projects/sumsur-site
echo "=== About.md exists ==="
test -f data/about.md && echo "✓ Found" || echo "✗ Missing"
echo "=== Settings.json exists ==="
test -f data/settings.json && echo "✓ Found" || echo "✗ Missing"
echo "=== Poems directory exists ==="
test -d public/poems && echo "✓ Found" || echo "✗ Missing"
```

### Check file contents:
```bash
# Preview about.md
cat data/about.md | head -3

# Preview settings.json
cat data/settings.json
```

---

## Browser Console Checks

### What to look for (GOOD):
```
✓ No red error messages
✓ API calls to /api/admin/poems return 200
✓ API calls to /api/admin/settings return 200
✓ Form data populates on load
```

### What indicates problems (BAD):
```
✗ "Could not parse poems file"
✗ "Failed to fetch settings"
✗ 500 Internal Server Error
✗ "Application error: a client-side exception has occurred"
✗ Uncaught TypeError/SyntaxError
```

---

## Network Tab Verification

### Successful API Responses:

**GET /api/admin/poems**
- Status: 200 OK
- Response: Array of poem objects
- Each poem has: id, title, language, text, image, date, context

**GET /api/admin/settings**
- Status: 200 OK
- Response: `{ about: "...", social: { linkedin, instagram, email } }`

**POST /api/admin/poems/upload**
- Status: 200 OK
- Response: `{ success: true, path: "/poems/[filename]" }`

---

## File System Verification

### Before upload:
```bash
ls -lh public/poems/ | wc -l
# Note the count
```

### After upload:
```bash
ls -lh public/poems/ | wc -l
# Should be +1 from before
ls -lt public/poems/ | head -3
# Your new file should be at the top (most recent)
```

---

## Rollback Instructions

If something breaks:

```bash
cd /home/ubuntu/.openclaw/workspace/projects/sumsur-site

# Rollback to previous commit
git log --oneline -3  # Find the commit before 95a4ad1
git reset --hard [previous-commit-hash]

# Or just reset the specific files
git checkout HEAD~1 -- app/api/admin/poems/route.ts
git checkout HEAD~1 -- components/admin/PoemsManager.tsx
rm -rf app/api/admin/poems/upload/
rm data/about.md data/settings.json

# Restart dev server
npm run dev
```

---

## Success Criteria

All three issues are FIXED when:

1. ✅ Poems tab loads without crash
2. ✅ Poem form has file upload (not text input)
3. ✅ Settings form pre-fills with existing data
4. ✅ Creating new poems with image upload works
5. ✅ Editing existing poems works
6. ✅ Settings can be edited and saved
7. ✅ No console errors or 500 responses

---

*Last updated: April 5, 2026*

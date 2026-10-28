# Code Vault

Your personal library for coursework code. Save the question, screenshots and code, then copy all the code with one click. Works on Android and Windows, and offline.

## What is in this folder

| File | What it does |
|---|---|
| `index.html` | The whole app |
| `config.js` | Where you paste your Supabase URL and key (optional, step 2) |
| `supabase-setup.sql` | Creates the cloud table (optional, step 2) |
| `sw.js`, `manifest.webmanifest`, `icons/` | Make it installable and work offline |
| `vendor/` | Syntax colours (highlight.js, BSD licence) |

## Step 1. Put it online (free)

1. Create a new GitHub repository (for example `code-vault`) and upload all of these files to it, keeping the folders.
2. Go to vercel.com, choose **Add New > Project**, import that repository, and press **Deploy**. No settings need changing.
3. Open the link Vercel gives you. That is your app.

The app already works now, saving on the device you open it on.

## Step 2. Cloud sync between phone and laptop (optional, free)

1. Create a free project at supabase.com.
2. Open **SQL Editor > New query**, paste everything from `supabase-setup.sql`, press **Run**.
3. Open **Authentication > Users > Add user**. Create your own email and password (tick "Auto confirm"). Then open **Authentication > Sign In / Providers** and turn **off** "Allow new users to sign up", so only you can log in.
4. Open **Project Settings > API** and copy the **Project URL** and the **anon / publishable key**.
5. Paste both into `config.js`, commit the change to GitHub (Vercel redeploys by itself).
6. On each device open the app, go to **Settings > Cloud sync**, enter your email and password, and press **Save and sign in**.

Never put the `service_role` key anywhere in this app. Only the anon key.

## Automatic releases

The folder `.github/workflows/` contains `release.yml`. After you upload it to GitHub, every push to the `main` branch automatically creates a new **Release** (named like `v2026.10.28-7`) with a zip of the app attached and notes listing what changed. Find them under **Releases** on the right side of your repository page.

Make sure the `.github` folder is uploaded too. The GitHub website upload can skip hidden folders, so if you do not see **Actions** running, use GitHub Desktop or `git push` instead.

## How the library works

Every entry is a **folder**. Click a folder to see its code in full screen. Inside full screen you can copy all the code, change the text size, or press **Details** to see the question and screenshots, edit it, or delete it. Each folder also has its own **Copy code** button, so you can copy without opening it.

## Step 3. Install it

- **Android (Chrome):** menu (three dots) > **Install app**.
- **Windows (Chrome or Edge):** click the install icon at the right end of the address bar.

## Keeping your code safe

- Everything is saved on your device first, so a bad connection never loses work.
- Deleted entries go to **Trash** and can be restored.
- Press **Export backup** about once a month and keep the file somewhere else. The app reminds you after 30 days.
- Free Supabase projects pause after 7 days with no activity. Opening the app and syncing counts as activity. A paused project can be restored from the Supabase dashboard, and your data is kept.
- Free plans can change over the years, so the exported file is your safety net. **Import backup** in Settings restores it on any device.

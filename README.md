# Code Vault

Your personal library for coursework code. Save the question, screenshots and code, then copy all the code with one click.

**Live app:** https://cloudjrn.vercel.app

Works on Android and Windows, installs like an app, and keeps working offline.

---

## Features

- **Folder for every entry.** Each piece of code is stored as a folder. Click it to open the code in full screen.
- **One-click copy.** Copy the whole code from inside full screen, or straight from the folder card.
- **Question and screenshots.** Keep the question and optional pictures next to the code (press **Details**).
- **Date and time saved automatically** whenever you add code.
- **Full-screen code view** with syntax colours and adjustable text size.
- **Cloud sync (optional).** Use the same library on your phone and laptop.
- **Offline first.** Everything is saved on the device first, so a bad connection never loses work.
- **Trash and restore.** Deleted entries go to Trash and can be restored.
- **Backup and restore.** Export a backup file and import it on any device.
- **Installable (PWA).** Add it to your Android home screen or Windows desktop.

---

## What is in this repository

| File / folder | What it does |
| --- | --- |
| `index.html` | The whole app |
| `config.js` | Your Supabase URL and anon key (for cloud sync) |
| `supabase-setup.sql` | Creates the cloud table and security rules |
| `sw.js`, `manifest.webmanifest`, `icons/` | Make the app installable and work offline |
| `vendor/` | Syntax colours (highlight.js, BSD licence) |
| `package.json` | App version, used for automatic releases |
| `CHANGELOG.md` | Release notes for each version |
| `RELEASING.md` | How to publish a new release |
| `.github/workflows/` | GitHub Actions that create releases automatically |

---

## Setup

### Step 1. Put it online (free)

1. Create a GitHub repository and upload all the files, keeping the folders (including `.github`).
2. Go to [vercel.com](https://vercel.com), choose **Add New > Project**, import the repository and press **Deploy**. No settings need changing.
3. Open the link Vercel gives you. That is your app.

The app already works at this point, saving on the device you open it on.

### Step 2. Cloud sync between phone and laptop (optional, free)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor > New query**, paste everything from `supabase-setup.sql` and press **Run**.
3. Open **Authentication > Users > Add user**. Create your own email and password and tick **Auto Confirm**.
4. Open **Authentication > Sign In / Providers** and turn **off** "Allow new users to sign up", so only you can log in.
5. Open **Project Settings > API** and copy the **Project URL** and the **anon / publishable key**.
6. Paste both into `config.js` and commit the change. Vercel redeploys by itself.
7. On each device, open the app, go to **Settings > Cloud sync**, enter your email and password, and press **Save and sign in**.

> **Never** put the `service_role` key anywhere in this app. Use only the anon key.

### Step 3. Install it

- **Android (Chrome):** menu (three dots) > **Install app**.
- **Windows (Chrome or Edge):** click the install icon at the right end of the address bar.

---

## Changing your password

In Supabase, open **SQL Editor > New query**, paste the code below with your own email and new password, and press **Run**. Then log in again with the new password.

```sql
update auth.users
set encrypted_password = crypt('NEW_PASSWORD', gen_salt('bf'))
where email = 'your@email.com';
```

---

## Automatic releases

Releases are created automatically by GitHub Actions.

1. Change the `version` in `package.json` (for example `1.0.0` to `1.1.0`).
2. Add the notes for that version to `CHANGELOG.md`.
3. Commit and push to `main`.

A new **Release** appears on the right side of the repository page, with a zip of the app and the notes from `CHANGELOG.md`. See `RELEASING.md` for details.

> The GitHub website upload can skip hidden folders. If **Actions** does not run, make sure `.github/workflows/` was uploaded, or use GitHub Desktop or `git push`.

---

## Keeping your code safe

- Everything is saved on your device first, then synced to the cloud.
- Press **Export backup** about once a month and keep the file somewhere else. The app reminds you after 30 days.
- **Import backup** in Settings restores the file on any device.
- Free Supabase projects pause after 7 days with no activity. Opening the app and syncing counts as activity. A paused project can be restored from the Supabase dashboard, and your data is kept.
- Free plans can change over the years, so your exported file is your safety net.

---

## Built with

- HTML, CSS and JavaScript (no build step)
- [Supabase](https://supabase.com) for login and cloud storage
- [Vercel](https://vercel.com) for hosting
- [highlight.js](https://highlightjs.org) for syntax colours
- GitHub Actions for automatic releases

---

## Author

Made by [Jony Roy](https://github.com/jony99jrn) as a personal tool for CSE coursework.

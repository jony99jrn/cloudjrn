# Releasing Code Vault

A release is a named snapshot of the app on GitHub (for example `v1.1.0`) with notes about what changed. It is created automatically when you change the version number.

## Golden rule

Commit the **code** first, then **CHANGELOG.md**, then **package.json last**. The release starts when `package.json` changes, and it captures the code exactly as it is at that moment.

## Steps

1. **Change the app.** Edit the file on GitHub and commit it with a clear message. Wait until the newest deployment on Vercel shows **Ready**, then open the app and test the change.
2. **Pick the new version** (MAJOR.MINOR.PATCH):
   - Bug fix or small text change: raise PATCH (1.0.0 to 1.0.1)
   - New feature: raise MINOR (1.0.0 to 1.1.0)
   - A change that needs manual work from you, such as a new database table: raise MAJOR (1.0.0 to 2.0.0)
3. **Update CHANGELOG.md.** Add a new section at the top, right under the `# Changelog` title:

   ```
   ## v1.1.0 – Short title

   - First thing that changed
   - Second thing that changed
   ```

   The version must match `package.json`. The text after the dash becomes the release title and the bullets become the release notes. Keep the older sections. Commit the file.
4. **Update package.json last.** Change only the `"version"` line (for example `"version": "1.1.0"`) and commit.
5. **Check the release.** Open the **Actions** tab. The run named **Auto release** should get a green tick after about 10 seconds. The new version then appears under **Releases** on the right side of the repository page, with your title and notes.

## Good to know

- Releases do not deploy the app. Vercel deploys every commit to `main`. A release is only a saved, named snapshot.
- Never reuse a version number. If you forgot something, fix it and release the next patch version.
- To fix the notes afterwards, open the release on GitHub and click **Edit**.
- With no matching section in CHANGELOG.md, GitHub writes automatic notes from your commits.
- To run it by hand: **Actions > Auto release > Run workflow**. It creates a release for the current version if there is not one yet.
- To go back to an old version, download its **Source code (zip)** from the release page. For the live site you can also use Vercel's **Instant Rollback**.
- Never put passwords or secret keys in any file. Only the Supabase **publishable (anon)** key belongs in `config.js`.

## If something goes wrong

- **No new run in Actions:** check that `package.json` really changed on the `main` branch, and that the workflow file is at `.github/workflows/release.yml`.
- **Red failed run:** open the failed step and read the error. Check **Settings > Actions > General > Workflow permissions** is set to **Read and write permissions**.
- **Green run but no new release:** that version already has a release. Use a new number.
- **Automatic notes instead of yours:** the heading in CHANGELOG.md does not match the version exactly. It must look like `## v1.1.0 – Title`.

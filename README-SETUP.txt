CCC COSMIC BROADCAST NETWORK — RSS AUTOMATION UPGRADE

Upload these files into your GitHub Pages repository, preserving folders:
  announcements.json (existing content, included for reference)
  scripts/build_feed.py
  .github/workflows/update-broadcast-feed.yml
  feed.xml (generated initial copy)

IMPORTANT: Upload scripts/build_feed.py into the scripts folder and the workflow
YAML into .github/workflows; do not put them all in the repository root.
Your existing index.html, app.js, broadcast.js, styles.css and other app files
remain untouched.

After uploading, open GitHub -> Actions -> Update CCC Broadcast RSS Feed.
If the workflow cannot push, check repository Settings -> Actions -> General ->
Workflow permissions -> Read and write permissions. You may need to enable it.

PUBLISHING AN ANNOUNCEMENT:
1. Open announcements.json in GitHub, tap Edit.
2. Add a new object inside posts, using a NEW unique id, an ISO date/time,
   title, category, body, and URL. Keep valid JSON syntax.
3. Commit the change to main.
4. GitHub Actions regenerates feed.xml and commits it automatically.
5. GitHub Pages publishes the updated files; Make detects new RSS items at
   its configured interval and sends them to Telegram.

Do not change the id or date of an existing post merely to correct a typo:
RSS subscribers may treat it as a new item.

NOTE: This automation uses GitHub Actions and your existing Make scenario.
Make usage remains subject to free-tier limits; scheduled RSS checks use credits.
If your repository uses a branch other than main, update the workflow trigger.

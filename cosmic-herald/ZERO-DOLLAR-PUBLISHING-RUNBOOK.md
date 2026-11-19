# COSMIC HERALD — Zero-Dollar Publishing Runbook
Status: plan, not connected to Facebook. Cost goal: $0 recurring.

## Phase A: free scheduling (recommended first)
1. Open the CCC Facebook Page in Meta Business Suite using an account with authorized Page access.
2. Review `POST-LIBRARY-DAYS-01-30.md` and edit or reject any unsuitable drafts.
3. Create one Page post for each approved day. Use the app link in the posts; optionally add an original graphic with appropriate rights.
4. Schedule the posts using the free planner/scheduling features currently available to your Page. Confirm the allowed scheduling window in your account; do not assume all 30 days are supported.
5. Inspect the first scheduled post after publication. Check the app link on both Android and iPhone browsers.
6. Refill the queue before it empties. Scheduling in Meta Business Suite is not perpetual automation.

## Phase B: authorized unattended scheduling (only after testing)
Goal: schedule approved posts from a GitHub-hosted queue with GitHub Actions or a free service. Requires a Meta developer app, valid Page publishing permissions, a Page access token, and a safe secret store. API access and permissions must be verified before promising this path. Never use scraping, unofficial browser automation, or a personal Facebook password. Never put tokens in a public repository or client-side JavaScript.
Add a duplicate-post prevention ledger, idempotency check, retry logic, failure alerts, and a way to stop publishing. Scheduled jobs may run late or fail. Human should check performance and failures periodically.

## Recruitment measurement
Primary success: visits to the CCC app and voluntary Seeker inquiries, not likes alone. Use Meta post insights and privacy-respecting app analytics if available. Do not promise student enrollment or track people invasively.
Recommended content ratio: ~60% educational, 20% poetry/art, 20% direct app invitations; always keep a clear app link in selected posts.
Do not auto-respond to sensitive Messenger inquiries or send unsolicited messages.

## Budget boundary
No paid AI API, no paid scheduling software, no paid hosting required for Phase A. Existing GitHub Pages app remains the destination. If a platform introduces a charge or limits access, stop and reassess rather than silently incur costs.

## Operator checklist
- [ ] Read and approve first 30 posts
- [ ] Confirm Meta Page scheduling available for free
- [ ] Schedule first week
- [ ] Verify first published post and app link
- [ ] Schedule remainder of available window
- [ ] Review results weekly
- [ ] Create next 60 posts

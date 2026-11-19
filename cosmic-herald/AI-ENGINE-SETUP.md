# COSMIC HERALD — AI Draft Engine Deployment (Not Yet Live)

## What is built
- A draft-only Cloudflare Worker in `cosmic-herald/worker.js`.
- A protected `POST /draft` route accepting a topic, context, teaching register, and expression.
- An OpenAI Responses API call that returns a proposed Facebook post.
- No Facebook or Messenger publishing code and no payment processing.

## Cost and permissions
The Worker may fit within a Cloudflare free tier, subject to limits, but the OpenAI API is separately billed. A ChatGPT subscription does not include API usage. Do not deploy or call the model until you have reviewed pricing and set a suitable usage budget.

## Setup (when ready)
1. Create a Cloudflare Worker in your own account, and deploy the contents of `worker.js`.
2. Set two **encrypted secrets**, never plain text in GitHub:
   - `OPENAI_API_KEY`: your own API key from the model provider.
   - `HERALD_ADMIN_TOKEN`: a long random private token that only the operator knows.
3. Set `ALLOWED_ORIGIN` to `https://ccconsciousness.github.io`.
4. Optionally set `OPENAI_MODEL` to an available, supported model (default in code: `gpt-4.1-mini`; verify availability and pricing).
5. Test `GET /health` and a properly authenticated `POST /draft` request.
6. Do not paste secrets into chat, GitHub, public websites, or screenshots.

## Security limitations
- The bearer token is an operator credential, **not** a user login. Do not save it in the public GitHub Pages site, localStorage, or query parameters.
- CORS limits browser cross-origin access but is **not authentication**; the bearer token is required.
- Use Cloudflare rate limiting or Access policies before broader use, and consider a server-side daily quota to prevent unexpected API costs.
- Anyone who obtains the token can invoke the paid model until you revoke it. Rotate it if exposed.
- A static GitHub Pages client cannot safely store a persistent administrator secret. The next UI step is a session-only operator token input, or preferably a Cloudflare Access-protected admin interface.
- Verify Meta's current permissions and policies separately before any future Facebook integration.

## Test payload (example without real credentials)
```json
{"topic":"The Ocean and Wave","context":"A metaphor, not scientific proof","register":"mesoteric","expression":"balanced"}
```

## Publication gate
Every generated post is an **unpublished draft**. The operator must review claims, tone, doctrine, and links before publishing. CCC's current legal status must be represented accurately.

# RoadRunner USA

Marketing site for Roadrunner USA Inc, a dry van carrier running full truckloads between Southern California and Dallas, Texas. Based in North Carolina.

Stat numbers, contact details, services, and partner names live in [`src/config/site.ts`](src/config/site.ts). Change them there.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:4317](http://127.0.0.1:4317).

```bash
npm run build
npm start
```

`npm start` runs `scripts/start.mjs`, which reads `process.env.PORT` (or 4317 when that variable is unset) and listens on `0.0.0.0`.

## Forms

Quote, tracking, driver application, and contact forms post to `POST /api/inquiries`.

Each submission is handled in this order:

1. Saved as JSON under `data/submissions/` (or `SUBMISSIONS_DIR` if you set it).
2. Emailed to `FORM_TO_EMAIL` (default `info@rdrunnerusa.com`) when SMTP is configured.
3. If SMTP is not set, emailed through [Resend](https://resend.com) when `RESEND_API_KEY` is set.
4. Posted to `FORM_WEBHOOK_URL` when that is set.

Copy [`.env.example`](.env.example) to `.env.local` and fill in the channel you want.

Driver applications also require a driver's license number and a CDL file (JPG, PNG, HEIC, or PDF, up to 25MB). That file is attached to the office email. The careers form reports success only after SMTP or Resend accepts the message. A webhook does not carry the file.

Without SMTP, Resend, or a webhook, quote, tracking, and contact forms are still accepted. Each submission is written as JSON under `data/submissions/` when that directory is writable, and falls back to the system temp directory if it is not. A failed disk write is logged and does not stop the server. On Render that disk is wiped on every deploy and restart, so production mail needs SMTP or Resend. Do not commit files in `data/submissions/`; they can contain personal information.

Resend’s onboarding sender only delivers to the Resend account owner until the `rdrunnerusa.com` domain is verified. Set `RESEND_FROM` to an address on that domain after verification.

## Deploy on Render

`render.yaml` describes a free Node web service.

Create a Web Service from the public GitHub repo, or apply the Blueprint.

- Runtime: Node
- Plan: Free
- Build command: `npm ci && npm run build`
- Start command: `npm start`

`npm start` binds to `0.0.0.0` on `process.env.PORT`. Render sets `PORT`; do not hard-code it.

Set `NEXT_PUBLIC_SITE_URL` to the public `https://` origin. Set SMTP or Resend variables from `.env.example` so form mail reaches `info@rdrunnerusa.com`. Quote, tracking, and contact forms still submit when those are unset. The careers form needs SMTP or Resend so the CDL attachment can be delivered.

## Photos

Homepage and interior photography is hotlinked from Pexels and Unsplash. Those pictures are stock. They are not this company’s trucks, office, or staff.

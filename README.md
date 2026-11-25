# RoadRunner USA

Marketing site for Roadrunner USA Inc, a dry van carrier running full truckloads between Southern California and Dallas, Texas. The office is in Matthews, North Carolina.

Stat numbers, hours, contact details, services, and partner names live in [`src/config/site.ts`](src/config/site.ts). Change them there.

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

`npm start` binds to `0.0.0.0` and uses `PORT` when it is set (Render sets this), otherwise port 4317.

## Forms

Quote, tracking, driver application, and contact forms post to `POST /api/inquiries`.

Each submission is handled in this order:

1. Saved as JSON under `data/submissions/` (or `SUBMISSIONS_DIR` if you set it).
2. Emailed to `FORM_TO_EMAIL` (default `info@rdrunnerusa.com`) when SMTP is configured.
3. If SMTP is not set, emailed through [Resend](https://resend.com) when `RESEND_API_KEY` is set.
4. Posted to `FORM_WEBHOOK_URL` when that is set.

Copy [`.env.example`](.env.example) to `.env.local` and fill in the channel you want.

Without SMTP, Resend, or a webhook, the site still accepts the form and stores the JSON file. That file is the record. On Render the filesystem is wiped on every deploy and restart, so production needs email, a webhook, or a [persistent disk](https://render.com/docs/disks) mounted at `SUBMISSIONS_DIR`. Do not commit files in `data/submissions/`; they can contain personal information.

Resend’s onboarding sender only delivers to the Resend account owner until the `rdrunnerusa.com` domain is verified. Set `RESEND_FROM` to an address on that domain after verification.

## Deploy on Render

`render.yaml` describes a Node web service.

1. Push this repo to GitHub or GitLab.
2. In the Render dashboard, create a Blueprint from `render.yaml`, or create a Web Service manually:
   - Runtime: Node
   - Build command: `npm ci && npm run build`
   - Start command: `npm start`
3. Set `NEXT_PUBLIC_SITE_URL` to the public `https://` origin.
4. Set SMTP or Resend variables from `.env.example` so form mail reaches `info@rdrunnerusa.com`.

The server listens on `0.0.0.0:$PORT`.

## Photos

Homepage and interior photography is hotlinked from Pexels and Unsplash. Those pictures are stock. They are not this company’s trucks, office, or staff.

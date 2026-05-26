# Python Learning Roadmap

A beginner-friendly full-stack learning app for Python. It uses Next.js App Router, TypeScript, Tailwind CSS, Supabase Auth/Postgres, CodeMirror, and Pyodide for browser-only Python execution.

Python code is never sent to a backend. Pyodide runs it in the browser, which keeps the app suitable for Vercel Hobby and Supabase Free for a small personal learning setup.

## Features

- Landing page with login and start-learning actions
- Supabase login, signup, logout, and protected dashboard routes
- 30-day Python roadmap with 3 exercises per day
- Dashboard metrics, day cards, completion badges, and progress bars
- Day detail page with objectives, time estimate, and exercises
- Exercise page with problem statement, hints, CodeMirror editor, run/reset/save/complete actions, and output panel
- Supabase `user_progress` tracking for code, output, completion status, and update time

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/).
2. Create a new project.
3. Open **Project Settings > API**.
4. Copy:
   - Project URL
   - `anon` public key

Do not use the service role key in this app.

## 2. Run SQL Schema

1. In Supabase, open **SQL Editor**.
2. Paste and run [supabase/schema.sql](./supabase/schema.sql).
3. Paste and run [supabase/seed.sql](./supabase/seed.sql).

The schema enables Row Level Security. Authenticated users can read roadmap content, and users can only read or write their own progress rows.

## 3. Add Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SPECIAL_USER_EMAIL=target_user_email@example.com
SPECIAL_WELCOME_IMAGE=/special/welcome.png
SPECIAL_CERTIFICATE_IMAGE=/special/certificate.png
SPECIAL_CHATBOT_MESSAGES=Thale nindh|Moka Taka Odka|Keep practicing|Finish today's task
```

The same variables must be added in Vercel during deployment.

Optional special-user experience:

- `SPECIAL_USER_EMAIL` controls which logged-in user sees the custom popup, certificate modal, confetti, and chatbot.
- Put your welcome image at `public/special/welcome.png`.
- Put your certificate image at `public/special/certificate.png`.
- Use `SPECIAL_CHATBOT_MESSAGES` with replies separated by `|`.

## 4. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If email confirmation is enabled in Supabase Auth, confirm the account before logging in. For a private 2-user app, you can also adjust Supabase Auth settings to match your preferred signup flow.

## 5. Deploy to Vercel

1. Push this project to GitHub.
2. Go to [Vercel](https://vercel.com/).
3. Import the GitHub repository.
4. Add these environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy.

## Free-Tier Notes

- Python runs in the browser with Pyodide.
- Vercel only serves the Next.js app.
- Supabase stores authentication, roadmap data, and small progress rows.
- No file uploads, server-side Python execution, paid APIs, or Supabase service key are used.

## Project Structure

```text
app/
  login/
  signup/
  dashboard/
  dashboard/day/[id]/
  dashboard/day/[dayId]/exercise/[exerciseId]/
components/
  Navbar.tsx
  Sidebar.tsx
  RoadmapCard.tsx
  ExerciseCard.tsx
  CodeEditor.tsx
  OutputPanel.tsx
  ProgressBar.tsx
lib/
  supabaseClient.ts
  supabaseServer.ts
  pyodideRunner.ts
  roadmap.ts
supabase/
  schema.sql
  seed.sql
types/
  database.ts
```

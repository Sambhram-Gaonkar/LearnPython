# Project Context for Codex

This repository is a beginner-friendly Python learning app. It is built as a full-stack Next.js App Router project with TypeScript, Tailwind CSS, Supabase Auth/Postgres, CodeMirror, and Pyodide.

The main product goal is to let a learner sign in, follow a 30-day Python roadmap, read lesson guidance, solve exercises in a browser code editor, run Python code client-side, and save completion progress to Supabase.

## Current Feature Set

- Public landing page with login, signup, and start-learning calls to action.
- Supabase email/password authentication with server actions for login, signup, and logout.
- Protected dashboard routes. Unauthenticated users are redirected to `/login`.
- Dashboard summary with welcome message, roadmap metrics, overall progress, and next-exercise navigation.
- 30-day Python roadmap stored in Supabase tables and seeded from `supabase/seed.sql`.
- Three exercises per day, each with title, problem statement, starter code, expected output, difficulty, and hints.
- Day detail pages with lesson intro, objectives, examples, estimated time, and exercise cards.
- Exercise workspace with CodeMirror Python editor, output panel, run/reset/save/complete actions, and saved code restoration.
- Browser-only Python execution through Pyodide. Python code is not sent to a backend.
- Supabase `user_progress` rows track each user's code, output, completion status, and update timestamp.
- Optional special-user experience controlled by env vars: account-specific welcome modal, completion certificate modal, confetti, and a small chatbot with fixed replies.

## Important Files

- `app/page.tsx`: public landing page.
- `app/auth/actions.ts`: server actions for login, signup, and logout.
- `app/login/page.tsx` and `app/signup/page.tsx`: auth screens.
- `proxy.ts`: middleware-style route protection and Supabase session refresh.
- `app/dashboard/page.tsx`: protected dashboard, roadmap metrics, progress, and next exercise.
- `app/dashboard/day/[id]/page.tsx`: day detail and lesson page.
- `app/dashboard/day/[dayId]/exercise/[exerciseId]/page.tsx`: server wrapper for the exercise workspace.
- `app/dashboard/day/[dayId]/exercise/[exerciseId]/ExerciseWorkspace.tsx`: client-side editor, Pyodide run, save, and completion logic.
- `components/CodeEditor.tsx`: CodeMirror Python editor.
- `components/OutputPanel.tsx`: code output display.
- `components/RoadmapCard.tsx` and `components/ExerciseCard.tsx`: roadmap UI cards.
- `components/SpecialUserExperience.tsx`: special-user welcome, certificate, confetti, and chatbot UI.
- `lib/supabaseClient.ts`: browser Supabase client.
- `lib/supabaseServer.ts`: server Supabase client.
- `lib/pyodideRunner.ts`: lazy-loads Pyodide from CDN and runs Python in the browser.
- `lib/roadmap.ts`: progress summary helpers.
- `lib/lessons.ts`: hardcoded lesson content for early days and fallback lesson generation.
- `lib/specialUser.ts`: env-driven special-user config.
- `supabase/schema.sql`: Postgres tables, triggers, indexes, grants, and RLS policies.
- `supabase/seed.sql`: roadmap and exercise seed data.
- `types/database.ts`: TypeScript database row types.

## Data Model

Supabase tables:

- `profiles`: auth user profile mirror with `id`, `email`, `full_name`, and `created_at`.
- `roadmap_days`: 30 day roadmap records with day number, title, description, learning objectives, and estimated time.
- `exercises`: exercises linked to a roadmap day.
- `user_progress`: per-user exercise progress with saved code, output, completion flag, and `updated_at`.

Row Level Security is enabled. Authenticated users can read roadmap content and exercises. Users can only read, insert, and update their own progress rows. Do not add service-role-key usage to the app.

## Environment Variables

Required:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Optional special-user settings:

```bash
SPECIAL_USER_EMAIL=target_user_email@example.com
SPECIAL_WELCOME_TITLE=Welcome to your Python roadmap
SPECIAL_WELCOME_MESSAGE=This message is shown only for your account.
SPECIAL_WELCOME_IMAGE=/special/welcome.png
SPECIAL_COMPLETION_TITLE=Congratulations
SPECIAL_COMPLETION_MESSAGE=You completed the Python Learning Roadmap.
SPECIAL_CERTIFICATE_IMAGE=/special/certificate.png
SPECIAL_CHATBOT_MESSAGES=Thale nindh|Moka Taka Odka|Keep practicing|Finish today's task
```

Special images should live under `public/special/`.

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local` with Supabase URL and anon key.

3. In Supabase SQL Editor, run:

   ```text
   supabase/schema.sql
   supabase/seed.sql
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

## Implementation Notes

- Keep Python execution client-side through Pyodide unless the user explicitly asks for backend execution.
- Keep Supabase access limited to the anon key plus RLS policies. Never expose or require a service role key in frontend/runtime code.
- Use existing Tailwind design tokens from `tailwind.config.ts`: `ink`, `paper`, `mint`, `coral`, and `steel`.
- Prefer existing helper modules before adding new abstractions.
- Preserve the 30-day roadmap flow and progress model unless the task is specifically to change it.
- When changing Supabase schema or seed data, update both SQL files and TypeScript types if row shapes change.
- When editing routes with bracketed folder names in PowerShell, use `-LiteralPath` to avoid wildcard interpretation.
- Existing uncommitted changes may be user work. Do not revert files unless the user explicitly asks.

## Verification Checklist

Use the checks that match the change:

- `npm run build` for production build and TypeScript validation.
- `npm run dev` plus browser testing for UI or flow changes.
- Manual auth test: signup/login/logout and dashboard redirect behavior.
- Manual exercise test: open an exercise, run Python, save progress, mark complete, and verify dashboard progress updates.
- Manual special-user test only when `SPECIAL_USER_EMAIL` and image env vars are configured.

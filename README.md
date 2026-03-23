# FindIt – Campus Lost & Found Tracker

A web application for college campuses that helps students report lost items, post found items, and safely connect to return property to its owner.

## Live URL

**https://cst-8319-find-it.vercel.app**

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Auth:** Firebase Authentication (Google Sign-In)
- **Database:** Cloud Firestore
- **Storage:** Firebase Storage (item photos)
- **Hosting:** Vercel (auto-deploys from GitHub on every push to `main`)

## Project Structure

```
CST8319_FIND_IT/
├── public/                         Static assets
├── src/
│   ├── auth/                       Auth utilities
│   │   └── googleSignIn.ts           Google Sign-In + logout helpers
│   ├── components/                 Reusable components
│   │   ├── ui/                       Design system (Button, Badge, Card, Input, etc.)
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── index.ts              Barrel export
│   │   ├── Navbar.tsx                Top nav with bell badge + admin link
│   │   ├── PostCard.tsx              Card for post listings on the feed
│   │   └── ProtectedRoute.tsx        Auth guard for protected routes
│   ├── contexts/
│   │   └── AuthContext.tsx            Auth state + user role provider
│   ├── hooks/
│   │   └── usePendingClaimCount.ts   Pending claim count for bell badge
│   ├── pages/
│   │   ├── Home.tsx                  Browse feed with search & filter
│   │   ├── Login.tsx                 Google Sign-In page
│   │   ├── CreatePost.tsx            Create a lost/found listing
│   │   ├── PostDetail.tsx            View post, claim, report
│   │   ├── EditPost.tsx              Edit own listing
│   │   ├── MyActivity.tsx            View own posts + pending claims
│   │   └── AdminDashboard.tsx        Admin moderation panel
│   ├── types.ts                    TypeScript interfaces (User, Post, Claim, Flag)
│   ├── firebase.ts                 Firebase init (reads env vars)
│   ├── App.tsx                     Root component with routing
│   ├── main.tsx                    Entry point
│   └── index.css                   Tailwind import + custom theme
├── firestore.rules                 Firestore security rules
├── storage.rules                   Storage security rules
├── firebase.json                   Firebase CLI config
├── .firebaserc                     Firebase project alias
├── .env.local.example              Template for environment variables
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Setup (for team members)

1. Clone the repo:
   ```bash
   git clone https://github.com/vickypede/CST8319_FIND_IT.git
   cd CST8319_FIND_IT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` from the example and fill in Firebase config values:
   ```bash
   cp .env.local.example .env.local
   ```
   The required variables are listed in `.env.local.example`. Get values from the Firebase Console under Project Settings → Your Apps → Web.

4. Run locally:
   ```bash
   npm run dev
   ```

5. Push to `main` to deploy via Vercel (auto-deploys on every push).

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

These are set in `.env.local` for local development and in the Vercel dashboard for production.

## Features Implemented (Demo 3)

- Google Sign-In authentication
- Create, edit, delete lost/found listings with photo upload
- Browse feed with type, category, and keyword filters
- Post detail view with full item information
- Claim workflow (submit, approve, deny — supports multiple claims)
- Flag/report posts for admin review
- Admin dashboard (hide posts, dismiss flags)
- Notification bell with pending claim count
- My Activity page for tracking own posts and claims
- Reusable UI component library
- Firestore security rules with privacy enforcement
- Responsive design with Tailwind CSS

## Team Members

1. Victor Onipede
2. Mursal Aden
3. Monther Tuwati
4. Ayub Ali
5. Tarek Mohammed

## Course

CST8319 – Software Development Project (Algonquin College)
Instructor: Moe Osman

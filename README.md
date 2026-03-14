# Fruitlly Website

Fruitlly is a full-stack product website for Tulsi Foods with:

- A public marketing/catalog frontend (React + Vite)
- A hidden admin panel (`/fruitllyadminpanel`) backed by Firebase Auth
- Firestore + Storage powered product management
- A backend contact API (Express) deployed as a Firebase Cloud Function

## Project Architecture

- `frontend/`: React app, public pages, admin panel, Firebase client integration
- `backend/`: Express app for contact form handling and email sending
- `firebase.json`: Hosting rewrites, Functions source, Firestore/Storage rules
- `firestore.rules` + `storage.rules`: Access control
- `firestore.indexes.json`: Collection group index for product listing

## Tech Stack

- Frontend: React 19, TypeScript, Vite 6, Tailwind CSS v4
- Backend: Node.js, Express, Nodemailer
- Firebase: Hosting, Cloud Functions (2nd gen), Firestore, Storage, Auth

## Data Model (Current)

### Firestore

- Categories: `products/{categoryId}`
- Product items: `products/{categoryId}/items/{productId}`
- Public listing uses a collection group query on `items`

Typical product document fields:

- `title`
- `shortDescription`
- `imageUrl`
- `imagePath`
- `moqs` (array of MOQ options)
- Sorting metadata: `categorySortName`, `productSortName`

### Storage

- Product assets path: `products/{categoryId}/{productId}/...`

## Local Development Setup

## 1. Prerequisites

- Node.js 20+ (Node 22 recommended)
- npm
- Firebase project already created (for Auth/Firestore/Storage usage)

## 2. Install Dependencies

From the repository root:

```powershell
cd frontend
npm install
cd ..\backend
npm install
cd ..
```

## 3. Configure Environment Variables

### Frontend env

Create `frontend/.env` from `frontend/.env.example` and set values:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Backend env

Create `backend/.env` from `backend/.env.example`:

```env
FRONTEND_ORIGIN=http://localhost:5173

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SMTP_FROM="Fruitlly Website <no-reply@fruitlly.com>"
CONTACT_RECEIVER_EMAIL=sales@fruitlly.com
```

## 4. Run Locally

Use two terminals.

Terminal 1 (backend):

```powershell
cd backend
npm run dev
```

Terminal 2 (frontend):

```powershell
cd frontend
npm run dev
```

Open `http://localhost:5173`.

## Hidden Admin Panel

- Route: `/fruitllyadminpanel`
- Access control: Firebase Auth email/password sign-in
- Any signed-in Firebase Auth user can access admin features (based on current rules)

## Backend API

- Health check: `GET /health`
- Contact form: `POST /api/contact`

Required payload fields:

- `companyName`
- `contactPerson`
- `phoneNumber`
- `emailAddress`
- `city`
- `state`
- `pinCode`
- `message`

## Deployment Instructions (Firebase)

This repository is configured for:

- Frontend static hosting from `frontend/dist`
- Backend Express app as Cloud Function `api` (region: `asia-south1`)
- Hosting rewrite: `/api/**` -> function `api`

## 1. Install and Login Firebase CLI

```powershell
npm install -g firebase-tools
firebase login
```

## 2. Select Firebase Project

From repo root:

```powershell
firebase use <your-project-id>
```

## 3. Set Production Environment Variables

### Frontend production env (`frontend/.env`)

Set `VITE_BACKEND_URL` to your production site origin so contact requests go through Hosting rewrite:

```env
VITE_BACKEND_URL=https://<your-hosting-domain>
```

Keep all `VITE_FIREBASE_*` values pointed to your production Firebase project.

### Backend production env (`backend/.env`)

Set:

- `FRONTEND_ORIGIN=https://<your-hosting-domain>`
- SMTP and receiver values for production email delivery

## 4. Build Frontend

```powershell
cd frontend
npm run build
cd ..
```

## 5. Deploy

Deploy everything (hosting, function, rules, indexes):

```powershell
firebase deploy
```

Or deploy selectively:

```powershell
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules,firestore:indexes,storage
```

## 6. Post-Deploy Checks

- Open your hosting URL and verify page navigation
- Submit a contact inquiry and confirm email delivery
- Login at `/fruitllyadminpanel` and verify product CRUD + image upload
- Confirm product listing/details render correctly from Firestore

## Common Troubleshooting

- CORS errors on contact API:
	- Ensure `FRONTEND_ORIGIN` exactly matches your frontend origin
- Contact form fails with server message about missing mail config:
	- Verify all SMTP and receiver env vars in `backend/.env`
- Firebase initialization error in frontend:
	- One or more `VITE_FIREBASE_*` keys are missing
- Product list not sorting as expected:
	- Ensure Firestore index from `firestore.indexes.json` is deployed

## Useful Commands

```powershell
# Frontend
cd frontend
npm run dev
npm run build
npm run lint

# Backend
cd backend
npm run dev
npm start
```

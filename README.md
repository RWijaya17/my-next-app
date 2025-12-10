# 🧩 Tab Generator App

Christoffer Raffaelo Wijaya
Student Number: 22586495

📹 Video: how-to-use.mp4 – demonstrates how to use the website.

A simple and elegant **Next.js + React + TailwindCSS** web application that lets users create and manage multiple tabs, then generate clean and reusable **HTML + JavaScript** code.  
Includes an **About page** with author details and a short instructional video.

---

## ✨ Features

- 🧱 **Dynamic Tabs** – Add, rename, or remove up to 15 tabs  
- ⚙️ **Code Generator** – Exports ready-to-use HTML & JavaScript code  
- 📋 **Copy & Download** – Quickly copy to clipboard or download as `.html`  
- 🌈 **Modern UI** – Gradient background, rounded edges, hover animations  
- 🌓 **Auto Dark Mode** – Detects system theme preference  
- 🎥 **About Page** – Includes a video guide and personal information  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js (React)** | Core framework |
| **TypeScript** | Type-safe logic |
| **TailwindCSS** | Styling and responsiveness |
| **HTML5 / CSS3** | Generated tab structure |
| **JavaScript (ES6)** | Client-side functionality |

---

## 📁 Project Structure

# Use official Node image
FROM node:20-alpine

# App directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
Make sure package.json has:

json
Copy code
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
Then you can run:

bash
Copy code
docker build -t my-next-escape-room .
docker run -p 3000:3000 my-next-escape-room
✅ “App runs in a Docker container” → Maximum score 3.

2.4 Instrumentation + Tests + Lighthouse
You won’t run Playwright/Lighthouse inside Next.js, but you can structure it:

a) Simple instrumentation
Add a tiny “event logging” API:

src/app/api/events/route.ts

ts
Copy code
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  console.log('Instrumentation event:', body) // In real world, send to DB or telemetry
  return NextResponse.json({ ok: true })
}
And in escape-room/page.tsx, inside generateOptions and when selecting an option, you could fetch('/api/events', { method: 'POST', body: JSON.stringify({...}) }) to show “instrumented app”.

b) Playwright example (two tests)
Create playwright.config.ts and a simple test like:

tests/escape-room.spec.ts

ts
Copy code
import { test, expect } from '@playwright/test'

test('escape room page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/escape-room')
  await expect(page.getByText('Court Room ⚖️ or Escape Room 🔐')).toBeVisible()
})

test('can start timer and generate options', async ({ page }) => {
  await page.goto('http://localhost:3000/escape-room')
  await page.getByRole('button', { name: 'Start' }).click()
  await page.getByRole('button', { name: /Generate Options/ }).click()
  const optionButtons = page.getByRole('button', { name: /Difficulty:/ })
  await expect(optionButtons.first()).toBeVisible()
})
Then in your video:

Show npm run test:e2e (or whatever script).

Show Lighthouse report in Chrome DevTools.

Add voiceover or text overlays talking about feedback from family / friends / industry.

✅ That hits the “Instrument your app + Playwright + Lighthouse + feedback” section.

2.5 Deploy on Cloud + Lambda
If you deploy to:

Vercel / Netlify / AWS Amplify, your Next.js API routes already become serverless functions (Lambdas).

For the report, you can say:

/api/scenarios is deployed as a Lambda function on your chosen cloud.

Include a screenshot of your deployment dashboard.

✅ That hits “Deploy on the Cloud + Add Lambda function”.

3️⃣ Rubric → Implementation Mapping (for README.md)
You can paste this into README.md:

md

## Assignment Mapping

### 1. Court Room or Escape Room Game 

- **Create a Timer**  
  Implemented in `src/app/escape-room/page.tsx` with start, pause, and reset (60-second countdown).

- **Appropriate icons/buttons**  
  Uses emojis for quick visual feedback. Can be replaced with SVG icons exported from PowerPoint and placed in `/public/icons`.

- **Appropriate gameplay**  
  User chooses between **Court Room** or **Escape Room** mode, generates multiple strategy options, and selects one within the time limit.

- **Output is operational**  
  Fully functional interactive page at `/escape-room` with visible timer, options, and selection feedback.

- **Multiple options generation**  
  “🎲 Generate Options” button randomly selects up to 3 unique actions per mode.


---

### 2. Dockerize 

- `Dockerfile` in project root builds and runs the Next.js app.
- App can be run with:
  - `docker build -t my-next-escape-room .`
  - `docker run -p 3000:3000 my-next-escape-room`

---

### 3. APIs CRUD and Database (8 marks)

- **Database Schema**  
  - TypeScript schema in `src/lib/types.ts` (`Scenario` type).  
  - Optional SQL schema in `schema.sql`.

- **CRUD APIs**  
  - Implemented via Next.js route handlers in `src/app/api/scenarios/route.ts`:
    - `GET` → list all scenarios
    - `POST` → create scenario
    - `PUT` → update scenario
    - `DELETE` → delete scenario

---

### 4. Instrument Your App 
- **Instrumentation**  
  - `POST /api/events` endpoint logs user events (e.g., when options are generated or selected).

- **Playwright Tests**  
  - Example tests in `tests/escape-room.spec.ts`:
    - Page loads
    - Timer + generate options works

- **Lighthouse Report**  
  - Run Lighthouse in Chrome DevTools on `/escape-room` and include the report in the submission.



### 5. Deploy on Cloud & Lambda 

- Next.js app deployed on a cloud platform (e.g., Vercel).  
- `/api/scenarios` functions as a serverless/Lambda function on the platform.  
- Screenshots of deployment dashboard and live URL included in the report/video.


# 100th Day Baby Milestone Web App

A beautiful, responsive web app to celebrate your baby's 100th day with a skyblue and white theme. Visitors can leave wishes that are delivered to you via **Telegram** (no email/SMTP needed — just set up a bot in 1 minute).

## Features

- **Skyblue & white theme** — clean, modern, fully responsive design
- **Milestone timeline** — showcase key moments (Day 1, 30, 60, 100)
- **Photo gallery** — display memories from the first 100 days
- **Animated UI** — text bounce-in, nav slide-in, chat bubble effects, section scroll fades
- **Wishes wall** — visitors leave messages that:
  - Display instantly with chat bubble animation (local storage)
  - Delivered to your **Telegram** as messages
- **Spam protection** — rate limiting + input validation

## Quick Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- A Telegram account

### 1. Get Your Telegram Bot Token & Chat ID

1. **Create a bot**: Open Telegram → search for `@BotFather` → send `/newbot` → follow prompts → copy the **Bot Token**
2. **Get your Chat ID**: Open Telegram → search for `@userinfobot` → send `/start` → it will show your **Chat ID** (or use `@get_id_bot`)

### 2. Configure Environment

```bash
# Copy the example and fill in your values
cp .env.example .env
```

Edit `.env`:
```
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

### 3. Install & Run

```bash
npm install
npm run dev     # development (with nodemon)
npm start       # production
```

Open http://localhost:3000

### 4. Deploy

Deploy to any Node.js host (Vercel, Render, Heroku, etc.):

```bash
npm start
```

Make sure to set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` as environment variables on your hosting platform.

## Project Structure

```
.
├── index.html          # Main page (skyblue/white theme, responsive)
├── server.js           # Express backend (serves static + /api/wishes endpoint)
├── package.json        # Dependencies & scripts
├── .env.example        # Template for env vars
├── .env                # Your actual config (gitignored)
└── README.md           # This file
```

## Testing

Start the server and:
1. Open http://localhost:3000
2. Fill out the wish form in the **Wishes Wall** section
3. Check your Telegram — you'll receive the message as your bot

## Notes

- Wishes are stored in localStorage so visitors can see them instantly
- Chat bubble animation: messages appear with a slide-in effect
- Rate limited to 30 wishes per minute per IP to prevent spam
- Input validation: name max 100 chars, message max 1000 chars

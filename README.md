# Outbox FE

A Next.js application for managing and viewing user emails, featuring real-time updates via Socket.IO and UI built with TailwindCSS.

## Features

- Add, store, and verify user accounts using local storage and backend verification.
- Fetch mails for a user, with pagination and label-based filtering.
- Real-time updates: New mails are pushed via Socket.IO and instantly displayed.
- Search mails by keyword.
- Filter mails by predefined labels (e.g., Interested, Spam).
- Navigate through mails in pages of size 50.

## Architecture Details

- **Frontend:** Built with [Next.js](https://nextjs.org), and TailwindCSS for UI.
- **Real-Time Synchronization:** Socket.IO client

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Outbox BE](https://github.com/sudharshanr15/outbox-be.git)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sudharshanr15/outbox-fe.git
   cd outbox-fe/

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Copy the `.env.example` to `.env` file in the project root directory and add your configuration and credentials

   ```bash
   cp .env.example .env
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Back-end application**
    The back-end application is maintained on a separate repository. You can find the source code here:
    ```
    https://github.com/sudharshanr15/outbox-be.git
    ```
## Usage

- **Start the application (Production-mode)**

  ```bash
  npm start
  ```

- **Start the application (Development-mode)**

  ```bash
  npm run dev
  ```

## Scripts

- `npm start` — Start the production server
- `npm run dev` — Start in development mode
- `npm run build` — Build the TypeScript project
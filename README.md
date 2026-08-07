# DevOps Demo App

A simple full-stack demo project built for a DevOps teaching session. It demonstrates a two-tier deployment pattern: a **static frontend on S3** and a **Node.js backend on EC2**, deployed automatically via AWS CodePipeline → CodeBuild → CodeDeploy.

---

## Project Structure

```
demo-app/
├── backend/          # Node.js Express API
│   ├── server.js
│   └── package.json
├── frontend/         # Static site (deployed to S3)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── scripts/          # CodeDeploy lifecycle scripts
│   ├── install.sh
│   ├── start.sh
│   └── stop.sh
├── .env              # Local environment variables (never commit)
├── .env.example      # Template — safe to commit
├── .gitignore
├── buildspec.yml     # AWS CodeBuild instructions
├── appspec.yml       # AWS CodeDeploy instructions
└── README.md
```

---

## How Backend and Frontend Connect

- The **backend** exposes a REST API at `GET /api/message` (returns a greeting + timestamp) and `GET /api/health` (returns `{ status: "ok" }`).
- The **frontend** is a plain HTML/CSS/JS page. When the user clicks **Call API**, it uses `fetch()` to hit the backend URL directly.
- Because the frontend is on a different origin (S3) than the backend (EC2), the backend sets `Access-Control-Allow-Origin: *` to allow cross-origin requests.

---

## Deployment Overview

| Layer    | Where it runs | How it gets there              |
|----------|---------------|-------------------------------|
| Backend  | EC2 instance  | CodePipeline → CodeBuild → CodeDeploy |
| Frontend | S3 bucket     | Upload `frontend/` folder to an S3 static-website bucket |

### After backend deployment

1. Note the **EC2 public IP** from the AWS console.
2. Open `frontend/script.js` and replace `EC2-PUBLIC-IP` with the real IP:
   ```js
   const BACKEND_URL = 'http://YOUR-EC2-IP:3000';
   ```
3. Upload the updated `frontend/` folder to your S3 bucket.

---

## Running Locally

```bash
# Install dependencies
cd backend
npm install

# Copy env file
cp ../.env.example ../.env
# Edit .env and set PORT=3000

# Start server
npm start
```

Then open `frontend/index.html` in your browser and change `BACKEND_URL` in `script.js` to `http://localhost:3000`.

---

## Environment Variables

| Variable  | Description                    | Default |
|-----------|-------------------------------|---------|
| `PORT`    | Port the Express server binds to | `3000`  |
| `API_KEY` | Placeholder secret (not used in routes yet) | — |

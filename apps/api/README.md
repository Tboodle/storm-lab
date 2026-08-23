# StormLab API (FastAPI)

Boilerplate FastAPI backend, sitting next to the Next.js app with shared types
generated from OpenAPI.

## Layout

```
app/
├── main.py            # app, CORS, router mount
├── core/config.py     # settings (pydantic-settings, reads .env)
├── api/
│   ├── router.py      # aggregates routers under /api/v1
│   └── routes/        # health.py
└── schemas/           # Pydantic models == API contract == shared types
scripts/
└── export_openapi.py  # dump openapi.json for the frontend (no server needed)
```

## Run

```bash
cd apps/api
# Needs Python 3.11+ (see requires-python in pyproject.toml).
# Plain `python`/`python3` on macOS is 3.9, which this code will not run on.
python3.13 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

- Health: http://localhost:8000/api/v1/health
- Interactive docs: http://localhost:8000/docs
- OpenAPI schema: http://localhost:8000/openapi.json

## Shared types with Next.js

Install the codegen dep in `apps/ui`:

```bash
npm install -D openapi-typescript
```

Add a script to `apps/ui/package.json`:

```json
{
  "scripts": {
    "gen:api": "openapi-typescript http://localhost:8000/openapi.json -o lib/api/schema.d.ts"
  }
}
```

Or export the schema without running the server (useful in CI):

```bash
# in apps/api
python scripts/export_openapi.py ../ui/openapi.json
# in apps/ui
npx openapi-typescript openapi.json -o lib/api/schema.d.ts
```

Change a Pydantic field in `app/schemas/`, rerun `npm run gen:api`, and the new
shape shows up in the frontend types.

## Deploy notes

- Run behind multiple workers:
  `gunicorn app.main:app -k uvicorn.workers.UvicornWorker -w 4`
- Keep blocking work off the event loop (thread pool, or a task queue for long jobs).
- Add your production frontend origin to `CORS_ORIGINS` in `.env`.

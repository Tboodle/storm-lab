"""Dump the OpenAPI schema to a file without starting the server.

    python scripts/export_openapi.py ../ui/openapi.json
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.main import app  # noqa: E402


def main() -> None:
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("openapi.json")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(app.openapi(), indent=2))
    print(f"Wrote OpenAPI schema to {out}")


if __name__ == "__main__":
    main()

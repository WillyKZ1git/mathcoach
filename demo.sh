#!/bin/bash
# Lance un serveur local pour prévisualiser MathCoach

PORT=8080
DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "  MathCoach — Serveur de démo"
echo "  ============================="
echo "  Ouvre dans ton navigateur : http://localhost:$PORT"
echo "  Arrêter le serveur        : Ctrl+C"
echo ""

python3 -m http.server "$PORT" --directory "$DIR"

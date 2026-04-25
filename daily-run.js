name: Daily Social Media Posts

on:
  schedule:
    - cron: "0 9 * * *"
  workflow_dispatch:

jobs:
  post:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install deps
        run: npm install axios dotenv

      - name: Run Engine
        run: node daily-run.js
        env:
          MODE: daily

      - name: Run Social Poster
        run: node social-poster.js
        env:
          X_BEARER_TOKEN: ${{ secrets.X_BEARER_TOKEN }}
          DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}

      - name: Commit Output
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add .
          git commit -m "daily engine run" || echo "no changes"
          git push

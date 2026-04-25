name: Daily Social Media Posts

on:
  schedule:
    - cron: "0 9 * * *"  # This will run every day at 9 AM UTC
  workflow_dispatch:  # Allows you to trigger the workflow manually

jobs:
  post:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Checkout the repository to get access to your files
      - name: Checkout repository
        uses: actions/checkout@v4

      # Step 2: Set up Node.js environment (adjust the version as needed)
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      # Step 3: Install dependencies (if you have them, otherwise skip this step)
      - name: Install dependencies
        run: npm install

      # Step 4: Run your script to post content
      - name: Run Daily Posts
        run: node daily-run.js

      # Step 5: Commit changes (if your script produces output like new files or updates)
      - name: Commit changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add output/
          git commit -m "daily social posts" || echo "no changes"
          git push

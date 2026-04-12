import os

# 1. Create Folder Structure
folders = ['.github/workflows', 'sites']
for folder in folders:
    os.makedirs(folder, exist_ok=True)

# 2. Define File Content
files = {
    "requirements.txt": "pandas",
    
    "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://brightlane.github.io/sitemap.xml",
    
    "keywords.csv": "keyword,status,date_launched\ncustom organic hoodie,pending,\nvintage style mug,pending,",
    
    ".github/workflows/daily_rollout.yml": """name: Daily SEO CSV Rollout
on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.9'
      - run: pip install pandas
      - run: python generator.py
      - run: |
          git config --global user.name "GitHub Action"
          git config --global user.email "action@github.com"
          git add .
          git commit -m "Automated SEO Rollout" || exit 0
          git push""",

    "404.html": '<!DOCTYPE html><html><head><meta http-equiv="refresh" content="2;url=https://try.printify.com/r3xsnwqufe8t"></head><body><h1>Redirecting to our best-sellers...</h1></body></html>',

    "legal.html": """<!DOCTYPE html><html><head><title>Legal & Compliance</title>
    <style>body{font-family:sans-serif;padding:50px;text-align:center;} #exit{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);color:white;padding-top:200px;}</style></head>
    <body><h1>Privacy & Terms</h1><p>Affiliate Disclosure: Earns from clicks.</p>
    <div id="exit"><h2>Wait! Don't Miss the 2026 Collection</h2><a href="https://try.printify.com/r3xsnwqufe8t" style="color:#00e676">SHOP NOW</a></div>
    <script>document.addEventListener('mouseleave', (e) => { if(e.clientY < 0) document.getElementById('exit').style.display='block'; });</script></body></html>""",

    "blog.html": """<!DOCTYPE html><html><head><title>Global Design Blog</title></head><body><h1>Latest International Designs</h1><div id="list"></div>
    <script>fetch('/sitemap.xml').then(res=>res.text()).then(xml=>{const doc=new DOMParser().parseFromString(xml,"text/xml");doc.querySelectorAll("loc").forEach(loc=>{if(loc.textContent.includes('/sites/')){const a=document.createElement('a');a.href=loc.textContent;a.innerText=loc.textContent.split('/').pop();document.getElementById('list').appendChild(a);document.getElementById('list').appendChild(document.createElement('br'));}});});</script></body></html>""",

    "index.html": """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Brightlane Custom | Global 2026</title>
    <link rel="alternate" hreflang="x-default" href="https://brightlane.github.io/" />
    <style>body{font-family:sans-serif;margin:0;text-align:center;} header{padding:100px;background:#00e676;color:white;} .btn{background:#000;color:#fff;padding:20px 40px;text-decoration:none;border-radius:50px;}</style></head>
    <body><header><h1>Brightlane Global</h1><p>Premium Custom Gear</p><a href="https://try.printify.com/r3xsnwqufe8t" class="btn">EXPLORE CATALOG</a></header>
    <div style="padding:50px;"><a href="/blog.html">International Drops</a> | <a href="/legal.html">Compliance</a></div></body></html>""",

    "README.md": "# 🚀 Brightlane Perpetual SEO Engine\nFully automated Printify affiliate machine.",

    "generator.py": """import pandas as pd
import os, datetime, random

AFFILIATE_URL = "https://try.printify.com/r3xsnwqufe8t"
HOST = "brightlane.github.io"
LANGS = {"en": "Custom", "es": "Personalizado", "de": "Individuelle"}

def run_engine():
    df = pd.read_csv('keywords.csv') if os.path.exists('keywords.csv') else pd.DataFrame(columns=['keyword', 'status', 'date_launched'])
    batch = df[df['status'] == 'pending'].head(10)
    for index, row in batch.iterrows():
        kw = row['keyword']
        lang = random.choice(list(LANGS.keys()))
        slug = f"{lang}-{str(kw).replace(' ', '-').lower()}"
        os.makedirs(f"sites/{slug}", exist_ok=True)
        with open(f"sites/{slug}/index.html", "w") as f:
            f.write(f'<!DOCTYPE html><html lang="{lang}"><head><meta charset="UTF-8"><title>{LANGS[lang]} {kw}</title></head><body><h1>{kw}</h1><a href="{AFFILIATE_URL}">Buy Now</a></body></html>')
        df.at[index, 'status'] = 'completed'
    df.to_csv('keywords.csv', index=False)
    
    # Simple Sitemap Gen
    now = datetime.date.today().isoformat()
    xml = ['<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    xml.append(f'<url><loc>https://{HOST}/</loc><lastmod>{now}</lastmod></url>')
    for s in os.listdir('sites'):
        xml.append(f'<url><loc>https://{HOST}/sites/{s}/</loc><lastmod>{now}</lastmod></url>')
    xml.append('</urlset>')
    with open('sitemap.xml', 'w') as f: f.write('\\n'.join(xml))

if __name__ == "__main__":
    run_engine()"""
}

# 3. Write all files to disk
for path, content in files.items():
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("✅ DONE! All 10 files created. Delete super_setup.py and push to GitHub.")

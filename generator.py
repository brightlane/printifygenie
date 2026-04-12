import pandas as pd
import os, datetime

def run_engine():
    if not os.path.exists('keywords.csv'):
        return
    df = pd.read_csv('keywords.csv')
    batch = df[df['status'] == 'pending'].head(10)
    
    if batch.empty:
        print("No pending keywords. Engine idle.")
        return

    for index, row in batch.iterrows():
        kw = row['keyword']
        slug = str(kw).replace(" ", "-").lower()
        os.makedirs(f"sites/{slug}", exist_ok=True)
        
        # Optimized Landing Page
        html = f"""<!DOCTYPE html><html><head><title>{kw}</title>
        <style>body{{font-family:sans-serif;text-align:center;padding:50px;}}
        .btn{{background:#00e676;color:white;padding:15px 30px;text-decoration:none;border-radius:50px;}}</style></head>
        <body><h1>{kw}</h1><p>Premium 2026 Collection</p><br>
        <a href='https://try.printify.com/r3xsnwqufe8t' class='btn'>SHOP NOW</a></body></html>"""
        
        with open(f"sites/{slug}/index.html", "w") as f:
            f.write(html)
            
        df.at[index, 'status'] = 'completed'
        df.at[index, 'date_launched'] = datetime.date.today().isoformat()

    df.to_csv('keywords.csv', index=False)
    print(f"Success: Processed {len(batch)} keywords.")

if __name__ == "__main__":
    run_engine()

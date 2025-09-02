import requests
import os

# 追加の画像をダウンロード
additional_images = {
    'team3.jpg': 'https://images.unsplash.com/photo-1494790108755-2616b1e4938d?w=400&h=400&fit=crop&crop=face',
    'company-strength.jpg': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop',
    'company-quality.jpg': 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop',
    'company-support.jpg': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
}

for filename, url in additional_images.items():
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(f'images/{filename}', 'wb') as f:
                f.write(response.content)
            print(f'Downloaded: {filename}')
        else:
            print(f'Failed to download: {filename}')
    except Exception as e:
        print(f'Error downloading {filename}: {e}')

print('Additional image download complete!')
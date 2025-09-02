import requests
import os

# Create images directory
os.makedirs('images', exist_ok=True)

# Free stock image URLs (CC0 license)
images = {
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&crop=center',
    'team1.jpg': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    'team2.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'team3.jpg': 'https://images.unsplash.com/photo-1494790108755-2616b1e4938d?w=400&h=400&fit=crop&crop=face',
    'team4.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'team5.jpg': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    'team6.jpg': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    'office1.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'office2.jpg': 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    'office3.jpg': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop',
    'work1.jpg': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
    'work2.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    'work3.jpg': 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop'
}

for filename, url in images.items():
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

print('Image download complete!')
from PIL import Image, ImageDraw
import os

# Create basic solid color/gradient placeholders for testing parallax while waiting for real assets

def generate_sky():
    img = Image.new('RGB', (800, 400), color=(135, 206, 235))
    draw = ImageDraw.Draw(img)
    # Add clouds
    draw.ellipse((100, 50, 200, 100), fill=(255, 255, 255))
    draw.ellipse((150, 40, 250, 90), fill=(255, 255, 255))
    draw.ellipse((500, 80, 600, 130), fill=(255, 255, 255))
    img.save('../public/assets/sky.png')

def generate_mountains():
    img = Image.new('RGBA', (800, 200), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.polygon([(0, 200), (200, 50), (400, 200)], fill=(95, 158, 160))
    draw.polygon([(300, 200), (500, 100), (700, 200)], fill=(70, 130, 180))
    draw.polygon([(600, 200), (800, 80), (1000, 200)], fill=(95, 158, 160))
    img.save('../public/assets/mountains.png')

def generate_trees():
    img = Image.new('RGBA', (800, 100), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    for i in range(0, 800, 80):
        draw.polygon([(i, 100), (i+40, 0), (i+80, 100)], fill=(46, 139, 87))
    img.save('../public/assets/trees.png')

def generate_horse():
    img = Image.new('RGBA', (60, 60), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    # Body
    draw.rectangle([0, 10, 50, 40], fill=(139, 69, 19))
    # Head
    draw.rectangle([40, 0, 60, 20], fill=(139, 69, 19))
    # Legs
    draw.rectangle([5, 40, 15, 60], fill=(92, 64, 51))
    draw.rectangle([35, 40, 45, 60], fill=(92, 64, 51))
    img.save('../public/assets/horse.png')

def generate_fence():
    img = Image.new('RGBA', (30, 50), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rectangle([5, 0, 15, 50], fill=(160, 82, 45))
    draw.rectangle([20, 0, 30, 50], fill=(160, 82, 45))
    draw.rectangle([0, 10, 35, 20], fill=(139, 69, 19))
    draw.rectangle([0, 30, 35, 40], fill=(139, 69, 19))
    img.save('../public/assets/fence.png')

def generate_bird():
    img = Image.new('RGBA', (40, 30), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse([0, 10, 30, 25], fill=(220, 20, 60))
    draw.polygon([(30, 15), (40, 10), (30, 20)], fill=(255, 215, 0)) # Beak
    draw.polygon([(10, 10), (15, 0), (20, 10)], fill=(178, 34, 34)) # Wing
    img.save('../public/assets/bird.png')

os.makedirs('../public/assets', exist_ok=True)
generate_sky()
generate_mountains()
generate_trees()
generate_horse()
generate_fence()
generate_bird()
print("Placeholder Assets Generated!")

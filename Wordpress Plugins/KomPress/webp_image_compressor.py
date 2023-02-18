import os
import subprocess
import requests
from io import BytesIO
from PIL import Image


def compress_image(file_path, quality=80):
    with Image.open(file_path) as img:
        output_buffer = BytesIO()
        img.save(output_buffer, format='WebP', quality=quality)
        output_buffer.seek(0)
        return output_buffer.read()


def compress_all_images(quality=80):
    for foldername, subfolders, filenames in os.walk('./wp-content/uploads'):
        for filename in filenames:
            if filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.png'):
                file_path = os.path.join(foldername, filename)
                webp_path = os.path.splitext(file_path)[0] + '.webp'
                if os.path.isfile(webp_path):
                    continue
                image_bytes = compress_image(file_path, quality=quality)
                with open(webp_path, 'wb') as f:
                    f.write(image_bytes)

import fitz # PyMuPDF
import os
import sys

pdf_path = r"C:\Users\SUPRIYA\.gemini\antigravity\brain\32244609-27a0-4f38-8b7a-0a2c9c405b09\.user_uploaded\media_1794843510732_55199a68.pdf"
output_dir = r"c:\Users\SUPRIYA\Desktop\saree\public\assets"
os.makedirs(output_dir, exist_ok=True)
pages_dir = os.path.join(output_dir, "pages")
images_dir = os.path.join(output_dir, "extracted")
os.makedirs(pages_dir, exist_ok=True)
os.makedirs(images_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages in PDF: {len(doc)}")

# Render each page to 2x resolution image
for page_num in range(len(doc)):
    page = doc[page_num]
    # 2x zoom for high retina quality
    zoom = 2.0
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, alpha=False)
    page_img_path = os.path.join(pages_dir, f"page_{page_num + 1}.png")
    pix.save(page_img_path)
    print(f"Saved page {page_num + 1} -> {page_img_path} ({pix.width}x{pix.height})")

# Also extract embedded images
img_count = 0
for page_num in range(len(doc)):
    page = doc[page_num]
    image_list = page.get_images(full=True)
    print(f"Page {page_num + 1} has {len(image_list)} embedded images")
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        img_filename = f"p{page_num + 1}_img{img_idx + 1}_{xref}.{image_ext}"
        img_out_path = os.path.join(images_dir, img_filename)
        with open(img_out_path, "wb") as f:
            f.write(image_bytes)
        img_count += 1
        print(f"  Extracted image {img_filename} ({base_image.get('width')}x{base_image.get('height')})")

print(f"\nDone! Extracted {len(doc)} pages and {img_count} raw images into {output_dir}")

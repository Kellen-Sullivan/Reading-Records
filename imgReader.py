import pytesseract
from PIL import Image
import re

# Optional: Set Tesseract path manually if not on PATH
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def extract_book_data(image_path):
    # Load image
    image = Image.open(image_path)

    # Use OCR to get text
    text = pytesseract.image_to_string(image)

    print("OCR Result:\n", text)

    # Extract fields using regex
    title_match = re.search(r'Title[:\-]?\s*(.+)', text, re.IGNORECASE)
    author_match = re.search(r'Author[:\-]?\s*(.+)', text, re.IGNORECASE)
    words_match = re.search(r'Words[:\-]?\s*(\d+)', text, re.IGNORECASE)

    title = title_match.group(1).strip() if title_match else None
    author = author_match.group(1).strip() if author_match else None
    words = int(words_match.group(1)) if words_match else None

    return {
        "title": title,
        "author": author,
        "words": words
    }

# Example usage
image_path = r"C:\Users\kelle\OneDrive\Pictures\Screenshots\Screenshot 2025-04-19 104533.png"
book_data = extract_book_data(image_path)
print("Extracted:", book_data)

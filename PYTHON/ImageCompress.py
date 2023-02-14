import os
import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from tkinter import messagebox
import customtkinter
from PIL import Image

customtkinter.set_appearance_mode("System")  # Modes: system (default), light, dark
customtkinter.set_default_color_theme("blue")

def compress_image(input_image_path, output_image_path, quality, resize):
    original_image = Image.open(input_image_path)
    if resize:
        width, height = original_image.size
        new_width, new_height = (int(width * resize), int(height * resize))
        original_image = original_image.resize((new_width, new_height), Image.ANTIALIAS)
    original_image.save(output_image_path, "webp", quality=quality)

def compress_images():
    quality = int(quality_scale.get())
    resize = float(resize_scale.get())
    input_folder = input_folder_entry.get()
    output_folder = filedialog.askdirectory(initialdir=os.getcwd(), title="Select Output Folder")
    total_size_reduction = 0
    for filename in os.listdir(input_folder):
        input_path = os.path.join(input_folder, filename)
        if os.path.isfile(input_path):
            input_extension = os.path.splitext(input_path)[1].lower()
            if input_extension in [".jpeg", ".jpg", ".png"]:
                output_path = os.path.join(output_folder, os.path.splitext(filename)[0] + ".webp")
                input_size = os.path.getsize(input_path)
                compress_image(input_path, output_path, quality, resize)
                output_size = os.path.getsize(output_path)
                total_size_reduction += input_size - output_size
            else:
                messagebox.showerror("Error", f"File type not supported: {input_extension}")
    messagebox.showinfo("Info", f"Total size reduction: {total_size_reduction / 1024} KB")

def open_folder():
    input_folder = filedialog.askdirectory(initialdir=os.getcwd(), title="Select Input Folder")
    input_folder_entry.delete(0, tk.END)
    input_folder_entry.insert(0, input_folder)




root = tk.Tk()
root.title("Image Compression")
root.geometry("300x400")



label = customtkinter.CTkLabel(root, text="K o m P r e s s", font=("Ariel", 25, 'bold'), text_color="black")
label.pack(pady=10)

separator = ttk.Separator(root, orient='horizontal')
separator.pack(fill='x', pady=10)

quality_scale = tk.Scale(root, from_=0, to=100, orient="horizontal",)
quality_scale.set(80)
quality_scale.pack()

quality_label = tk.Label(root, text="Quality", font=("Ariel", 12, 'bold'))
quality_label.pack()


resize_scale = tk.Scale(root, from_=0.1, to=1, resolution=0.1, orient="horizontal")
resize_scale.set(1)
resize_scale.pack()

resize_label = tk.Label(root, text="Scale",font=("Ariel", 12, 'bold'))
resize_label.pack()

separator = ttk.Separator(root, orient='horizontal')
separator.pack(fill='x', pady=10)


input_folder_entry = customtkinter.CTkEntry(root,width=500)
input_folder_entry.pack()

input_folder_label = tk.Label(root, text="Input Folder")
input_folder_label.pack()

input_folder_button = customtkinter.CTkButton(root, text="Open", command=open_folder, width=100)
input_folder_button.pack(pady=2)

compress_button = customtkinter.CTkButton(root, text="Compress", command=compress_images, width=100)
compress_button.pack(pady=2)

root.mainloop()

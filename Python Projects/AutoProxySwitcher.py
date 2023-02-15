import tkinter as tk
import tkinter.ttk as ttk
import urllib.request
import winreg as reg
from PIL import ImageTk
import playsound as sound
from PIL import Image, ImageTk
import time
import ctypes

import customtkinter
customtkinter.set_appearance_mode("Dark")  # Modes: "System" (standard), "Dark", "Light"
customtkinter.set_default_color_theme("dark-blue")  # Themes: "blue" (standard), "green", "dark-blue"


import sys, os
if getattr(sys, 'frozen', False):
    # If the application is run as a bundle, the PyInstaller bootloader
    # extends the sys module by a flag frozen=True and sets the app 
    # path into variable _MEIPASS'.
    application_path = sys._MEIPASS
else:
    application_path = os.path.dirname(os.path.abspath(__file__))


# Create the main window
window = customtkinter.CTk()
window.title("Proxy Switcher")
window.geometry("400x550")
window.configure(bg_color='white',borderwidth=0)
window.attributes('-alpha',2)
window.resizable(False, False)

#ctypes.windll.user32.MessageBoxW(0, application_path, "Script Path", 1)

#Set Icon
try:
    image = Image.open(application_path + '\lib\icon.ico')
    image = image.resize((40, 40))
    image = ImageTk.PhotoImage(image)
    window.iconphoto(False, image) 
except:
    print("Icon Not Found. Make sure the script and icon files are in the same folder!")

# Add a header text
header = customtkinter.CTkLabel(master=window, text="F r a c t a l P r o x y", font=("Arial", 30))
header.pack(pady=10, padx=10)
header = customtkinter.CTkLabel(master=window, text="2.0", font=("Arial", 15))
header.pack()



frame_0 = customtkinter.CTkFrame(master=window, fg_color = "dark red")
frame_0.pack(pady=15, padx=15, fill="both", expand=True)

current_proxy_title = customtkinter.CTkLabel(master=frame_0, text="DISABLED",font=("Arial", 20, 'bold'),text_color="grey")
current_proxy_title.pack()

frame_1 = customtkinter.CTkFrame(master=frame_0)
frame_1.pack(pady=5, padx=5, fill="both", expand=True)

#title = customtkinter.CTkLabel(master=frame_1, text="Projects", font=("Calibri", 20))
#title.pack()

# Create the dropdown selection box
options = ["0", "1", "2", "3", "4", "5", "6"]
var = customtkinter.StringVar(window)
var.set(options[1])
selection_box = customtkinter.CTkOptionMenu(frame_1, variable=var, values=options, font=("Calibri", 30, 'bold'), fg_color="white", text_color="black", 
button_color="grey",dropdown_font=("Calibri", 25), dropdown_hover_color="black", width=250)
selection_box.pack(pady=10, padx=10,expand=True)


# Create the list of proxies and ports
proxies = {
    "0": {
        "title": "",
        "host": "proxy0",
        "port": 8080,
        "username": "user0",
        "password": "pass0"
    },
    "1": {
        "title": "",
        "host": "proxy1",
        "port": 8080,
        "username": "user1",
        "password": "pass1"
    },
    "2": {
        "title": "",
        "host": "proxy2",
        "port": 8080,
        "username": "user2",
        "password": "pass2"
    },
    "3": {
        "title": "",
        "host": "proxy3",
        "port": 8080,
        "username": "user3",
        "password": "pass3"
    },
    "4": {
        "title": "",
        "host": "proxy4",
        "port": 8080,
        "username": "user4",
        "password": "pass4"
    },
    "5": {
        "title": "",
        "host": "proxy5",
        "port": 8080,
        "username": "user5",
        "password": "pass5"
    },
    "6": {
        "title": "",
        "host": "proxy6",
        "port": 8080,
        "username": "user6",
        "password": "pass6"
    }
}

frame_2 = customtkinter.CTkFrame(master=frame_0)
frame_2.pack(pady=5, padx=5, fill="both", expand=True)

#title = customtkinter.CTkLabel(master=frame_2, text="Disable / Enable",font=("Calibri", 20))
#title.pack()

#fileOn = "powerOn.mp3"
#fileOn = fileOn.replace(" ", "%20")
#fileOff = "powerOff.mp3"
#fileOff = fileOff.replace(" ", "%20")

is_active = False
def toggle():
    global is_active
    if (is_active == False):
        print("ENABLING PROXY")
        is_active = True
        enable_proxy()
        #sound.playsound(fileOn)
    else:
        print("DISABLING PROXY")
        is_active = False
        disable_proxy()
        #sound.playsound(fileOff)

switch_1 = customtkinter.CTkSwitch(master=frame_2, command=toggle, text="", width=30,switch_width=120, switch_height=50)
switch_1.pack(pady=30, padx=10,expand=True)

# Create the "Enable Proxy" button
def enable_proxy():
    proxy_info = proxies[var.get()]
    host = proxy_info['host']
    port = proxy_info['port']
    username = proxy_info['username']
    password = proxy_info['password']
    print(f"Enabling proxy: {host}:{port}")
    set_proxy(f"{host}:{port}", username, password)
    selected_item = var.get()
    # Update the username and password labels
    username_label.configure(text=f"Username: \n{username}")
    password_label.configure(text=f"Password: \n{password}")
    current_proxy_title.configure(text="ACTIVE",text_color="white")
    frame_0.configure(fg_color="dark green")
    print(proxy_info['title'])
    
#enable_button = customtkinter.CTkButton(master=frame_2, text="Enable Proxy", command=enable_proxy)
#enable_button.pack(pady=10, padx=10)

# Create the "Disable Proxy" button
def disable_proxy():
    print("Disabling proxy")
    set_proxy("")
    selected_item = var.get()
    # Update the username and password labels
    username_label.configure(text="Username: \n")
    password_label.configure(text="Password: \n")
    current_proxy_title.configure(text="DISABLED", text_color="grey")
    frame_0.configure(fg_color="dark red")
#disable_button = customtkinter.CTkButton(master=frame_2, text="Disable Proxy", command=disable_proxy)
#disable_button.pack(pady=10, padx=10)


frame_3 = customtkinter.CTkFrame(master=frame_0, height=200)
frame_3.pack(pady=5, padx=5, fill="both", expand=True)

#title = customtkinter.CTkLabel(master=frame_3, text="Info",font=("Calibri", 20))
#title.pack()


# Display the current system proxy
def get_proxy():
    proxy = urllib.request.getproxies()
    if "http" in proxy:
        proxy = proxy["http"]
    elif "https" in proxy:
        proxy = proxy["https"]
    else:
        proxy = "No proxy"






# Add labels to display the username and password
username_label = customtkinter.CTkLabel(master=frame_3, text="Username: \n", font=("Calibri",20))
username_label.pack(expand=True, pady=10)
password_label = customtkinter.CTkLabel(master=frame_3, text="Password: \n", font=("Calibri",20))
password_label.pack(expand=True, pady=10)

# Display the current system proxy
#current_proxy_label = customtkinter.CTkLabel(master=frame_3, text="Current proxy: ",justify=customtkinter.LEFT)
#current_proxy_label.pack()



# Set the system proxy
def set_proxy(proxy, username=None, password=None):
    key = reg.OpenKey(reg.HKEY_CURRENT_USER, "Software\Microsoft\Windows\CurrentVersion\Internet Settings", 0, reg.KEY_WRITE)
    reg.SetValueEx(key, "ProxyServer", 0, reg.REG_SZ, proxy)
    reg.SetValueEx(key, "ProxyEnable", 0, reg.REG_DWORD, 1 if proxy else 0)
    if username and password:
        reg.SetValueEx(key, "ProxyUser", 0, reg.REG_SZ, username)
        reg.SetValueEx(key, "ProxyPass", 0, reg.REG_SZ, password)
    reg.CloseKey(key)
    get_proxy()


# Run the main loop
window.mainloop()
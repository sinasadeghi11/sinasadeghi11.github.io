import string
import random

def generate_password(length=20):
    # Generate a random password using letters, digits, and punctuation
    password = ''.join(random.choice(string.ascii_letters + string.digits + string.punctuation) for i in range(length))
    return password

print(generate_password())

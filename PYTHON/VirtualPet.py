import time

class Pet:
    def __init__(self):
        self.hungry = 0
        self.thirsty = 0
        self.bored = 0
        self.update_status()

    def update_status(self):
        # Increase the pet's hunger, thirst, and boredom levels by 1 every second
        self.hungry += 1
        self.thirsty += 1
        self.bored += 1
        
    def feed(self):
        if self.hungry > 3:
            print("Yum! Thank you for feeding me.")
            self.hungry = 0
        else:
            print("I'm not hungry right now.")

    def give_water(self):
        if self.thirsty > 5:
            print("Ahh! Thank you for giving me water.")
            self.thirsty = 0
        else:
            print("I'm not thirsty right now.")

    def play(self):
        if self.bored > 2:
            print("Yay! Let's play!")
            self.bored = 0
        else:
            print("I'm not bored right now.")

    def check_status(self):
        print("Hunger: {}\nThirst: {}\nBoredom: {}".format(self.hungry, self.thirsty, self.bored))

pet = Pet()

while True:
    print("Enter 'feed', 'water', 'play', 'status', or 'quit'.")
    action = input()

    if action == 'quit':
        break
    elif action == 'feed':
        pet.update_status()
        pet.feed()
    elif action == 'water':
        pet.update_status()
        pet.give_water()
    elif action == 'play':
        pet.update_status()
        pet.play()
    elif action == 'status':
        pet.check_status()
    else:
        print("Invalid action.")
        
    # Update the pet's status every second
    
    time.sleep(3)

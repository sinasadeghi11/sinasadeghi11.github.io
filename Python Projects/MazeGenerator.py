import random
import tkinter as tk

CELL_SIZE = 20
MAZE_WIDTH = 20
MAZE_HEIGHT = 20

# Create the maze
maze = [[0 for y in range(MAZE_HEIGHT)] for x in range(MAZE_WIDTH)]
for x in range(MAZE_WIDTH):
    for y in range(MAZE_HEIGHT):
        if x == 0 or x == MAZE_WIDTH - 1 or y == 0 or y == MAZE_HEIGHT - 1:
            maze[x][y] = 1
        elif random.random() < 0.5:
            maze[x][y] = 1

# Display the maze
root = tk.Tk()
root.title("MazeGen")
canvas = tk.Canvas(root, width=MAZE_WIDTH * CELL_SIZE, height=MAZE_HEIGHT * CELL_SIZE)
canvas.pack()

for x in range(MAZE_WIDTH):
    for y in range(MAZE_HEIGHT):
        if maze[x][y] == 1:
            canvas.create_rectangle(x * CELL_SIZE, y * CELL_SIZE, (x + 1) * CELL_SIZE, (y + 1) * CELL_SIZE, fill="black")

root.mainloop()

# MazeConverter

MazeConverter is a simple web page project using the p5.js library that allows users to create mazes by drawing on a grid. This tool can convert the user-drawn maze into a maze represented in Prolog and vice versa. The interface includes options to insert start and end positions, draw walls, and erase elements. Users can also copy the current maze to the clipboard in Prolog format.

## Installation

1. Clone the repository;
3. Use the Live Server extension in VSCode to run a live server:
    - Open the project in VSCode.
    - Install the Live Server extension if you haven't already.
    - Right-click `index.html` and select "Open with Live Server".

## Usage

1. Open the web page.
2. Use the mouse to draw the maze on the grid:
   - Press `S` and click on a cell to set the starting position.
   - Press `E` and click on a cell to set the end position.
   - Press `W` and click on cells to draw walls.
   - Press `C` and click on cells to erase elements.
3. Press `P` to copy the current maze configuration to your clipboard in Prolog format.
4. To load a maze from a Prolog file, paste the Prolog code into the provided text area and click the "Draw" button.

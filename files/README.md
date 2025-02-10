# Not a fullstack guy

## Overview

Welcome to Sandeep Bhaisora's project! This project provides a web-based code editor and terminal interface that allows you to view and interact with files and directories. The frontend includes features such as syntax highlighting, a terminal emulator, and the ability to toggle between light and dark themes.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Navigating the Interface](#navigating-the-interface)
    - [Toggling Folders](#toggling-folders)
    - [Opening Files](#opening-files)
    - [Running Code](#running-code)
    - [Using the Terminal](#using-the-terminal)
    - [Switching Themes](#switching-themes)
- [Acknowledgements](#acknowledgements)

## Features
- Code editor with syntax highlighting using CodeMirror.
- Terminal emulator with a simulated command prompt.
- Light and dark theme toggle.
- Directory structure navigation.
- File viewing and downloading.

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    ```

2. Navigate to the project directory:
    ```sh
    cd your-repo-name
    ```

3. Open `index.html` in your web browser:
    ```sh
    open index.html
    ```

## Usage

### Navigating the Interface

#### Toggling Folders
To navigate through the directory structure:

1. Click on the folder icons or names in the left sidebar to expand or collapse directories.
2. The folder icon will change to indicate whether the folder is open or closed.

#### Opening Files
To open and view a file:

1. Click on the file icons or names in the left sidebar.
2. The content of the selected file will be displayed in the main content area with syntax highlighting.

#### Running Code
To run the code:

1. Open a file that you wish to run.
2. Click the "Run" button in the top bar (represented by a play icon).
3. If the file is `Resume.java`, it will simulate a download of a PDF file.
4. For other files, it will display the content in a markdown format in the terminal popup.

#### Using the Terminal
To interact with the terminal:

1. Click the "Run" button to open the terminal popup.
2. Enter commands in the terminal emulator. Note that this is a simulated terminal and may not support all terminal commands.
3. To close the terminal popup, click the close button (represented by an `X`).

#### Switching Themes
To toggle between light and dark themes:

1. Click the theme toggle button in the top bar (represented by an adjust icon).
2. The theme of the code editor and the interface will switch between light (Solarized Light) and dark (Solarized Dark) themes.

## Acknowledgements
- [CodeMirror](https://codemirror.net/) for the code editor.
- [Showdown](https://github.com/showdownjs/showdown) for the markdown to HTML conversion.
- [Font Awesome](https://fontawesome.com/) for the icons.
- [Solarized](https://ethanschoonover.com/solarized/) for the color themes.

Enjoy navigating and interacting with the project!
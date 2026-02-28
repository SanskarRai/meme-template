# Meme Terminal

Plays hilarious meme sounds whenever you encounter an error in VS Code!

## Features

- **Terminal Errors**: Automatically plays a random meme sound when a terminal command fails (non-zero exit code).
- **Code Errors**: Plays a sound when new diagnostic errors (red squiggly lines) appear in your code.
- **Zero-Latency**: Uses a persistent background sound engine for instant audio triggers.
- **Silent Background**: No windows or external players will open; everything happens in the background.

## How it Works

The extension monitors both your integrated terminal and your active code editor. When an error is detected, it picks a random `.wav` file from the `media/error` folder and plays it instantly using a background PowerShell process.

## Installation

To install the extension from a `.vsix` file (e.g., from our GitHub Releases):

1.  **Download** the `meme-terminal-x.x.x.vsix` file from the [Releases](https://github.com/SanskarRai/meme-template/releases) page.
2.  **Open VS Code**.
3.  Go to the **Extensions** view (`Ctrl+Shift+X`).
4.  Click the `...` (Views and More Actions) menu in the top right of the Extensions view.
5.  Select **Install from VSIX...**
6.  Choose the downloaded `.vsix` file.

**Enjoy coding with memes!**

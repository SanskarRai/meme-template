const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let lastErrorCount = 0;
let soundProcess = null;

function activate(context) {
    console.log("Meme extension activated");

    // Initialize persistent background sound engine
    initSoundEngine();

    vscode.languages.onDidChangeDiagnostics(() => {
        const diagnostics = vscode.languages.getDiagnostics();
        let errorCount = 0;

        diagnostics.forEach(([uri, problems]) => {
            problems.forEach(problem => {
                if (problem.severity === vscode.DiagnosticSeverity.Error) {
                    errorCount++;
                }
            });
        });

        if (errorCount > lastErrorCount) {
            playSound(context, 'error');
        }
        lastErrorCount = errorCount;
    });

    if (vscode.window.onDidEndTerminalShellExecution) {
        vscode.window.onDidEndTerminalShellExecution((event) => {
            if (event.exitCode !== 0 && event.exitCode !== undefined) {
                playSound(context, 'error');
            }
        });
    }
}

function initSoundEngine() {
    if (soundProcess) return;

    // Start a persistent PowerShell process in the background
    soundProcess = spawn('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', '-'], {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    // Initialize the SoundPlayer object once
    soundProcess.stdin.write('$player = New-Object System.Media.SoundPlayer;\n');

    soundProcess.on('error', (err) => {
        console.error('Failed to start sound engine:', err);
        soundProcess = null;
    });

    soundProcess.on('exit', () => {
        soundProcess = null;
    });
}

function playSound(context, subFolder) {
    const dir = path.join(context.extensionPath, "media", subFolder);
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.wav'));
    if (files.length === 0) return;

    const file = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(dir, file);

    // If engine died, restart it
    if (!soundProcess) initSoundEngine();

    if (soundProcess && soundProcess.stdin) {
        // Send command to the ALIVE process for instant trigger
        const escapedPath = filePath.replace(/'/g, "''");
        soundProcess.stdin.write(`$player.SoundLocation = '${escapedPath}'; $player.Play();\n`);
    }
}

function deactivate() {
    if (soundProcess) {
        soundProcess.stdin.write('exit\n');
        soundProcess.kill();
        soundProcess = null;
    }
}

module.exports = {
    activate,
    deactivate
};
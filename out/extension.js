// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  const runCommand = vscode.commands.registerCommand('deduceMode.runFile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const filePath = editor.document.uri.fsPath;
      const config = vscode.workspace.getConfiguration("deduce-mode")
      const python = config.get("pythonInstallPath")
      const deduce = config.get("deduceInstallPath")

      // TODO: Show both errors at once if possible
      // Or prompt user to find them or detect files
      if (!python) {
        vscode.window.showErrorMessage("`deduce-mode.pythonInstallPath` not set");
        return;
      }
      if (!deduce) {
        vscode.window.showErrorMessage("`deduce-mode.deduceInstallPath` not set");
        return;
      }

      const terminalCommand = `${python} ${deduce}/deduce.py ${filePath} --dir ${deduce}/lib`

      let terminal = vscode.window.terminals.find(t => t.name === "Run File Terminal");
      if (!terminal) {
        terminal = vscode.window.createTerminal("Run File Terminal");
      }

      // Show the terminal and execute the command
      terminal.show();
      terminal.sendText(terminalCommand);
    }
  });

  context.subscriptions.push(runCommand);
}

// this method is called when your extension is deactivated
function deactivate() { }

// eslint-disable-next-line no-undef
module.exports = {
  activate,
  deactivate
}
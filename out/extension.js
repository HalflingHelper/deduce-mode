// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/* Constants */
const TERMINAL_NAME = "Deduce";

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
      const python = await getPythonInterpreterPath(config);
      const deduce = await getDeduceInstallPath(config);

      editor.document.save()

      if (!deduce) {
        vscode.window.showErrorMessage("`deduce-mode.deduceInstallPath` not set", "Open Settings")
          .then(selection => {
            if (selection === "Open Settings") {
              vscode.commands.executeCommand('workbench.action.openSettings', 'deduce-mode.deduceInstallPath');
            }
          });
      }

      if (!python || !deduce) { return; }

      // Get the directory path
      let libPaths = config.get("libraryPaths");

      if (!libPaths) { libPaths = [`${deduce}/lib`] }

      const terminalCommand = `${python} ${deduce}/deduce.py ${filePath} ${libPaths.map(p => `--dir ${p}`).join(" ")}`

      let terminal = vscode.window.terminals.find(t => t.name === TERMINAL_NAME);
      if (!terminal) {
        terminal = vscode.window.createTerminal(TERMINAL_NAME);
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


async function getPythonInterpreterPath(config) {
  // Default to using the deduce setting
  const deducePython = config.get("pythonInstallPath");

  if (deducePython) return deducePython;


  const pythonExtension = vscode.extensions.getExtension('ms-python.python');
  if (pythonExtension) {
    await pythonExtension.activate();
    const pythonApi = pythonExtension.exports;
    const interpreterPath = pythonApi.environments?.getActiveEnvironmentPath?.()?.path;
    return interpreterPath;
  }

  vscode.window.showErrorMessage("`deduce-mode.pythonInstallPath` not set", "Install ms-python Extension", "Open Settings")
    .then(selection => {
      if (selection === "Open Settings") {
        vscode.commands.executeCommand('workbench.action.openSettings', 'deduce-mode.pythonInstallPath');
      } else if (selection === "Install ms-python Extension") {
        vscode.commands.executeCommand('workbench.extensions.search', 'ms-python.python')
      }
    });

  return undefined;
}

async function getDeduceInstallPath(config) {
  // Default to the deduce setting
  const deduce = config.get("deduceInstallPath");
  if (deduce) return deduce;

  const workspaceDeduce = await findDeduceInWorkspace();
  if (workspaceDeduce) return workspaceDeduce;

  return undefined;
}

async function findDeduceInWorkspace() {
  const files = await vscode.workspace.findFiles('deduce.py', null, 1);
  if (files.length > 0) {
      let p = files[0].fsPath
    return p.slice(0, p.length - 9);
  }
  return undefined;
}

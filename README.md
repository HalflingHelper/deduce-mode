# deduce-mode

deduce-mode exists to  moderately improve the experience of writing [deduce](https://github.com/jsiek/deduce/) in VS Cde. Inspired by agda-mode, though
much less fully featured.

## Features

- Syntax Highlighting
- File icons
- Line Indentation
- Autorun

More to come!
- Semantic Highlighting

## Installation
Since this is still very much a work in progress, the extension is not of the vscode marketplace.

To get the extension, download the latest `.vsix` file from [releases](https://github.com/HalflingHelper/deduce-mode/releases) 
and put it somewhere you'll remember. You can then add it as an extension in vscode.
![image](https://github.com/user-attachments/assets/7c840dbd-d781-4e3d-aa91-6606d4ff8bff)


<!-- ## Requirements -->


<!-- ## Extension Settings -->

<!-- Include if your extension adds any VS Code settings through the `contributes.configuration` extension point. -->
<!--  -->
<!-- For example: -->
<!--  -->
<!-- This extension contributes the following settings: -->
<!--  -->
<!-- * `myExtension.enable`: Enable/disable this extension. -->
<!-- * `myExtension.thing`: Set to `blah` to do something. -->

## Known Issues

- Still no highlighting support for unicode substitutions for many operators (i.e. `⊆` vs `(=`)


## Release Notes

### 0.0.1
Prerelease: Minimal syntax highlighting support.

### 0.0.2
Added file icons.

### 0.0.3
Added support for basic line indentation and a run command.


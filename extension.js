const vscode = require('vscode');

function getIndent(line) {
    return line.text.match(/^\s*/)[0] || ''
}

function getFixedText(text) {
    const indent = getIndent(editor.document.lineAt(selection.start.line));

    let fixedText = '\n';
    for (const i of text.split(',')) {
        fixedText += indent + '    ' + i.trim() + ',\n';
    }
    fixedText += indent;
}

function activate(context) {
    let command = vscode.commands.registerCommand('indentation-helper.fix-indentation', async function () {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showErrorMessage('Нет активного редактора');
            return;
        }

        const selection = editor.selection;
        
        if (selection.isEmpty) {
            vscode.window.showErrorMessage('Выделите текст для замены');
            return;
        }

        const text = editor.document.getText(selection);

        await editor.edit(editBuilder => {
            editBuilder.replace(selection, getFixedText(text));
        });
    });

    context.subscriptions.push(command);
}

module.exports = {
    activate,
};
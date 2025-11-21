const vscode = require('vscode');

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

        let fixedText = '\n';
        for (const i of text.split(',')) {
            fixedText += '    ' + i.trim() + ',\n';
        }

        await editor.edit(editBuilder => {
            editBuilder.replace(selection, fixedText);
        });
    });

    context.subscriptions.push(command);
}

module.exports = {
    activate,
};
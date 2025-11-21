/**
 * VS Code расширение Indentation helper для форматирования отступов в выделенном тексте
 * Преобразует горизонтально перечисляемые элементы через `,` в вертикально перечисляемые
 */

const vscode = require('vscode');

/**
 * Определяет отступы в начале строки
 * @param {vscode.TextLine} line - Строка в vscode
 * @returns {string} Строка с пробельными символами в начале строки
 */
function getIndent(line) {
    return line.text.match(/^\s*/)[0] || '';
}

/**
 * Форматирует текст, преобразуя горизонтальный список в вертикальный
 * @param {vscode.TextEditor} editor - Активный редактор
 * @param {vscode.Selection} selection - Выделение исходного текста
 * @returns {string} Отформатированный текст
 */
function getFixedText(editor, selection) {
    const indent = getIndent(editor.document.lineAt(selection.start.line));
    const text = editor.document.getText(selection);
    let fixedText = '\n';
    for (const i of text.split(',')) {
        fixedText += indent + '    ' + i.trim() + ',\n';
    }
    fixedText += indent;
    return fixedText;
}

/**
 * Обработчик команды для форматирования в выделенном тексте
 * @returns {Promise<void>}
 */
async function command() {
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

    await editor.edit(editBuilder => {
        editBuilder.replace(selection, getFixedText(editor, selection));
    });
}

/**
 * Активирует расширение при его запуске в VS Code
 * @param {vscode.ExtensionContext} context - Контекст расширения vscode
 * @returns {Promise<void>}
 */
function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand('indentation-helper.fix-indentation', command)
    );
}

module.exports = {
    activate,
};
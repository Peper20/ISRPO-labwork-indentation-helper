# Indentation Helper - Документация

## Обзор
VS Code расширение Indentation helper для форматирования отступов в выделенном тексте.

Преобразует горизонтально перечисляемые элементы через `,` в вертикально перечисляемые.

## Основные файлы проекта

### Конфигурационные файлы
- **package.json** - конфигурация расширения
- **.vscodeignore** - контроль содержимого
- **extension.js** - основной исполняемый файл расширения
- **README.md** - оглавление
- **docs.md** - документация
- **specification.md** - техническое задание
- **report.pdf** - отчет по работе

## Функции

### `getIndent(line)`
Определяет отступы в начале строки.

**Параметры:**
- `line` (vscode.TextLine) - строка в vscode

**Возвращает:**
- `string` - строка с пробельными символами в начале строки

**Пример:**
```javascript
const indent = getIndent(editor.document.lineAt(selection.start.line));
```

### `getFixedText(editor, selection)`
Форматирует текст, преобразуя горизонтальный список в вертикальный.

**Параметры:**
- `editor` (vscode.TextLine) - активный редактор
- `selection` (vscode.Selection) - выделение исходного текста

**Возвращает:**
- `string` - отформатированный текст

**Пример:**
```javascript
await editor.edit(editBuilder => {
    editBuilder.replace(selection, getFixedText(editor, selection));
});
```

### `command()`
Обработчик команды для форматирования в выделенном тексте.

**Возвращает:**
- `Promise<void>`

**Пример:**
```javascript
context.subscriptions.push(
    vscode.commands.registerCommand('indentation-helper.fix-indentation', command)
);
```

### `activate(context)`
Активирует расширение при его запуске в VS Code.

**Параметры:**
- `context` (vscode.ExtensionContext) - контекст расширения vscode

**Возвращает:**
- `void`

**Пример:**
```javascript
module.exports = {
    activate,
};
```

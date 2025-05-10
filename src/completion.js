const vscode = require('vscode');

const wispCompletions = [
    // Keywords
    'let', 'constant', 'show', 'ask', 'if', 'else', 'while', 'for', 'do', 'try', 'catch', 'async', 'function', 'spawn',
    // Types
    'number', 'string', 'boolean', 'array', 'object',
    // Operators
    'is', 'less', 'greater', 'equal', 'not', 'and', 'or', 'post', 'pre', 'increase', 'decrease',
    // Snippet triggers
    'read_file', 'write_file',
    // Other
    'structure', 'enum', 'switch', 'case', 'default', 'match', 'return', 'break', 'continue', 'import', 'from', 'as', 'run', 'sizeof', 'await', 'throw', 'show', 'ask'
];

function registerCompletion(context) {
    const provider = vscode.languages.registerCompletionItemProvider(
        'wisp',
        {
            provideCompletionItems(document, position) {
                const completions = wispCompletions.map(word => {
                    const item = new vscode.CompletionItem(word, vscode.CompletionItemKind.Keyword);
                    item.insertText = word;
                    return item;
                });
                return completions;
            }
        },
        ...'abcdefghijklmnopqrstuvwxyz'.split('') // Trigger on any letter
    );
    context.subscriptions.push(provider);
}

module.exports = { registerCompletion };

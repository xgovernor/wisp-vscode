
const vscode = require('vscode');
const { lintLines } = require('./linter');
const { registerCompletion } = require('./completion');

function activate(context) {
    const diagnosticCollection = vscode.languages.createDiagnosticCollection('wisp');

    if (vscode.window.activeTextEditor) {
        updateDiagnostics(vscode.window.activeTextEditor.document, diagnosticCollection);
    }

    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event =>
            updateDiagnostics(event.document, diagnosticCollection)
        ),
        vscode.workspace.onDidCloseTextDocument(document =>
            diagnosticCollection.delete(document.uri)
        )
    );

    // Register code completion
    registerCompletion(context);
}

function deactivate() {}

function updateDiagnostics(document, diagnosticCollection) {
    if (document.languageId !== 'wisp') {
        return;
    }

    const diagnostics = [];
    const content = document.getText();
    const lines = content.split('\n');

    const lintResults = lintLines(lines);
    lintResults.forEach(result => {
        const range = new vscode.Range(result.line, 0, result.line, lines[result.line].length);
        diagnostics.push(new vscode.Diagnostic(range, result.message, vscode.DiagnosticSeverity.Warning));
    });

    diagnosticCollection.set(document.uri, diagnostics);
}

function createDiagnostic(line, startChar, endChar, message) {
    const range = new vscode.Range(line, startChar, line, endChar);
    return new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Warning);
}

module.exports = {
    activate,
    deactivate
};

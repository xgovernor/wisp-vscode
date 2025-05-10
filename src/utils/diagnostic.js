const vscode = require('vscode');

function createDiagnostic(line, startChar, endChar, message) {
    const range = new vscode.Range(line, startChar, line, endChar);
    return new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Warning);
}

module.exports = { createDiagnostic };

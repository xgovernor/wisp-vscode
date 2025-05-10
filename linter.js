const fs = require('fs');
const path = require('path');

function lintFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const errors = [];

    // Example: Check for missing semicolons
    const lines = content.split('\n');
    lines.forEach((line, index) => {
        if (line.trim() && !line.trim().endsWith(';') && !line.trim().startsWith('#') && !line.trim().startsWith('//')) {
            errors.push(`Line ${index + 1}: Missing semicolon.`);
        }
    });

    return errors;
}

function lintDirectory(directory) {
    const files = fs.readdirSync(directory);
    let allErrors = [];

    files.forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isFile() && file.endsWith('.wisp')) {
            const errors = lintFile(fullPath);
            if (errors.length > 0) {
                allErrors.push({ file, errors });
            }
        }
    });

    return allErrors;
}

const directoryToLint = process.argv[2] || '.';
const results = lintDirectory(directoryToLint);

if (results.length > 0) {
    console.log('Linting errors found:');
    results.forEach(result => {
        console.log(`\nFile: ${result.file}`);
        result.errors.forEach(error => console.log(`  ${error}`));
    });
    process.exit(1);
} else {
    console.log('No linting errors found.');
}

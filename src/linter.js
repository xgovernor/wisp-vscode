const rules = [
    {
        name: 'Invalid Assignment Operator',
        test: line => /\s=\s/.test(line),
        message: "Invalid assignment operator '='. Use 'is' for assignments in Wisp."
    },
    {
        name: 'Missing Variable Name',
        test: line => /\b(let|constant)\b/.test(line) && !/\b(let|constant)\s+\w+/.test(line),
        message: line => `Missing variable name after '${line.split(' ')[0]}'. Ensure you declare a valid variable name.`
    },
    {
        name: 'Missing Type Declaration',
        test: line => (/\b(let|constant)\s+\w+\s+is/.test(line) && !/\b(let|constant)\s+\w+\(\w+\)\s+is/.test(line)) && !/\b(let|constant)\s+\w+\s+is\s+.+;/.test(line),
        message: line => `Missing type declaration for variable '${line.split(' ')[1]}'. Use '(type)' syntax to specify the type, or assign a value directly if type is inferred.`
    },
    {
        name: 'Variable Declaration With Type',
        test: line => /^let\s+\w+\([^)]+\)\s+is\s+.+;$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Constant Declaration With Type',
        test: line => /^constant\s+\w+\([^)]+\)\s+is\s+.+;$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Array Declaration',
        test: line => /^let\s+\w+\(array\)\s+is\s+\[.*\];$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Object Declaration',
        test: line => /^let\s+\w+\(object\)\s+is\s+\{.*\};$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Show Statement',
        test: line => /^show\s+`.*`;$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Ask Input',
        test: line => /^ask\s+".*"\s+as\s+\w+\(\w+\);$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Read File',
        test: line => /^let\s+\w+\(string\);$/.test(line) || /^\w+\s+is\s+read_file\(".*"\);$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Write File',
        test: line => /^write_file\(".*",\s*.+\);$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Function Definition',
        test: line => /^let function \w+ takes .+ returns \(.+\):$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Try Catch',
        test: line => /^try:$/.test(line) || /^catch \w+:$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Async Function',
        test: line => /^async function \w+\(.+\):$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Spawn',
        test: line => /^let \w+ is spawn \w+\(.+\);$/.test(line),
        message: null // Valid, no error
    },
    {
        name: 'Mismatched Closing Tags',
        test: line => {
            // Ignore content inside quotes and parentheses for type declarations
            let clean = '';
            let inQuote = false;
            let quoteChar = '';
            let inParen = false;
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if ((char === '"' || char === "'" || char === '`') && !inQuote) {
                    inQuote = true;
                    quoteChar = char;
                } else if (char === quoteChar && inQuote) {
                    inQuote = false;
                    quoteChar = '';
                } else if (!inQuote) {
                    if (char === '(') inParen = true;
                    if (char === ')') inParen = false;
                    if (!inParen) clean += char;
                }
            }
            const openClosePairs = {
                '(': ')',
                '[': ']',
                '{': '}',
                '"': '"',
                "'": "'",
                '`': '`'
            };
            const stack = [];
            for (const char of clean) {
                if (openClosePairs[char]) {
                    stack.push(char);
                } else if (Object.values(openClosePairs).includes(char)) {
                    if (stack.length === 0 || openClosePairs[stack.pop()] !== char) {
                        return true;
                    }
                }
            }
            return stack.length > 0;
        },
        message: "Mismatched or missing closing tag. Ensure all opening tags have corresponding closing tags."
    },
    {
        name: 'Unknown Syntax',
        test: line => {
            // If line is not empty and does not match any valid rule above
            return line && !rules.some(rule => rule.message === null && rule.test(line));
        },
        message: line => `Unknown syntax: '${line}'. Check the Wisp language documentation for valid syntax.`
    }
];

function lintLines(lines) {
    const diagnostics = [];
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        rules.forEach(rule => {
            if (rule.test(trimmedLine)) {
                diagnostics.push({
                    line: index,
                    message: typeof rule.message === 'function' ? rule.message(trimmedLine) : rule.message
                });
            }
        });
    });
    return diagnostics;
}

module.exports = { lintLines };

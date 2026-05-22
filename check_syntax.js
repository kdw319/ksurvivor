const fs = require('fs');
const html = fs.readFileSync('www/index.html', 'utf8');
const scriptRegex = /<script[\s\S]*?>([\s\S]*?)<\/script>/g;
let match;
let count = 1;
while ((match = scriptRegex.exec(html)) !== null) {
    const js = match[1];
    if (js.trim() === '') continue;
    try {
        new Function(js);
        console.log(`Script block ${count}: No syntax errors.`);
    } catch (e) {
        console.log(`Script block ${count}: Syntax error!`);
        console.log(e);
    }
    count++;
}
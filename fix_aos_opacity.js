const fs = require('fs');
let html = fs.readFileSync('www/index.html', 'utf8');

// Set AOS Verdict UI opacity to 0.5 (Keep position as is)
html = html.replace(".aos-build #verdictUI { bottom: 130px !important; opacity: 1 !important; }", ".aos-build #verdictUI { bottom: 100px !important; opacity: 0.5 !important; }");

fs.writeFileSync('www/index.html', html, 'utf8');
console.log("AOS: Verdict UI opacity set to 0.5.");

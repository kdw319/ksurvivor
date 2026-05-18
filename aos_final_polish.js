const fs = require('fs');
let html = fs.readFileSync('www/index.html', 'utf8');

// Final AOS Fine-tuning: Lower Stats Panel by 15px (180 -> 195)
// Also move Notice down to maintain the gap (350 -> 365) to avoid overlapping with stats panel bottom
html = html.replace(".aos-build #statsPanel { top: 180px !important;", ".aos-build #statsPanel { top: 195px !important;");
html = html.replace(".aos-build #systemNoticeList { top: 350px !important;", ".aos-build #systemNoticeList { top: 365px !important;");

fs.writeFileSync('www/index.html', html, 'utf8');
console.log("AOS Final Polish: Stats UI lowered by 15px.");

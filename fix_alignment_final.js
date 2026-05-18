const fs = require('fs');
let html = fs.readFileSync('www/index.html', 'utf8');

// --- PC UI Alignment Fix ---
// statsPanel at top 190, right 110. Move Notice X to match.
html = html.replace("#systemNoticeList { position: absolute; top: 380px; right: 20px;", "#systemNoticeList { position: absolute; top: 400px !important; right: 110px !important;");

// --- AOS UI Alignment Fix ---
// Stats UI Up by 120px (300 -> 180)
html = html.replace(".aos-build #statsPanel { top: 300px !important; right: 150px !important; }", ".aos-build #statsPanel { top: 180px !important; right: 150px !important; }");
html = html.replace(".aos-build #statsPanel { top: 260px !important; right: 150px !important; }", ".aos-build #statsPanel { top: 180px !important; right: 150px !important; }");

// Notice below stats (350px)
const aosNoticeStyle = `
        .aos-build #systemNoticeList { top: 350px !important; right: 150px !important; }`;
if (!html.includes('.aos-build #systemNoticeList')) {
    html = html.replace(".aos-build #statsPanel { top: 180px !important; right: 150px !important; }", ".aos-build #statsPanel { top: 180px !important; right: 150px !important; }\n       " + aosNoticeStyle);
}

fs.writeFileSync('www/index.html', html, 'utf8');
console.log("Final PC/AOS UI Alignment Applied.");

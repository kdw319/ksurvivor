const fs = require('fs');
let html = fs.readFileSync('www/index.html', 'utf8');

// 1. NON-INVASIVE AOS Detection (Just before </head>)
const aosDetection = `
    <script>
        (function() {
            const isAosPath = window.location.pathname.includes('/aos/') || window.location.pathname.includes('/sandbox/');
            const isNative = window.Capacitor && window.Capacitor.getPlatform() !== 'web';
            if (isAosPath || isNative) {
                document.documentElement.classList.add('aos-build');
                console.log("AOS UI Optimization: ACTIVE");
            }
        })();
    </script>
`;
html = html.replace('</head>', aosDetection + '\n</head>');

// 2. AOS CSS Overrides (Safe zone padding)
const aosCSS = `
    <style>
        /* Mobile UI Safety Box: 220px margin from corners for Landscape ergonomic comfort */
        .aos-build #hudLeft { top: 120px !important; left: 150px !important; }
        .aos-build #hudRight { top: 120px !important; right: 150px !important; }
        .aos-build #hudCenter { top: 150px !important; }
        .aos-build #minimapCanvas { bottom: 150px !important; left: 150px !important; width: 160px !important; height: 160px !important; }
        .aos-build #pauseBtn { bottom: 150px !important; right: 150px !important; }
        .aos-build #mobileDashBtn { bottom: 280px !important; right: 150px !important; width: 100px !important; height: 100px !important; }
        .aos-build #inventory { top: 320px !important; left: 150px !important; }
        .aos-build #statsPanel { top: 300px !important; right: 150px !important; }
        .aos-build #verdictUI { bottom: 130px !important; } /* Push Verdict UI up slightly for safety */
        
        /* Lobby specific safety box */
        .aos-build #lobbyTopBar { top: 120px !important; padding: 0 120px !important; }
        .aos-build #lobbyBottomBar { bottom: 250px !important; gap: 30px !important; }
        .aos-build .lobby-title { top: 220px !important; }
        
        .aos-build .portrait-warning {
            display: none;
        }
        @media screen and (orientation: portrait) {
            .aos-build .portrait-warning {
                display: flex !important;
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: #000; color: #fff; z-index: 9999;
                justify-content: center; align-items: center; text-align: center;
                font-family: 'Press Start 2P', cursive; padding: 20px;
            }
        }
    </style>
`;
html = html.replace('</head>', aosCSS + '\n</head>');

// 3. Add Warning Element
html = html.replace('<body>', '<body>\n    <div class="portrait-warning">PLEASE ROTATE TO LANDSCAPE</div>');

// 4. FIX THE BLACK HOLE: Make gameState global in the main script module
// Find the Object.assign(window, { ... }) and ensure gameState is inside
if (html.includes('Object.assign(window, {') && !html.includes('gameState,')) {
    html = html.replace('Object.assign(window, {', 'Object.assign(window, { gameState, ');
}

fs.writeFileSync('www/index.html', html, 'utf8');
console.log("AOS Overlays applied to Main-based baseline.");

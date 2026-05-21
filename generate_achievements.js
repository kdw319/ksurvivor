const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const achievements = [
    { id: 'FIRST_BLOOD', name: '첫 번째 심판', color: '#ff4d4d', symbol: '⚔️' },
    { id: 'SURVIVOR_10', name: '10분 생존', color: '#4da6ff', symbol: '⏱️' },
    { id: 'MARBLE_COLLECTOR', name: '구슬 수집가', color: '#ffd11a', symbol: '🔮' },
    { id: 'ROULETTE_ADDICT', name: '도박사', color: '#ff33ff', symbol: '🎰' },
    { id: 'BOSS_SLAYER_1', name: '부장판사의 몰락', color: '#9933ff', symbol: '👑' },
    { id: 'UNTOUCHABLE', name: '무결점 변론', color: '#33cc33', symbol: '🛡️' },
    { id: 'COMBO_KING', name: '연속 타격', color: '#ff8000', symbol: '🔥' },
    { id: 'FULL_POCKET', name: '꽉 찬 주머니', color: '#00ccff', symbol: '🎒' },
    { id: 'SPEED_DEMON', name: '빛의 속도', color: '#ffff00', symbol: '⚡' },
    { id: 'LEGENDARY_SURVIVOR', name: '전설의 생존자', color: '#ffffff', symbol: '🌟' }
    // ... we can generate more iteratively
];

// Generate 30 variations
for(let i=1; i<=30; i++) {
    const canvas = createCanvas(256, 256);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 256, 256);

    // Border
    ctx.strokeStyle = achievements[i % achievements.length]?.color || '#ffffff';
    ctx.lineWidth = 15;
    ctx.strokeRect(10, 10, 236, 236);

    // Symbol/Text
    ctx.fillStyle = achievements[i % achievements.length]?.color || '#ffffff';
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(achievements[i % achievements.length]?.symbol || '🏆', 128, 128);

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, `www/assets/achievements/ach_icon_${i}.png`), buffer);
    console.log(`Generated ach_icon_${i}.png`);
}

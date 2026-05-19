const achievements = [
    { id: 'kills_100', name: "첫 피의 세례", enName: "First Blood", desc: "적 100마리 처치", enDesc: "Kill 100 enemies" },
    { id: 'kills_500', name: "학살의 시작", enName: "Slayer", desc: "적 500마리 처치", enDesc: "Kill 500 enemies" },
    { id: 'kills_1000', name: "심판관", enName: "Judge", desc: "적 1,000마리 처치", enDesc: "Kill 1,000 enemies" },
    { id: 'kills_5000', name: "무자비한 변론", enName: "Merciless", desc: "적 5,000마리 처치", enDesc: "Kill 5,000 enemies" },
    { id: 'kills_10000', name: "전설의 사신", enName: "Reaper", desc: "적 10,000마리 처치", enDesc: "Kill 10,000 enemies" },
    { id: 'stage_5', name: "생존 전문가 I", enName: "Survivor I", desc: "스테이지 5 도달", enDesc: "Reach Stage 5" },
    { id: 'stage_10', name: "생존 전문가 II", enName: "Survivor II", desc: "스테이지 10 도달", enDesc: "Reach Stage 10" },
    { id: 'stage_20', name: "생존 전문가 III", enName: "Survivor III", desc: "스테이지 20 도달", enDesc: "Reach Stage 20" },
    { id: 'stage_30', name: "마스터 서바이버", enName: "Master Survivor", desc: "스테이지 30 도달", enDesc: "Reach Stage 30" },
    { id: 'stage_50', name: "불멸의 학생", enName: "Immortal Student", desc: "스테이지 50 도달", enDesc: "Reach Stage 50" },
    { id: 'badges_1000', name: "매점 VIP", enName: "Snack Bar VIP", desc: "누적 뱃지 1,000개 획득", enDesc: "Collect 1,000 badges total" },
    { id: 'badges_5000', name: "자산가", enName: "Wealthy", desc: "누적 뱃지 5,000개 획득", enDesc: "Collect 5,000 badges total" },
    { id: 'badges_10000', name: "백만장자", enName: "Millionaire", desc: "누적 뱃지 10,000개 획득", enDesc: "Collect 10,000 badges total" },
    { id: 'roulette_1', name: "도박의 시작", enName: "First Gamble", desc: "심판의 룰렛 1회 사용", enDesc: "Use Verdict Roulette once" },
    { id: 'roulette_10', name: "룰렛 매니아", enName: "Roulette Lover", desc: "심판의 룰렛 10회 사용", enDesc: "Use Verdict Roulette 10 times" },
    { id: 'roulette_50', name: "운명에 맡긴 자", enName: "Fate's Gambler", desc: "심판의 룰렛 50회 사용", enDesc: "Use Verdict Roulette 50 times" },
    { id: 'dash_100', name: "바람을 가르는", enName: "Wind Walker", desc: "대쉬 100회 사용", enDesc: "Dash 100 times" },
    { id: 'dash_500', name: "번개 같은 속도", enName: "Lightning Speed", desc: "대쉬 500회 사용", enDesc: "Dash 500 times" },
    { id: 'perfect_roulette', name: "행운의 신", enName: "God of Luck", desc: "룰렛에서 3개 같은 구슬 획득", enDesc: "Get 3 same orbs in roulette" },
    { id: 'boss_10', name: "첫 번째 고난 극복", enName: "First Trial Overcome", desc: "10스테이지 보스 처치", enDesc: "Defeat Stage 10 Boss" },
    { id: 'boss_20', name: "두 번째 고난 극복", enName: "Second Trial Overcome", desc: "20스테이지 보스 처치", enDesc: "Defeat Stage 20 Boss" },
    { id: 'boss_30', name: "최종 변론 준비", enName: "Final Argument Prep", desc: "30스테이지 보스 처치", enDesc: "Defeat Stage 30 Boss" },
    { id: 'no_hit_1', name: "무결점 생존", enName: "Flawless Survival", desc: "한 스테이지 피격 없이 클리어", enDesc: "Clear a stage without taking damage" },
    { id: 'time_30', name: "버티기의 달인", enName: "Endurance Master", desc: "한 판에서 30분 생존", enDesc: "Survive 30 minutes in a single run" },
    { id: 'level_50', name: "초월자", enName: "Transcendent", desc: "한 판에서 레벨 50 달성", enDesc: "Reach level 50 in a single run" },
    { id: 'all_skills', name: "만능 해결사", enName: "All-Rounder", desc: "모든 스킬 만렙 달성", enDesc: "Reach max level for all active skills" },
    { id: 'combo_100', name: "화려한 콤보", enName: "Stylish Combo", desc: "100 콤보 달성", enDesc: "Reach 100 combo" },
    { id: 'rainbow_roulette', name: "무지개 심판", enName: "Rainbow Verdict", desc: "룰렛에서 서로 다른 3개 구슬 획득", enDesc: "Get 3 different orbs in roulette" },
    { id: 'marbles_100', name: "구슬 수집가", enName: "Orb Collector", desc: "구슬 100개 획득", enDesc: "Collect 100 orbs total" },
    { id: 'legend_reached', name: "고등학교의 전설", enName: "Legend of Highschool", desc: "모든 업적 달성", enDesc: "Unlock all achievements" }
];

let csv = "API Name,Display Name,Description,Hidden,Type,Icon\n";
achievements.forEach((ach, i) => {
    const apiName = "NEW_ACHIEVEMENT_" + ach.id.toUpperCase();
    const iconPath = `www/assets/achievements/ach_icon_${i+1}.png`;
    csv += `${apiName},"${ach.name}","${ach.desc}",0,stat,${iconPath}\n`;
});

require('fs').writeFileSync('steam_achievements_bulk.csv', csv);
console.log("CSV for Bulk Upload generated: steam_achievements_bulk.csv");

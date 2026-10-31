const fs = require('fs');
const c = fs.readFileSync('D:/100thDay_HlaSu/index.html', 'utf8');
const m = c.match(/<style>([\s\S]*?)<\/style>/);
const css = m[1];
let d = 0;
let lineNum = 1;
let col = 0;
for (let i = 0; i < css.length; i++) {
    if (css[i] === '\n') { lineNum++; col = 0; } else col++;
    if (css[i] === '{') d++;
    else if (css[i] === '}') d--;
}
console.log('Brace depth:', d);

// Check for @media blocks
const mediaMatches = [...css.matchAll(/@media[^{]*{/g)];
console.log('Media queries found:', mediaMatches.length);

// Check if all media queries have closing braces
let openCount = 0;
let closeCount = 0;
for (const ch of css) {
    if (ch === '{') openCount++;
    if (ch === '}') closeCount++;
}
console.log('Total opens:', openCount, 'Total closes:', closeCount);

// Find unclosed media query
let pos = 0;
let depth = 0;
let inMedia = false;
let mediaStart = -1;
let lines = css.split('\n');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const ch of line) {
        if (ch === '{') { depth++; if (line.includes('@media') && !inMedia) { inMedia = true; mediaStart = i+1; } }
        if (ch === '}') { depth--; if (inMedia && depth === 0) { inMedia = false; } }
    }
}
console.log('Unclosed media query:', inMedia ? 'YES (started at line ' + mediaStart + ')' : 'NO');

// Check which CSS rules come after the last media query
const lastMediaIdx = css.lastIndexOf('@media');
if (lastMediaIdx >= 0) {
    console.log('CSS after last @media:', css.substring(lastMediaIdx).length, 'chars');
}

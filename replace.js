import fs from 'fs';
const content = fs.readFileSync('src/main.js', 'utf8');
const newContent = content.replace(/callSupabase/g, 'callFirebase');
fs.writeFileSync('src/main.js', newContent);
console.log('Done');

// generate-assets-cdn.js
const fs = require('fs');
const path = require('path');

const REPO_USER = 'CoderandHacker69';
const REPO_NAME = 'Ports';
const BRANCH = 'main';
const ASSET_FOLDER = path.join(__dirname, 'slice-master', 'files', 'assets'); // adjust if your assets folder is elsewhere

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(filePath));
        } else {
            results.push(filePath);
        }
    });
    return results;
}

const allFiles = walk(ASSET_FOLDER).map(f => {
    // Make path relative to repo root
    const relativePath = path.relative(__dirname, f).replace(/\\/g, '/');
    return {
        name: path.basename(f),
        url: `https://cdn.jsdelivr.net/gh/${REPO_USER}/${REPO_NAME}@${BRANCH}/${relativePath}`
    };
});

fs.writeFileSync('assets-cdn.json', JSON.stringify(allFiles, null, 2));

console.log('✅ assets-cdn.json generated with', allFiles.length, 'files');

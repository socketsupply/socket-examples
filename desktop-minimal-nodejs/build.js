import fs from 'node:fs/promises';
const [nodeCommand, buildCommand, targetPath] = process.argv;
await fs.copyFile('node', `${targetPath}/node`);
await fs.copyFile('src/index.html', `${targetPath}/index.html`);
await fs.copyFile('src/backend.js', `${targetPath}/backend.js`);

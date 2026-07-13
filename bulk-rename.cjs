/* eslint-disable no-undef */
// bulk-rename.cjs
const fs = require('fs');
const path = require('path');

// 1. Ang iyong Desktop folder path
const folderPath = 'C:\\Users\\Jeffe\\Desktop\\New folder'; 

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("❌ Error: Hindi mahanap o mabuksan ang folder.", err);
    process.exit(1);
  }

  // 2. I-filter ang mga totoong files lang
  const targetFiles = files.filter(file => {
    const fullPath = path.join(folderPath, file);
    return fs.statSync(fullPath).isFile() && !file.startsWith('.');
  });

  // 3. Natural Sorting para sa unnamed files
  targetFiles.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  console.log(`🚀 Nakahanap ng ${targetFiles.length} na files. Sisinimulan na ang pag-rename...\n`);

  // 4. Loop para isa-isang palitan ang pangalan ng files
  targetFiles.forEach((file, index) => {
    const oldFullPath = path.join(folderPath, file);
    const fileExt = path.extname(file); 
    const newFileName = `page-${index + 1}${fileExt}`;
    const newFullPath = path.join(folderPath, newFileName);

    fs.renameSync(oldFullPath, newFullPath);
    console.log(`✅ Renamed: ${file} ➔ ${newFileName}`);
  });

  console.log("\n🟢 BULK RENAMING COMPLETE, BOSS! Ligtas at malinis na ang mga file names mo.");
});
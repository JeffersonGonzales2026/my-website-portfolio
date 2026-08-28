import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// 1. ILAGAY ANG CREDENTIALS MO RITO
cloudinary.config({
  cloud_name: 'mivrxrre',
  api_key: 'YOUR_API_KEY_HERE',
  api_secret: 'YOUR_API_SECRET_HERE',
  secure: true
});

async function uploadFile(relativePath) {
  if (!relativePath || relativePath.startsWith('http')) return relativePath;
  if (relativePath.includes(',')) return relativePath;

  const cleanPath = relativePath.trim();
  const localFilePath = path.join(process.cwd(), 'public', cleanPath);

  if (!fs.existsSync(localFilePath)) {
    console.log(`⚠️ File not found locally: ${cleanPath}`);
    return relativePath;
  }

  const isVideo = cleanPath.match(/\.(mp4|webm|mov|ogg)$/i);

  // BULLETPROOF WINDOWS FIX: Kukunin nito eksakto ang folder name kahit anong OS pa ang gamit mo!
  // Example result: "6 Project Archive/Branding & Identity/Logo Design"
  let folderPath = cleanPath.split('/').slice(2, -1).join('/');

  try {
    console.log(`🚀 Uploading to Cloudinary Folder: portfolio_media/${folderPath}`);
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: `portfolio_media/${folderPath}`, 
      resource_type: isVideo ? 'video' : 'auto',
      use_filename: true,
      unique_filename: false,
      overwrite: true 
    });
    console.log(`✅ Success: ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.error(`❌ Failed: ${err.message}`);
    return relativePath;
  }
}

async function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  console.log(`\n--- SCANNING ${path.basename(filePath)} ---`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  const pathRegex = /(["'])(\/DreamCreations\/[^"']+)\1/g;
  let match;
  const urlsToReplace = [];

  while ((match = pathRegex.exec(content)) !== null) {
    if (!urlsToReplace.includes(match[2])) {
      urlsToReplace.push(match[2]);
    }
  }

  if (urlsToReplace.length === 0) {
    console.log('⚠️ No local links found! Please make sure your file has /DreamCreations/ links.');
    return;
  }

  for (const url of urlsToReplace) {
    const newUrl = await uploadFile(url);
    content = content.split(`"${url}"`).join(`"${newUrl}"`);
    content = content.split(`'${url}'`).join(`'${newUrl}'`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`🎉 Updated ${path.basename(filePath)} successfully!`);
}

async function start() {
  // 1. I-process LANG ang Photography
  await processFile(path.join(process.cwd(), 'src', 'data', 'offlinePhotography.js'));
  
  // 2. Naka-comment out ito para hindi na galawin ang Archive (dahil okay na ito!)
  // await processFile(path.join(process.cwd(), 'src', 'data', 'offlineArchive.js'));
  
  console.log('\n✨ PHOTOGRAPHY UPLOAD COMPLETE! ✨\n');
}

start();
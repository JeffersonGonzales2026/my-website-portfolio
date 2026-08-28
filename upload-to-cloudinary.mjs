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

async function start() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'offlineArchive.js');
  if (!fs.existsSync(filePath)) {
    console.error("❌ File not found:", filePath);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /https:\/\/res\.cloudinary\.com\/mivrxrre\/(?:image|video)\/upload\/(?:v\d+\/)?portfolio_media\/([^"']+)/g;
  let match;
  
  const fileGroups = new Map();
  const urlToPathMap = new Map();

  while ((match = regex.exec(content)) !== null) {
    const fullUrl = match[0];
    const decodedPath = decodeURIComponent(match[1]); 
    
    const parsed = path.parse(decodedPath);
    const groupKey = `${parsed.dir}/${parsed.name}`;
    
    if (!fileGroups.has(groupKey)) {
      fileGroups.set(groupKey, []);
    }
    
    if (!fileGroups.get(groupKey).includes(fullUrl)) {
      fileGroups.get(groupKey).push(fullUrl);
      urlToPathMap.set(fullUrl, decodedPath);
    }
  }

  const duplicatesToFix = [];
  for (const [key, urls] of fileGroups.entries()) {
    if (urls.length > 1) {
      duplicatesToFix.push(...urls);
    }
  }

  if (duplicatesToFix.length === 0) {
    console.log("✅ Wala nang nakitang nag-ooverwrite sa isa't isa! Fixed na lahat!");
    return;
  }

  console.log(`🔍 Nahanap ang ${duplicatesToFix.length} na files na nag-ooverwrite! Sisimulan na ang pag-aayos...\n`);

  for (const oldUrl of duplicatesToFix) {
    const decodedPath = urlToPathMap.get(oldUrl);
    
    let localFilePath = path.join(process.cwd(), 'public', 'DreamCreations', decodedPath);

    // 🌟 SMART FIX: Kapag hindi nakita yung may "and", hahanapin niya yung folder na may "&"
    if (!fs.existsSync(localFilePath)) {
      const alternatePath = path.join(process.cwd(), 'public', 'DreamCreations', decodedPath.replace(/ and /g, ' & '));
      if (fs.existsSync(alternatePath)) {
        localFilePath = alternatePath;
      }
    }

    if (!fs.existsSync(localFilePath)) {
      console.log(`⚠️ Missing locally (Cannot re-upload): ${localFilePath}`);
      continue;
    }

    const parsed = path.parse(decodedPath);
    const fileName = parsed.name; 
    const fileExt = parsed.ext.replace('.', ''); 
    
    const customPublicId = `${fileName}-${fileExt}`;

    let folderPath = parsed.dir.split(path.sep).join('/');
    folderPath = folderPath.replace(/&/g, 'and');

    const isVideo = fileExt.match(/(mp4|webm|mov|ogg)$/i);

    try {
      console.log(`🚀 Uploading: portfolio_media/${folderPath}/${customPublicId}`);
      const result = await cloudinary.uploader.upload(localFilePath, {
        folder: `portfolio_media/${folderPath}`,
        public_id: customPublicId,
        resource_type: isVideo ? 'video' : 'auto',
        overwrite: true
      });

      content = content.split(`"${oldUrl}"`).join(`"${result.secure_url}"`);
      content = content.split(`'${oldUrl}'`).join(`'${result.secure_url}'`);
      console.log(`✅ Napalitan: ${result.secure_url}\n`);

    } catch (err) {
      console.error(`❌ Failed: ${err.message}`);
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n🎉 DONE! Na-update at na-save na ang ${path.basename(filePath)}! Wala na silang ka-doble!`);
}

start();
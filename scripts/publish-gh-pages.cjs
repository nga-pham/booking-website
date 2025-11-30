const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  const repo = 'https://github.com/nga-pham/booking-website.git';
  const projectRoot = path.resolve(__dirname, '..');
  const distDir = path.join(projectRoot, 'dist');

  if (!fs.existsSync(distDir)) {
    console.error('Error: dist directory not found. Run the build first.');
    process.exit(1);
  }

  const tmpDir = path.join(os.tmpdir(), `gh-pages-deploy-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  copyRecursiveSync(distDir, tmpDir);

  // Init git repo and push
  execSync('git init', { cwd: tmpDir, stdio: 'inherit' });
  execSync('git add .', { cwd: tmpDir, stdio: 'inherit' });
  execSync(`git commit -m "Deploy to gh-pages: ${new Date().toISOString()}"`, { cwd: tmpDir, stdio: 'inherit' });
  execSync(`git push --force ${repo} master:gh-pages`, { cwd: tmpDir, stdio: 'inherit' });

  console.log('\nSuccessfully deployed to gh-pages.');
} catch (err) {
  console.error('\nDeployment failed:');
  console.error(err && err.message ? err.message : err);
  process.exit(1);
}

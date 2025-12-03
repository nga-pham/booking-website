const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'partners.json');
const raw = fs.readFileSync(dataPath, 'utf8');
const partners = JSON.parse(raw);

function parseToSeconds(t) {
  if (typeof t === 'number' && !isNaN(t)) return t;
  if (typeof t === 'string') {
    const parts = t.split(':').map(p => Number(p));
    if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return (parts[0] * 3600) + (parts[1] * 60) + (parts[2] ? parts[2] : 0);
    }
    const n = Number(t);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

const categoriesToMatch = ['Body'];
const reqStart = parseToSeconds('09:00');
const reqEnd = parseToSeconds('12:00');

const matched = partners.filter(partner => {
  const partnerCats = Array.isArray(partner.categories) ? partner.categories : [];
  const intersect = partnerCats.some(c => categoriesToMatch.includes(c));
  if (!intersect) return false;
  const pStart = parseToSeconds(partner.startTime);
  const pEnd = parseToSeconds(partner.endTime);
  return pStart <= reqStart && pEnd >= reqEnd;
});

console.log('Matches for category [Body], 09:00-12:00:');
matched.forEach(p => console.log('-', p.name));
console.log('\nTotal:', matched.length);

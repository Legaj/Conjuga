import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {conjugate,verbEntries,tenses} from '../src/verbs.js';
import {normalizeAnswer,isDue,updateCard,rankPool,statsFor,DAY} from '../src/review.js';
const words=JSON.parse(readFileSync(new URL('../data/words.json',import.meta.url)));
for(const lang of ['es','sv']){
 assert.ok(words[lang].length>=1000,`${lang} needs at least 1000 distinct vocabulary items`);
 assert.equal(new Set(words[lang].map(x=>x.id)).size,words[lang].length);
 assert.equal(new Set(words[lang].map(x=>x.word.toLocaleLowerCase())).size,words[lang].length);
 for(let w of words[lang]){assert.ok(w.word&&w.meaning&&w.category);assert.ok(existsSync(new URL(`../assets/illustrations/${w.id}.svg`,import.meta.url)));}
}
assert.equal(words.sv.filter(w=>w.verifiedORD).length,40);
const cases={
 'pagar|preterito|0':'pagué','llegar|preterito|0':'llegué','buscar|preterito|0':'busqué',
 'ser|presente|0':'soy','ser|preterito|2':'fue','ser|imperfecto|3':'éramos',
 'ir|presente|2':'va','ir|preterito|5':'fueron','ir|imperfecto|0':'iba','ir|perfecto|1':'has ido',
 'tener|presente|0':'tengo','tener|imperfecto|3':'teníamos','tener|preterito|4':'tuvisteis','tener|futuro|0':'tendré','tener|condicional|0':'tendría',
 'hacer|presente|2':'hace','hacer|preterito|2':'hizo','hacer|perfecto|1':'has hecho','hacer|pluscuamperfecto|3':'habíamos hecho',
 'estar|preterito|0':'estuve','estar|presente|4':'estáis','estar|imperfecto|5':'estaban',
 'hablar|presente|4':'habláis','hablar|preterito|4':'hablasteis','hablar|imperfecto|3':'hablábamos','hablar|futuro|0':'hablaré',
 'comer|presente|3':'comemos','comer|preterito|5':'comieron','comer|imperfecto|4':'comíais',
 'vivir|presente|4':'vivís','vivir|pluscuamperfecto|0':'había vivido',
 'seguir|presente|0':'sigo','seguir|presente|1':'sigues','conseguir|presente|0':'consigo','conseguir|preterito|2':'consiguió',
 'pedir|presente|0':'pido','pedir|presente|3':'pedimos','pedir|preterito|2':'pidió','pedir|preterito|5':'pidieron',
 'dormir|presente|0':'duermo','dormir|presente|3':'dormimos','dormir|preterito|2':'durmió',
 'poder|presente|0':'puedo','poder|preterito|2':'pudo','poder|futuro|3':'podremos',
 'venir|presente|2':'viene','venir|preterito|0':'vine','venir|futuro|5':'vendrán',
 'querer|presente|1':'quieres','querer|preterito|0':'quise','querer|condicional|5':'querrían',
 'decir|presente|2':'dice','decir|preterito|5':'dijeron','decir|futuro|3':'diremos','decir|perfecto|2':'ha dicho',
 'traer|preterito|5':'trajeron','traer|perfecto|1':'has traído','poner|preterito|0':'puse','poner|perfecto|1':'has puesto',
 'oír|presente|0':'oigo','oír|presente|2':'oye','oír|preterito|2':'oyó','oír|perfecto|0':'he oído',
 'construir|presente|0':'construyo','construir|presente|1':'construyes','construir|preterito|2':'construyó',
 'caer|presente|0':'caigo','caer|preterito|2':'cayó','caer|perfecto|2':'ha caído',
 'despertarse|presente|0':'me despierto','despertarse|preterito|0':'me desperté','vestirse|preterito|2':'se vistió','levantarse|pluscuamperfecto|3':'nos habíamos levantado',
 'reír|presente|0':'río','reír|preterito|2':'rio','reír|futuro|0':'reiré',
 'hablar|condicional|3':'hablaríamos','dar|preterito|0':'di','ver|preterito|2':'vio','ver|imperfecto|2':'veía',
 'traducir|preterito|5':'tradujeron','conocer|presente|0':'conozco',
 'empezar|preterito|0':'empecé','jugar|presente|0':'juego','jugar|presente|3':'jugamos',
};
for(const [key,expected] of Object.entries(cases)){let [inf,tense,p]=key.split('|');assert.equal(conjugate(inf,tense,Number(p)),expected,key)}
for(const v of verbEntries)for(const t of Object.keys(tenses))for(let p=0;p<6;p++){const a=conjugate(v.word,t,p);assert.ok(a,`${v.word} ${t} ${p} was not generated`);assert.ok(!/undefined|null|NaN/.test(a),`${v.word},${t},${p}: ${a}`)}
assert.notEqual(normalizeAnswer('hablé'),normalizeAnswer('hable'));
assert.equal(normalizeAnswer('  HABLE  ',{ignoreAccents:true}),'hable');
const now=Date.now();let p=updateCard(null,'again',now);assert.equal(p.seen,1);assert.equal(p.lapses,1);assert.equal(p.due,now+10*60*1000);assert.equal(isDue({'es-1':p},'es-1',now),false);p=updateCard(p,'good',now);assert.equal(p.interval,1);assert.equal(p.right,1);p=updateCard(p,'easy',now);assert.ok(p.interval>=5);
const pool=rankPool(words.sv,{},'new');assert.equal(pool.length,words.sv.length);assert.equal(rankPool(words.sv,{},'due').length,0);
assert.equal(statsFor(words.es,{},[]).total,words.es.length);
console.log(`PASS core: ${Object.keys(cases).length} verb spot-checks; ${verbEntries.length*Object.keys(tenses).length*6} generated forms; ${words.es.length}+${words.sv.length} unique vocabulary words with illustrations; scheduler tests.`);

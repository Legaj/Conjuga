// Forms are derived only for supported patterns; known irregularities are explicit.
export const pronouns=['yo','tú','él / ella / usted','nosotros','vosotros','ellos / ellas / ustedes'];
export const tenses={presente:'Presens',preterito:'Pretérito',imperfecto:'Imperfekt',perfecto:'Perfekt',pluscuamperfecto:'Pluskvamperfekt',futuro:'Futurum',condicional:'Konditionalis'};
const DATA=`hablar|tala|;comer|äta|;vivir|bo eller leva|;estudiar|studera|;trabajar|arbeta|;aprender|lära sig|;escribir|skriva|;abrir|öppna|;pagar|betala|;llegar|anlända|;buscar|leta|;caminar|promenera|;escuchar|lyssna|;mirar|titta|;comprar|köpa|;vender|sälja|;necesitar|behöva|;ayudar|hjälpa|;esperar|vänta eller hoppas|;visitar|besöka|;viajar|resa|;cocinar|laga mat|;lavar|tvätta|;limpiar|städa|;descansar|vila|;preguntar|fråga|;contestar|svara|;beber|dricka|;correr|springa|;leer|läsa|;comprender|förstå|;responder|besvara|;romper|ha sönder|;recibir|få eller ta emot|;compartir|dela|;permitir|tillåta|;decidir|bestämma|;asistir|delta|;discutir|diskutera|;insistir|insistera|;ser|vara (identitet)|irregular;estar|vara (tillstånd)|irregular;tener|ha|irregular;ir|gå eller åka|irregular;hacer|göra|irregular;poder|kunna|irregular;querer|vilja|irregular;decir|säga|irregular;venir|komma|irregular;poner|ställa eller sätta|irregular;salir|gå ut eller lämna|irregular;dar|ge|irregular;ver|se|irregular;saber|veta|irregular;haber|ha (hjälpverb)|irregular;traer|ta med|irregular;oír|höra|irregular;pedir|be om|e-i;servir|servera|e-i;seguir|följa|e-i;repetir|upprepa|e-i;conseguir|uppnå|e-i;sentir|känna|e-ie;mentir|ljuga|e-ie;preferir|föredra|e-ie;divertirse|ha roligt|e-ie,reflexive;dormir|sova|o-ue;morir|dö|o-ue;volver|återvända|o-ue;encontrar|hitta|o-ue;recordar|minnas|o-ue;contar|räkna eller berätta|o-ue;mostrar|visa|o-ue;probar|prova|o-ue;cerrar|stänga|e-ie;empezar|börja|e-ie;comenzar|börja|e-ie;entender|förstå|e-ie;pensar|tänka|e-ie;perder|förlora|e-ie;despertarse|vakna|e-ie,reflexive;levantarse|stiga upp|reflexive;llamarse|heta|reflexive;ducharse|duscha|reflexive;acostarse|lägga sig|o-ue,reflexive;vestirse|klä på sig|e-i,reflexive;sentarse|sätta sig|e-ie,reflexive;afeitarse|raka sig|reflexive;enojarse|bli arg|reflexive;atreverse|våga|reflexive;conocer|känna till|irregular;traducir|översätta|irregular;conducir|köra|irregular;producir|producera|irregular;construir|bygga|irregular;huir|fly|irregular;jugar|spela eller leka|u-ue;caer|falla|irregular;creer|tro|irregular;reír|skratta|e-i;sonreír|le|e-i;andar|gå|irregular;sentir|känna|e-ie;incluir|inkludera|irregular;destruir|förstöra|irregular`;
export const verbs=Object.fromEntries(DATA.split(';').map(x=>{const [inf,meaning,flags='']=x.split('|');return [inf,{meaning,flags:flags.split(',').filter(Boolean)}]}));
const e={ar:{presente:['o','as','a','amos','áis','an'],preterito:['é','aste','ó','amos','asteis','aron'],imperfecto:['aba','abas','aba','ábamos','abais','aban']},er:{presente:['o','es','e','emos','éis','en'],preterito:['í','iste','ió','imos','isteis','ieron'],imperfecto:['ía','ías','ía','íamos','íais','ían']},ir:{presente:['o','es','e','imos','ís','en'],preterito:['í','iste','ió','imos','isteis','ieron'],imperfecto:['ía','ías','ía','íamos','íais','ían']}};
const future=['é','ás','á','emos','éis','án'],conditional=['ía','ías','ía','íamos','íais','ían'];
const haberAux={perfecto:['he','has','ha','hemos','habéis','han'],pluscuamperfecto:['había','habías','había','habíamos','habíais','habían']};
const fixed={
ser:{presente:['soy','eres','es','somos','sois','son'],preterito:['fui','fuiste','fue','fuimos','fuisteis','fueron'],imperfecto:['era','eras','era','éramos','erais','eran']},
ir:{presente:['voy','vas','va','vamos','vais','van'],preterito:['fui','fuiste','fue','fuimos','fuisteis','fueron'],imperfecto:['iba','ibas','iba','íbamos','ibais','iban']},
ver:{presente:['veo','ves','ve','vemos','veis','ven'],imperfecto:['veía','veías','veía','veíamos','veíais','veían']},
estar:{presente:['estoy','estás','está','estamos','estáis','están']},
dar:{presente:['doy','das','da','damos','dais','dan'],preterito:['di','diste','dio','dimos','disteis','dieron']},
saber:{presente:['sé','sabes','sabe','sabemos','sabéis','saben']},
haber:{presente:['he','has','ha','hemos','habéis','han'],preterito:['hube','hubiste','hubo','hubimos','hubisteis','hubieron']},
oír:{presente:['oigo','oyes','oye','oímos','oís','oyen']},
caer:{presente:['caigo','caes','cae','caemos','caéis','caen']},
traer:{presente:['traigo','traes','trae','traemos','traéis','traen']},
construir:{presente:['construyo','construyes','construye','construimos','construís','construyen']},
huir:{presente:['huyo','huyes','huye','huimos','huís','huyen']},
incluir:{presente:['incluyo','incluyes','incluye','incluimos','incluís','incluyen']},
destruir:{presente:['destruyo','destruyes','destruye','destruimos','destruís','destruyen']},
creer:{presente:['creo','crees','cree','creemos','creéis','creen']},
reír:{presente:['río','ríes','ríe','reímos','reís','ríen'],preterito:['reí','reíste','rio','reímos','reísteis','rieron']},
sonreír:{presente:['sonrío','sonríes','sonríe','sonreímos','sonreís','sonríen'],preterito:['sonreí','sonreíste','sonrió','sonreímos','sonreísteis','sonrieron']},
conocer:{presente:['conozco','conoces','conoce','conocemos','conocéis','conocen']},
traducir:{presente:['traduzco','traduces','traduce','traducimos','traducís','traducen']},
conducir:{presente:['conduzco','conduces','conduce','conducimos','conducís','conducen']},
producir:{presente:['produzco','produces','produce','producimos','producís','producen']},
poner:{presente:['pongo','pones','pone','ponemos','ponéis','ponen']},
salir:{presente:['salgo','sales','sale','salimos','salís','salen']},
hacer:{presente:['hago','haces','hace','hacemos','hacéis','hacen']},
venir:{presente:['vengo','vienes','viene','venimos','venís','vienen']},
decir:{presente:['digo','dices','dice','decimos','decís','dicen']},
tener:{presente:['tengo','tienes','tiene','tenemos','tenéis','tienen']},
poder:{presente:['puedo','puedes','puede','podemos','podéis','pueden']},
querer:{presente:['quiero','quieres','quiere','queremos','queréis','quieren']},
andar:{preterito:['anduve','anduviste','anduvo','anduvimos','anduvisteis','anduvieron']},
};
const preteriteIrregularStems={tener:'tuv',estar:'estuv',poder:'pud',poner:'pus',saber:'sup',venir:'vin',querer:'quis',hacer:'hic',decir:'dij',traer:'traj',traducir:'traduj',conducir:'conduj',producir:'produj',andar:'anduv',haber:'hub'};
const futureStems={tener:'tendr',poner:'pondr',salir:'saldr',venir:'vendr',poder:'podr',saber:'sabr',haber:'habr',hacer:'har',decir:'dir',querer:'querr'};
const parts={caer:'caído',creer:'creído',oír:'oído',traer:'traído',reír:'reído',sonreír:'sonreído',abrir:'abierto',cubrir:'cubierto',decir:'dicho',escribir:'escrito',hacer:'hecho',morir:'muerto',poner:'puesto',resolver:'resuelto',romper:'roto',ver:'visto',volver:'vuelto',freír:'frito'};
const reflexPron=['me','te','se','nos','os','se'];
export function conjugate(input,tense,person){
 if(!Number.isInteger(person)||person<0||person>5)return null;
 let word=input;const v=verbs[word];if(!v||!tenses[tense])return null;
 let reflexive=v.flags.includes('reflexive');let root=reflexive?word.slice(0,-2):word;
 const cls=root.slice(-2).replace('í','i');if(!['ar','er','ir'].includes(cls))return null;let stem=root.slice(0,-2),out;
 if(haberAux[tense]){
  const participle=parts[root]||(stem+(cls==='ar'?'ado':'ido'));
  // The verb 'ir' has participle 'ido', although the naive stem is empty.
  out=haberAux[tense][person]+' '+participle;
 } else if(tense==='futuro'||tense==='condicional'){
   out=(futureStems[root]||(['oír','reír','sonreír'].includes(root)?root.replace('í','i'):root))+(tense==='futuro'?future:conditional)[person];
 } else if(fixed[root]?.[tense]){
   out=fixed[root][tense][person];
 } else if(tense==='imperfecto'){
   out=stem+e[cls].imperfecto[person];
 } else if(tense==='presente'){
   let changed=stem;const f=v.flags;
   if(![3,4].includes(person)){
      const flag=f.find(x=>['e-ie','e-i','o-ue','u-ue'].includes(x));
      if(flag){const [a,b]=flag.split('-');const i=stem.lastIndexOf(a);if(i!==-1)changed=stem.slice(0,i)+b+stem.slice(i+1)}
   }
   if(root==='jugar'&&person===0)changed='jueg';
   // Seguir / conseguir drop the silent u of -guir before the first-person -o.
   if(person===0&&root.endsWith('guir'))changed=changed.slice(0,-1);
   out=changed+e[cls].presente[person];
 } else if(tense==='preterito'){
   if(preteriteIrregularStems[root]){
     const base=preteriteIrregularStems[root];const j=/j$/.test(base);
     const ends=j?['e','iste','o','imos','isteis','eron']:['e','iste','o','imos','isteis','ieron'];
     out=(root==='hacer'&&person===2?'hiz':base)+ends[person];
   }else if(root==='ver'){
     out=['vi','viste','vio','vimos','visteis','vieron'][person];
   }else if(['caer','creer','oír','construir','huir','incluir','destruir'].includes(root)&&[2,5].includes(person)){
     const s=stem;out=s+(person===2?'yó':'yeron');
   }else if(['caer','creer','oír','construir','huir','incluir','destruir'].includes(root)){
     // yod forms only apply to third person; other forms retain accented i in -eer/-aer/-oír.
     out=stem+(cls==='ir'?e.ir.preterito[person]:['í','íste','ió','ímos','ísteis','ieron'][person]);
     if(['construir','huir','incluir','destruir'].includes(root))out=stem+e.ir.preterito[person];
     if(['caer','creer','oír'].includes(root))out=stem+['í','íste','ió','ímos','ísteis','ieron'][person];
   }else{
     let changed=stem;
     if(cls==='ir'&&[2,5].includes(person)){
       const f=v.flags.find(x=>['e-ie','e-i','o-ue'].includes(x));
       if(f){const from=f[0],to=f==='o-ue'?'u':'i',i=stem.lastIndexOf(from);if(i!==-1)changed=stem.slice(0,i)+to+stem.slice(i+1)}
     }
     if(person===0&&root.endsWith('car'))changed=stem.slice(0,-1)+'qu';
     if(person===0&&root.endsWith('gar'))changed=stem+'u';
     if(person===0&&root.endsWith('zar'))changed=stem.slice(0,-1)+'c';
     out=changed+e[cls].preterito[person];
   }
 } else return null;
 return reflexive?`${reflexPron[person]} ${out}`:out;
}
export const verbEntries=Object.entries(verbs).map(([word,v])=>({word,...v}));

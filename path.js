(()=>{'use strict';
const $=id=>document.getElementById(id),root=$('pathStages');if(!root)return;
const BOOKS=['','','','','Compendium of Cosmic Consciousness','Seeker Companion Workbook','Compendium of Initiation','Initiate Companion Workbook','Compendium of Adeptship','Adept Companion Workbook','Compendium of Mastery','Master Companion Workbook'];
const IDS=["1TOVzh2CAZpSxRebRBO3ReX1qWZhwf7EK","1n1fvUqnbXuFCJZfFA883z-MUV_sOen7F","1YPFPBWrNpkagT3rz14FnihIMqRTYvpOx","1Hhes5ej4qo97wT46OGXIV9SUzP87JMpx","1oSSO3g-tcf2dNfDZ7EcmPJnzgw5XjuNU","1qVwZFMkmTpx7P2_jztzGna3UeU8rGsjw","1gMlCXfDav8X0rjXdAoza66e5tqY9Mjur","15bpLssTWIVkqPDx6te-nQi-poKw68uE4","138XH0h3vVOZfKm55XC1EdjnUWtBV_A2G","15e1rFXANUYrIv6sxqQFo_d02sZd4qcj_","1Q20t9r3sdHQI0L0Qe74rWC8nCQg0-jyi","1iJCMGMW71166Ar-iDRVcTvjv0Dx5zlRs"];
const names=['Seeker','Initiate','Adept','Master'],key='ccc-path-checks-v1';
let curriculum,checked={};
try{const x=JSON.parse(localStorage.getItem(key)||'{}');if(x&&typeof x==='object'&&!Array.isArray(x))checked=x}catch{}
const make=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
function save(){try{localStorage.setItem(key,JSON.stringify(checked))}catch{alert('Progress could not be saved. Export a backup when possible.')}}
function link(idx){const a=make('a','book-link',`Open ${BOOKS[idx]} ↗`);a.href='https://drive.google.com/file/d/'+IDS[idx]+'/view';a.target='_blank';a.rel='noopener noreferrer';return a}
function journal(prompt,label){const b=make('button','outline','Write reflection in journal →');b.addEventListener('click',()=>{document.querySelector('[data-go="journal"]').click();const n=$('note');n.value=`[The Path · ${label}]\n${prompt}\n\n`;n.focus()});return b}
function tasks(){
 const plans=[];
 curriculum.seeker.forEach((w,i)=>{
 const label=w[0],prefix=`S-${i+1}`,book=4,workbook=5;
 plans.push({stage:0,group:label,unit:label,steps:[
 {id:`${prefix}-read`,verb:'1 · Read',desc:`Read ${w[1]} in the Seeker compendium.`,book},
 {id:`${prefix}-lesson`,verb:'2 · Study',desc:`Work through ${w[2]} in the compendium.`,book},
 {id:`${prefix}-work`,verb:'3 · Answer in workbook',desc:`Open ${label.toLowerCase()} in the Seeker Companion Workbook. Complete its guided reflection questions and written exercises.`,question:i===0?w[3]:null,workbook},
 {id:`${prefix}-review`,verb:'4 · Practice and review',desc:'Complete the week’s contemplative exercise, journal prompt, practical integration assignment, and weekly progress review in the workbook.',workbook}
 ]});
 });
 const groups={
 1:['Threshold of Initiation','Constructed Self','Disciplines of Attention','Radical Nonduality','The Cosmic Synthesicon','The Cypher of Unity','Returning to Nature','Integration and Assessment'],
 2:['The Limits of Knowing','Phenomenology and Direct Inquiry','The Depths of Radical Nonduality','The Art of Comparative Synthesis','Dialectical Mastery and the Cypher','Conditioning, Systems, and Interdependence','Ethical Embodiment and Service','Integration and the Threshold of Mastery'],
 3:['The Nature and Limits of Mastery','Advanced Integration of Knowledge','The Art of Philosophical Transmission','Ethical Mentorship and Leadership','Advanced Dialectics and Conflict Resolution','Wisdom in Service to the World','Original Contribution and Independent Scholarship','The Threshold of Responsible Transmission']
 };
 [['initiate',1,6,7,2],['adept',2,8,9,3],['master',3,10,11,4]].forEach(([field,stage,book,workbook,per])=>{
 curriculum[field].forEach((lesson,i)=>{
 const group=`Module ${i/per+1|0} — ${groups[stage][Math.floor(i/per)]}`;
 const code=lesson.id;
 plans.push({stage,group,unit:`${code} · ${lesson.title}`,steps:[
 {id:`${code}-read`,verb:'1 · Read',desc:`Read Guided Lesson ${code} — ${lesson.title} in ${BOOKS[book]}.`,book},
 {id:`${code}-work`,verb:'2 · Answer in workbook',desc:`Find ${code} in ${BOOKS[workbook]}. Write your response to the lesson’s inquiry and complete the accompanying written exercises.`,question:lesson.question,workbook},
 {id:`${code}-apply`,verb:'3 · Apply and reflect',desc:`Complete the corresponding practice, applied investigation, and/or reflection record in the workbook for ${code}. Note your evidence, uncertainties, and next steps.`,workbook}
 ]});
 });
 });
 return plans;
}
let plan=[],openStage=0;
function count(stage){const all=plan.filter(p=>p.stage===stage).flatMap(p=>p.steps);return {done:all.filter(s=>checked[s.id]).length,total:all.length}}
function progressUpdate(){
 const all=plan.flatMap(p=>p.steps),done=all.filter(s=>checked[s.id]).length,total=all.length;
 $('pathOverallBar').max=total;$('pathOverallBar').value=done;
 $('pathOverallText').textContent=`${done} of ${total} tasks complete · ${Math.round(done/total*100)}%`;
 const next=all.find(s=>!checked[s.id]);$('pathNext').textContent=next?`Next step: ${next.verb} — ${next.desc}`:'All app study checkpoints complete. Consult the published assessment requirements for formal stage completion.';
 document.querySelectorAll('[data-path-stage]').forEach(e=>{const n=Number(e.dataset.pathStage),c=count(n);e.querySelector('progress').max=c.total;e.querySelector('progress').value=c.done;e.querySelector('.path-count').textContent=`${c.done} / ${c.total} tasks · ${Math.round(c.done/c.total*100)}%`});
}
function render(){
 root.replaceChildren();
 names.forEach((name,stage)=>{
 const c=count(stage),panel=make('section','panel path-stage');panel.dataset.pathStage=String(stage);
 const header=make('button','path-stage-head');header.type='button';header.setAttribute('aria-expanded',String(stage===openStage));
 const left=make('span','path-stage-title',`${stage+1}. ${name}`),right=make('span','path-count',`${c.done} / ${c.total} tasks`);header.append(left,right);
 const bar=make('progress','path-bar');bar.max=c.total;bar.value=c.done;
 const body=make('div','path-stage-body');body.hidden=stage!==openStage;
 header.addEventListener('click',()=>{openStage=openStage===stage?-1:stage;render()});
 panel.append(header,bar,body);
 if(stage===openStage){
 const intro=make('p','muted',`Complete each task in order. Use the official ${name} compendium and its companion workbook. Checkmarks are saved automatically.`);body.append(intro);
 const links=make('div','stage-links');links.append(link(4+stage*2),link(5+stage*2));body.append(links);
 let lastGroup='';
 plan.filter(p=>p.stage===stage).forEach(unit=>{
 if(unit.group!==lastGroup){lastGroup=unit.group;body.append(make('h3','path-module',unit.group))}
 const unitBox=make('div','path-unit');unitBox.append(make('h4','',unit.unit));
 unit.steps.forEach(step=>{
 const row=make('div','path-task'),lab=make('label','path-check'),input=make('input');input.type='checkbox';input.checked=!!checked[step.id];input.addEventListener('change',()=>{checked[step.id]=input.checked;save();row.classList.toggle('path-done',input.checked);progressUpdate()});lab.append(input,make('strong','',step.verb));row.append(lab,make('p','',step.desc));if(step.question)row.append(make('p','path-question',`Workbook question: ${step.question}`));if(step.book!==undefined)row.append(link(step.book));if(step.workbook!==undefined)row.append(link(step.workbook));if(step.verb.includes('Apply')||step.verb.includes('Practice'))row.append(journal(step.question||`Reflect on ${unit.unit}: what did you observe, learn, and leave unresolved?`,unit.unit));row.classList.toggle('path-done',input.checked);unitBox.append(row)
 });body.append(unitBox);
 });
 }
 root.append(panel);
 });
 progressUpdate()
}
$('pathExport').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({format:'ccc-path-v1',exported:new Date().toISOString(),checked},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='ccc-the-path-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)});
$('pathReset').addEventListener('click',()=>{if(confirm('Clear all Path checkmarks on this device? Your journal and other app progress will not be changed.')){checked={};save();render()}});
fetch('./path-curriculum.json').then(r=>{if(!r.ok)throw Error('Missing curriculum');return r.json()}).then(d=>{curriculum=d;plan=tasks();render()}).catch(()=>{$('pathOverallText').textContent='Unable to load the study path. Check that path-curriculum.json was uploaded to GitHub and refresh.'});
})();
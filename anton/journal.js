const journalKey = 'anton-trail-journal-v1';
let entries = [];
try {
  const saved = JSON.parse(sessionStorage.getItem(journalKey));
  if (Array.isArray(saved)) entries = saved;
} catch {}
function recordEntry(entry) {
  entries.push(entry);
  try { sessionStorage.setItem(journalKey, JSON.stringify(entries)); } catch {}
}
function recordTrailClick(event) {
  const link = event.target.closest('a.gem');
  if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const match = /^#(purpose|beliefs|values|morals)\/(watch|listen|read)(?:\/([12])\/(yes|no|pause))?$/.exec(link.hash);
  if (!match) return;
  const [,theme,mode,round,answer] = match;
  recordEntry({type:round?'decision':'path',theme,mode,round,answer});
}
document.addEventListener('click',recordTrailClick);
const practices = {
  yes:['Accepting a request','someone who readily steps forward when a neighbor needs help. Keep asking what kind of help the other person actually wants.'],
  no:['Declining a request','someone who can give an honest answer when a request feels wrong or comes at a cost. Pay attention to who carries that cost when you say no.'],
  pause:['Pausing to observe','someone who takes time to notice what others miss. Practice recognizing the moment when someone needs you to act.']
};
function showJournal() {
  cover.hidden=true; story.hidden=false;
  const decisions=entries.filter(entry=>entry.type==='decision');
  const distinct=new Set(decisions.map(entry=>entry.theme+entry.round)).size;
  const counts=Object.keys(practices).map(key=>decisions.filter(entry=>entry.answer===key).length);
  story.innerHTML='<article><h1 tabindex="-1">Your character journal</h1><h2>Moral manifestation</h2><p>Practice across the eight story encounters</p><progress aria-label="Encounters practiced" max="8" value="'+distinct+'"></progress><p>'+distinct+' of 8 encounters practiced. Replaying a scene adds to your choice history and counts once toward coverage.</p><section id="patterns"></section><details><summary>Your reflections and path</summary><ol id="history"></ol></details><h2>Ten years from here</h2><p id="portrait"></p><a href="#cover">Back to the cover</a></article>';
  const patterns=story.querySelector('#patterns');
  if(decisions.length){
    Object.values(practices).forEach(([label],i)=>{
      const row=document.createElement('p');
      row.textContent=label+' · '+counts[i]+' of '+decisions.length;
      const bar=document.createElement('progress');
      bar.max=decisions.length;bar.value=counts[i];bar.setAttribute('aria-label',label);
      row.append(bar);patterns.append(row);
    });
  }
  const log=story.querySelector('#history');
  for(const entry of entries){
    const row=document.createElement('li');
    const index=adventures.findIndex(([name])=>name.toLowerCase()===entry.theme);
    if(index<0) continue;
    let detail=entry.mode;
    if(entry.type==='reflection') detail=entry.prompt+' — '+entry.text;
    if(entry.type==='decision') detail=entry.mode+' · '+encounters[index][Number(entry.round)-1][0]+' — '+answers.find(([key])=>key===entry.answer)[1];
    row.textContent=adventures[index][0]+' · '+detail;
    log.append(row);
  }
  const leaders=Object.keys(practices).filter((key,i)=>counts[i]===Math.max(...counts));
  let portrait='Make a choice in a story to begin your ten-year reflection.';
  if(decisions.length){
    const profile=leaders.length===1?practices[leaders[0]][1]:'someone who draws on several responses. Think back to one time your choice helped someone and one time another response might have served them better.';
    portrait='If you practiced this pattern in everyday life for ten years, you might become '+profile;
  }
  story.querySelector('#portrait').textContent=portrait;
  document.title='Your character journal · Anton the Majestic Ant';
  story.querySelector('h1').focus();window.scrollTo(0,0);
}

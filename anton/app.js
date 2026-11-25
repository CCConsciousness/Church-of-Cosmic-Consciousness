const adventures=[
["Purpose","A Bridge Before Breakfast","Anton had gone out to fetch a crumb. At the creek he found a beetle walking up and down the bank, carrying a parcel too large to swim with. Anton laid a grass stem across the water and sat on one end until the beetle reached the other side. His breakfast could wait another minute.","Who could use a hand on your way today?"],
["Beliefs","The Seed That Flew","“Seeds belong on the ground,” Anton told a ladybird. Just then a tuft of dandelion brushed his antenna. He followed it up a bank and watched it settle in damp soil. The ladybird waited. “I think,” Anton said at last, “I have only met seeds after they land.”","When has seeing something for yourself changed your mind?"],
["Values","Room Under the Leaf","Rain rattled the dock leaf above Anton. A muddy stranger squeezed under its edge. Anton liked his corner clean, yet he remembered how cold rain felt on his back. He shifted his lunch onto his lap. Soon two ants sat dry, watching drops roll off the tip.","What matters to you when sharing costs you something?"],
["Morals","The Missing Crumb","Anton found a honey crumb beside the trail and took a bite. Then he spotted the little notch his sister always carved in her lunch. He carried the rest home. “I ate your corner,” he told her. “Would you like half of mine?” She considered the two pieces carefully and chose the larger one.","How could you put something right after a mistake?"]
];
const matrix=document.querySelector('#matrix'),cover=document.querySelector('#cover'),story=document.querySelector('#story');
adventures.forEach(([name],i)=>{const a=document.createElement('a');a.className='tile';a.href='#'+name.toLowerCase();a.style.setProperty('--x',i%2*100+'%');a.style.setProperty('--y',Math.floor(i/2)*100+'%');a.innerHTML='<span>'+name+'</span>';matrix.append(a)});
const scenes=[
  ["A beetle paces beside the creek with a parcel on her back.", "🪲","🌿","The beetle touches the grass stem with one foot. It wobbles above the creek.", "If I put my parcel down, the current will take it. Could you hold that stem steady for me?"],
  ["A ladybird points to a white tuft rising above the grass.", "🌱","🐞","A seed sails past the ladybird and settles on the far bank.", "Look closely, Anton. There is a little brown seed hanging under that white umbrella."],
  ["Rain begins to fall. A muddy traveler pauses at Anton’s leaf.", "🐜","🍃","The traveler approaches the leaf as water beads along its edge.", "May I sit beside you until the rain stops? I can leave my muddy bundle outside."],
  ["A honey crumb lies beside the trail. One corner has a familiar notch.", "🐜","🍞","Anton’s sister retraces her steps, stopping at the empty patch where her lunch had been.", "I marked my crumb with a notch this morning. Have you seen one like that along the trail?"]
];
const choices=['Watch','Listen','Read'];
const reflections = {
  "purpose": {
    "paragraphs": [
      "Purpose is a reason you choose to do something. It might be as close as wanting your little brother to know he can count on you. That reason can change an ordinary afternoon. You keep your promise to meet him, even when something easier comes along.",
      "Without a sense of purpose, you can spend a whole day doing whatever calls loudest and still go to bed feeling you missed what mattered. One small commitment gives you somewhere to begin. You can discover more about your purpose by seeing which commitments you want to keep."
    ],
    "questions": [
      "What gives your life a sense of purpose right now?",
      "Think of a time when what you did felt worth the effort. What did that moment tell you about your purpose?",
      "If you could spend your life making one difference for someone, what would you choose?"
    ]
  },
  "beliefs": {
    "paragraphs": [
      "A belief is something you take to be true. If you wave to a friend and she walks past, what you believe about that moment shapes what you do next. You might feel hurt and turn away. You might also wonder whether she saw you.",
      "A belief can give you the courage to try again after a mistake. An assumption you never examine can also cost you a friendship. Asking “What led me to think that?” leaves room to learn something new."
    ],
    "questions": [
      "What is one belief you rely on when things get difficult?",
      "When have you and a friend understood the same event differently? What helped you see their side?",
      "What is something you once felt sure about and later reconsidered? What changed your mind?"
    ]
  },
  "values": {
    "paragraphs": [
      "Values are the things you care enough about to make room for in your life. You can see them in small choices. When you slide over to give someone a dry seat, you give up a little comfort because their comfort matters to you, too.",
      "Sometimes two things you value pull you in different directions. You might want quiet and still want to welcome a friend. Naming both helps you choose with care. When you lose sight of what matters to you, it becomes easy to go along with a choice you later regret."
    ],
    "questions": [
      "What matters enough to you that you would give up some time or comfort for it?",
      "Which value can someone see in an ordinary choice you made this week?",
      "When two things you care about compete, how do you decide which deserves your attention today?"
    ]
  },
  "morals": {
    "paragraphs": [
      "Morals are the principles you use to decide how you ought to treat others. Suppose a shopkeeper gives you too much change. As you turn to leave, you have a choice about what to do with money that belongs to someone else.",
      "Thinking about right and wrong helps you notice who will carry the cost of a choice. If you only ask what you can get away with, someone else may pay for your convenience. Even after a mistake, you can tell the truth, listen, and try to put things right."
    ],
    "questions": [
      "What principle guides you when nobody is watching?",
      "When did doing what you thought was right cost you something?",
      "If a choice of yours hurt someone, what could you do first to make things right?"
    ]
  }
};
function showReflection(slug, name) {
  const {paragraphs, questions} = reflections[slug];
  story.innerHTML = `<article>
    <div class="purpose-panel"><h1 tabindex="-1">${name}</h1>
    ${paragraphs.map(text=>`<p>${text}</p>`).join('')}</div>
    <form id="purpose-form"><fieldset><legend>Choose one question to answer</legend>
    ${questions.map(text=>`<label><input required type="radio" name="prompt"> ${text}</label>`).join('')}
    </fieldset><label for="purpose-answer">Your reflection</label>
    <textarea id="purpose-answer" rows="3" required></textarea>
    <p class="journal-note">Your answers and choices stay in this tab for this browser session.</p>
    <button class="destination" type="submit">Begin Anton’s adventure →</button></form>
    <div class="returns"><a href="#cover">Back to the cover</a></div></article>`;
  const field = story.querySelector('textarea');
  field.oninput = () => field.setCustomValidity('');
  story.querySelector('form').onsubmit = event => {
    event.preventDefault();
    if (!field.value.trim()) {
      field.setCustomValidity('Write a few words before continuing.');
      field.reportValidity();
      return;
    }
    recordEntry({type:'reflection',theme:slug,prompt:story.querySelector('input:checked').parentElement.textContent.trim(),text:field.value.trim()});
    location.hash = slug+'/adventure';
  };
  document.title = name+' · Anton the Majestic Ant';
  story.querySelector('h1').focus();
  window.scrollTo(0,0);
}
function render(){
  const [slug,mode,step,answer]=location.hash.slice(1).split('/');
  if (slug==="journal") return showJournal();
  const index=adventures.findIndex(([name])=>name.toLowerCase()===slug);
  cover.hidden=index>=0;
  story.hidden=index<0;
  story.replaceChildren();
  if(index<0){document.title='Anton the Majestic Ant';return}
  if (!mode) return showReflection(slug, adventures[index][0]);
  const [name,title,body,question]=adventures[index];
  const [intro,traveler,landmark,caption,voice]=scenes[index];
  const modeName=choices.find(choice=>choice.toLowerCase()===mode);
  let content;
  if(!modeName){
    content='<p>'+intro+'</p><p class="prompt">What will Anton do?</p><div class="choices">'+choices.map((choice,i)=>
      '<a class="gem '+choice.toLowerCase()+'" href="#'+slug+'/'+choice.toLowerCase()+'"><b aria-hidden="true">'+['◉','♫','✧'][i]+'</b>'+choice+'</a>').join('')+'</div>';
  }else if(mode==='watch'){
    content='<div class="scene '+slug+'" aria-hidden="true"><span class="traveler">'+traveler+'</span><span class="landmark">'+landmark+'</span></div><p>'+caption+'</p>';
  }else if(mode==='listen'){
    content='<p>Anton pauses to hear the '+['beetle','ladybird','traveler','voice of his sister'][index]+'.</p><audio controls preload="metadata" src="'+slug+'.mp3"></audio><details><summary>Read the spoken words</summary><p>“'+voice+'”</p></details>';
  }else{
    content='<p>'+intro+' '+['A grass stem reaches from one bank to the other, but the near end keeps slipping.', 'Anton has only seen seeds lying on the ground. This one seems to be traveling overhead.', 'The leaf is broad enough for two if Anton moves his lunch.', 'Anton knows that mark. His sister made it before she set out this morning.'][index]+'</p>';
  }
  if(modeName) content=decisionPage(slug,mode,index,step==='2'?1:0,answer,content);
  story.innerHTML='<article><small>'+name+(modeName?' · '+modeName:'')+'</small><h1 tabindex="-1">'+title+'</h1>'+content+'<div class="returns">'+(modeName?'<a href="#'+(slug+'/adventure')+'">← Choose again</a>':'')+'<a href="#cover">Back to the cover</a></div></article>';
  story.querySelector('h1').focus();
  document.title=title+' · '+(modeName?modeName+' · ':'')+'Anton the Majestic Ant';
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',render);render();

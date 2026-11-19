(()=>{'use strict';
const $=id=>document.getElementById(id);
const topics=[
["Welcome to CCC","An invitation to explore radical nonduality without surrendering curiosity or independent judgment."],
["One Reality, Many Expressions","Difference and belonging need not be enemies."],
["What Is the Absolute?","CCC describes the Absolute as beyond the distinction between consciousness and matter."],
["Seeker's First Question","Notice one everyday distinction and ask what it reveals and what it conceals."],
["Science and Spirituality","Scientific methods test empirical claims; philosophical inquiry asks different questions."],
["The Ocean and Wave","A wave and the ocean offer an analogy, not proof of metaphysics."],
["The Four Stages","Seeker, Initiate, Adept and Master are educational stages, not rankings of human worth."],
["Observation and Belief","The willingness to revise a belief is a form of intellectual humility."],
["The Value of Silence","Silence can make room for noticing, without requiring an unusual experience."],
["The Language of Unity","Traditions use different metaphors; their distinctions deserve respect."],
["A Poem of the Rose","The rose can symbolize flourishing without erasing its thorns."],
["What Nonduality Is Not","Nonduality does not deny practical differences or ethical responsibilities."],
["Consciousness and Matter","Neither concept is treated as an exhaustive name for the Absolute."],
["The Free Digital Library","CCC provides a public app and educational resources for independent exploration."],
["Curiosity Over Certainty","Evidence matters; humility leaves room to learn."],
["Compassion in Practice","Listening can be an expression of shared dignity."],
["The Cosmic Synthesicon","Explore the relationships among disciplines without conflating their methods."],
["Beyond the Observer","What changes when we investigate the assumed boundary between observer and observed?"],
["Rhythm and Reality","Schumann resonance is electromagnetic; audio binaural beats are a different phenomenon."],
["Acoustic Praxis","Three optional audio contemplations invite reflection, not medical outcomes."],
["The Cypher of Unity","A debate can reveal hidden assumptions without requiring a winner."],
["A Verse for the Cosmos","Compose an original image of multiplicity without fundamental division."],
["What Is a Mystery School?","Staged learning can encourage disciplined inquiry without exclusive authority."],
["Religious Diversity","Learn from traditions without pretending their teachings are identical."],
["A Practice of Attention","Notice an ordinary sound and return to natural breathing."],
["The Cosmic Praxis","Practice can connect reflection with everyday conduct."],
["Ethics of Unity","Dignity and noncoercion remain essential even when views differ."],
["The Limits of Language","Words illuminate experience but never contain its entirety."],
["Ask COSMIC HERALD","Invite sincere questions while identifying the assistant as AI."],
["The Future Temple Vision","Describe a future contemplative community space as an aspiration, not an existing institution."]
];
const intros={exoteric:"Here is a simple invitation from the Church of Cosmic Consciousness:",mesoteric:"Consider how our everyday concepts can be useful without being final:",esoteric:"An inquiry for those exploring radical nonduality:"};
const lenses={
balanced:"From a scientific perspective, distinguish what can be tested from what is interpreted. From a spiritual perspective, explore direct experience. Religious traditions offer diverse language; art can offer metaphor. None alone should be mistaken for a final description of the Absolute.",
scientific:"Scientific inquiry depends on evidence, clear definitions, and the possibility of correction. CCC's nondual philosophy is a philosophical lens, not an empirical result.",
spiritual:"Pause with your own experience. Notice sensations, thoughts and the space of attention without forcing any particular state.",
religious:"Religious traditions express many different accounts of reality. We can study them respectfully without erasing genuine differences or claiming they all teach the same doctrine.",
artistic:"Imagine a green rose beneath an immense night sky: distinct petals opening toward a horizon that belongs to no single flower. This is a metaphor, not a scientific explanation."
};
const endings={question:"What does this question awaken in your own reflection?",practice:"Take a moment to notice your natural breath and surroundings. No special experience is required.",library:"Explore the free CCC digital library: https://ccconsciousness.github.io/Church-of-Cosmic-Consciousness/"};
function draft(){const i=Number($('day').value),t=topics[i],register=$('register').value,lens=$('expression').value,ending=$('tone').value;
$('output').value=t[0].toUpperCase()+"\n\n"+intros[register]+"\n\n"+t[1]+"\n\n"+lenses[lens]+"\n\n"+endings[ending]+"\n\nOne Reality. Infinite Expressions. No Fundamental Division.\n\n#ChurchOfCosmicConsciousness #Nonduality #Contemplation";
update();$('status').textContent="Draft created locally. Review and personalize before publication."}
function update(){$('count').textContent=$('output').value.length+" characters"}
function enhancementPrompt(){const t=topics[Number($('day').value)];return "You are COSMIC HERALD, the disclosed AI editorial assistant for the developing Church of Cosmic Consciousness initiative. Draft an ORIGINAL, engaging Facebook post based on the material below. Preserve CCC radical nonduality: the Absolute is beyond consciousness/matter. Blend science, spiritual inquiry, respectful comparative religion, and original art; use the "+$('register').value+" register and emphasize "+$('expression').value+" expression. Clearly distinguish science, philosophy, religion, and metaphor. Do not fabricate quotes or evidence. No donation solicitation, nonprofit status, DBA claims, or promises of spiritual outcomes. Produce one polished post, 120–220 words, with a reflective invitation and no misleading claims. Topic: "+t[0]+". Editorial context: "+t[1]+". Working draft:\n\n"+$('output').value}
async function copy(s){try{await navigator.clipboard.writeText(s);$('status').textContent="Copied to clipboard."}catch(e){$('output').focus();$('output').select();$('status').textContent="Clipboard permission unavailable. Select and copy the text manually."}}
$('day').replaceChildren(...topics.map((t,i)=>new Option("Day "+String(i+1).padStart(2,'0')+" · "+t[0],String(i))));
$('draft').onclick=draft;$('next').onclick=()=>{$('day').selectedIndex=($('day').selectedIndex+1)%topics.length;draft()};$('copy').onclick=()=>copy($('output').value);$('prompt').onclick=()=>copy(enhancementPrompt());$('output').oninput=update;
$('save').onclick=()=>{let blob=new Blob([$('output').value],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download="COSMIC_HERALD_Day_"+String(Number($('day').value)+1).padStart(2,'0')+".txt";a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);$('status').textContent="Text download requested."};draft();
})();
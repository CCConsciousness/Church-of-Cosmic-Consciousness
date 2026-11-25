const encounters = [
  [
    ["The beetle asks, “Will you hold this stem steady while I carry my parcel across?”", "Anton plants his feet on the stem. Six little beetle feet tickle their way past him.", "“I can’t hold it,” Anton says. The beetle sets off upstream to find a narrower crossing.", "The stem dips when the beetle touches it. Anton notices how tightly she holds her parcel.", "What do you notice about someone today if you pause before offering advice?"],
    ["Later, a young ant arrives at the creek. “Will you walk upstream with me to find the stepping stones?”", "Anton walks at her pace. They spot the first stone by the splash of water against its side.", "Anton explains that he needs breakfast. The young ant thanks him for answering and follows the bank.", "Anton watches the young ant test the bank with one foot, then try again a little farther along.", "Where today might someone need company more than directions?"]
  ],
  [
    ["The ladybird asks, “Will you follow that white tuft and see what it carries?”", "Anton runs until the tuft catches on a thorn. A brown seed hangs beneath it, light enough to ride the breeze.", "“I’ll stay here,” Anton says. The ladybird follows the tuft and soon disappears beyond the bank.", "Anton stays among the stems. Some tufts rise at once. One hangs by a thread for a long time.", "What is one small detail you usually overlook when you think you know the answer?"],
    ["At dusk the ladybird returns with a seed. “Will you help me mark where it lands so we can visit again?”", "They lay three pebbles beside the seed. Anton wonders what they will find after the rain.", "Anton leaves the spot unmarked. The ladybird sketches the bend in the path on a leaf.", "Anton studies the seed against the soil. It would be easy to walk past tomorrow.", "Which question from today would you like to return to?"]
  ],
  [
    ["The traveler asks, “May I share your dry patch until the rain lets up?”", "Anton draws his lunch closer. The traveler folds himself into the little space beside it.", "“I want this spot to myself,” Anton says. The traveler finds another leaf, lower to the ground.", "Anton watches a drop run off the traveler’s antenna. He feels the warm, dry soil beneath his own feet.", "When did you notice today that somebody else was having a different experience from yours?"],
    ["After the rain, the traveler finds a dry seed cake. “Will you help me divide it among the ants still waiting?”", "Anton counts the waiting ants. Together they break the cake into a piece for each pair of hands.", "Anton declines. The traveler wraps the cake in a leaf and carries it over himself.", "Anton notices that the smallest ant waits at the edge, barely visible behind the others.", "Who stayed at the edge of a group today? What did you notice about them?"]
  ],
  [
    ["His sister asks, “Will you show me where you found the crumb with my mark?”", "Anton leads her to the bend in the trail. She turns the crumb over and finds her tiny notch.", "“I’d rather keep the spot to myself,” Anton says. His sister has to keep searching.", "Anton looks at the notch. He remembers watching his sister carve it before sunrise.", "When did a small detail remind you today that something mattered to another person?"],
    ["At supper his sister puts two crumbs together. “Will you help me mark our portions for tomorrow?”", "Anton marks one with a dot and one with a notch. They trade places to check that both can tell them apart.", "Anton declines and packs his own portion separately. His sister wraps hers in a strip of leaf.", "Anton watches her work. Each notch takes three careful strokes.", "Whose quiet work made part of your day easier?"]
  ]
];
const answers = [['yes','Yes'],['no','No'],['pause','Do nothing']];
function decisionPage(slug,mode,index,round,answer,opening){
  const [question,yes,no,observation,reflection]=encounters[index][round];
  const root='#'+slug+'/'+mode;
  const path=root+'/'+(round+1);
  const result={yes,no,pause:observation};
  if(!answers.some(([key])=>key===answer)){
    return (round===0?opening:'')+'<hr><h2>'+question+'</h2><div class="choices">'+answers.map(([key,label],i)=>
      '<a class="gem '+['watch','listen','read'][i]+'" href="'+path+'/'+key+'">'+label+'</a>').join('')+'</div>';
  }
  return '<h2>'+answers.find(([key])=>key===answer)[1]+'</h2><p>'+result[answer]+'</p>'+
    (answer==='pause'?'<aside><small>Contemplation for the day</small><p>'+reflection+'</p></aside>':'')+
    (round===0?'<p><a href="'+root+'/2">Follow the trail →</a></p>':trailEnding(slug,mode,answer)+'<p><a href="#journal">View your character chart and ten-year reflection →</a></p>');
}

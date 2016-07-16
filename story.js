function Enemy(name, verb){
  this.name = name;
  this.verb = verb;
};
Enemy.prototype.attack = function(){
  var str = "The " + this.name + " " + this.verb + " you and inflicts " +
            this.dmg + " damage.";
  addLine(str, 'error');
  var health = +$('#health').text()-this.dmg;
  $('#health').text(health);
  if (health < 1){
    addLine('You died. Game over.', 'error');
  }
}
Enemy.prototype.died = function(){
  var str = "The " + this.name + " crumbles to the ground " +
            "in a pile of ash and dust.";
  addLine(str, 'combat');
  enemies.killed++;
  $('#killed').text(enemies.killed);
}
Enemy.prototype.examineDead = function(item, dropRate){
  var rando = Math.random();
  if (rando < dropRate){
    print(logs.examine[item], [0], 'logs');
    addInv(item);
  }
  else {
    pickLine(logs.examine[this.name]);
  }
}
Enemy.prototype.escape = function(){
  var stam = +$('#stam').text();
  if (stam > 1){
    $('#stam').text(stam-2);
    pickLine(logs.escape[this.name]);
    print(logs.escape[this.name], [99], 'logs');
    event('walk');
  }
  else {
    var str = "You don't have enough stamina to flee. " +
              "You must fight!";
    addLine(str, 'error');
  }
}

var $submit = $('#submit');
var $jungle = $('#jungle');
var $specs = $('#specs');
var logs = {};
var instr = {};
var events = {tutorial: {}, visited: false, killed: false};
var places = {list: []};
var place;
var weapons = {};
var enemies = {
  wraith: new Enemy('wraith', 'strikes'),
  ghoul: new Enemy('ghoul', 'lunges at'),
  killed: 0
};
var inputs = ['examine','slash', 'escape'];

function range(a,b){
  var arr = [];
  for (var i=a; i<=b; i++){
    arr.push(i);
  }
  return arr;
}
function print(obj, indeces, classes){
  indeces.forEach(function(i){
    addLine(obj[i], classes);
  })
}
function pickElement(list){
  var i = Math.floor(Math.random()*list.length);
  return list[i];
}
function pickBetween(a,b){
  return pickElement(range(a,b));
}
function pickLine(obj){
  var list = [];
  for (var prop in obj){
    if (prop <= 50){
      list.push(prop);
    }
  }
  var i = [Number(pickElement(list))];
  print(obj, i, 'logs');
}

logs.commands = ['commands/inv/char','examine/walk',
    'escape']


// places: empty, wraith, ghoul, items, shop

logs.inv = {};
logs.arrival = {};
logs.examine = {};
logs.escape = {};

logs.begin = {
  0: "Welcome traveller...",
  1: "You find yourself in a dark place, dizzy and confused. " + 
     "There is blood on your hands, but it is not yours.",
  2: "You look around and find a dagger nearby."
};

logs.arrival.empty = {
  0: "It is dark and desolate. You feel an uneasy presence.",
  1: "You step into a grassy area. Ahead of you a crow squawks.",
  2: "A silhouette appears in the darkness. You take a step closer " +
     "to find a battered scarecrow.",
  3: "You come across an overgrown tree stump.",
  4: "The ground is damp. There is a metallic smell."
}
logs.arrival.wraith = {
  0: "You hear a howl in the wind. A ghostly figure appears " +
     "and flies toward you."
}
logs.arrival.ghoul = {
  0: "A putrid smell fills the air. A creature snarls. " +
     "It rushes towards you."
}
logs.arrival.item = {
  0: "There is a shuffling near the ground. Something catches " +
     "your attention.",
  1: "Your foot catches something and you nearly trip."
}
logs.arrival.shop = {
  0: "You stumble upon a cloaked man. " + 
     "\"Welcome traveller, how's about a trade? Yes/No\""
}

logs.examine.empty = {
  0: "The air is damp, a faint cry echoes in the distance.",
  1: "A small animal scurries away.",
  2: "You feel someone, or something, watching you. You glance " +
     "over your shoulder and see nothing.",
  3: "You look around and find nothing interesting.",
  99: "You look around and find nothing interesting."
}
logs.examine.item = {
  0: "A half-eaten piece of meat lies on the ground. You pick it up.",
  1: "A candy bar hits you in the head. You hesitantly pocket it.",
  2: "You find a muffin.",
  3: "Something smells good. You look down and find some fried chicken."
}
logs.examine.ghoul = {
  0: "You feel weary and rest for a moment.",
  1: "You dig through the remains and find nothing.",
  2: "A gentle breeze blows the ashy remains away."
}
logs.examine.wraith = logs.examine.ghoul;

logs.escape.ghoul = {
  0: "You sprint away from the area. Another time perhaps.",
  1: "You dodge your enemy and flee to a new area.",
  2: "You jump away and run the other direction.",
  99: "You continue walking..."
}
logs.escape.wraith = logs.escape.ghoul;
logs.examine.Shard = {
  0: "You find a shard in the ashy remains."
}

logs.combat = {
  slash: function(enemy, weapon){
    var foe = enemies[enemy];
    if (!events.killed){
      var dmg = pickElement(weapons[weapon]);
      var str = "You slash the " + enemy + " with your " + 
                weapon + " and deal " + dmg + " damage.";
      addLine(str, 'combat')
      foe.health -= dmg;
      if (foe.health < 1){
        foe.died();
        events.killed = true;
      }
      else {
        foe.attack();
        addLine('Enemy health: '+foe.health, 'combat');
      }
      var stam = +$('#stam').text();
      $('#stam').text(stam-1);
    }
    else {
      var str = "You swing your " + weapon + " in victory.";
      addLine(str, 'combat');
    }
  }
}

instr.examine = {
  0: "Type \"examine\" to look around."
};
instr.inventory = {
  0: "Type \"inv\" to check your inventory."
};
instr.commands = {
  0: "Type \"commands\" to view available commands."
}
instr.char = {
  0: "Type \"char\" to view your stats."
}
instr.walk = {
  0: "Type \"walk\" to explore a different area."
}
instr["Silver Dagger"] = {
  0: "Combat command learned: 'slash'",
  attack: 'slash'
}
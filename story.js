// function Instructions(){}
// Instructions.prototype.print = function(action, classes, indeces){
//   var obj = this;
//   indeces.forEach(function(i){
//     addLine(obj[action][i], classes);
//   })
// }
// function Jungle(){};
// Jungle.prototype.print = function(place, input, classes, indeces){
//   var obj = this;
//   indeces.forEach(function(i){
//     addLine(obj[place][input][i], classes);
//   })
// }
var $submit = $('#submit');
var $jungle = $('#jungle');
var $specs = $('#specs');
var logs = {};
var instr = {};
var events = {tutorial: {}};
var places = {};
var place;
var inputs = ['examine'];
var visited;

function print(obj, indeces, classes){
  indeces.forEach(function(i){
    addLine(obj[i], classes);
  })
}

logs.commands = ['inv', 'char', 'walk']

logs.begin = {
  0: "Welcome traveller...",
  1: "You find yourself in a dark place, dizzy and confused. " + 
     "There is blood on your hands, but it is not yours."
};
logs.arrival = {
  0: "It is dark and desolate. You feel an uneasy presence.",
  1: "You hear a howl in the wind. A ghostly figure appears " +
     "and flies toward you.",
  2: "There is a shuffling near the ground. Something catches " +
     "your attention.",
  3: "You stumble upon a cloaked man.",
  4: "\"Welcome traveller, how's about a trade? Yes/No\"",
  5: "A putrid smell fills the air. A creature snarls. " +
     "It rushes towards you."
}
logs.examine = {
  0: "You look around and find a dagger nearby.",
  1: "The air is damp, a faint cry echoes in the distance. "+
     "You find nothing interesting."
}
logs.inv = {};
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

places.begin = {
  begin: logs.begin,
  examine: logs.examine,
  instr: instr.examine
};
places.empty = {
  arrival: function(){
    print(logs.arrival, [0], 'logs');
  },
  examine: function(){
    print(logs.examine, [1], 'logs');
  }
};
places.wraith = {
  arrival: function(){
    print(logs.arrival, [1], 'enemy');
  }
};
places.ghoul = {
  arrival: function(){
    print(logs.arrival, [5], 'enemy');
  }
}
places.items = {
  arrival: function(){
    print(logs.arrival, [2], 'logs');
  }
};
places.shop = {
  arrival: function(){
    print(logs.arrival, [3,4], 'logs');
  }
};
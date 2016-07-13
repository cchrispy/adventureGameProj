function Jungle(){
}
Jungle.prototype.print = function(outer, inner, classes, indeces){
  var obj = this;
  indeces.forEach(function(i){
    addLine(obj[outer][inner][i], classes);
  })
}
var $submit = $('#submit');
var $jungle = $('#jungle');
var $specs = $('#specs');
var logs = new Jungle();
var instr = new Jungle();
var events = {};
var places = {};
var place;
var inputs = ['begin'];

logs.begin = {start: {
  0: "Welcome traveller...",
  1: "You find yourself in a dark place, dizzy and confused. " + 
     "There is blood on your hands, but it is not yours."
      }};
logs.examine = {start: {
  0: "You look around and find a dagger nearby."
      }}
logs.inv = {};
instr.examine = {start: {
  0: "Type \"examine\" to look around."
      }};
instr.inventory = {start: {
  0: "Type \"inv\" to check your inventory."
      }};


places.begin = {begin: logs.begin,
                examine: logs.examine,
                instr: instr};
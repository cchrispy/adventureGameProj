function addLine(input, classes){
  $('<div>', {'class': 'line ' + classes}).text('> '+input).insertBefore($submit);
  $('.line').first().css('margin-top', '15px');
}
function addInv(item){
  if (!logs.inv[item]){
    logs.inv[item] = 1;
    var $span = item+': '+'<span id='+item+'>1</span>';
    $('<p>').append($span).appendTo($('#char'));
  }
  else {
    logs.inv[item]++;
    var id = '#'+item;
    $(id).text(logs.inv[item]);
  }
}

function addWeapon(weapon, dmgRange){
  weapons[weapon] = dmgRange;
  addInv(weapon);
  print(instr[weapon], [0], 'combat');
  addCommand(instr[weapon].attack);
}

function addCommand(command){
  if (logs.commands.indexOf(command) == -1){
    logs.commands.push(command);
    $('<p>').text(command).appendTo($('#commands'));
  }
}

function showSpecs(input){
  var $type;
  switch(input){
    case 'char':
      $type = $('#char');
      break;
    case 'commands':
      $type = $('#commands');
      break;
    default:
      console.log('error');
  }
  $specs.children().slideUp();
  $type.slideDown();
}

function commandSpecs(input){
  if (input == 'char' || input == 'commands'){
    return true;
  }
  else {return false;}
}

function checkInput(input){
  if (inputs.indexOf(input) != -1){
    return true;
  }
  else {return false;}
}

function tutorial(input){
  if (input != 'begin' && !events.tutorial.begin){
    return;
  }
  if (input == 'begin' && !events.tutorial.begin){
    events.tutorial.begin = true;
    print(logs.begin, [0,1], 'logs');
    print(instr.examine, [0], 'gray');
  }
  else if (input == 'examine' && events.tutorial.begin){
    events.tutorial.examine = true;
    print(logs.begin, [2], 'logs');
    addWeapon("Silver Dagger", range(6,8));

    print(instr.commands, [0], 'gray');
  }
  else if (input == 'commands' && events.tutorial.examine){
    events.tutorial.complete = true;
    // print(instr.commands, [0], 'gray');
    print(instr.char, [0], 'gray');
    print(instr.walk, [0], 'gray');
    showSpecs(input);
  }
  else if (commandSpecs(input)){
    showSpecs(input);
  }
  else {
    addLine("Hm. Try again.", "error");
  }
}

places.empty = {
  arrival: function(){
    pickLine(logs.arrival.empty);
  },
  examine: function(){
    if (!events.visited) {
      pickLine(logs.examine.empty);
      events.visited = true;
    }
    else {
      print(logs.examine.empty, [99], 'logs');
    }
  }
};
places.item = {
  arrival: function(){
    pickLine(logs.arrival.item);
    if (!events.hints.examine){
      print(instr.examine, [1], 'gray');
      events.hints.examine = true;
    }
  },
  examine: function(){
    if (!events.visited){
      pickLine(logs.examine.item);
      addInv('Food');
      events.visited = true;
    }
    else {
      print(logs.examine.empty, [99], 'logs');
    }
  }
}
places.wraith = {
  arrival: function(){
    enemies.wraith.arrival([4,10], [1,1]);
    if (!events.hints.combat){
      print(instr["Silver Dagger"], [1], 'gray');
      events.hints.combat = true;
    }
  },
  slash: function(){
    logs.combat.slash('wraith', 'Silver Dagger');
  },
  examine: function(){
    if (!events.killed){
      var str = "The wraith lets out a blood curling shriek.";
      addLine(str, 'combat');
    }
    else if (!events.visited){
      enemies.wraith.examineDead('Shard', 0.2);
      events.visited = true;
    }
    else {
      print(logs.examine.empty, [99], 'logs');
    }
  },
  escape: function(){
    enemies.wraith.escape();
  }
};
places.ghoul = {
  arrival: function(){
    enemies.ghoul.arrival([4,8], [1,1]);
    if (!events.hints.combat){
      print(instr["Silver Dagger"], [1], 'gray');
      events.hints.combat = true;
    }
  },
  slash: function(){
    logs.combat.slash('ghoul', 'Silver Dagger');
  },
  examine: function(){
    if (!events.killed){
      var str = "The ghoul is small but vicious. " +
                "Defend yourself!";
      addLine(str, 'combat');
    }
    else if (!events.visited){
      enemies.ghoul.examineDead('Shard', 0.2);
      events.visited = true;
    }
    else {
      print(logs.examine.empty, [99], 'logs');
    }
  },
  escape: function(){
    enemies.ghoul.escape();
  }
}
places.items = {
  arrival: function(){
    print(logs.arrival.items, [0], 'logs');
  }
};
places.shop = {
  arrival: function(){
    print(logs.arrival.shop, [0], 'logs');
  }
};

function event(input){
  if (commandSpecs(input)){
    showSpecs(input);
    return;
  }
  else if (input == 'walk'){
    if (events.combat){
      addLine('You can\'t walk away. Type "escape" to '+
              'flee (2 stamina).', 'error');
    }
    else {
      addLine("You continue walking..", 'logs');
      place = pickElement(places.list);
      events.visited = false;
      events.killed = false;
      places[place].arrival();
    }
  }
  else if (checkInput(input)){
    if (input in places[place]){
      places[place][input]();
    }
    else {
      addLine("You cannot do that now.", 'error');
    }
  }
  else {
    addLine('Error: unknown command.', 'error');
  }
  console.log(place);
}
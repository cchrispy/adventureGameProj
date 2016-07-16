function addLine(input, classes){
  $('<div>', {'class': 'line ' + classes}).text('> '+input).insertBefore($submit);
  $('.line').first().css('margin-top', '15px');
}
function addInv(item){
  if (!logs.inv[item]){
    logs.inv[item] = 1;
  }
  else {
    logs.inv[item]++;
  }
  $('<p>').text(item).appendTo($('#inv'));
}

function addWeapon(weapon, dmgRange){
  weapons[weapon] = dmgRange;
  addInv(weapon);
}

function addCommand(command){
  if (logs.commands.indexOf(command) != -1){
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
    case 'inv':
      $type = $('#inv');
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
  if (input == 'char' || input == 'inv' || input == 'commands'){
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
    print(instr.inventory, [0], 'gray');
  }
  else if (input == 'inv' && events.tutorial.examine){
    events.tutorial.complete = true;
    print(instr.commands, [0], 'gray');
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
places.wraith = {
  arrival: function(){
    print(logs.arrival.wraith, [0], 'enemy');
    enemies.wraith.health = pickBetween(4,10);
    enemies.wraith.dmg = pickBetween(1,1);
    console.log(enemies.wraith.dmg);
    addLine('Enemy health: '+enemies.wraith.health, 'combat');
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
    print(logs.arrival.ghoul, [0], 'enemy');
    enemies.ghoul.health = pickBetween(4,8);
    enemies.ghoul.dmg = pickBetween(1,1);
    addLine('Enemy health: '+enemies.ghoul.health, 'combat')
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
    place = pickElement(places.list);
    events.visited = false;
    events.killed = false;
    places[place].arrival();
  }
  else if (checkInput(input)){
    places[place][input]();
  }
  else {
    addLine('Error: unknown command.', 'error');
  }
  console.log(place);
}
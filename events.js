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
    print(logs.examine, [0], 'logs');
    addInv("Silver Dagger");
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

function event(input){
  console.log(input);
  if (commandSpecs(input)){
    showSpecs(input);
    return;
  }
  else if (input == 'walk'){
    // change place
    // print arrival from places;
    // visited = false;
  }
  else if (checkInput(input)){

  }
  else {
    addLine('Error: unknown command.', 'error');
  }
  console.log(logs.inv);
}
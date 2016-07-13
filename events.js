function addLine(input, classes){
  $('<div>', {'class': classes}).text('> '+input).insertBefore($submit);
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

function event(input){
  if (commandSpecs(input)){
    showSpecs(input);
  }
  else if (input == 'begin' && !events[input]){
    events[input] = true;
    logs.print('begin', 'start', 'line gray', [0,1]);
    instr.print('examine', 'start', 'line gray', [0]);
  }
  else if (input == 'examine'){
    logs.print('examine', 'start', 'line gray', [0]);
    instr.print('inventory', 'start', 'line gray', [0]);
    addInv('Dagger');
  }
  else {
    addLine('Error: unknown command.', 'line error');
  }
}
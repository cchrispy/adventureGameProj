$(document).ready(function(){
  addInv('Gold Key');
  logs.commands.forEach(function(command){
    addCommand(command);
  })
  places.list.push('empty','wraith','ghoul')
  console.log(places);
  $submit.on('focus', function(){
    if ($submit.val() == 'Command Line'){
      $submit.val('');
    }
  })
  $submit.on('focusout', function(){
    if ($submit.val() == ''){
      $submit.val('Command Line');
    }
  })
  addLine('Type "begin" when you are ready', '');
  addLine('', '');
  $submit.on('keyup', function(key){
    if (key.keyCode == 13){
      var input = $submit.val().toLowerCase();
      addLine(input, '');
      $submit.val("");
      var totalHeight = 0;
      $('.line').each(function(){
        totalHeight += $(this).height();
      })
      while (totalHeight >= 500){
        var $firstLine = $('.line').first();
        totalHeight -= $firstLine.height();
        $firstLine[0].remove();
      }
      if (!events.tutorial.complete){
        tutorial(input);
      }
      else {
        event(input);
      }
    }
  })
})
$(document).ready(function(){
  addInv('Gold Key');
  logs.commands.forEach(function(command){
    $('<p>').text(command).appendTo($('#commands'));
  })
  places.list.push('empty','empty','wraith','ghoul','item')
  $jungle.on('click', function(){
    $submit.focus();
  })
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
      while (totalHeight >= 460){
        var $firstLine = $('.line').first();
        totalHeight -= $firstLine.height();
        $firstLine[0].remove();
      }
      if ($('.line').length > 6){
        var $line = $('.line');
        $line.first().css('opacity', '0.5');
        $line.first().next().css('opacity', '0.6');
        $line.first().next().next().css('opacity', '0.7');
        $line.first().next().next().next().css('opacity', '0.8');
      }
      if (input == 'godmode'){
        events.tutorial.complete = true; // skip tut
        addWeapon('Silver Dagger', range(6,8));
        event('walk');
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
$(document).ready(function(){
  addInv('Gold Key');
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
  addLine('Type "begin" when you are ready', 'line');
  addLine('', 'line');
  $submit.on('keyup', function(key){
    if (key.keyCode == 13){
      var input = $submit.val().toLowerCase();
      addLine(input, 'line');
      $submit.val("");
      while ($('.line').length >= 27){
        $('.line').first()[0].remove();
      }
      event(input);
    }
  })
})
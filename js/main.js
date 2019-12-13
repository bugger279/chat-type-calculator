var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() { modal.style.display = "block"; $("#inputDataValue").focus(); }
span.onclick = function() { modal.style.display = "none"; }

window.onclick = function(event) {
  if (event.target == modal)
    modal.style.display = "none";

  if (btn.style.display = "none") {
    btn.style.display = "none"
  } else {
    btn.style.display = "block"
  }
}

// calculate 
function calculateResult(inputValue){
  for (var level = 0; level < 3; level++) {
      var search = level == 0 ? '(\\d+[*/]\\d+)'
                 : level == 1 ? '(-?\\d+-\\d+)'
                              : '(-?\\d+\\+\\d+)';
      var higher = RegExp(search);
      var res = inputValue.split(higher);
      while(res.length > 2){
          for(var i = 1; i < res.length; i+=2){
              var a = res[i].split(/((?:^-)?[0-9\.]+)/g);
              inputValue = inputValue.replace(higher, 
                   a[2] == '*' ? +a[1] * +a[3]
                 : a[2] == '/' ? +a[1] / +a[3]
                 : a[2] == '+' ? +a[1] + +a[3]
                               : +a[1] - +a[3]
              );
          }
          res = inputValue.split(higher);
      }
  }
  return res[0];
}

// Scroll to bottom
function scrollToBottom() {
  window.setInterval(function() {
    var elem = $('.calc-datas');
    elem.scrollTop = elem.scrollHeight;
  }, 5000);  
}

$("#sendBtn").click(function() {
    var inputValue =  $("#inputDataValue").val();
    if (inputValue.length === 0) {
      alert("Input field cannot be empty");
      $("#inputDataValue").focus();
    } else {
      var result = calculateResult(inputValue);
      if ($.isNumeric(result)) {
        var htmlQuestion = `<span class="question">${inputValue}</span>`;
        var htmlAnswer = `<span class="answer">${result}  is the answer</span>`;
        $(".calc-datas").append(htmlQuestion, htmlAnswer);
        $(".calc-datas").animate({ scrollTop: $('.calc-datas').prop("scrollHeight")}, 1000);
        $("#inputDataValue").val('');
        $("#inputDataValue").focus();
      } else {
        var htmlQuestion = `<span class="question">${inputValue}</span>`;
        var htmlAnswer = `<span class="answer">Please Enter Valid Input</span>`;
        $(".calc-datas").append(htmlQuestion, htmlAnswer);
        $(".calc-datas").animate({ scrollTop: $('.calc-datas').prop("scrollHeight")}, 1000);
        $("#inputDataValue").val('');
        $("#inputDataValue").focus();
      }
    }
});

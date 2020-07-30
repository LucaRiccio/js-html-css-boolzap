$(document).ready(function(){

    $("#main-message").keydown(function(){
    if (event.which == 13 || event.keyCode == 13) {
      invioMessaggio()
    }
  })

  //***FUNZIONI***

  function invioMessaggio(){
    var valore = $("#main-message").val();
    var clone = $(".template .message").clone();
    clone.addClass("send");
    clone.find(".text-message").append(valore);
    clone.find(".orario-message").append(oraReale());
    $(".contenuto-main").append(clone);
    setTimeout(rispostaAutomatica,2000);
  }

  function rispostaAutomatica(){
    var cloneDue = $(".template .message").clone();
    cloneDue.addClass("return");
    cloneDue.find(".text-message").append("Ok");
    cloneDue.find(".orario-message").append(oraReale());
    $(".contenuto-main").append(cloneDue);
  }

  function oraReale(){
    var d = new Date();
    var ore = d.getHours();
    var minuti = d.getMinutes();
    var orario = ore + ":" + minuti;
    return orario;
  }



});

$(document).ready(function(){

    $("#main-message").keydown(function(){
    if (event.which == 13 || event.keyCode == 13) {
      invioMessaggio()
    }
  })

  $("#aside-search").keyup(function(){
    var ricerca = $("#aside-search").val().toLowerCase();
    // console.log(ricerca);
    $(".icona").each(function(){
      var x = $(this).find(".nome").text().toLowerCase();
      if (x.includes(ricerca)){
        $(this).show();
      }else {
        $(this).hide();
      }
    });
  });


  //***FUNZIONI***

  function invioMessaggio(){
    var valore = $("#main-message").val();
    var clone = $(".template .message").clone();
    clone.addClass("send");
    clone.find(".text-message").append(valore);
    clone.find(".orario-message").append(oraReale());
    $(".contenuto-main").append(clone);
    setTimeout(rispostaAutomatica,1000);
  }

  function rispostaAutomatica(){
    var cloneDue = $(".template .message").clone();
    cloneDue.addClass("return");
    var mex = messaggioRandom();
    cloneDue.find(".text-message").append(mex);
    cloneDue.find(".orario-message").append(oraReale());
    $(".contenuto-main").append(cloneDue);
  }

  function oraReale(){
    var d = new Date();
    var ore = addZero(d.getHours());
    var minuti = addZero(d.getMinutes());
    var orario = ore + ":" + minuti;
    return orario;
  }

  function addZero(numero) {
    if (numero<10) {
      return '0' + numero;
    }
    return numero;
  }

  function numeriRandom(min,max){
    return Math.floor(Math.random()*(max - min + 1) + min);
  }

  function messaggioRandom() {
    var frasi = ['Ciao', 'Non ho capito','Ci vediamo dopo','No','Sono al lavoro','Nope','Yesser'];
    var numeroRandom = numeriRandom(0,(frasi.length-1));
    return frasi[numeroRandom];
  }

});

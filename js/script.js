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
      var nomeUtente = $(this).find(".nome").text().toLowerCase();
      if (nomeUtente.includes(ricerca)){
        $(this).show();
      }else {
        $(this).hide();
      }
    });
  });

  $(document).on("click", ".icona", function(){

    posizioneUtente = $(this).index(); // ricavo l'indice del contatto cliccato. (ATT.NE VAR GLOBALE)

    $(".icona").removeClass("active"); // rimuovo la classe active ai contatti.

    $(".messaggi").removeClass("active");

    $(".messaggi").eq(posizioneUtente).addClass("active");

    $(this).addClass("active"); // Aggiungo la classe active al contatto cliccato.

    var name = $(this).find(".nome").text(); // in una var ricavo il nome del contatto.

    $(".nav-left .testo h4").text(name); // attribuisco il valore di var name all'header di destra.

    var img = $(this).find("img").attr('src'); // In una var, sull'elemento cliccato, salvo l'attributo dell'immagine.

    $(".nav-main .nav-left img").attr('src', img); // src dell'immagine prima salvato viene sostituito a quello dell'img della chat.

  });






  //***FUNZIONI***

  function invioMessaggio(){

    var valore = $("#main-message").val(); // In una var salvo il valore del campo di input.
    if (valore !=0){ // Aggiunto un if (se la var valore è diversa da 0) per evitare la possibilità di inviare un messaggio vuoto.
      var clone = $(".template .message").clone(); // in una var faccio il clone della parte di template che voglio.
      clone.addClass("send"); // aggiungo una classe.
      clone.find(".text-message").append(valore); // partendo da clone, cerco con find la <p> con classe ".text-message" e gli appendo la var valore.
      clone.find(".orario-message").append(oraReale()); //partendo da clone, cerco con find la <p> con classe ".orario-message" e gli passo una funzione da me creata per l'orario.
      $(".contenuto-main .messaggi").eq(posizioneUtente).append(clone); // Aggiungo al DOM l'elemento clonato.
      $("#main-message").val(""); // Stringa vuota per "pulire" il campo di invio.
      $(".nav-main .nav-left .testo p").text("sta rispondendo...");
      setTimeout(rispostaAutomatica,1000); // Un set timeout che dopo un sec invoca la funzione da me creata.
    }
  }

  function rispostaAutomatica(){

    var cloneDue = $(".template .message").clone(); // in una var faccio il clone della parte di template che voglio.
    cloneDue.addClass("return"); // aggiungo una classe.
    var mex = messaggioRandom(); // Salvo/invoco nella var mex una funzione da me creata.
    cloneDue.find(".text-message").append(mex); // partendo da cloneDue, cerco con find la <p> con classe ".text-message" e gli appendo la var mex.
    cloneDue.find(".orario-message").append(oraReale()); // partendo da cloneDue, cerco con find la <p> con classe ".orario-message" e gli appendo/passo una funzione da me creata.
    $(".contenuto-main .messaggi.active").append(cloneDue); // Aggiungo al DOM l'elemento clonato.
    $(".nav-main .nav-left .testo p").text("Ultimo accesso oggi alle ");
    $(".nav-main .nav-left .testo p").append(oraReale());
  }

  // Funzione per l'ora reale
  function oraReale(){

    var d = new Date(); // Creo un nuovo oggetto
    var ore = addZero(d.getHours()); // nella var ore invoco funzione per aggiungere lo zero (se necessario) e ricevere le ore con getHours.
    var minuti = addZero(d.getMinutes()); // nella var minuti invoco funzione per aggiungere lo zero (se necessario) e ricevere i minuti con getMinutes.
    var orario = ore + ":" + minuti; // Var orario data composta da var ore e var minuti
    return orario;
  }

  // Funzione per aggiungere lo zero
  function addZero(numero){
    if (numero<10){ // Se il numero è minore di zero...
      return '0' + numero; // restituisci 0 + il numero passato come argomento.
    }
    return numero; // diversamente restituisci il numero senza modifiche.
  }

  // Funzione numeri random tra due valori a scelta
  function numeriRandom(min,max){
    return Math.floor(Math.random()*(max - min + 1) + min);
  }

  // Funzione per i messaggi casuali
  function messaggioRandom(){
    var frasi = ['Ciao', 'Non ho capito','Ci vediamo dopo','No','Sono al lavoro','Nope','Yesser'];
    var numeroRandom = numeriRandom(0,(frasi.length-1));
    return frasi[numeroRandom];
  }

});

// Initialisation des éléments
let count = document.getElementById("count");
let btn = document.getElementById("button");
var somme = 145;
var countEssaie = 5;
count.innerText = 5;

// Fonction qui réinitialise le jeu
function forclear() {
    document.getElementById("output").innerHTML = "0";
    document.getElementById("p1").innerHTML = "";
    document.getElementById("game").style.display = "none"; // Masquer les images au début
    countEssaie = 5;
    count.innerText = countEssaie;
  }
  
// Fonction qui supprime le "0"
  function removeZero() {
    var value = document.getElementById("output").innerHTML;
    if (value == "0") {
      value = "0";
      document.getElementById("output").innerHTML = value;
    }
    else if (value == "") {
      value = "";
      document.getElementById("output").innerHTML = value;
    }
  }
  
  // Fonction qui calcule le pourcentage et l'affiche
  function perc() {
    var value = document.getElementById("output").innerHTML;
    value = parseFloat(value) / 100;
    document.getElementById("output").innerHTML = value;
    document.getElementById("p1").innerHTML += "%=" + value;
  }
  
  // Fonction pour afficher la valeur entrée et l'ajouter à l'historique
  function fordisplay(value) {
    removeZero();
    document.getElementById("output").innerHTML += value;
    document.getElementById("p1").innerHTML += value;
  }
  
  // Affiche une image en fonction de la plage dans laquelle se trouve la somme
  function afficherImageParIntervalle(somme) {
    const images = document.querySelectorAll("#game img");
    images.forEach(img => img.style.display = "none"); // Masquer toutes les images
    
    let index;
    // Conditions pour choisir l'image 
    if (somme <0) {
        alert("Bienvenue à l'Océan")
        index = 0; 
    }
    else if (somme >=0 && somme <=40) {
        alert("Bienvenue à Tokyo");
        index = 6;
    }
    else if (somme == 72) {
        alert("Bienvenue à Gizeh");
        index = 4;
    }
    else if (somme >= 41 && somme <= 130) {
      alert("Bienvenue à Paris");
      index = 1;
    } else if (somme >= 160 && somme <= 180) {
      alert("Bienvenue en Inde");
      index = 2;
    } else if (somme >=5200 && somme <= 8848) {
      alert("Les bronzés font du ski");
      index = 3;
    } else if (somme == 710) {
      alert("Bienvenue à Rio")
      index = 5;
    }else if (somme >710 && somme <= 1437) {
        alert("Bienvenue en chine")
        index = 7;
    }
    else if (somme >=2430 && somme<= 2720) {
        alert("Bienvenue à Machu Picchu")
        index = 8;
    }
    else{
        countEssaie--
        if(countEssaie === 0){
            alert("GAME OVER!");
            index = 10;
            countEssaie = 0;
            
        }
        else if(countEssaie > 0){
            alert("Perdu")
            index = 9;
        }
        else{
            index = 10;
            countEssaie = 0;
        }
        count.innerText = countEssaie; // Actualise le nombre d'essais
        
    }
  
    images[index].style.display = "block"; // Affiche l'image correspondant à l'intervalle
    document.getElementById("game").style.display = "flex"; // Affiche la galerie
  }
  
  // Fonction pour résoudre l'équation et afficher les résultats
  function solve() {
    removeZero();
    try {
      window.location.href = '#game';
      var equation = document.getElementById("output").innerHTML;
      var solved = eval(equation);
      document.getElementById('output').innerHTML = solved;
      document.getElementById("p1").innerHTML += "=" + solved + "<br>" + solved;
      afficherImageParIntervalle(solved); // Affiche l'image correspondant à la somme
    } catch (error) {
      document.getElementById('output').innerHTML = "Error";
    }
  }


  var select = document.querySelectorAll('.Currency');
  var input_currency = document.getElementById('input_currency');
  var output_currency = document.getElementById('output_currency');
   
   
  function convert(from, to, amount) {
      fetch(`https://api.frankfurter.app/latest?base=${from}&symbols=${to}`)
        .then((resp) => resp.json())
        .then((data) => {
          const convertedAmount = (amount * data.rates[to]).toFixed(2);
          alert(`${amount} ${from} = ${convertedAmount} ${to}`);
        });
      }
   
  const host = 'api.frankfurter.app/currencies';
  fetch(`https://${host}`)
      .then((data) => data.json())
      .then((data) => {
          const entries = Object.entries(data);

          for(i = 0; i < entries.length; i++){
            select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][1]}</option>`;
            select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][1]}</option>`;
          }
      });
  function converter(){
    var input_currency_val = input_currency.value;
      if(select[0].value != select[1].value){
       
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?amount=${input_currency_val}&from${select[0].value}&to=${select[1].value}`)
            .then((val) => val.json())
            .then((val) => {
              output_currency.value = Object.values(val.rates)[0]
       
      });
      }else{
        alert("Please select two diffrent currency")
      }
    }
let count = document.getElementById("count");
let btn = document.getElementById("button");
let output = document.getElementById("output");
let p1 = document.getElementById("p1");
let game = document.getElementById("game");
var somme = 145;
var countEssaie = 5;
count.innerText = 5;

// Affiche une alerte expliquant les règles du jeu
function showGameExplanation() {
  alert("Bienvenue dans notre jeu !\n\nBut : Résolvez des calculs et découvrez des destinations cachées en fonction du résultat.\n\nExplication : Utilisez la calculatrice pour obtenir un nombre. Selon la plage de ce nombre, une image représentant une destination sera affichée. Attention, vous avez un nombre d'essais limité !");
}

// Réinitialise les éléments du jeu
function forclear() {
  output.innerHTML = "0";
  p1.innerHTML = "";
  game.style.display = "none"; // Masquer les images au début
  countEssaie = 5;
  count.innerText = countEssaie; // Met à jour l'affichage des essais
}

// Supprime le zéro de départ de l'affichage
function removeZero() {
  if (output.innerHTML == "0") {
    output.innerHTML = "";
  }
}

// Calcule le pourcentage (%) de la valeur actuelle et l'affiche
function perc() {
  var value = output.innerHTML;
  value = parseFloat(value) / 100; 
  output.innerHTML = value; 
  p1.innerHTML += "%=" + value; // Ajoute cette valeur à l'historique
}

// Affiche la valeur cliquée dans l'affichage et l'historique
function fordisplay(value) {
  removeZero();
  output.innerHTML += value;
  p1.innerHTML += value;
}

// Affiche une image correspondant à l'intervalle dans lequel se trouve la somme
function afficherImageParIntervalle(somme) {
  const images = document.querySelectorAll("#game img");
  images.forEach(img => img.style.display = "none"); // Masquer toutes les images

  let index; // Index de l'image à afficher selon l'intervalle
  if (somme < 0) {
    alert("Bienvenue à l'Océan")
    index = 0;
  }
  else if (somme >= 0 && somme <= 40) {
    alert("Bienvenue à Tokyo");
    index = 6;
  } else if (somme == 319 || somme > 330 && somme <= 2430) {
    alert("Bienvenue à Rio")
    index = 5;
  } else if (somme > 710 && somme <= 1437) {
    alert("Bienvenue en chine")
    index = 7;
  }
  else if (somme > 180 && somme <= 330 || somme == 72) {
    alert("Bienvenue à Gizeh");
    index = 4;
  }
  else if (somme >= 41 && somme <= 130) {
    alert("Bienvenue à Paris");
    index = 1;
  } else if (somme >= 160 && somme <= 180) {
    alert("Bienvenue en Inde");
    index = 2;
  } else if (somme >= 5200 && somme <= 8848) {
    alert("Les bronzés font du ski");
    index = 3;
  }
  else if (somme >= 2430 && somme <= 2720) {
    alert("Bienvenue à Machu Picchu")
    index = 8;
  }
  else {
    countEssaie--
    if (countEssaie === 0) { // Si le joueur n'a plus d'essais
      alert("GAME OVER!");
      index = 10;
      countEssaie = 0;

    }
    else if (countEssaie > 0) { // Si des essais sont encore disponibles
      alert("Perdu")
      index = 9;
    }
    else {
      index = 10;
      countEssaie = 0;
    }
    count.innerText = countEssaie;

  }

  images[index].style.display = "block"; // Affiche l'image correspondant à l'intervalle
  game.style.display = "flex"; // Affiche la galerie
}

// Résout l'équation entrée par l'utilisateur et affiche l'image correspondante
function solve() {
  removeZero();
  try {
    if (output.innerHTML == "") { // Si aucun input, met l'affichage à (0)
      output.innerHTML = 0;
    }
    window.location.href = '#game';
    var equation = output.innerHTML;
    var solved = eval(equation);
    output.innerHTML = solved;
    p1.innerHTML += "=" + solved + "<br>" + solved; // Affiche le résultat dans l'historique
    afficherImageParIntervalle(solved); // Affiche l'image correspondant à la somme
  } catch (error) {
    output.innerHTML = "Error";
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

    for (i = 0; i < entries.length; i++) {
      select[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][1]}</option>`;
      select[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][1]}</option>`;
    }
  });
function converter() {
  var input_currency_val = input_currency.value;
  if (select[0].value != select[1].value) {

    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${input_currency_val}&from${select[0].value}&to=${select[1].value}`)
      .then((val) => val.json())
      .then((val) => {
        output_currency.value = Object.values(val.rates)[0]

      });
  } else {
    alert("Please select two diffrent currency")
  }
}
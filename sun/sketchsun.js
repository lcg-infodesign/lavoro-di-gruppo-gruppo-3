let data;
let dataObj;
let poppinsRegular;
let inconsolataRegular;
let scritte = []; // array per le scritte
let offsetAngolo = 90; // angolo di offset per ruotare gli spicchi

function preload() {
  data = loadTable("/assets/data.csv", "csv", "header");
 // poppinsRegular = loadFont('assets/Poppins-Regular.ttf');
  inconsolataRegular = loadFont('../fonts/Inconsolata-Regular.ttf');
}

function setup() {
  noLoop();
  let totalWidth = windowWidth * 0.950;
  let totalHeight = windowHeight * 0.950;
  createCanvas(totalWidth, totalHeight);
  background("#06011E");

 // Recupera i parametri dall'URL
 let params = getURLParams();
 let country = params['country'];
 let avg = params['average'];
 let lon = params['longitude'];
 let lat = params['latitude'];

 // Trova i dati del paese selezionato
 paeseData = findCountryData(country);

 if (paeseData) {
   // Disegna i dettagli del paese
   disegnaSole(width / 2, height / 2, 300, paeseData);
 }
}

function draw() {

  //sistemo il dataset per avere a diposizione i dati per ciascun Paese
  let nazioni = {} 
  console.log(data);
  for (let r of data["rows"]) {
    let riga = r["obj"];

    let nomeC = riga ["Country"];

    if (!(nomeC in nazioni)){
      nazioni[nomeC] = {
        "nome" : nomeC,
        "continent" : riga ["Country"],
        "area" : riga ["Area"],
        "average" : riga ["Average"],
      };    
    }
    nazioni[nomeC][riga["Parameter"]] = riga ["Value"];
  }

  console.log(nazioni);
  
  // background("#06011E");
  let totalWidth = windowWidth * 0.950;
  let totalHeight = windowHeight * 0.950;
  let size = 5/16*totalWidth;
  let xPos = 11/16*totalWidth;
  let yPos = totalHeight/2;

  disegnaCerchi(xPos, yPos, size);
  

  angleMode(RADIANS);

  

   // Seleziona il primo paese nel dataset
   let paese = nazioni[Object.keys(nazioni)[9]];  // Prendi il primo paese nel dataset
  

   // Passa il paese alla funzione disegnaSole
   disegnaSole(xPos, yPos, size, paese);
  //disegnaSole (xPos,yPos, size, nazioni[nomeC]);

  // ----------------------- testi curvi ---------------------------------
  testoCurvoEconomic (xPos, yPos, size);
  testoCurvoSocial (xPos, yPos, size);
  testoCurvoFree (xPos, yPos, size);
  testoCurvoViolence (xPos, yPos, size);
  //---------------------------------------------------------------------

  percentuali (xPos,yPos, size, paese);

  ilMouseOver (xPos, yPos, size);

  titoloPaese (xPos, yPos, size);
  

}

function disegnaSole (x, y, size, nazione){
  fill("#F8FFB8");
  ellipse(x, y, size/7, size/7);

  
  // Disegnare ogni raggio separatamente
  drawRay(11, nazione["Bank account ownership"], size);
  drawRay(12, nazione["House ownership"], size);
  drawRay(13, nazione["Land ownership"], size);
  drawRay(0, nazione["Perception that a woman earning more money than her husband doesn't cause any problems"], size);
  drawRay(1, nazione["Perception that men shouldn't have more right to a job than women"], size);
  drawRay(2, nazione["Perception that children sufference isn't a consequence of a mother working for pay"], size);
  drawRay(3, nazione["Perceptions that men don't necessarily make better business executives than women"], size);
  drawRay(4, nazione["Feeling of safety at night"], size);
  drawRay(5, nazione["Confidence in the judicial system and courts"], size);
  drawRay(6, nazione["Perception that men don't necessarily make better political leaders than women"], size);
  drawRay(7, nazione["Percentage of women not in a child marriage"], size);
  drawRay(8, nazione["Non genital-mutilated women percentage"], size);
  drawRay(9, nazione["Perception that female genital mutilation should stop"], size);
  drawRay(10, nazione["Perception that a husband is not justified in hitting or beating his wife under any circumstances"], size);
}

function drawRay(index, rayLengthData, size) {
  noStroke();
  fill("#F8FFB8")
  let rayLength = parseInt(rayLengthData);
  if(isNaN(rayLength)) {
    
    rayLength = 100;
     // Crea il colore #F8FFB8 con trasparenza (ad esempio alpha = 128)
  let c = color(248, 255, 184, 2); // RGB (248, 255, 184) con alpha 128
  
  fill(c); // Applica il colore con trasparenza
  
    
    
  }
  

  let totalWidth = windowWidth * 0.950;
  let totalHeight = windowHeight * 0.950;
  let centerX = 11/16*totalWidth;
  let centerY = totalHeight/2;
  let numRays = 14; 
  let angleStep = TWO_PI / numRays; // Passo angolare per distribuire i raggi in modo uniforme
  
  let angle = angleStep * index; // Calcola l'angolo per il raggio corrente

  // Posizione iniziale dei cerchi (i raggi partono da una distanza maggiore dal centro)
  let x1 = centerX + cos(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  let y1 = centerY + sin(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  
  let minRadius = 2/500*size;  // Raggio minimo per il primo cerchio
  let maxRadius = 8/500*size;  // Raggio massimo per l'ultimo cerchio
  
  
  // Ciclo per disegnare i cerchi lungo il raggio
  for (let j = 0; j < rayLength * size/160; j++) {
    //let radius = map(j, 0, rayLength, minRadius, maxRadius); // Raggio che cresce lungo il raggio
    let radius = map(j, 0, rayLength * 17 / 4, minRadius, maxRadius);
    let distance = j * 2 / 4; // La distanza tra i cerchi lungo il raggio

    // Calcola la posizione di ogni cerchio lungo il raggio
    let x = x1 + cos(angle) * distance;
    let y = y1 + sin(angle) * distance;
    
    ellipse(x, y, radius * 2, radius * 2); // Disegna il cerchio
  }
}

function disegnaCerchi(x, y, size){
  noFill();
  stroke("#17144f");
  drawingContext.setLineDash([10, 10]);
  ellipse(x, y, size*22/26, size*22/26);
  ellipse(x, y, size*14/26, size*14/26);

  let arco = 360/14
  
  drawingContext.setLineDash([0, 0]);
  angleMode(DEGREES)
  stroke("#B1803C");
  arc(x, y, size, size, arco*10.9, arco*13.2);
  stroke("#B76263");
  arc(x, y, size, size, arco*13.9, arco*3.2);
  stroke("#87538F");
  arc(x, y, size, size, arco*3.9, arco*6.2);
  stroke("#6969B7");
  arc(x, y, size, size, arco*6.9, arco*10.2);
}

function testoCurvoEconomic (x, y, size) {
  textSize(size * 0.04);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  textFont(inconsolataRegular);
  let arco = 360/14
  
  let angoloIniziale = arco*11.4; // Angolo iniziale (ad esempio -90 gradi)
  let angoloFinale = arco*12.7;    // Angolo finale (ad esempio 90 gradi)

  let raggio = size * 14 / 26; // raggio della curva
  let testo = "Economic rights";
  
  // Calcolare la lunghezza dell'arco (differenza tra angolo finale e iniziale)
  let angoloTotale = angoloFinale - angoloIniziale;
  
  // Disegnare l'arco come riferimento
  noFill();
  noStroke();
  arc(x, y, raggio * 2, raggio * 2, angoloIniziale, angoloFinale); // Disegna solo l'arco

  let numLettere = testo.length;
  
  // Calcolare l'angolo per ogni lettera in base all'arco specifico
  let angoloStep = angoloTotale / (numLettere - 1); // Suddividi l'arco in base al numero di lettere
  
  // Ciclo su ogni lettera del testo
  for (let i = 0; i < numLettere; i++) {
    let angolo = angoloIniziale + angoloStep * i; // Calcola l'angolo per la lettera i

    // Calcolare la posizione x e y sulla circonferenza
    let x2 = x + raggio * cos(angolo);
    let y2 = y + raggio * sin(angolo);
    
    // Impostazioni per il colore
    noStroke();
    fill("#c48020"); // Imposta il colore del testo
    
    // Ruotare il testo in modo che sia orientato lungo la curva
    push();
    translate(x2, y2);
    rotate(angolo + 90); // Rotazione per allineare il testo alla curva
    text(testo.charAt(i), 0, 0); // Disegna la lettera
    pop();
  }


  function percentuali(x, y, size, paese) {
    push();
      
      rotate(90 / value.length * j); 
      
      fill ("white");
      textAlign(CENTER, CENTER)
      textSize (12);
      text(-(spessore/2) + 5/7*size + 200 * fiume["length"]/6000, 0);
      
      pop();

    
    pop(); 

    nomeOutflow (xPos, yPos, circleSize, outflow);
  }

  
  
}

function testoCurvoSocial (x, y, size) {
  textSize(size * 0.04);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  textFont(inconsolataRegular);
  let arco = 360/14
  
  let angoloIniziale = arco*0.85; // Angolo iniziale (ad esempio -90 gradi)
  let angoloFinale = arco*2.15;    // Angolo finale (ad esempio 90 gradi)

  let raggio = size * 14 / 26; // raggio della curva
  let testo = "Social rights";
  
  // Calcolare la lunghezza dell'arco (differenza tra angolo finale e iniziale)
  let angoloTotale = angoloFinale - angoloIniziale;
  
  // Disegnare l'arco come riferimento
  noFill();
  noStroke();
  arc(x, y, raggio * 2, raggio * 2, angoloIniziale, angoloFinale); // Disegna solo l'arco

  let numLettere = testo.length;
  
  // Calcolare l'angolo per ogni lettera in base all'arco specifico
  let angoloStep = angoloTotale / (numLettere - 1); // Suddividi l'arco in base al numero di lettere
  
  // Ciclo su ogni lettera del testo
  for (let i = 0; i < numLettere; i++) {
    let angolo = angoloIniziale + angoloStep * i; // Calcola l'angolo per la lettera i

    // Calcolare la posizione x e y sulla circonferenza
    let x2 = x + raggio * cos(angolo);
    let y2 = y + raggio * sin(angolo);
    
    // Impostazioni per il colore
    noStroke();
    fill("#B76263"); // Imposta il colore del testo
    
    // Ruotare il testo in modo che sia orientato lungo la curva
    push();
    translate(x2, y2);
    rotate(angolo + 90); // Rotazione per allineare il testo alla curva
    text(testo.charAt(i), 0, 0); // Disegna la lettera
    pop();
  }


  

  
  
}

function testoCurvoFree (x, y, size) {
  textSize(size * 0.04);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  textFont(inconsolataRegular);
  let arco = 360/14
  
  let angoloIniziale = arco*4.25; // Angolo iniziale (ad esempio -90 gradi)
  let angoloFinale = arco*5.85;    // Angolo finale (ad esempio 90 gradi)

  let raggio = size * 14 / 26; // raggio della curva
  let testo = "Freedom and Justice";
  
  // Calcolare la lunghezza dell'arco (differenza tra angolo finale e iniziale)
  let angoloTotale = angoloFinale - angoloIniziale;
  
  // Disegnare l'arco come riferimento
  noFill();
  noStroke();
  arc(x, y, raggio * 2, raggio * 2, angoloIniziale, angoloFinale); // Disegna solo l'arco

  let numLettere = testo.length;
  
  // Calcolare l'angolo per ogni lettera in base all'arco specifico
  let angoloStep = angoloTotale / (numLettere - 1); // Suddividi l'arco in base al numero di lettere
  
  // Ciclo su ogni lettera del testo
  for (let i = 0; i < numLettere; i++) {
    let angolo = angoloIniziale + angoloStep * i; // Calcola l'angolo per la lettera i

    // Calcolare la posizione x e y sulla circonferenza
    let x2 = x + raggio * cos(angolo);
    let y2 = y + raggio * sin(angolo);
    
    // Impostazioni per il colore
    noStroke();
    fill("#87538F"); // Imposta il colore del testo
    
    // Ruotare il testo in modo che sia orientato lungo la curva
    push();
    translate(x2, y2);
    rotate(angolo + 90); // Rotazione per allineare il testo alla curva
    text(testo.charAt(i), 0, 0); // Disegna la lettera
    pop();
  }


  

  
  
}

function testoCurvoViolence (x, y, size) {
  textSize(size * 0.04);
  textAlign(CENTER, CENTER);
  angleMode(DEGREES);
  textFont(inconsolataRegular);
  let arco = 360/14
  
  let angoloIniziale = arco*7.7; // Angolo iniziale (ad esempio -90 gradi)
  let angoloFinale = arco*9.2;    // Angolo finale (ad esempio 90 gradi)

  let raggio = size * 14 / 26; // raggio della curva
  let testo = "General Violence";
  
  // Calcolare la lunghezza dell'arco (differenza tra angolo finale e iniziale)
  let angoloTotale = angoloFinale - angoloIniziale;
  
  // Disegnare l'arco come riferimento
  noFill();
  noStroke();
  arc(x, y, raggio * 2, raggio * 2, angoloIniziale, angoloFinale); // Disegna solo l'arco

  let numLettere = testo.length;
  
  // Calcolare l'angolo per ogni lettera in base all'arco specifico
  let angoloStep = angoloTotale / (numLettere - 1); // Suddividi l'arco in base al numero di lettere
  
  // Ciclo su ogni lettera del testo
  for (let i = 0; i < numLettere; i++) {
    let angolo = angoloIniziale + angoloStep * i; // Calcola l'angolo per la lettera i

    // Calcolare la posizione x e y sulla circonferenza
    let x2 = x + raggio * cos(angolo);
    let y2 = y + raggio * sin(angolo);
    
    // Impostazioni per il colore
    noStroke();
    fill("#6969B7"); // Imposta il colore del testo
    
    // Ruotare il testo in modo che sia orientato lungo la curva
    push();
    translate(x2, y2);
    rotate(angolo + 90); // Rotazione per allineare il testo alla curva
    text(testo.charAt(i), 0, 0); // Disegna la lettera
    pop();
  }


  

  
  
}

function percentuali(x, y, size, paese) {
  push();
    
    rotate(90 / value.length * j); 
    
    fill ("white");
    textAlign(CENTER, CENTER)
    textSize (12);
    text(-(spessore/2) + 5/7*size + 200 * fiume["length"]/6000, 0);
    
    pop();

  
  pop(); 

  nomeOutflow (xPos, yPos, circleSize, outflow);
}

function ilMouseOver (x, y, size) {
   // Disegniamo il cerchio
   stroke(0);
   fill(200, 200, 255, 150);
   ellipse(x, y, size*22/26, size*22/26);
 
   // Calcoliamo la posizione del mouse rispetto al centro
   let distanza = dist(mouseX, mouseY, x, y);
 
   // Se il mouse è dentro il cerchio
   if (distanza < 11/26*size) {
     // Calcoliamo l'angolo in radianti
     let angolo = atan2(mouseY - y, mouseX - x);
     
     // Convertiamo l'angolo da radianti a gradi
     let angoloGradi = degrees(angolo);
     
     // Normalizziamo l'angolo per farlo variare tra 0 e 360
     if (angoloGradi < 0) {
       angoloGradi += 360;
     }
     
     // Aggiungiamo l'offset all'angolo e mappiamo l'angolo in gradi a uno degli spicchi (14 spicchi)
     angoloGradi = (angoloGradi + offsetAngolo) % 360;  // Ruotiamo gli spicchi
     let indiceSpicchio = floor(map(angoloGradi, 0, 360, 0, 14)) % 14;
 
     // Mostriamo la scritta corrispondente
     fill(0);
     textSize(24);
     textAlign(CENTER, BOTTOM);
     text(scritte[indiceSpicchio], width / 2, height - 50);
   }
 
   // Disegniamo le linee che dividono il cerchio in 14 spicchi
   stroke(0);
   for (let i = 0; i < 14; i++) {
     // Aggiungiamo l'offset all'angolo iniziale e finale per ruotare gli spicchi
     let angoloInizio = map(i, 0, 14, 0, 360) + offsetAngolo;
     let angoloFine = map(i + 1, 0, 14, 0, 360) + offsetAngolo;
     
     // Normalizziamo gli angoli in modo che siano sempre tra 0 e 360
     angoloInizio = angoloInizio % 360;
     angoloFine = angoloFine % 360;
     
     // Convertiamo gli angoli in radianti
     let radInizio = radians(angoloInizio);
     let radFine = radians(angoloFine);
     
     // Disegniamo le linee di separazione tra gli spicchi
     line(x, y, x + cos(radInizio) * size* 11/26, y + sin(radInizio) * raggio);
     line(centerX, centerY, centerX + cos(radFine) * raggio, centerY + sin(radFine) * raggio);
   }
}

function titoloPaese(x, y, size) {
  fill("#F8FFB8");
  noStroke();
  textFont(inconsolataRegular);
  textSize (size * 0.5);
  textAlign (LEFT, LEFT);

  text ("Afghanistan", x, y);
}
  let xPos = 11/16*totalWidth;

  function findCountryData(countryName) {
    for (let r of data.rows) {
      let riga = r.obj;
      if (riga["Country"] === countryName) {
        return riga;
      }
    }
    return null; // Se il paese non viene trovato
  }
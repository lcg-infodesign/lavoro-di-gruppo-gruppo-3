let data;
let dataObj;
let poppinsRegular;
let inconsolataRegular;
let baskerville;

let activeRay = -1;  // Nessun raggio attivo inizialmente
let spicchiText = [
  "Perception that a woman earning more money than her husband doesn't cause any problems",
  "Perception that men shouldn't have more right to a job than women",
  "Perception that children sufference isn't a consequence of a mother working for pay",
  "Perceptions that men don't necessarily make better business executives than women",
  "Feeling of safety at night",
  "Confidence in the judicial system and courts",
  "Perception that men don't necessarily make better political leaders than women",
  "Percentage of women not in a child marriage",
  "Non genital-mutilated women percentage",
  "Perception that female genital mutilation should stop",
  "Perception that a husband is not justified in hitting or beating his wife under any circumstances",
  "Bank account ownership",
  "House ownership",
  "Land ownership",
];

function preload() {
  data = loadTable("../assets/data.csv", "csv", "header");
 // poppinsRegular = loadFont('assets/Poppins-Regular.ttf');
  inconsolataRegular = loadFont('../fonts/Inconsolata-Regular.ttf');
  baskerville = loadFont ('../fonts/LibreBaskervilleItalic.ttf')
}

function setup() {
  //noLoop();
  window.totalWidth = windowWidth * 0.950;
  window.totalHeight = windowHeight * 0.950;
  createCanvas(totalWidth, totalHeight);
  
    //sistemo il dataset per avere a diposizione i dati per ciascun Paese
    window.nazioni = {} 
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
     
    window.size = 5/16*totalWidth;
    window.xPos = 11/16*totalWidth;
    window.yPos = totalHeight/2;
    
    window.centerX = 11/16*totalWidth;
    window.centerY = totalHeight/2;

    window.indiceSpicchio = -1;
   
}

function draw() {
  background("#06011E");

  // Recupera i parametri dall'URL
  let params = getURLParams();
  let country = params['country']; 
  
  
  disegnaCerchi(xPos, yPos, size);
  

  angleMode(RADIANS);

  

   // Seleziona il primo paese nel dataset
   let paese = nazioni[country];  // Prendi il primo paese nel dataset
  

   mouseOverReaction(paese, size)
   // Passa il paese alla funzione disegnaSole
   disegnaSole(xPos, yPos, size, paese);
   
  //disegnaSole (xPos,yPos, size, nazioni[nomeC]);

  ilGrandeNome (xPos, totalHeight, size, paese, baskerville);

  // ----------------------- testi curvi ---------------------------------
  testoCurvoEconomic (xPos, yPos, size);
  testoCurvoSocial (xPos, yPos, size);
  testoCurvoFree (xPos, yPos, size);
  testoCurvoViolence (xPos, yPos, size);
  //---------------------------------------------------------------------

}


function mouseOverReaction(nazione, size) {
  window.indiceSpicchio = -1;

  let distanza = dist(mouseX, mouseY, centerX, centerY);
  console.log(size, distanza)

  // Se il mouse è dentro il cerchio
  if (distanza < size/2) {
    // Calcoliamo l'angolo in radianti
    let angolo = atan2(mouseY - centerY, mouseX - centerX);
    
    // Convertiamo l'angolo da radianti a gradi
    let angoloGradi = degrees(angolo);
    
    // Normalizziamo l'angolo per farlo variare tra 0 e 360
    if (angoloGradi < 0) {
      angoloGradi += 360;
    }
    
    // Aggiungiamo l'offset all'angolo e mappiamo l'angolo in gradi a uno degli spicchi (14 spicchi)
    angoloGradi = (angoloGradi + 360/28) % 360;  // Ruotiamo gli spicchi
    window.indiceSpicchio = floor(map(angoloGradi, 0, 360, 0, 14)) % 14;

    // Mostriamo la scritta corrispondente
    fill("white");
    textSize (size *0.05)
    textAlign(LEFT, BOTTOM);
    text(spicchiText[indiceSpicchio]+"\n\n"+nazione[spicchiText[indiceSpicchio]], 100, 400);
  }
  
}

function disegnaSole (x, y, size, nazione){
  noStroke();
  fill("#F8FFB8");
  //ellipse(x, y, size/12, size/12);
  // fill(255, 255, 191, 50)
  // ellipse(x, y, size/9, size/9);
  // fill(255, 255, 191, 25)
  ellipse(x, y, size/7, size/7);
  // fill(255, 255, 191, 16)
  // ellipse(x, y, size/6, size/6);

  drawTRay (11, nazione["Bank account ownership"], size);
  drawTRay(12, nazione["House ownership"], size);
  drawTRay(13, nazione["Land ownership"], size);
  drawTRay(0, nazione["Perception that a woman earning more money than her husband doesn't cause any problems"], size);
  drawTRay(1, nazione["Perception that men shouldn't have more right to a job than women"], size);
  drawTRay(2, nazione["Perception that children sufference isn't a consequence of a mother working for pay"], size);
  drawTRay(3, nazione["Perceptions that men don't necessarily make better business executives than women"], size);
  drawTRay(4, nazione["Feeling of safety at night"], size);
  drawTRay(5, nazione["Confidence in the judicial system and courts"], size);
  drawTRay(6, nazione["Perception that men don't necessarily make better political leaders than women"], size);
  drawTRay(7, nazione["Percentage of women not in a child marriage"], size);
  drawTRay(8, nazione["Non genital-mutilated women percentage"], size);
  drawTRay(9, nazione["Perception that female genital mutilation should stop"], size);
  drawTRay(10, nazione["Perception that a husband is not justified in hitting or beating his wife under any circumstances"], size);

  drawSecondRay (11, nazione["Bank account ownership"], size);
  drawSecondRay(12, nazione["House ownership"], size);
  drawSecondRay(13, nazione["Land ownership"], size);
  drawSecondRay(0, nazione["Perception that a woman earning more money than her husband doesn't cause any problems"], size);
  drawSecondRay(1, nazione["Perception that men shouldn't have more right to a job than women"], size);
  drawSecondRay(2, nazione["Perception that children sufference isn't a consequence of a mother working for pay"], size);
  drawSecondRay(3, nazione["Perceptions that men don't necessarily make better business executives than women"], size);
  drawSecondRay(4, nazione["Feeling of safety at night"], size);
  drawSecondRay(5, nazione["Confidence in the judicial system and courts"], size);
  drawSecondRay(6, nazione["Perception that men don't necessarily make better political leaders than women"], size);
  drawSecondRay(7, nazione["Percentage of women not in a child marriage"], size);
  drawSecondRay(8, nazione["Non genital-mutilated women percentage"], size);
  drawSecondRay(9, nazione["Perception that female genital mutilation should stop"], size);
  drawSecondRay(10, nazione["Perception that a husband is not justified in hitting or beating his wife under any circumstances"], size);

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
  fill(255, 255, 191, 100)
  //fill(248, 255, 184)
  let rayLength = parseInt(rayLengthData);
  if(isNaN(rayLength)) {
    
    rayLength = 100;
     // Crea il colore #F8FFB8 con trasparenza (ad esempio alpha = 128)
  let c = color(248, 255, 184, 2); // RGB (248, 255, 184) con alpha 128
  
  fill(c); // Applica il colore con trasparenza
  
    
    
  }
   
  let numRays = 14; 
  let angleStep = TWO_PI / numRays; // Passo angolare per distribuire i raggi in modo uniforme
  
  let angle = angleStep * index; // Calcola l'angolo per il raggio corrente

  // Posizione iniziale dei cerchi (i raggi partono da una distanza maggiore dal centro)
  let x1 = centerX + cos(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  let y1 = centerY + sin(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  
  let minRadius = 0/500*size;  // Raggio minimo per il primo cerchio
  let maxRadius = 6/500*size;  // Raggio massimo per l'ultimo cerchio
  
  
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

function drawSecondRay(index, rayLengthData, size) {
  noStroke();
  fill(255, 255, 191, 4)
  //fill(248, 255, 184)
  let rayLength = parseInt(rayLengthData);
  if(isNaN(rayLength)) {
    
    rayLength = 100;
     // Crea il colore #F8FFB8 con trasparenza (ad esempio alpha = 128)
  let c = color(248, 255, 184 ,0); // RGB (248, 255, 184) con alpha 128
  
  fill(c); // Applica il colore con trasparenza
  
    
    
  } 
  let numRays = 14; 
  let angleStep = TWO_PI / numRays; // Passo angolare per distribuire i raggi in modo uniforme
  
  let angle = angleStep * index; // Calcola l'angolo per il raggio corrente

  // Posizione iniziale dei cerchi (i raggi partono da una distanza maggiore dal centro)
  let x1 = centerX + cos(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  let y1 = centerY + sin(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  
  let minRadius = 2/500*size;  // Raggio minimo per il primo cerchio
  let maxRadius = 12/500*size;  // Raggio massimo per l'ultimo cerchio
  
  
  // Ciclo per disegnare i cerchi lungo il raggio
  for (let j = 0; j < rayLength * size/155; j++) {
    //let radius = map(j, 0, rayLength, minRadius, maxRadius); // Raggio che cresce lungo il raggio
    let radius = map(j, 0, rayLength * 17 / 4, minRadius, maxRadius);
    let distance = j * 2 / 4; // La distanza tra i cerchi lungo il raggio

    // Calcola la posizione di ogni cerchio lungo il raggio
    let x = x1 + cos(angle) * distance;
    let y = y1 + sin(angle) * distance;
    
    ellipse(x, y, radius * 2, radius * 2); // Disegna il cerchio
  }
}

function drawTRay(index, rayLengthData, size) {
  noStroke();
  fill(255, 255, 191, 0.6)
  if(index == indiceSpicchio) {
    fill(200, 200, 200, 2);
  }
  //fill(248, 255, 184)
  let rayLength = parseInt(rayLengthData);
  if(isNaN(rayLength)) {
    
    rayLength = 100;
     // Crea il colore #F8FFB8 con trasparenza (ad esempio alpha = 128)
  let c = color(248, 255, 184 ,0); // RGB (248, 255, 184) con alpha 128
 
  fill(c); // Applica il colore con trasparenza
  
    
    
  }
   
  let numRays = 14; 
  let angleStep = TWO_PI / numRays; // Passo angolare per distribuire i raggi in modo uniforme
  
  let angle = angleStep * index; // Calcola l'angolo per il raggio corrente

  // Posizione iniziale dei cerchi (i raggi partono da una distanza maggiore dal centro)
  let x1 = centerX + cos(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  let y1 = centerY + sin(angle) * size/10; // Aggiustiamo la distanza dal centro (partono più distanti)
  
  let minRadius = 3/500*size;  // Raggio minimo per il primo cerchio
  let maxRadius = 20/500*size;  // Raggio massimo per l'ultimo cerchio
  
  
  // Ciclo per disegnare i cerchi lungo il raggio
  for (let j = 0; j < rayLength * size/150; j++) {
    //let radius = map(j, 0, rayLength, minRadius, maxRadius); // Raggio che cresce lungo il raggio
    let radius = map(j, 0, rayLength * 17 / 4, minRadius, maxRadius);
    let distance = j * 2 / 4; // La distanza tra i cerchi lungo il raggio

    // Calcola la posizione di ogni cerchio lungo il raggio
    let x = x1 + cos(angle) * distance;
    let y = y1 + sin(angle) * distance;
    
    ellipse(x, y, radius * 2, radius * 2); // Disegna il cerchio
  }
}

function mouseMoved() {

  let mouseDist = dist(mouseX, mouseY, centerX, centerY);
  if (mouseDist < size / 2) {  // Controlla se il mouse è dentro il cerchio
    let numRays = 14;
    let angleStep = TWO_PI / numRays; // Passo angolare per distribuire i raggi in modo uniforme
    let angle = atan2(mouseY - centerY, mouseX - centerX); // Calcola l'angolo rispetto al centro

    // Trova il raggio corrispondente all'angolo
    activeRay = floor((angle + PI) / angleStep); // Calcola quale spicchio è attivo
    if (activeRay < 0) activeRay = numRays - 1; // Correggi l'angolo negativo
  } else {
    activeRay = -1;  // Nessun raggio attivo se il mouse è fuori dal cerchio
  }
}

function disegnaCerchi(x, y, size){
  noFill();
  strokeWeight (2);
  stroke(214, 214, 156, 90);
  drawingContext.setLineDash([0.5, 10.5]);
  ellipse(x, y, size*22/26, size*22/26);
  stroke(214, 214, 156, 70);
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

function ilGrandeNome (x, totalHeight, size, nome, font){
  
  textAlign(CENTER, TOP);
  textSize (size *0.1)
  textFont (font);
  fill(248, 255, 184);
  text(nome["nome"], x - 13/16*x, (totalHeight/2)-(8/16*size))
}

function findCountryData(countryName) {
    for (let r of data.rows) {
      let riga = r.obj;
      if (riga["Country"] === countryName) {
        console.log("Data found for", countryName);
        return riga;
      }
    }
    console.log("Data not found for", countryName);  // Aggiungi un log per verificare
    return null; // Se il paese non viene trovato
}
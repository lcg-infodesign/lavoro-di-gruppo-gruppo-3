let data;
let nazioni = {};
let backgroundColor = '#06011e';


function preload(){
  data = loadTable("/assets/data.csv", "csv", "header");
}

function setup() {
  let totalWidth = windowWidth;
  let totalHeight = windowHeight*0.70;;
  createCanvas(totalWidth, totalHeight);
  noLoop();
}

function draw() {
  background(backgroundColor);
  
  let minAverage = Infinity;
  let maxAverage = -Infinity;
  
  // Prepariamo i dati
  for (let r of data.rows) {
    let riga = r.obj;
    let nomeC = riga["Country"];
    
    // Troviamo il valore minimo e massimo della media
    let avg = parseFloat(riga["Average"]);
    minAverage = min(minAverage, avg);
    maxAverage = max(maxAverage, avg);
    
    if (!(nomeC in nazioni)) {
      nazioni[nomeC] = {
        "nome": nomeC,
        "continent": riga["Continent"],
        "lon": riga["Longitude"],
        "lat": riga["Latitude"],
        "average": avg
      };
    }
    nazioni[nomeC][riga["Parameter"]] = riga["Value"];
  }

  // Ciclo attraverso i paesi e disegno le sfere
  for (let paese in nazioni) {
    let paeseData = nazioni[paese];
    let lat = paeseData.lat;
    let lon = paeseData.lon;
    let value = paeseData.average;
    
    // Mappiamo le coordinate per il canvas
    let x = map(lon, -105, 130, 0, width);
    let y = map(lat, -30, 65, height, 0);
    
    // Mappa il valore della media al diametro tra 10 e 20
    let size = windowWidth * 0.1;
    let diameter = map(value, minAverage, maxAverage, size * 0.04, size * 0.14);
    
    // Imposta il colore con opacità mappata (se vuoi mantenerlo uguale a prima)
    let opacity = map(value, minAverage, maxAverage, 45, 255); // 115 è 45% di 255, 255 è 100% di opacità
    let c = color(253, 255, 160, opacity); // Usa il colore bianco con l'opacità mappata
    drawHalo(x, y, value, diameter);
    // Disegno il glifo con il colore e il diametro mappato
    drawGliph(x, y, c, diameter);
  }
}

function drawHalo(x, y, value, diameter) {
  let maxHaloSize = map(value, 0, 10, diameter * 0.1, diameter * 0.6); // Mappa la grandezza dell'alone in base al valore "average"
  for (let i = 0; i < 5; i++) {
    let currentSize = maxHaloSize * (i + 1) * 0.2; // Aumenta la dimensione progressivamente
    let currentOpacity = map(i, 0, 4, 50, 10); // Decrescita dell'opacità
    let halo = color(253, 255, 140, currentOpacity);
    fill(halo);
    noStroke();
    ellipse(x, y, currentSize);
  }
}

function drawGliph(x, y, c, diameter){
  fill(c);
  noStroke();
  ellipse(x, y, diameter); // Usa il diametro mappato per il pallino
}
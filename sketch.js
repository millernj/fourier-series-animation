let time = 0;
let wave = [];
let input;
let fidelity;
let button;
let radio;
let baseRadius = 150;

function setup() {
  createCanvas(1080, 480);

  radio = createRadio();
  radio.option('step');
  radio.option('sawtooth');
  radio.value('step');
  radio.style('max-width', '200px');
  radio.style('display', 'flex');
  radio.style('flex-flow', 'row');
  radio.style('justify-content', 'space-around');
  radio.mouseClicked(() => {
    wave = [];
    time = 0;
  })

  createDiv('total # of circles = ');
  input = createInput('1');
  fidelity = input.value();
  input.input(() => {
    fidelity = input.value() || 1;
    wave = [];
    time = 0;
  })

  button = createButton('Add 1');
  button.mouseClicked(() => {
    fidelity = Number(fidelity) + 1;
    input.value(fidelity);
    wave = [];
    time = 0;
  })
  button = createButton('Subtract 1');
  button.mouseClicked(() => {
    fidelity = Number(fidelity) - 1;
    input.value(fidelity);
    wave = [];
    time = 0;
  })
}

function draw() {
  background(0);
  translate(300, 240);

  let x = 0;
  let y = 0;
  for (let i = 0; i < fidelity; i++) {
    let prevx = x;
    let prevy = y;
    let n;
    switch (radio.value()) {
      case 'step':
        n = 2 * i + 1;
        break;
      case 'sawtooth':
        n = (i + 1) * pow(-1, (i + 1));
        break;
      default:
        n = 1 / (i + 1);
        break;
    }
    let radius = n != 0 ? baseRadius * (2.5 / (n * PI)) : 0;
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    fill(255);
    stroke(255, 150);
    line(prevx, prevy, x, y);
    // ellipse(x, y, 6);
  }

  wave.unshift([x, y]);
  // translate(200, 0);

  // line(x - 200, y, x, y);
  beginShape();
  noFill();
  stroke('#ffc0c0');
  wave.forEach((curve) => {
    vertex(curve[0], curve[1]);
  })
  endShape();

  translate(400, 0);

  stroke(255, 100);
  line(x - 400, y, 0, y);
  beginShape();
  noFill();
  stroke('#c0ffee');
  wave.forEach((curve, i) => {
    vertex(i * 0.8, curve[1]);
  })
  endShape();

  time += 0.015;

  if (wave.length > 600) {
    wave.pop();
  }
}
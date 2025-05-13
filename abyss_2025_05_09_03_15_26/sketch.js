let tentacles = [];
let time = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(30);
  smooth();

  // Initialize tentacles
  for (let i = 0; i < 80; i++) {
    tentacles.push(createTentacle(i));
  }
}

function draw() {
  background(0);

  // Lighting for eerie underwater effect
  ambientLight(10);
  pointLight(100, 120, 255, 0, 0, 300);
  directionalLight(60, 60, 120, -0.5, 0.5, -1);

  rotateY(time * 0.2);
  rotateX(sin(time * 0.3) * 0.2);

  noStroke();
  specularMaterial(100, 130, 180);
  shininess(80);

  for (let t of tentacles) {
    drawTentacle(t);
  }

  time += 0.01;
}

function createTentacle(index) {
  let segments = [];
  let angleOffset = random(TWO_PI);
  let baseLength = 200;
  let detail = 30;

  for (let i = 0; i < detail; i++) {
    segments.push({
      radius: map(i, 0, detail, 20, 2),
      length: map(i, 0, detail, 0, baseLength),
      angleOffset: angleOffset + i * 0.1
    });
  }

  return {
    baseX: sin(index * 0.2) * 150,
    baseY: cos(index * 0.2) * 150,
    baseZ: sin(index * 0.2 + PI) * 150,
    segments: segments,
    index: index
  };
}

function drawTentacle(t) {
  push();
  translate(t.baseX, t.baseY, t.baseZ);

  beginShape(TRIANGLE_STRIP);

  for (let s of t.segments) {
    let wave = sin(time * 2 + s.angleOffset + t.index * 0.1) * 15;
    let twist = cos(time + s.angleOffset) * 0.5;

    let x = s.length * 0.1 + wave;
    let y = s.length;
    let z = sin(s.angleOffset + time * 0.5) * 10;

    let r = s.radius;

    for (let a = 0; a < TWO_PI; a += PI / 8) {
      let vx = x + r * cos(a + twist);
      let vy = y;
      let vz = z + r * sin(a + twist);

      let nx = cos(a);
      let ny = 0;
      let nz = sin(a);

      normal(nx, ny, nz);
      vertex(vx, vy, vz);
    }
  }

  endShape();
  pop();
}

function mousePressed() {
  // Regenerate tentacles
  tentacles = [];
  for (let i = 0; i < 80; i++) {
    tentacles.push(createTentacle(i));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

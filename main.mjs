import {ChaosGame} from "./chaosgame.mjs";
import {Vector} from "./vector.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let worldWidth = canvas.width;
let worldHeight = canvas.height;
let worldWidth2 = worldWidth / 2;
let worldHeight2 = worldHeight / 2;
let worldUpdated = true;

const updateWorldSettings = () => {
  if (worldHeight !== window.innerHeight || worldWidth !== window.innerWidth) {
    worldWidth = window.innerWidth;
    worldHeight = window.innerHeight;
    worldWidth2 = worldWidth / 2;
    worldHeight2 = worldHeight / 2;
    canvas.width = worldWidth;
    canvas.height = worldHeight;
    worldUpdated = true;
  }
};

updateWorldSettings();

let n = 3;
let stepPercentage = 0.5;
let allowSamePointInARow = true;

if (false) {
  n = 5;
  allowSamePointInARow = false;
} else if (false) {
  n = 15;
  stepPercentage = 0.8;
  // allowSamePointInARow = false;
} else if (false) {
  n = 6;
  stepPercentage = 0.667;
  // allowSamePointInARow = false;
} else if (true) {
  n = 4;
  stepPercentage = 0.4;
  allowSamePointInARow = false;
}

function createChaosGame() {
  // triangle
  let seedPoints = [new Vector(worldWidth2, 10),
    new Vector(worldWidth2 - worldHeight2, worldHeight - 10),
    new Vector(worldWidth2 + worldHeight2, worldHeight - 10)];
  const radius = Math.min(worldWidth2, worldHeight2);
  seedPoints = [];
  for (let i = 0; i < n; i++) {
    const angle = i * Math.PI * 2 / n
    seedPoints.push(Vector.fromAngle(angle).mult(radius).add(worldWidth2, worldHeight2));
  }


  return new ChaosGame(
      seedPoints,
      stepPercentage, allowSamePointInARow,
      worldWidth, worldHeight);
}

let chaosGame = createChaosGame();

ctx.fillStyle = "white";

const update = () => {

  if (worldUpdated) {
    worldUpdated = false;
    chaosGame = createChaosGame();
    ctx.clearRect(0, 0, worldWidth, worldHeight);
    chaosGame.draw(ctx);
  }

  updateWorldSettings();

  for (let i = 0; i < 100; i++) {
    chaosGame.step(ctx);
  }

  requestAnimationFrame(update);
}

update();

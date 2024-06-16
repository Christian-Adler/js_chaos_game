import {Vector} from "./vector.mjs";
import {getRandomIntInclusive, lerpVec, rad2deg} from "./utils.mjs";

class ChaosGame {
  constructor(seedPoints, worldWidth, worldHeight) {
    this.seedPoints = seedPoints;

    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.worldCenter = new Vector(worldWidth / 2, worldHeight / 2);

    this.randomVec = new Vector(this.worldWidth * Math.random(), this.worldHeight * Math.random(), this.worldWidth * Math.random());
  }

  step(ctx) {

    const rndSeedPointIdx = getRandomIntInclusive(0, this.seedPoints.length - 1);
    const rndSeedPoint = this.seedPoints[rndSeedPointIdx];

    this.randomVec = lerpVec(this.randomVec, rndSeedPoint, 0.5);

    const dir = this.randomVec.clone();
    dir.x -= this.worldWidth / 2;
    dir.y -= this.worldHeight / 2;

    ctx.fillStyle = 'hsl(' + (rad2deg(dir.toRadians())) + ' 100% 50% / ' + (100) + '%)';

    this.randomVec.draw(ctx);
  }

  draw(ctx) {
    for (const seedPoint of this.seedPoints) {
      seedPoint.draw(ctx);
    }
  }
}

export {ChaosGame};
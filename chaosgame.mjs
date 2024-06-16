import {Vector} from "./vector.mjs";
import {getRandomIntInclusive, lerpVec, rad2deg} from "./utils.mjs";

class ChaosGame {
  constructor(seedPoints, stepPercentage, worldWidth, worldHeight) {
    this.seedPoints = seedPoints;
    this.stepPercentage = stepPercentage;

    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.currentVec = new Vector(this.worldWidth * Math.random(), this.worldHeight * Math.random(), this.worldWidth * Math.random());
  }

  step(ctx) {

    const rndSeedPointIdx = getRandomIntInclusive(0, this.seedPoints.length - 1);
    const rndSeedPoint = this.seedPoints[rndSeedPointIdx];

    this.currentVec = lerpVec(this.currentVec, rndSeedPoint, this.stepPercentage);

    const dir = this.currentVec.clone();
    dir.x -= this.worldWidth / 2;
    dir.y -= this.worldHeight / 2;

    ctx.fillStyle = 'hsl(' + (rad2deg(dir.toRadians())) + ' 100% 50% / ' + (100) + '%)';

    this.currentVec.draw(ctx);
  }

  draw(ctx) {
    for (const seedPoint of this.seedPoints) {
      seedPoint.draw(ctx);
    }
  }
}

export {ChaosGame};
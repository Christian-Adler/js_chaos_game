import {getRandomIntInclusive, lerpVec, rad2deg} from "./utils.mjs";

class ChaosGame {
  constructor(seedPoints, stepPercentage, allowSamePointInARow, worldWidth, worldHeight) {
    this.seedPoints = seedPoints;
    this.stepPercentage = stepPercentage;
    this.allowSamePointInARow = allowSamePointInARow;

    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.prevIdx = getRandomIntInclusive(0, this.seedPoints.length - 1);
    this.currentVec = this.seedPoints[this.prevIdx];
  }

  step(ctx) {

    let rndSeedPointIdx = getRandomIntInclusive(0, this.seedPoints.length - 1);
    while (!this.allowSamePointInARow && rndSeedPointIdx === this.prevIdx)
      rndSeedPointIdx = getRandomIntInclusive(0, this.seedPoints.length - 1);
    this.prevIdx = rndSeedPointIdx;
    const rndSeedPoint = this.seedPoints[rndSeedPointIdx];

    this.currentVec = lerpVec(this.currentVec, rndSeedPoint, this.stepPercentage);

    const dir = this.currentVec.clone();
    dir.x -= this.worldWidth / 2;
    dir.y -= this.worldHeight / 2;

    ctx.fillStyle = 'hsl(' + (rad2deg(dir.toRadians())) + ' 100% 50% / ' + (80) + '%)';

    this.currentVec.draw(ctx);
  }

  draw(ctx) {
    for (const seedPoint of this.seedPoints) {
      seedPoint.draw(ctx);
    }
  }
}

export {ChaosGame};
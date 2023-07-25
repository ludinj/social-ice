const fs = require('fs');
const checkCrash = () => {
  const { ball1, ball2 } = parseBallFile();
  // Calculate distance between the balls in each axis
  const distanceX = ball2.x - ball1.x;
  const distanceY = ball2.y - ball1.y;
  const distanceZ = ball2.z - ball1.z;

  const radiusSum = ball1.radius + ball2.radius;

  const distanceSquared = distanceX ** 2 + distanceY ** 2 + distanceZ ** 2;
  const radiusSumSquared = radiusSum ** 2;

  // Calculate the relative velocity between the balls in each axis
  const velocityX = ball2.vx - ball1.vx;
  const velocityY = ball2.vy - ball1.vy;
  const velocityZ = ball2.vz - ball1.vz;

  // Calculate coefficients for the quadratic equation
  const a = velocityX ** 2 + velocityY ** 2 + velocityZ ** 2;
  const b =
    2 * (distanceX * velocityX + distanceY * velocityY + distanceZ * velocityZ);
  const c = distanceSquared - radiusSumSquared;

  const discriminant = b ** 2 - 4 * a * c;

  if (discriminant < 0) {
    // The balls will not collide
    return { result: 'NO' };
  }

  const collisionTime = (-b - Math.sqrt(discriminant)) / (2 * a);

  if (collisionTime < 0) {
    //  the balls are already moving away from each other
    return { result: 'NO' };
  }

  const collisionX = ball1.x - ball1.radius + ball1.vx * collisionTime;
  const collisionY = ball1.y - ball1.radius + ball1.vy * collisionTime;
  const collisionZ = ball1.z - ball1.radius + ball1.vz * collisionTime;

  return {
    result: 'YES',
    coordinates: {
      x: collisionX.toFixed(5),
      y: collisionY.toFixed(5),
      z: collisionZ.toFixed(5)
    }
  };
};

const parseBallFile = (filename) => {
  const fileContents = fs.readFileSync(filename, 'utf8');
  const lines = fileContents.split('\n');

  const ball1Values = lines[0].split(' ').map(Number);
  const ball2Values = lines[1].split(' ').map(Number);

  const ball1 = {
    radius: ball1Values[0],
    x: ball1Values[1],
    y: ball1Values[2],
    z: ball1Values[3],
    vx: ball1Values[4],
    vy: ball1Values[5],
    vz: ball1Values[6]
  };

  const ball2 = {
    radius: ball2Values[0],
    x: ball2Values[1],
    y: ball2Values[2],
    z: ball2Values[3],
    vx: ball2Values[4],
    vy: ball2Values[5],
    vz: ball2Values[6]
  };

  return {
    ball1,
    ball2
  };
};
function findEvenIndex(arr) {
  for (let i = 0; i < arr.length; i++) {
    let leftSum = 0;
    let rightSum = 0;
    for (let j = 0; j < arr.length; j++) {
      if (j < i) {
        leftSum += arr[j];
      } else if (j > i) {
        rightSum += arr[j];
        // console.log(i, j);
      }
    }
    if (leftSum === rightSum) return i;
  }
  return -1;
}

findEvenIndex([1, 2, 3, 4, 3, 2, 1]);
function moveZeros(arr) {
  const result = [];
  let zeroCount = 0;
  arr.forEach((element) => {
    if (element === 0) {
      zeroCount++;
    } else {
      result.push(element);
    }
  });

  for (let index = 0; index < zeroCount; index++) {
    result.push(0);
  }
  return result;
}

function persistence(num, times) {
  //code me
  let result = times || 0;
  let next = 0;
  const numsArr = num.toString().split('');
  for (let i = 0; i < numsArr.length; i++) {
    next *= parseInt(numsArr[i]);
  }
  if (numsArr.length === 1) {
    return result;
  } else {
    return persistence(next, times + 1);
  }
}

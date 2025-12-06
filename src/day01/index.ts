// dial with arrow and numbers from 0-99
// dial starts at 50
// one rotation per line with direction and distance
// password is number of clicks that result in the dialPosition pointing to 0

import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'input.txt')
const rotations = fs.readFileSync(filePath, 'utf8').split('\n');

let zeroCount = 0;
let dialPosition = 50;

for (const rotation of rotations) {

    const direction: 'R' | 'L' = rotation[0] as 'R' | 'L';
    const distance = parseInt(rotation.slice(1), 10);

    let rangeStart: number;
    let rangeEnd: number;

    if (direction === 'R') {
        // handle right-ward rotation
        rangeStart = dialPosition + 1;
        rangeEnd = dialPosition + distance;

        // set landing position
        dialPosition = (dialPosition + distance) % 100;
    } else {
        // handle left-ward rotation
        rangeStart = dialPosition - distance;
        rangeEnd = dialPosition - 1;

        // set landing position
        dialPosition = (dialPosition - distance) % 100;
        if (dialPosition < 0) {
            dialPosition += 100;
        }
    }

    // traverse the range, counting any numbers even-divisible by 100
    while (rangeStart <= rangeEnd) {
        if (rangeStart % 100 === 0) {
            zeroCount++
        }

        rangeStart++;
    }
}

console.log('zeroCount :>> ', zeroCount);

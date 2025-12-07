import fs from 'fs';
import path from 'path';

export type Direction = 'R' | 'L';

export interface Rotation {
    direction: Direction;
    distance: number;
}

export function parseRotations(input: string): Rotation[] {
    return input.trim().split('\n').map(line => {
        const direction = line[0] as Direction;
        const distance = parseInt(line.slice(1), 10);
        return { direction, distance };
    });
}

export function calculateZeroCrossings(rotations: Rotation[], startPosition: number = 50): number {
    let zeroCount = 0;
    let dialPosition = startPosition;

    for (const rotation of rotations) {
        const { direction, distance } = rotation;
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
        for (let i = rangeStart; i <= rangeEnd; i++) {
            if (i % 100 === 0) {
                zeroCount++;
            }
        }
    }

    return zeroCount;
}

// Only run this if the file is executed directly
if (require.main === module) {
    const filePath = path.join(__dirname, 'input.txt');
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const rotations = parseRotations(fileContent);
        const zeroCount = calculateZeroCrossings(rotations);
        console.log('zeroCount :>> ', zeroCount);
    } catch (error) {
        console.error('Error reading or processing file:', error);
    }
}

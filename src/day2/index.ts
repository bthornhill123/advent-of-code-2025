import fs from 'fs';
import path from 'path';

export function part1(input: string): number {
    let invalidIdSum = 0;

    const ranges = input.split(',');
    for (const range of ranges) {
        const [startStr, endStr] = range.split('-');
        const start: number = parseInt(startStr, 10);
        const end: number = parseInt(endStr, 10);

        let i = start;
        while (i <= end) {
            const iStr = i.toString();

            // odd numbers cant have 2 repeated nums
            if (iStr.length % 2 !== 0) {
                i++;
                continue
            }


            const firstHalf = iStr.slice(0, iStr.length / 2);
            const secondHalf = iStr.slice(iStr.length / 2);

            if (firstHalf === secondHalf) {
                invalidIdSum += i;
            }

            i++;
        }
    }

    return invalidIdSum;
}

export function part2(input: string): number {
    let invalidIdSum = 0;

    const ranges = input.split(',');
    for (const range of ranges) {
        let [startStr, endStr] = range.split('-');
        let start: number = parseInt(startStr, 10);
        let end: number = parseInt(endStr, 10);

        while (start <= end) {
            if (isRepeatable(start.toString())) {
                invalidIdSum += start;
            }

            start++;
        }
    }

    return invalidIdSum;
}

function isRepeatable(str: string): boolean {
    // the longest repeatable sequnece length of a string is the length / 2
    // the shortest repeatable sequence length of a string is 1 (obviously)

    let repeatableSegmentLength = 1;
    while (repeatableSegmentLength <= str.length / 2) {
        const subStr = str.slice(0, repeatableSegmentLength)
        const subStrRepeated = subStr.repeat(str.length / repeatableSegmentLength);
        if (subStrRepeated === str) {
            return true;
        }

        repeatableSegmentLength++;
    }
    return false;
}

if (require.main === module) {
    const inputPath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(inputPath, 'utf-8');
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}

import fs from 'fs';
import path from 'path';

export function part1(input: string): any {
    return 0;
}

export function part2(input: string): any {
    return 0;
}

if (require.main === module) {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}

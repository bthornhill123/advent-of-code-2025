import { describe, it, expect } from '@jest/globals';
import { part1, part2 } from './index';

const input = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;

describe('Day 4', () => {
    describe('part1', () => {
        it('should solve example case', () => {
            expect(part1(input)).toBe(13);
        });
    });

    describe('part2', () => {
        it('should solve example cases', () => {
            expect(part2(input)).toBe(43);
        });
    });
});

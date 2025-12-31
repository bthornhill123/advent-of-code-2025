import { describe, it, expect } from '@jest/globals';
import { part1, part2 } from './index';

describe('Day 3', () => {
    describe('part1', () => {
        it('should solve example cases', () => {
            let input = '987654321111111';
            expect(part1(input)).toBe(98);

            input = '811111111111119';
            expect(part1(input)).toBe(89);

            input = '234234234234278';
            expect(part1(input)).toBe(78);

            input = '818181911112111';
            expect(part1(input)).toBe(92);
        });
    });

    describe('part2', () => {
        it('should solve example cases', () => {
            let input = '987654321111111';
            expect(part2(input)).toBe(987654321111);

            input = '811111111111119';
            expect(part2(input)).toBe(811111111119);

            input = '234234234234278';
            expect(part2(input)).toBe(434234234278);

            input = '818181911112111';
            expect(part2(input)).toBe(888911112111);
        });
    });
});

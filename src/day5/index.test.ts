import { describe, it, expect } from '@jest/globals';
import { part1, part2 } from './index';

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;

describe('Day 5', () => {
    describe('part1', () => {
        it('should solve example case', () => {
            expect(part1(input)).toBe(3);
        });
    });

    describe('part2', () => {
        it('should solve example cases', () => {
            expect(part2(input)).toBe(14);
        });
    });
});

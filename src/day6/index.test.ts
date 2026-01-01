import { describe, it, expect } from '@jest/globals';
import { part1, part2 } from './index';

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

describe('Day 6', () => {
    it('should solve example case for part 1', () => {
        expect(part1(input)).toBe(4277556);
    });

    it('should solve example case for part 2', () => {
        expect(part2(input)).toBe(3263827);
    });
});

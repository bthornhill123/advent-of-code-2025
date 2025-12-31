import { describe, it } from '@jest/globals';
import { part1, part2 } from './index';

describe('Day 2', () => {
    describe('Part 1', () => {
        it('should sum numbers with matching halves', () => {
            // 1111: first half "11" equals second half "11"
            expect(part1('1111-1111')).toBe(1111);
        });

        it('should skip numbers with odd length', () => {
            // 111 has odd length, should be skipped
            expect(part1('111-111')).toBe(0);
        });

        it('should handle multiple valid numbers', () => {
            // 1111 and 2222 both have matching halves
            expect(part1('1111-1111,2222-2222')).toBe(1111 + 2222);
        });

        it('should skip numbers without matching halves', () => {
            // 1234: first half "12" != second half "34"
            expect(part1('1234-1234')).toBe(0);
        });
    });

    describe('Part 2', () => {
        it('should return 0 for single non-repeatable number', () => {
            expect(part2('12-12')).toBe(0);
        });

        it('should sum repeatable numbers', () => {
            // 11 is repeatable (1 repeated)
            expect(part2('11-11')).toBe(11);
        });

        it('should handle range with multiple repeatable numbers', () => {
            // 11, 22, 33, 44, 55, 66, 77, 88, 99 are all repeatable
            expect(part2('11-22')).toBe(11 + 22);
        });

        it('should handle multiple ranges', () => {
            // First range: 11, Second range: 22
            expect(part2('11-11,22-22')).toBe(11 + 22);
        });
    });
});

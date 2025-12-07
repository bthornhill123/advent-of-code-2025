import { describe, it } from 'node:test';
import assert from 'node:assert';
import { parseRotations, calculateZeroCrossings, Rotation } from './index';

describe('Day 1', () => {
    describe('parseRotations', () => {
        it('should parse valid input correctly', () => {
            const input = 'R10\nL5\nR99';
            const expected: Rotation[] = [
                { direction: 'R', distance: 10 },
                { direction: 'L', distance: 5 },
                { direction: 'R', distance: 99 },
            ];
            assert.deepStrictEqual(parseRotations(input), expected);
        });
    });

    describe('calculateZeroCrossings', () => {
        it('should count zero crossings for right rotation passing 0', () => {
            const rotations: Rotation[] = [{ direction: 'R', distance: 20 }];
            const count = calculateZeroCrossings(rotations, 90);
            assert.strictEqual(count, 1);
        });

        it('should count zero crossings for left rotation passing 0', () => {
            const rotations: Rotation[] = [{ direction: 'L', distance: 20 }];
            const count = calculateZeroCrossings(rotations, 10);
            assert.strictEqual(count, 1);
        });

        it('should not count if 0 is not crossed', () => {
            const rotations: Rotation[] = [{ direction: 'R', distance: 10 }];
            const count = calculateZeroCrossings(rotations, 50);
            assert.strictEqual(count, 0);
        });

        it('should handle multiple rotations', () => {
            const rotations: Rotation[] = [
                { direction: 'R', distance: 20 },
                { direction: 'L', distance: 20 }
            ];
            const count = calculateZeroCrossings(rotations, 90);
            assert.strictEqual(count, 2);
        });

        it('should handle landing exactly on 0', () => {
            const rotations: Rotation[] = [{ direction: 'R', distance: 1 }];
            const count = calculateZeroCrossings(rotations, 99);
            assert.strictEqual(count, 1);
        });
        
        it('should handle landing exactly on 0 from left', () => {
            const rotations: Rotation[] = [{ direction: 'L', distance: 1 }];
            const count = calculateZeroCrossings(rotations, 1);
            assert.strictEqual(count, 1);
        });
    });
});

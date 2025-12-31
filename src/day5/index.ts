import * as fs from 'fs';
import path from 'path';

export function part1(input: string): number {
    let freshAvailableIngredientCount = 0;

    const [freshRanges, availableIngredients] = input.split('\n\n');


    for (const availableIngredient of availableIngredients.split('\n')) {
        if (isFresh(availableIngredient, freshRanges.split('\n'))) {
            freshAvailableIngredientCount++;
        }
    }

    return freshAvailableIngredientCount;
}

function isFresh(ingredientStr: string, freshRanges: string[]): boolean {
    const ingredient = parseInt(ingredientStr, 10);
    for (const freshRange of freshRanges) {
        const [startStr, endStr] = freshRange.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);

        if (ingredient >= start && ingredient <= end) {
            return true;
        }
    }   

    return false;
}

export function part2(input: string): number {
    let totalFreshIngredientCount = 0;

    const freshRanges = input.split('\n\n')[0].split('\n');

    // Order the ranges by start value
    const orderedFreshRanges = freshRanges.sort((rangeOne, rangeTwo) => {
        const [rangeOneStart] = rangeBounds(rangeOne);
        const [rangeTwoStart] = rangeBounds(rangeTwo);
        return rangeOneStart - rangeTwoStart;
    });

    // Merge overlapping ranges so that processing is easy
    const nonOverlappingFreshRanges: string[] = [];
    for (const freshRange of orderedFreshRanges) {
        const [freshStart, freshEnd] = rangeBounds(freshRange);

        const lastNonOverlappingRange = nonOverlappingFreshRanges[nonOverlappingFreshRanges.length - 1];
        if (lastNonOverlappingRange) {
            const [lastStart, lastEnd] = rangeBounds(lastNonOverlappingRange);

            // Check for overlap
            if (freshStart <= lastEnd) {
                // Merge ranges
                const mergedRange = `${lastStart}-${Math.max(lastEnd, freshEnd)}`;
                nonOverlappingFreshRanges[nonOverlappingFreshRanges.length - 1] = mergedRange;
                continue;
            }
        }

        // No overlap, just add the range
        nonOverlappingFreshRanges.push(freshRange);
    }

    // Add up all the fresh ingredient counts
    for (const freshRange of nonOverlappingFreshRanges) {
        const [start, end] = rangeBounds(freshRange);
        totalFreshIngredientCount += (end - start + 1);
    }

    return totalFreshIngredientCount;
}

// rangeBounds will return an array of length 2 with start and end
function rangeBounds(range: string): number[] {
    const [startStr, endStr] = range.split('-');
    return [parseInt(startStr, 10), parseInt(endStr, 10)];
}


// Main execution
if (require.main === module) {
    const inputPath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(inputPath, 'utf-8');
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}

import * as fs from 'fs';
import path from 'path';

export function part1(input: string): number {
    const grid = parseGrid(input);
    let total = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const isToiletPaper = grid[row][col];
            if (isToiletPaper) {
                const adjacentRolls = getAdjacentCount(grid, row, col);
                const eligibleToMove = adjacentRolls < 4;
                if (eligibleToMove) {
                    total++;
                }
            }
        }
    }

    return total;
}

export function part2(input: string): number {
    const grid = parseGrid(input);
    let total = 0;

    while (true) {
        const removalCount = removeEligibleRolls(grid);
        if (removalCount == 0) {
            break;
        } 

        total += removalCount;
    }

    return total;
}

function removeEligibleRolls(grid: boolean[][]): number {
    let totalRemoved = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const isToiletPaper = grid[row][col];
            if (isToiletPaper) {
                const adjacentRolls = getAdjacentCount(grid, row, col);
                const eligibleToMove = adjacentRolls < 4;
                if (eligibleToMove) {
                    totalRemoved++;
                    
                    // Mark the roll as removed from the grid
                    grid[row][col] = false;
                }
            }
        }
    }

    return totalRemoved
}

function parseGrid(input: string): boolean[][] {
    return input.trim().split('\n').map(line => line.split('').map(c => c === '@' ? true : false));
}

function getAdjacentCount(grid: boolean[][], row: number, col: number): number {
    let count = 0;

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            // Skip self
            if (x === 0 && y === 0) {
                continue; 
            }
            
            // Calculate position we are checking
            const newRow = row + x;
            const newCol = col + y;

            // Ensure in-bounds
            if (newRow < 0 || newRow >= grid.length) {
                continue;
            }
            if (newCol < 0 || newCol >= grid[0].length) {
                continue;
            }

            // Increment count if `true`
            if (grid[newRow][newCol]) {
                count++;
            }
        }
    }

    return count;
}


// Main execution
if (require.main === module) {
    const inputPath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(inputPath, 'utf-8');
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}

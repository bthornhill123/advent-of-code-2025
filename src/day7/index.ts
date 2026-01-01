import fs from 'fs';
import path from 'path';

type GridCell = '.' | 'S' | '|' | '^';

export function part1(input: string): any {
    let splitBeamCount = 0;

    const grid: string[][] = input.split('\n').map(line => line.split(''));
    const numRows = grid.length;
    const numCols = grid[0].length;

    let row = 0;
    while (row < numRows) {
        let col =  0;
        while (col < numCols) {
            const cell: GridCell = grid[row][col] as GridCell;

            // handle first row special case-ness
            if (row === 0) {
                if (cell === 'S') {
                    // mark the beam
                    grid[row][col] = '|'
                }

                col++;
                continue;
            }
            
            // handle empty cells
            if (cell === '.') {
                // continue beam if needed
                const cellAbove: GridCell = grid[row-1][col] as GridCell;
                if (cellAbove === '|') {
                    // carry the beam through
                    grid[row][col] = '|';
                }
            }

            // handle splitter cells
            if (cell === '^') {
                const cellAbove: GridCell = grid[row-1][col] as GridCell;
                if (cellAbove === '|') {
                    // mark left and right cells as beams
                    if (col > 0) {
                        grid[row][col-1] = '|';
                    }
                    if (col < numCols - 1) {
                        grid[row][col+1] = '|';
                    }

                    splitBeamCount++;
                }
            }

            col++;
        }
        
        row++;
    }
    

    return splitBeamCount;
}

export function part2(input: string): any {
    let splitBeamCount = 0;

    const grid: string[][] = input.split('\n').map(line => line.split(''));
    const numRows = grid.length;
    const numCols = grid[0].length;
    const timelines: number[][] = Array.from({ length: numRows }, () => 
        new Array(numCols).fill(0)
    );

    // find S and set initial timeline
    for (let col = 0; col < numCols; col++) {
        if (grid[0][col] === 'S') timelines[0][col] = 1;
    }

    let row = 0;
    while (row < numRows - 1) {
        let col =  0;
        while (col < numCols) {
            // skip if no timelines reached here
            const timelineCount = timelines[row][col];
            if (timelineCount === 0) {
                col++;
                continue;
            }

            const cell: GridCell = grid[row][col] as GridCell;

            if (cell === '.' || cell === 'S') {
                // carry the timeline down
                if (row + 1 < numRows) {
                    timelines[row + 1][col] += timelineCount;
                }
            } else if (cell === '^') {
                // split: current timelines flow to bottom-left and bottom-right
                if (row + 1 < numRows) {
                    if (col > 0) timelines[row + 1][col - 1] += timelineCount;
                    if (col < numCols - 1) timelines[row + 1][col + 1] += timelineCount;
                }
            }

            col++;
        }
        
        row++;
    }

    const totalTimelineCount = timelines[numRows - 1].reduce((sum, val) => sum + val, 0);
    return totalTimelineCount;
}

if (require.main === module) {
    const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}

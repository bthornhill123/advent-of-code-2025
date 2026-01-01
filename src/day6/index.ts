import * as fs from 'fs';
import path from 'path';

export function part1(input: string): number {
    let grandTotal = 0;

    const rows = input.trim().split('\n');
    const operatorRow = rows[rows.length - 1]
        .split(/\s+/)
        .filter(x => x.length > 0);
    
    const numberRows = rows.slice(0, -1).map(row =>
        row.split(/\s+/)
            .filter(x => x.length > 0)
            .map(x => parseInt(x, 10))
    );

    // solve each column's problem
    for (let i = 0; i < operatorRow.length; i++) {
        const operator = operatorRow[i];
        const isAddition = operator === '+';
        
        let columnTotal = isAddition ? 0 : 1;
        for (let j = 0; j < numberRows.length; j++) {
            if (isAddition) {
                columnTotal += numberRows[j][i];
            } else {
                columnTotal *= numberRows[j][i];
            }
        }

        grandTotal += columnTotal;
    }

    return grandTotal;
}

export function part2(input: string): number {
    let grandTotal = 0;
    
    const rows = input.split('\n');
    const operandRows = rows.slice(0, -1);
    const operatorRow = rows[rows.length - 1];

    let columnIndex = 0;
    let operands: number[] = [];
    let lastOperator: '+' | '*' = '+';
    while (columnIndex < rows[0].length) {
        const newOperator = operatorRow[columnIndex];
        const isNewOperatorDefined = newOperator !== ' ';
        if (isNewOperatorDefined) {
            // reset: perform operation and clear out operands
            if (operands.length) {
                const result = lastOperator === '+'
                    ? operands.reduce((a, b) => a + b, 0)
                    : operands.reduce((a, b) => a * b, 1);
                grandTotal += result;
            }

            // reset for next column
            operands = [];
            lastOperator = newOperator as '+' | '*';
        }

        // create operand for this column
        let operand = '';
        for (let rowIndex = 0; rowIndex < operandRows.length; rowIndex++) {
            const digit = operandRows[rowIndex][columnIndex];
            if (digit !== ' ') {
                operand += digit;
            }
        }

        if (operand.length) {
            operands.push(parseInt(operand, 10));
        }

        columnIndex++;
    }

    // final operation
    if (operands.length) {
        const result = lastOperator === '+'
            ? operands.reduce((a, b) => a + b, 0)
            : operands.reduce((a, b) => a * b, 1);
        grandTotal += result;
    }


    return grandTotal;
}


// Main execution
if (require.main === module) {
    const inputPath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(inputPath, 'utf-8');
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}

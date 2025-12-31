import fs from 'fs';
import path from 'path';

export function part1(input: string): number {
    let totalOutputVoltage = 0;

    const batteryBanks = input.split('\n');
    for (const batteryBank of batteryBanks) {
        totalOutputVoltage += maxVoltage(batteryBank, 2);
    }


    return totalOutputVoltage;
}

export function part2(input: string): number {
    let totalOutputVoltage = 0;

    const batteryBanks = input.split('\n');
    for (const batteryBank of batteryBanks) {
        totalOutputVoltage += maxVoltage(batteryBank, 12);
    }


    return totalOutputVoltage;
}

function maxVoltage(batteryBank: string, activeBatteryLimit: number): number {
    let voltage = 0;

    let batteriesRemaining = activeBatteryLimit;
    let lastBatteryTurnedOnIndex = -1;
    while (batteriesRemaining > 0) {
        const maxBatteryIndex = maxBatteryIndexInRange(batteryBank, lastBatteryTurnedOnIndex+1, batteryBank.length-batteriesRemaining);
        const maxBattery = parseInt(batteryBank[maxBatteryIndex], 10);
        voltage += (maxBattery * (10 ** (batteriesRemaining-1)));

        lastBatteryTurnedOnIndex = maxBatteryIndex;
        batteriesRemaining--;
    }

    return voltage;
}

// maxBatteryIndexInRange searches for the max digit from start (inclusive) to end (inclusive)
function maxBatteryIndexInRange(batteryBank: string, start: number, end: number): number {
    let maxBattery = 0;
    let maxBatteryIndex = 0;
    for (let i = start; i <= end; i++) {
        const battery: number = parseInt(batteryBank[i], 10);
        if (battery > maxBattery) {
            maxBattery = battery;
            maxBatteryIndex = i;
        }
    }

    return maxBatteryIndex;
}

// Main execution
if (require.main === module) {
    const inputPath = path.join(__dirname, 'input.txt');
    const input = fs.readFileSync(inputPath, 'utf-8');
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
}

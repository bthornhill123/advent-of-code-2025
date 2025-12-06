import fs from 'fs';
import path from 'path';

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

console.log('Day 01 Input length:', input.length);
console.log('Hello, Advent of Code 2025!');

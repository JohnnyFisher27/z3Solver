import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");

const solver = new Solver();
const x = Int.const('x');

let xMax = 10;
let xMin = 1;
solver.add(And(x.le(xMax), x.ge(xMin)));  // x < 10, x > 5

let possibleVals = [];
// Run Z3 solver, find solution and sat/unsat

while (await solver.check() === "sat") {

    let model = solver.model();
    let xVal = parseInt(model.eval(x).toString());

    possibleVals.push(xVal);

    solver.add(x.neq(xVal));
} 

let randomVal = possibleVals[Math.floor(Math.random() * possibleVals.length)];
console.log(`Random value chosen: [x = ${randomVal}]`);  

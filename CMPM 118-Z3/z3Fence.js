import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");

const solver = new Solver();

const x = Int.const('x');
const y = Int.const('y');

// x is a Z3 integer
solver.add(And(x.lt(10), x.gt(5)));  // x < 10, x > 5
solver.add(And(y.lt(25), y.gt(15)));  // y < 25, y > 15

// Run Z3 solver, find solution and sat/unsat

if (await solver.check() === "sat") {

    // Extract value for x
    let model = solver.model();
    let xVal = parseInt(model.eval(x).toString());
    let yVal = parseInt(model.eval(y).toString());

    console.log(`The cow is at x = ${xVal}, y = ${yVal}`);

} else {

    console.log("unsat. Could not find a valid value for x.");

}

solver.reset();

solver.add(Or(And(y.le(25), y.ge(15), x.eq(5)), And(x.le(10), x.ge(5), y.eq(15)))); 

// Run Z3 solver, find solution and sat/unsat

if (await solver.check() === "sat") {

    // Extract value for x
    let model = solver.model();
    let xVal = parseInt(model.eval(x).toString());
    let yVal = parseInt(model.eval(y).toString());

    console.log(`The decoration is at x = ${xVal}, y = ${yVal}`);

} else {

    console.log("unsat. Could not find a valid value for x.");

}


solver.reset();

solver.add(Or(x.gt(10), x.lt(5)));  // x > 10, x < 5
solver.add(Or(y.gt(25), y.lt(15)));  // y > 25, y < 15
solver.add(And(x.ge(8), y.ge(20)));  // x >= 8, y >= 20

// Run Z3 solver, find solution and sat/unsat

if (await solver.check() === "sat") {

    // Extract value for x
    let model = solver.model();
    let xVal = parseInt(model.eval(x).toString());
    let yVal = parseInt(model.eval(y).toString());

    console.log(`The tree is at x = ${xVal}, y = ${yVal}`);

} else {

    console.log("unsat. Could not find a valid value for x.");

}
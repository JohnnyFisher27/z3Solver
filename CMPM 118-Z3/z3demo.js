import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");

const solver = new Solver();

const Bob = Int.const('Bob');
const Mary = Int.const('Mary');
const Cathy = Int.const('Cathy');
const Sue = Int.const('Sue');  // x is a Z3 integer

const children = [Bob, Mary, Cathy, Sue]

children.forEach(child => {
    solver.add(child.ge(0));
    solver.add(child.le(3)); 
});

solver.add(Distinct(...children));  

solver.add(Bob.eq(1));
solver.add(Sue.eq(2));
solver.add(Mary.neq(3));

// Run Z3 solver, find solution and sat/unsat
// Cat = 0, Dog = 1, Bird = 2, Fish = 3

if (await solver.check() === "sat") {

    // Extract value for x
    let model = solver.model();
    let bobVal = parseInt(model.eval(Bob).toString());
    let maryVal = parseInt(model.eval(Mary).toString());
    let cathyVal = parseInt(model.eval(Cathy).toString());
    let sueVal = parseInt(model.eval(Sue).toString());
    console.log(`Bob has the ${bobVal}`);
    console.log(`Mary has the ${maryVal}`);
    console.log(`Cathy has the ${cathyVal}`);
    console.log(`Sue has the ${sueVal}`);

} else {

    console.log("unsat. Could not find a valid value for x.");

}


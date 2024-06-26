// const x = "1"
// const y = "2"
// console.log(x+y)
// console.log("Hi there i'm %s and I'm %d years old ","Shankar",21)
// console.clear();
// console.count('Im Shankar')
// console.count('Im Shankar')
// console.count('killers')
// console.countReset('Im Shankar')
// console.count('Im Shankar')

// const functio = () => 
//     console.trace(); // used for debugging purpose 

// const fun = () => functio() ;
// fun();


// //time spend 

// const sum = () => 
//     console.log(`the sum is ${2+3}`)
// const mul = () => console.log(`the mul is ${2*3}`)

// const measureTime = () =>
//     {
//         console.time("sum")
//         sum();
//         console.timeEnd("sum")
//         console.time("mul")
//         mul();
//         console.timeEnd("mul")
//     }
//     measureTime();


    //progress bar
    const chalk = require('chalk');
const ProgressBar = require('progress');

    const bar = new ProgressBar('progress [:bar] :rate/bps :percent :etas', {
      total: 20,
    });
    
    const timer = setInterval(() => {
      bar.tick();
    
      if (bar.complete) {
        clearInterval(timer);
      }
    }, 200);
    console.log(chalk.blue('Done'));//color modifier
    
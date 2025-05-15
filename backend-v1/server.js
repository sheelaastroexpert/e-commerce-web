import  connectDB  from './src/config/db.js';
import app from './src/app.js';
import chalk from 'chalk';


process.on('uncaughtException', err=>{
    console.log('Something went wrong ', err);
})
const PORT = process.env.PORT || 5000;
const promise = connectDB();
promise.then(()=>{
    app.listen(PORT, (err) => {
        if(err){
            console.log(chalk.redBright.bold('Server Crash '), err);
        }
        else{
        console.log(chalk.greenBright.bold(`🚀 Server running on http://localhost:${PORT}`));
        }    
    });
}).catch(err=>{
    console.log(chalk.redBright.bold('DB Not Up and Running....'), err);
})

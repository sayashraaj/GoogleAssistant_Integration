const express = require('express');
const cors = require('cors');
const app = express();
const assistantFunction = require('./assistantFunction')
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.post('/test', (req,res)=>{
  console.log(req)
  return res.json({answer: req.body.textquery})
})

async function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        // ans=error
        console.log(error);
      } else if (stdout) {
        // ans=stdout
        console.log(stdout); 
      } else {
        // ans=stderr
        console.log(stderr);
      }
      resolve(stdout ? true : false);
    });
  });
}

app.post('/', async (req,res)=>{
  try{
    const textquery = req.body.textquery

    let answer='say something'
    if(textquery){
      answer = await assistantFunction(textquery)
      console.log(answer)
    }
    await execShellCommand(textquery)
    return res.json({ answer })
  }
  catch(e){
    console.log(e)
  }
})

app.listen(PORT, ()=>{
  console.log('server running on ', PORT)
})

// assistantFunction('Hi')
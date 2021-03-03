const { exec } = require('child_process')
exec('git branch --show-current', (err, stdout, stderr) => {
  if (err) {
    console.error(stderr)
  }
  console.log(stdout)
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

const httpServer = app.listen(port, appListen)
function appListen () {
    console.log(`Example app listening on: http://localhost:${port}`)
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
function shutDown() {
    
    console.log('Received kill signal, shutting down gracefully');
    httpServer.close()
    process.exit(0);
}

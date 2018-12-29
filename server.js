const http = require('http');
const app = require('./lib/app');

const port = process.env.port || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('server jammin on', server.address().port);
});
// content of index.js
const http = require('http')
const port = 5000
http_requests_total = 0 //counter
server_uptime_s = 0
http_request_rate_s = 0 //gauge
orderbooks_incoming_rate_s = 0 //gauge

const requestHandler = (request, response) => {
  if (request.url == '/metrics'){
    http_requests_total += 1
    var metrics =[`http_requests_total ${http_requests_total}`,
                  `server_uptime_s ${server_uptime_s}`,
                  `http_request_rate_s ${http_request_rate_s}`,
                  `orderbooks_incoming_rate_s ${orderbooks_incoming_rate_s}`,''].join('\n');
    response.end(metrics)
  }else{
    response.end(`${request.url} not implemented`)
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('server could not start', err)
  }
  console.log(`server is listening on ${port}`)
})


function update_metrics() {
    // Counter
    server_uptime_s += 1;
    // Gauge 
    http_request_rate_s = Math.random() * 100
    orderbooks_incoming_rate_s = Math.random() * 1000
}

var update = setInterval(update_metrics, 1000);
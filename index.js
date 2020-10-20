const express = require("express");
const app = express();
const os = require("os");
const port = 80;

app.get("/", (req, res) => {
  const nets = os.networkInterfaces();
  const results = Object.create(null); // or just '{}', an empty object
  var hostname = os.hostname().split('.').shift()

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }

        results[name].push(net.address);
      }
    }
  }

  results["hostname"] = hostname;

  res.send(JSON.stringify(results));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// server.js — ultra-early logger
const fs = require('fs');
const path = require('path');
const logFile = path.join(__dirname, 'server_log.txt');

// guarantee log file creation
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  try {
    fs.appendFileSync(logFile, line + '\n');
  } catch (e) {
    console.error('Could not write log:', e);
  }
  console.log(line);
}

log('=== Booting server.js ===');

let next;
try {
  next = require('next');
  log('Loaded next module OK');
} catch (e) {
  log('ERROR loading next: ' + (e.stack || e));
  throw e;
}

const { createServer } = require('http');
const { parse } = require('url');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

log(`Mode=${dev ? 'dev' : 'prod'}, port=${port}`);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    log('Next app prepared OK');
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        log(`Error handling ${req.url}: ${err.stack || err}`);
        res.statusCode = 500;
        res.end('internal server error');
      }
    }).listen(port, (err) => {
      if (err) {
        log('Listen error: ' + (err.stack || err));
        throw err;
      }
      log(`Server listening on ${port}`);
    });
  })
  .catch((err) => {
    log('App prepare failed: ' + (err.stack || err));
    throw err;
  });

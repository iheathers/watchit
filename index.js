#!/usr/bin/env node

const chokidar = require('chokidar');

chokidar
  .watch('.')
  .on('add', (path) => console.log(`File ${path} has been added`))
  .on('change', (path) => console.log(`File ${path} has been changed`))
  .on('unlink', (path) => console.log(`File ${path} has been removed`));

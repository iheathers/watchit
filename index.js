#!/usr/bin/env node

const program = require('caporal');
const chokidar = require('chokidar');
const fsPromises = require('fs').promises;
const { spawn } = require('child_process');
const debounce = require('lodash.debounce');

let proc;
const start = debounce((file) => {
  console.log({ file });
  try {
    if (proc) {
      proc.kill();
    }
    console.log('>>> Starting Process');
    proc = spawn('node', [file], { stdio: 'inherit' });
  } catch (error) {
    console.log(error);
  }
}, 100);

program
  .version('1.0.0')
  .argument('[filename]', 'Name of file to execute')
  .action(async ({ filename }) => {
    const file = filename || 'index.js';

    try {
      await fsPromises.access(file);
    } catch (error) {
      throw new Error(`File with name: ${file} not found.`);
    }

    chokidar
      .watch('.')
      .on('add', () => start(file))
      .on('change', () => start(file))
      .on('unlink', () => start(file));
  });

program.parse(process.argv);

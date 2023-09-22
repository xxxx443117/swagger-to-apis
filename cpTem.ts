/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const source = path.resolve(__dirname, 'src/template');
const destination = path.resolve(__dirname, 'lib/template');

fs.cp(source, destination, { recursive: true }, (error) => {
  if (error) throw error;
});

export {};

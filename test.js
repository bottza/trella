import test from 'ava';

const fs = require('fs');
const chalk = require('chalk');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('testing.json');
const db = low(adapter);

test('chalk.red exists', t => {
  const thing = chalk.red;
  if (thing) {
    t.pass();
  } else {
    t.fail();
  }
});

test('chalk.green exists', t => {
  const thing = chalk.green;
  if (thing) {
    t.pass();
  } else {
    t.fail();
  }
});

test.serial('lowdb defaults works', t => {
  t.plan(2);
  db.defaults({
    testing: []
  }).write();
  t.true(fs.existsSync('testing.json'));
  const content = fs.readFileSync('testing.json', 'utf8');
  t.truthy(content);
});

test.serial('lowdb push and find works', t => {
  t.plan(2);
  const testing = db.get('testing');
  testing.push({
    id: '0123456789',
    name: 'name1'
  }).write();
  testing.push({
    id: '9876543210',
    name: 'name2'
  }).write();
  t.is(testing.find({
    id: '0123456789'
  }).value().name, 'name1');
  t.is(testing.find({
    id: '9876543210'
  }).value().name, 'name2');
  fs.unlinkSync('testing.json');
});

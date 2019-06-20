/* eslint-env jest */
const path = require('path');
const helpers = require('yeoman-test')
const assert = require('yeoman-assert')

const GEN_PATH = path.join(__dirname, 'index.js')

beforeAll(async () => {
  await helpers.run(GEN_PATH)
})

it('should copy files', () => {
  assert.file('src/hi.js')
  assert.file('.editorconfig')
  assert.file('.gitignore')
  assert.file('.npmignore')
  assert.file('index.js')
  assert.file('package.json')
  assert.file('readme.md')
})

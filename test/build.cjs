const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

// GAS loads scripts in a shared global scope, without a module loader.
const context = vm.createContext({
  PropertiesService: {
    getScriptProperties: () => ({ getProperty: () => '' })
  }
})
vm.runInContext(fs.readFileSync('dist/index.js', 'utf8'), context)
assert.equal(typeof context.wikiUpdateNotificator, 'function')
assert.deepEqual(
  JSON.parse(fs.readFileSync('dist/appsscript.json', 'utf8')),
  JSON.parse(fs.readFileSync('src/appsscript.json', 'utf8'))
)

const TestRunner = require('test-runner')
const where = require('./')
const a = require('assert')

const runner = new TestRunner()

const f = {
  arr: [ 1, 1, 2, 3, 4 ],
  recordset: [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ]
}

runner.test('where(query)', function () {
  a.deepEqual(f.recordset.filter(where({ b: true })), [])
  a.deepEqual(f.recordset.filter(where({ b: false })), [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ])
  a.deepEqual(f.recordset.filter(where({ b: false, n: 3 })), [])
  a.deepEqual(f.recordset.filter(where({ b: false, n: 2 })), [
    { b: false, n: 2 }
  ])
})

runner.test('where(regex)', function () {
  a.deepEqual(f.recordset.filter(where({ n: /1/ })), [ { b: false, n: 1 } ])
  a.deepEqual(f.recordset.filter(where({ x: undefined, n: /.+/ })), [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ])
})

runner.test('where(primitive)', function () {
  a.deepEqual(f.arr.filter(where(1)), [ 1, 1 ])
  a.deepEqual(f.arr.filter(where(2)), [ 2 ])
})

runner.test('.where(regex)', function () {
  a.deepEqual(f.arr.filter(where(/1/)), [ 1, 1 ])
  a.deepEqual(f.arr.filter(where(/2/)), [ 2 ])
})

runner.test('.where(function)', function () {
  function over3 (val) { return val > 3 }
  a.deepEqual(f.arr.filter(where(over3)), [ 4 ])
})

runner.test('.where(array)', function () {
  function over3 (val) { return val > 3 }
  a.deepEqual(f.arr.filter(where([ 1, /2/, over3 ])), [ 1, 1, 2, 4 ])
})

runner.test('.where(object[])', function () {
  a.deepEqual(f.recordset.filter(where([ { n: 1 }, { n: 2 }, { n: 3 } ])), [
    { b: false, n: 1 },
    { b: false, n: 2 }
  ])
})

runner.test('.where deep query', function () {
  const arr = [
    { one: { number: 1, letter: 'a' } },
    { one: { number: 2, letter: 'b' } },
    { one: { number: 3, letter: 'b' } }
  ]
  a.deepEqual(arr.filter(where({ one: { letter: 'b' } })), [
    { one: { number: 2, letter: 'b' } },
    { one: { number: 3, letter: 'b' } }
  ])
  a.deepEqual(arr.filter(where({ one: { number: 2, letter: 'b' } })), [
    { one: { number: 2, letter: 'b' } }
  ])
  a.deepEqual(arr.filter(where({ one: { number: 1, letter: 'a' } })), [
    { one: { number: 1, letter: 'a' } }
  ])
})

const assert = require('assert')
const marsRovers = require('../rover')

describe('rover function', function() {
  it('should log 2 arrays of coordinates', function() {
    assert.deepEqual(
      marsRovers('5 5', '1 2 N', 'LMLMLMLMM', '3 3 E', 'MMRMMRMRRM'),
      [
        [1, 3, 'N'],
        [5, 1, 'E']
      ]
    )
  })

  it('should not move past the boundaries of provided area', function() {
    assert.deepEqual(
      marsRovers('5 5', '0 0 N', 'MMMMMMM', '1 1 E', 'MMMMMMM'),
      [
        [0, 5, 'N'],
        [5, 1, 'E']
      ]
    )
  })
})

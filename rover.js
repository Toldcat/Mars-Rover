//marsRovers function takes in 5 arguments, all presumed to be strings -
//starting coordinates, starting position of 1st rover, movement instructions, position of 2nd rover, 2nd set of instructions

const marsRovers = (coord, pos1, instructions1, pos2, instructions2) => {
  //define upper limit of plateau, since it's a square we only need either x or y value and convert it to a number
  //also assuming that rovers can not be placed outside of the plateau
  const upperLimit = Number(coord.split(' ')[0])
  const lowerLimit = 0

  //define compass so we can change a direction letter to a number
  //N - 0, E - 1, S - 2, W - 3
  const compass = 'NESW'

  //define both rovers with starting positions and the direction
  const rover1 = {
    xPos: Number(pos1.split(' ')[0]),
    yPos: Number(pos1.split(' ')[1]),
    //convert direction into a number based on compass defined above
    direction: compass.indexOf(pos1.split(' ')[2])
  }
  const rover2 = {
    xPos: Number(pos2.split(' ')[0]),
    yPos: Number(pos2.split(' ')[1]),
    direction: compass.indexOf(pos2.split(' ')[2])
  }

  //split both set of instructions into arrays
  const actions1 = instructions1.split('')
  const actions2 = instructions2.split('')
  //define a function that moves the rovers
  const move = (rover, actions) => {
    //define an array for coordinates after the movement
    const finalCoords = []
    //loop through actions and decide what to do
    actions.forEach(action => {
      if (action === 'M') {
        //based on current direction, update the coordinates of rover, whilst making sure not to go out of bounds
        if (rover.direction === 0 && rover.yPos !== upperLimit) {
          rover.yPos++
        } else if (rover.direction === 1 && rover.xPos !== upperLimit) {
          rover.xPos++
        } else if (rover.direction === 2 && rover.yPos !== lowerLimit) {
          rover.yPos--
        } else if (rover.direction === 3 && rover.xPos !== lowerLimit) {
          rover.xPos--
        }
      } else if (action === 'L') {
        //add 4 to the directions so we dont go below 0 in the direction index
        //modulo 4 to get back to the original index
        rover.direction += 4 - 1
        rover.direction %= 4
      } else {
        //modulo 4 to rotate back to the start of the compass
        rover.direction++
        rover.direction %= 4
      }
    })
    //push the updated rover coordinates into the array above & return it
    finalCoords.push(rover.xPos, rover.yPos, compass[rover.direction])
    return finalCoords
  }

  //Add coordinates for both rovers to an array
  const result = [move(rover1, actions1), move(rover2, actions2)]
  //log for visibility
  console.log(result)
  return result
}

//call the function with test input
marsRovers('5 5', '1 2 N', 'LMLMLMLMM', '3 3 E', 'MMRMMRMRRM')

//export for mocha tests
module.exports = marsRovers

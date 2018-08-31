const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const getRandomElement = (list) => {
  return list[Math.floor((Math.random()*list.length))]
}

module.exports = {
  generateRandomPayload:(instruction) => {
    payload = []
    instruction['arguments'].forEach(function(element) {
      value = null
      if (element.type === 'range') {
        value = getRandomInt(element['range'][0], element['range'][1])
      } else if (element.type === 'pick') {
        value = getRandomElement(element['list'])
      }
      payload.push(value)
    })
    return payload
  }
}
  
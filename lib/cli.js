const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

const loadConfig = require('./loader.js').loadConfig
const loquacious = require('./loquacious.js')
const generateRandomPayload = require('./randomGenerator.js').generateRandomPayload

module.exports = {
  run: async () => {
    clear() // terminal clear

    console.log(
      chalk.yellow(
        figlet.textSync('loquacious', { horizontalLayout: 'full' })
      )
    )

    // load config
    const { httpProvider, issuerAddress, callInstructions, contractHash, contractABI } = loadConfig()

    // connect blockchain network
    const networkReference = loquacious.connectNetwork(httpProvider)

    const contractInstance = loquacious.loadContract(networkReference, contractABI, contractHash, issuerAddress)
    
    callInstructions.forEach(async function(instruction) {
      for (let idx = 0; idx < instruction['limit']; idx++) {
        payload = generateRandomPayload(instruction)
        console.log("Generating transaction with following payload: " + payload)
        await loquacious.issueTransactions(instruction["method"], payload, contractInstance, issuerAddress)
      }
    })
  }
}



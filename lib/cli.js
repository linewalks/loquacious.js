const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')

const loadConfig = require('./loader.js').loadConfig
const loquacious = require('./loquacious.js')
const generateRandomPayload = require('./randomGenerator.js').generateRandomPayload

// for develop
const fs = require("fs")
const contract_interface = fs.readFileSync("../contracts/build/contracts/PatientRegistrar.json")
const { abi, bytecode } = JSON.parse(contract_interface)

module.exports = {
  run: async () => {
    clear() // terminal clear

    console.log(
      chalk.yellow(
        figlet.textSync('loquacious', { horizontalLayout: 'full' })
      )
    )

    // load config
    const {httpProvider, issuerAddress, callInstructions} = loadConfig()

    // connect blockchain network
    const networkReference = loquacious.connectNetwork(httpProvider)

    // deploy for develop
    const contractHash = await loquacious.deployContract(networkReference, abi, bytecode, issuerAddress)

    const contractInstance = loquacious.loadContract(networkReference, abi, contractHash, issuerAddress)
    
    callInstructions.forEach(async function(instruction) {
      for (let idx = 0; idx < instruction['limit']; idx++) {
        payload = generateRandomPayload(instruction)
        console.log(payload)
        await loquacious.issueTransactions(instruction["method"], payload, contractInstance, issuerAddress)
      }
    })
    
    return "hello, mcidl"
  }
}



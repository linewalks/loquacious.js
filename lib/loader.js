const chalk = require('chalk')
const fs = require('fs')

module.exports = {
  loadConfig: (path) => {
    let configPath = "./config.json"
    if (path) {
      configPath = path
    }
    try { 
      const config = JSON.parse(fs.readFileSync(configPath))
      const requiredConfigs = ["httpProvider", "issuerAddress", "callInstructions", "contractHash", "contractABI"]
      requiredConfigs.forEach(configKey => {
        if (!Object.keys(config).includes(configKey)) {
          console.log(
            chalk.yellow(
              `${configKey} is not provided; using default value as fallback`
            )
          )
        }
      })
      return config
    } catch (e) {
      console.log(
        chalk.yellow("Failed to load config from file, failing silently...")
      )
      return {}
    }
  }
}

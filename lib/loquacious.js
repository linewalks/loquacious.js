const Web3 = require("web3")

module.exports = {
  connectNetwork: (httpProvider) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
    return web3
  },
  deployContract: (networkReference, abi, bytecode, address) => {
    try {
      const ContractToDeploy = new networkReference.eth.Contract(abi)
      return ContractToDeploy.deploy({
        data: bytecode,
      })
        .send({
          from: address,
          gas: 1500000,
          gasPrice: "20000000000"
        })
        .on("error", function(error) {
          console.error(error)
        })
        .on("transactionHash", function(transactionHash) {
          console.log(
            `Deploying Contract... Pending as tx#: ${transactionHash}\n`
          )
        })
        .then(function(newContractInstance) {
          return Promise.resolve(newContractInstance.options.address)
        })
    } catch (e) {
      console.error("Error while creating contract: " + e)
    }
  },
  loadContract: (networkReference, abi, contractAddress, connectAs) => {
    return new networkReference.eth.Contract(
      abi,
      contractAddress,
      { from: connectAs,         
        gas: 1500000,
        gasPrice: "20000000000" 
      }
    )
  },
  issueTransactions: (methodName, payload, contractInstance, issuerAddress) => {
    return contractInstance.methods[methodName](...payload)
      .send({
        from: issuerAddress
      })
      .then(
        resp => {
          console.log(
            `Successfully added Patient with tx hash ${resp.transactionHash}`
          )
          // check for develop
          contractInstance.methods['viewPatientsList']()
          .call()
          .then(
            resp => {
              console.log(JSON.stringify(resp))
            },
            e => console.log(e)
          )
        },
        e => console.log(e)
      )
  }
}

const Web3 = require("web3")

module.exports = {
  connectNetwork: (httpProvider) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
    return web3
  },
  loadContract: (networkReference, abi, contractAddress, connectAs) => {
    return new networkReference.eth.Contract(
      abi,
      contractAddress,
      { 
        from: connectAs,         
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
        },
        e => console.log(e)
      )
  }
}

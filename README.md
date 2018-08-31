# loquacious.js

A random transaction generator used for private blockchain network development

# Running loquacious.js

1. Runs on node v10.7.0 or above
2. Add to depencdency
    1. yarn add https://github.com/mcidl/loquacious.js
    2. yarn add --global https://github.com/mcidl/loquacious.js
3. Add configuration file and supply it with descriptions regarding the network and instructions to be called.
4. Run loquacious.js
    1. `$ ./node_modules/.bin/loquacious`
    2. `$ loquacious` // if installed globally 

# Configuration

```json
{
  "httpProvider": "http://localhost:8545",
  "issuerAddress": "0xAA...",
  "contractHash": "0xBB...",
  "contractABI": [ ... ],
  "callInstructions": [
    {
      "contractName": "sampleContract",
      "method": "sampleMethod",
      "arguments": [
          {
          "parameterName": "sampleParam",
          "type": "", // select, range
          "list" : [ ... ], // if type is select
          "range" : [ minValue, maxValue ] // if type is range
          }
      ],
      "limit": 1 // number of transactions to generate
    }
  ]
}
```

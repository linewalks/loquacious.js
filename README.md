# loquacious.js

A random transaction generator used for private blockchain network development using javascript

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
          "type": "", // pick, range
          "list" : [ ... ], // if type is pick
          "ragne" : [ minValue, maxValue ] // if type is range
          }
      ],
      "limit": 1 // number of transaction will generate
    }
  ]
}
```

# Running loquacious.js


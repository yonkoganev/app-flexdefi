export const USDT_ABI = [
  {
    "type": "constructor",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      }
    ]
  },
  {
    "type": "event",
    "name": "Approval",
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ]
  },
  {
    "type": "event",
    "name": "Transfer",
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ]
  },
  {
    "type": "function",
    "name": "allowance",
    "stateMutability": "view",
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "type": "function",
    "name": "approve",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "type": "function",
    "name": "balanceOf",
    "stateMutability": "view",
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "type": "function",
    "name": "burn",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "decimals",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ]
  },
  {
    "type": "function",
    "name": "decreaseAllowance",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "type": "function",
    "name": "increaseAllowance",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "type": "function",
    "name": "mint",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "type": "function",
    "name": "name",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "type": "function",
    "name": "symbol",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "type": "function",
    "name": "totalSupply",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "type": "function",
    "name": "transfer",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "type": "function",
    "name": "transferFrom",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ]
  }
]
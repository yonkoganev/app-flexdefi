export const DIV_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_staker",
        "type": "address"
      }
    ],
    "name": "hasStake",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "total_amount",
            "type": "uint256"
          },
          {
            "components": [
              { "internalType": "address", "name": "user", "type": "address" },
              { "internalType": "uint256", "name": "amount", "type": "uint256" },
              { "internalType": "string",  "name": "stakename", "type": "string" },
              { "internalType": "uint256", "name": "since", "type": "uint256" },
              { "internalType": "uint256", "name": "created", "type": "uint256" },
              { "internalType": "uint256", "name": "claimable", "type": "uint256" },
              { "internalType": "uint256", "name": "xdivbonus", "type": "uint256" }
            ],
            "internalType": "struct Stakeable.Stake[]",
            "name": "stakes",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct Stakeable.StakingSummary",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_staker",
        "type": "address"
      }
    ],
    "name": "hasStakeSuper",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "total_amount",
            "type": "uint256"
          },
          {
            "components": [
              { "internalType": "address", "name": "user", "type": "address" },
              { "internalType": "uint256", "name": "amount", "type": "uint256" },
              { "internalType": "string",  "name": "stakenamesuper", "type": "string" },
              { "internalType": "uint256", "name": "since", "type": "uint256" },
              { "internalType": "uint256", "name": "created", "type": "uint256" },
              { "internalType": "uint256", "name": "claimable", "type": "uint256" },
              { "internalType": "uint256", "name": "xdivbonus", "type": "uint256" }
            ],
            "internalType": "struct Stakeable.StakeSuper[]",
            "name": "stakessuper",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct Stakeable.StakingSummarySuper",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "stake_index",
        "type": "uint256"
      }
    ],
    "name": "withdrawStake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

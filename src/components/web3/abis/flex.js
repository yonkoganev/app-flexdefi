export const FLEX_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
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
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalShares",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "totalStaked",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "sharePrice",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "currentFlexDay",
				"type": "uint32"
			}
		],
		"name": "NewGlobals",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newSharePrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "oldSharePrice",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "currentFlexDay",
				"type": "uint32"
			}
		],
		"name": "NewSharePrice",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes16",
				"name": "stakeID",
				"type": "bytes16"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "stakerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "withdrawAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "withdrawDay",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakersPenalty",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "currentFlexDay",
				"type": "uint32"
			}
		],
		"name": "RewardsWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes16",
				"name": "stakeID",
				"type": "bytes16"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "stakerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakesShares",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rewardAmount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "closeDay",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "penaltyAmount",
				"type": "uint256"
			}
		],
		"name": "StakeEnded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes16",
				"name": "stakeID",
				"type": "bytes16"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "stakerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "stakesShares",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "startDay",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "stakingDays",
				"type": "uint32"
			}
		],
		"name": "StakeStarted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes16",
				"name": "fromStakeID",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"internalType": "bytes16",
				"name": "toStakeID",
				"type": "bytes16"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "fromStakerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "toStakerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "currentFlexDay",
				"type": "uint32"
			}
		],
		"name": "StakeTransferred",
		"type": "event"
	},
	{
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
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "UsdtRewardAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes16",
				"name": "stakeID",
				"type": "bytes16"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			}
		],
		"name": "UsdtRewardPaid",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "BFLEX_TOKEN",
		"outputs": [
			{
				"internalType": "contract IERC20Like",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "FDA_CONTRACT",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "LAUNCH_TIME",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TOKEN_DEFINER",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "UNISWAP_PAIR",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Pair",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "UNISWAP_ROUTER",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Router02",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "USDT_TOKEN",
		"outputs": [
			{
				"internalType": "contract IERC20Like",
				"name": "",
				"type": "address"
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
			},
			{
				"internalType": "bytes16",
				"name": "_stakeID",
				"type": "bytes16"
			}
		],
		"name": "_checkPenaltyAmountbyID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "penaltyAmount",
				"type": "uint256"
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
			},
			{
				"internalType": "bytes16",
				"name": "_stakeID",
				"type": "bytes16"
			},
			{
				"internalType": "uint32",
				"name": "_withdrawDays",
				"type": "uint32"
			}
		],
		"name": "_checkRewardAmountbyID",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "_withdrawDay",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "rewardAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "usdtReward",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sharesPenalty",
				"type": "uint256"
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
			},
			{
				"internalType": "bytes16",
				"name": "_stakeID",
				"type": "bytes16"
			}
		],
		"name": "_checkStakeDataByID",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "allocatedSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
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
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_stakerAdd",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_stakedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "_stakingDays",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_irrevocable",
				"type": "bool"
			}
		],
		"name": "createStake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "_stakedAmount",
				"type": "uint256[]"
			},
			{
				"internalType": "uint32[]",
				"name": "_stakingDays",
				"type": "uint32[]"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "bool[]",
				"name": "_irrevocable",
				"type": "bool[]"
			}
		],
		"name": "createStakeBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentFlexDay",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			}
		],
		"name": "dailyRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes16",
				"name": "_stakeID",
				"type": "bytes16"
			}
		],
		"name": "endStake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "x",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "y",
				"type": "uint256"
			},
			{
				"internalType": "bytes1",
				"name": "z",
				"type": "bytes1"
			}
		],
		"name": "generateID",
		"outputs": [
			{
				"internalType": "bytes16",
				"name": "b",
				"type": "bytes16"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "globals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalStaked",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalShares",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sharePrice",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "currentFlexDay",
				"type": "uint32"
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
			}
		],
		"name": "increaseUsdtReward",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_FDA",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_BFLEX",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_USDT",
				"type": "address"
			}
		],
		"name": "initFlexContracts",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes16",
				"name": "",
				"type": "bytes16"
			}
		],
		"name": "initialShares",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manualSnapshotOneDay",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_donatorAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "mintSupply",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes16",
				"name": "_stakeID",
				"type": "bytes16"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			}
		],
		"name": "renameStake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "revokeAccess",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "scheduledToEnd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "snapshots",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalShares",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "inflationAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "scheduledToEnd",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "usdtReward",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "stakeCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes16",
				"name": "",
				"type": "bytes16"
			}
		],
		"name": "stakes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "stakesShares",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rewardAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "penaltyAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "startDay",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "stakingDays",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "finalDay",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "closeDay",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "withdrawDay",
				"type": "uint32"
			},
			{
				"internalType": "uint8",
				"name": "isActive",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "isSplit",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "isIrrBFLEX",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
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
			},
			{
				"internalType": "uint256",
				"name": "_offset",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_length",
				"type": "uint256"
			}
		],
		"name": "stakesDataPagination",
		"outputs": [
			{
				"internalType": "bytes16[]",
				"name": "stakeIDs",
				"type": "bytes16[]"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "stakesShares",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "stakedAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rewardAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "penaltyAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint32",
						"name": "startDay",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "stakingDays",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "finalDay",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "closeDay",
						"type": "uint32"
					},
					{
						"internalType": "uint32",
						"name": "withdrawDay",
						"type": "uint32"
					},
					{
						"internalType": "uint8",
						"name": "isActive",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "isSplit",
						"type": "bool"
					},
					{
						"internalType": "uint8",
						"name": "isIrrBFLEX",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					}
				],
				"internalType": "struct Declaration.Stake[]",
				"name": "stakeData",
				"type": "tuple[]"
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
			},
			{
				"internalType": "uint256",
				"name": "_offset",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_length",
				"type": "uint256"
			}
		],
		"name": "stakesPagination",
		"outputs": [
			{
				"internalType": "bytes16[]",
				"name": "_stakes",
				"type": "bytes16[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "totalFLEXinActiveStakes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "totalPenalties",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalUsdtAllocated",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes16",
				"name": "_stakeID",
				"type": "bytes16"
			},
			{
				"internalType": "address",
				"name": "_toAddress",
				"type": "address"
			}
		],
		"name": "transferStake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdt_address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes16",
				"name": "_stakeID",
				"type": "bytes16"
			},
			{
				"internalType": "uint32",
				"name": "_withdrawDays",
				"type": "uint32"
			}
		],
		"name": "withdrawRewards",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "withdrawDay",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "withdrawAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "stakersPenalty",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bytes16",
				"name": "",
				"type": "bytes16"
			}
		],
		"name": "withdraws",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const web3 = require('web3')

module.exports = {
	networks: {
		development: {
			host: '127.0.0.1', // Localhost (default: none)
			port: 7545, // Standard Ethereum port (default: none)
			network_id: '*', // Any network (default: none)
		},
		rinkeby: {
			provider: () =>
				new HDWalletProvider(
					process.env.MNEMONIC,
					`https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
				),
			network_id: 4, // Rinkeby's id
			gas: 5500000, // Rinkeby has a lower block limit than mainnet
			confirmations: 2, // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
		},
		mainnet: {
			provider: () =>
				new HDWalletProvider(
					process.env.MNEMONIC,
					`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
				),
			network_id: 1, // Mainnet's id
			confirmations: 2, // # of confs to wait between deployments. (default: 0)
			gas: 3000000,
			timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: false, // Skip dry run before migrations? (default: false for public nets )
		},
	},
	plugins: ['truffle-plugin-verify'],
	api_keys: {
		etherscan: process.env.ETHERSCAN_API_KEY,
	},

	// Set default mocha options here, use special reporters etc.
	mocha: {
		// timeout: 100000
	},

	// Configure your compilers
	contracts_build_directory: './src/contracts/',
	compilers: {
		solc: {
			version: '0.8.0', // Fetch exact version from solc-bin (default: truffle's version)
			settings: {
				// See the solidity docs for advice about optimization and evmVersion
				optimizer: {
					enabled: true,
					runs: 200,
				},
			},
		},
	},

	// Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
	//
	// Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
	// those previously migrated contracts available in the .db directory, you will need to run the following:
	// $ truffle migrate --reset --compile-all

	db: {
		enabled: false,
	},
}

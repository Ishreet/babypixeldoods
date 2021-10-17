const { assert } = require('chai')

const SmartContract = artifacts.require('./TinyTurtles.sol')

require('chai').use(require('chai-as-promised')).should()

contract('SmartContract', (accounts) => {
	let smartContract

	before(async () => {
		smartContract = await SmartContract.deployed()
	})

	describe('deployment', async () => {
		it('deploys successfully', async () => {
			const address = await smartContract.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
		})

		it('has correct name', async () => {
			const name = await smartContract.name()
			assert.equal(name, 'Tiny Turtles')
		})
	})

	describe('minting', async () => {
		it('minted successfully', async () => {
			const uri = 'https://example.com'
			await smartContract.mint(accounts[0], uri)
			const tokenURI = await smartContract.tokenURI(0)
			const balanceOfOwner = await smartContract.balanceOf(accounts[0])
			assert.equal(tokenURI, uri)
			assert.equal(balanceOfOwner, 1)
		})
	})
	describe('get functions', async () => {
		it('get owner', async () => {
			const owner = await smartContract.getOwner()
			assert.equal(owner, '0xEde0CeC0AB1d1d6c0D12a55628C72606768001c5')
		})
		it('get balance', async () => {
			const owner = await smartContract.getOwner()
			assert.equal(owner, '0xEde0CeC0AB1d1d6c0D12a55628C72606768001c5')
		})
		it('get whitelisted addresses', async () => {
			const owner = await smartContract.getOwner()
			assert.equal(owner, '0xEde0CeC0AB1d1d6c0D12a55628C72606768001c5')
		})
		it('get owner', async () => {
			const owner = await smartContract.getOwner()
			assert.equal(owner, '0xEde0CeC0AB1d1d6c0D12a55628C72606768001c5')
		})
		it('get owner', async () => {
			const owner = await smartContract.getOwner()
			assert.equal(owner, '0xEde0CeC0AB1d1d6c0D12a55628C72606768001c5')
		})
	})
})

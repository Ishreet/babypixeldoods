// constants
import Web3 from 'web3'
import BabyPixelDoods from '../../contracts/BabyPixelDoods.json'
// log
import { fetchData } from '../data/dataActions'

const connectRequest = () => {
	return {
		type: 'CONNECTION_REQUEST',
	}
}

const connectSuccess = (payload) => {
	return {
		type: 'CONNECTION_SUCCESS',
		payload: payload,
	}
}

const connectFailed = (payload) => {
	return {
		type: 'CONNECTION_FAILED',
		payload: payload,
	}
}

const updateAccountRequest = (payload) => {
	return {
		type: 'UPDATE_ACCOUNT',
		payload: payload,
	}
}

export const connect = () => {
	return async (dispatch) => {
		dispatch(connectRequest())
		if (window.ethereum) {
			let web3 = new Web3(window.ethereum)
			console.log('web3', window.ethereum)
			try {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts',
				})
				const networkId = await window.ethereum.request({
					method: 'net_version',
				})
				const NetworkData = await BabyPixelDoods.networks[networkId]
				console.log('network data', NetworkData)
				if (NetworkData) {
					const BabyPixelDoodsObj = new web3.eth.Contract(
						BabyPixelDoods.abi,
						NetworkData.address
					)

					dispatch(
						connectSuccess({
							account: accounts[0],
							smartContract: BabyPixelDoodsObj,
							networkId: networkId,
							web3: web3,
						})
					)
					// Add listeners start
					window.ethereum.on('accountsChanged', (accounts) => {
						dispatch(updateAccount(accounts[0]))
					})
					window.ethereum.on('chainChanged', () => {
						window.location.reload()
					})
					// Add listeners end
				} else {
					dispatch(connectFailed('Change network to Polygon.'))
				}
			} catch (err) {
				dispatch(connectFailed('Something went wrong.'))
			}
		} else if (window.web3) {
			let web3 = new Web3(window.web3.currentProvider)
			try {
				const accounts = await window.web3.currentProvider.request({
					method: 'eth_requestAccounts',
				})
				const networkId = await window.web3.currentProvider.request({
					method: 'net_version',
				})

				const NetworkData = await BabyPixelDoods.networks[networkId]
				if (NetworkData) {
					const BabyPixelDoodsObj = new web3.eth.Contract(
						BabyPixelDoods.abi,
						NetworkData.address
					)
					dispatch(
						connectSuccess({
							account: accounts[0],
							smartContract: BabyPixelDoodsObj,
							networkId: networkId,
							web3: web3,
						})
					)
					// Add listeners start
					window.web3.currentProvider.on('accountsChanged', (accounts) => {
						dispatch(updateAccount(accounts[0]))
					})
					window.web3.currentProvider.on('chainChanged', () => {
						window.location.reload()
					})
					// Add listeners end
				} else {
					dispatch(connectFailed('Change network to Polygon.'))
				}
			} catch (err) {
				dispatch(connectFailed('Something went wrong.'))
			}
		}
	}
}
export const updateAccount = (account) => {
	return async (dispatch) => {
		dispatch(updateAccountRequest({ account: account }))
		dispatch(fetchData(account))
	}
}

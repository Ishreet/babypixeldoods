import ContactFormView from '../views/ContactFormView'
import React, { useEffect, useState } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../redux/blockchain/blockchainActions'
import { fetchData } from '../redux/data/dataActions'
import Countdown from 'react-countdown'
import * as s from '../styles/globalStyles'

var saleStatus
var publicSaleStatus
var owner
var balance

function ContactFormController() {
	const dispatch = useDispatch()
	const blockchain = useSelector((state) => state.blockchain)
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [mintAmount, setMintAmount] = useState(1)
	const [buttonName, setButtonName] = useState('MINT')

	const startProcess = async () => {
		if ((saleStatus && publicSaleStatus) || blockchain.account === owner) {
			setLoading(true)
			setStatus('MINTING...')
			try {
				mint(mintAmount)
			} catch (err) {
				setLoading(false)
				setStatus('ERROR')
			}
		} else if (blockchain.account === owner) {
		} else {
			setStatus('MINT NOT LIVE')
			return
		}
	}

	const mint = (_mintAmount) => {
		var sentValue = 0
		if (blockchain.account !== owner) {
			if (publicSaleStatus === false) {
				if (_mintAmount > 8) {
					setStatus('YOU CANNOT MINT MORE THAN 5 RIGHT NOW')
					return
				} else if (_mintAmount == 0) {
					setStatus('YOU CANNOT MINT THAN 0 LILBABYDOODZ')
					return
				} else {
					sentValue = 0.03
				}
			} else if (publicSaleStatus === true) {
				if (_mintAmount > 20) {
					setStatus('YOU CANNOT MINT MORE THAN 20 RIGHT NOW')
					return
				} else if (_mintAmount == 0) {
					setStatus('YOU CANNOT MINT THAN 0 LILBABYDOODZ')
					return
				} else {
					sentValue = 0.03
				}
			} else {
				setStatus("UNFORTUNATELY YOU CAN'T MINT YET")
				return
			}
		} else if (blockchain.account === owner) {
			sentValue = 0
		}

		blockchain.smartContract.methods
			.mint(_mintAmount)
			.send({
				from: blockchain.account,
				value: blockchain.web3.utils.toWei(
					(sentValue * _mintAmount).toString(),
					'ether'
				),
				gas: 350000 * _mintAmount,
			})
			.once('error', (err) => {
				console.error(err)
				setLoading(false)
				setStatus(
					'SOMETHING WENT WRONG WITH THE TRANSACTION, PLEASE TRY AGAIN LATER'
				)
			})
			.then((receipt) => {
				setLoading(false)
				dispatch(fetchData(blockchain.account))
				setMintAmount(1)
				setStatus('SUCCESS!')
			})
	}

	const addDoodz = () => {
		let newNum = mintAmount + 1
		if (newNum > 20) {
			newNum = 20
		}
		setMintAmount(newNum)
	}

	const subtractDoodz = () => {
		let newNum = mintAmount - 1
		if (newNum < 0) {
			newNum = 0
		}
		setMintAmount(newNum)
	}

	const isSaleOn = async () => {
		const saleValue = await blockchain.smartContract.methods
			.saleIsActive()
			.call()
		return saleValue
	}

	const isPublicSaleOn = async () => {
		const publicSaleValue = await blockchain.smartContract.methods
			.publicMintingStatus()
			.call()
		return publicSaleValue
	}

	const getOwner = async () => {
		const ownerValue = await blockchain.smartContract.methods.owner().call()
		return ownerValue.toLowerCase()
	}

	const getOwnerBalance = async () => {
		const ownerBalance = await blockchain.smartContract.methods
			.getBalance()
			.call()
		return ownerBalance
	}

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (!completed) {
			return (
				<span style={{ fontFamily: 'Monospace', fontSize: 20 }}>
					{days}: {hours}: {minutes}: {seconds}
				</span>
			)
		} else {
			return null
		}
	}

	useEffect(() => {
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			dispatch(fetchData(blockchain.account))
		}
	}, [blockchain.smartContract, dispatch, blockchain.networkId])

	useEffect(async () => {
		console.log('smart contract', blockchain.smartContract)
		console.log('blockchain account', blockchain.account)
		console.log('blockchain network id', typeof blockchain.networkId)

		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			setStatus('')
			saleStatus = await isSaleOn()
			publicSaleStatus = await isPublicSaleOn()
			owner = await getOwner()
			balance = await getOwnerBalance()

			console.log('sale status', publicSaleStatus)
			if (saleStatus && !(blockchain.account === owner)) {
				if (publicSaleStatus) {
					setStatus('MINT LIVE!')
					setButtonName('MINT')
				} else {
					setStatus('MINT LIVE!')
					setButtonName('UNAVAILABLE')
				}
			} else if (blockchain.account === owner) {
				setStatus('MINT LIVE!')
				setButtonName('MINT')
			}
		} else {
			setButtonName('UNAVAILABLE')
		}
	}, [
		blockchain.smartContract,
		dispatch,
		blockchain.account,
		blockchain.networkId,
	])

	return (
		<>
			{blockchain.account === '' || blockchain.smartContract === null ? (
				<>
					<ContactFormView>
						<submit
							onClick={(e) => {
								dispatch(connect())
								if (blockchain.networkId !== '1') {
									setStatus('CONNECT TO MAINNET')
								}
							}}
						>
							CONNECT
						</submit>
					</ContactFormView>
					<s.SpacerSmall />
					<s.TextDescription
						style={{
							textAlign: 'center',
							color: 'white',
							fontFamily: 'Monospace',
							fontSize: 20,
						}}
					>
						{status}
					</s.TextDescription>
					<s.SpacerSmall />
					<s.Container flex={1} ai={'center'} jc={'center'}>
						<Countdown date={'2021-11-11T17:00:00-04:00'} renderer={renderer} />
					</s.Container>
				</>
			) : (
				<div>
					<ContactFormView>
						<submit
							onClick={(e) => {
								e.preventDefault()
								startProcess()
							}}
						>
							{buttonName}
						</submit>
					</ContactFormView>

					<s.SpacerSmall />

					<s.Container flex={1} ai={'center'} jc={'center'}>
						<div style={{ display: 'flex' }}>
							<div>
								<button
									style={{
										fontFamily: 'Monospace',
										fontSize: 35,
										color: 'white',
										backgroundColor: 'transparent',
									}}
									onClick={(e) => subtractDoodz()}
								>
									-
								</button>
							</div>
							<s.SpacerMedium />

							<s.TextDescription
								style={{
									textAlign: 'center',
									color: 'white',
									fontFamily: 'Monospace',
									fontSize: 35,
								}}
							>
								{mintAmount}
							</s.TextDescription>
							<s.SpacerMedium />
							<div>
								<button
									style={{
										fontFamily: 'Monospace',
										fontSize: 35,
										color: 'white',
										backgroundColor: 'transparent',
									}}
									onClick={(e) => addDoodz()}
								>
									+
								</button>
							</div>
						</div>
					</s.Container>
					<s.Container flex={1} ai={'center'} jc={'center'}>
						<s.SpacerSmall />

						<s.TextDescription
							style={{
								textAlign: 'center',
								color: 'white',
								fontFamily: 'Monospace',
								fontSize: 20,
							}}
						>
							{status}
						</s.TextDescription>

						<s.SpacerSmall />
						<Countdown date={'2021-11-11T17:00:00-04:00'} renderer={renderer} />
						<s.SpacerMedium />
					</s.Container>
				</div>
			)}
		</>
	)
}

export default ContactFormController

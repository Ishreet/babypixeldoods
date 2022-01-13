import ContactFormView from '../views/ContactFormView'
import React, { useEffect, useState } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../redux/blockchain/blockchainActions'
import { fetchData } from '../redux/data/dataActions'
import Countdown from 'react-countdown'
import * as s from '../styles/globalStyles'

var saleStatus
var owner
var supply

function ContactFormController() {
	const dispatch = useDispatch()
	const blockchain = useSelector((state) => state.blockchain)
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [mintAmount, setMintAmount] = useState(1)
	const [buttonName, setButtonName] = useState('MINT')

	const startProcess = async () => {
		if (saleStatus || blockchain.account === owner) {
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

	// TODO change to 750
	const mint = (_mintAmount) => {
		_mintAmount = parseInt(_mintAmount)
		supply = parseInt(supply)
		var sentValue = 0
		if (blockchain.account !== owner) {
			if (saleStatus) {
				if (supply + _mintAmount > 15 && supply < 15) {
					sentValue = 0.03 * (supply + _mintAmount - 15)
				} else if (supply + _mintAmount > 15 && supply > 15) {
					sentValue = 0.03 * _mintAmount
				} else {
					sentValue = 0
				}
			} else {
				setStatus('UNAVAILABLE')
				return
			}
		} else if (blockchain.account === owner) {
			sentValue = 0
		}

		blockchain.smartContract.methods
			.mint(_mintAmount)
			.send({
				from: blockchain.account,
				value: blockchain.web3.utils.toWei(sentValue.toString(), 'ether'),
				gas: 350000 * _mintAmount,
			})
			.once('error', (err) => {
				console.error(err)
				setLoading(false)
				setStatus('TRY AGAIN LATER')
			})
			.then((receipt) => {
				setLoading(false)
				dispatch(fetchData(blockchain.account))
				setMintAmount(1)
				setStatus('SUCCESS!')
			})
	}

	const addDoods = () => {
		let newNum = mintAmount + 1
		if (newNum > 10) {
			newNum = 10
		}
		setMintAmount(newNum)
	}

	const subtractDoods = () => {
		let newNum = mintAmount - 1
		if (newNum < 1) {
			newNum = 1
		}
		setMintAmount(newNum)
	}

	const totalSupply = async () => {
		const supply = await blockchain.smartContract.methods.totalSupply().call()
		return supply
	}

	const isSaleOn = async () => {
		const saleValue = await blockchain.smartContract.methods
			.saleIsActive()
			.call()
		return saleValue
	}

	const getOwner = async () => {
		const ownerValue = await blockchain.smartContract.methods.owner().call()
		return ownerValue.toLowerCase()
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
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			setStatus('')
			saleStatus = await isSaleOn()
			owner = await getOwner()
			supply = await totalSupply()

			if (saleStatus && !(blockchain.account === owner)) {
				setStatus('MINT IS LIVE!')
				setButtonName('MINT')
			} else if (blockchain.account === owner) {
				setStatus('MINT IS LIVE!')
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
		mint,
	])

	return (
		<>
			{blockchain.account === '' || blockchain.smartContract === null ? (
				<>
					<ContactFormView>
						<submit
							onClick={(e) => {
								dispatch(connect())
								if (blockchain.networkId !== '4') {
									// TODO change to 1 and change to CONNECT TO MAINNET
									setStatus('UNAVAILABLE')
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
							fontFamily: 'PixelSans',
							fontSize: 20,
						}}
					>
						{status}
					</s.TextDescription>
					<s.SpacerSmall />
					<s.Container flex={1} ai={'center'} jc={'center'}>
						<Countdown date={'2021-01-11T12:00:00-04:00'} renderer={renderer} />
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
										fontFamily: 'PixelSans',
										fontSize: 50,
										color: 'white',
										backgroundColor: 'transparent',
									}}
									onClick={(e) => subtractDoods()}
								>
									-
								</button>
							</div>
							<s.SpacerMedium />

							<s.TextDescription
								style={{
									textAlign: 'center',
									color: 'white',
									fontFamily: 'PixelSans',
									fontSize: 35,
								}}
							>
								{mintAmount}
							</s.TextDescription>
							<s.SpacerMedium />
							<div>
								<button
									style={{
										fontFamily: 'PixelSans',
										fontSize: 50,
										color: 'white',
										backgroundColor: 'transparent',
									}}
									onClick={(e) => addDoods()}
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
								fontFamily: 'PixelSans',
								fontSize: 20,
							}}
						>
							{status}
						</s.TextDescription>

						<s.SpacerSmall />
						<Countdown date={'2021-01-11T12:00:00-04:00'} renderer={renderer} />
						<s.SpacerMedium />
					</s.Container>
				</div>
			)}
		</>
	)
}

export default ContactFormController

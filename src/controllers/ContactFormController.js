import ContactFormView from '../views/ContactFormView'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
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
var whitelist = []
var balance

function ContactFormController() {
	const dispatch = useDispatch()
	const blockchain = useSelector((state) => state.blockchain)
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [mintAmount, setMintAmount] = useState(1)
	const [buttonName, setButtonName] = useState('MINT')

	const startProcess = async () => {
		if (
			(saleStatus &&
				(whitelist.indexOf(blockchain.account) > -1 || publicSaleStatus)) ||
			blockchain.account === owner
		) {
			setLoading(true)
			setStatus('MINTING YOUR HEARTZ...')
			try {
				mint(mintAmount)
			} catch (err) {
				setLoading(false)
				setStatus('UNEXPECTED ERROR OCCURED :(')
			}
		} else if (blockchain.account === owner) {
		} else {
			setStatus('SORRY, MINTING IS NOT LIVE RIGHT NOW')
			return
		}
	}

	const mint = (_mintAmount) => {
		var sentValue = 0
		if (blockchain.account !== owner) {
			if (
				whitelist.indexOf(blockchain.account) > -1 &&
				publicSaleStatus === false
			) {
				if (_mintAmount > 5) {
					setStatus('YOU CANNOT MINT MORE THAN 5 RIGHT NOW')
					return
				} else if (_mintAmount == 0) {
					setStatus('YOU CANNOT MINT THAN 0 HEARTZ')
					return
				} else {
					sentValue = 0.05
				}
			} else if (publicSaleStatus === true) {
				if (_mintAmount > 20) {
					setStatus('YOU CANNOT MINT MORE THAN 20 RIGHT NOW')
					return
				} else if (_mintAmount == 0) {
					setStatus('YOU CANNOT MINT THAN 0 HEARTZ')
					return
					// add option for if over 10000
				} else {
					sentValue = 0.05
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
				setStatus('SUCCESS! YOUR HEARTZ ARE NOW ON THE BLOCKCHAIN!')
			})
	}

	const addHeartz = () => {
		let newNum = mintAmount + 1
		if (newNum > 20) {
			newNum = 20
		}
		setMintAmount(newNum)
	}

	const subtractHeartz = () => {
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

	const getWhitelist = async () => {
		const whitelistAddresses = await blockchain.smartContract.methods
			.getWhitelistedAddresses()
			.call()
		return whitelistAddresses
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
	}, [blockchain.smartContract, dispatch])

	useEffect(async () => {
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			// setStatus('')
			saleStatus = await isSaleOn()
			publicSaleStatus = await isPublicSaleOn()
			owner = await getOwner()
			whitelist = await getWhitelist()
			whitelist = whitelist.map((address) => address.toLowerCase())
			balance = await getOwnerBalance()

			if (saleStatus && !(blockchain.account === owner)) {
				if (whitelist.indexOf(blockchain.account) > -1 || publicSaleStatus) {
					setStatus('MINTING IS NOW LIVE!')
					setButtonName('MINT')
				} else {
					setStatus('SORRY, MINTING IS NOT LIVE RIGHT NOW')
					setButtonName('UNAVAILABLE')
				}
			} else if (blockchain.account === owner) {
				setStatus('MINTING IS NOW LIVE!')
				setButtonName('MINT')
			}
		} else {
			setButtonName('UNAVAILABLE')
		}
	}, [blockchain.smartContract, dispatch, blockchain.account])

	return (
		<>
			{blockchain.account === '' || blockchain.smartContract === null ? (
				<>
					<ContactFormView>
						<submit
							onClick={(e) => {
								dispatch(connect())
								if (blockchain.networkId !== '5777') {
									setStatus('PLEASE CONNECT TO THE MAINNET')
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
							color: 'var(--accent-text)',
							fontFamily: 'Monospace',
							fontSize: 20,
						}}
					>
						{status}
					</s.TextDescription>
					<s.SpacerSmall />
					<s.Container flex={1} ai={'center'} jc={'center'}>
						<Countdown date={'2021-11-11T16:00:00-04:00'} renderer={renderer} />
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
						<div style={{ display: 'flex', float: 'left' }}>
							<div>
								<button
									style={{
										fontFamily: 'Monospace',
										fontSize: 35,
										backgroundColor: 'transparent',
									}}
									onClick={(e) => subtractHeartz()}
								>
									-
								</button>
							</div>
							<s.SpacerMedium />

							<s.TextDescription
								style={{
									textAlign: 'center',
									color: 'var(--accent-text)',
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
										backgroundColor: 'transparent',
									}}
									onClick={(e) => addHeartz()}
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
								color: 'var(--accent-text)',
								fontFamily: 'Monospace',
								fontSize: 20,
							}}
						>
							{status}
						</s.TextDescription>

						<s.SpacerSmall />
						<Countdown date={'2021-11-11T16:00:00-04:00'} renderer={renderer} />
						<s.SpacerMedium />
					</s.Container>
				</div>
			)}
		</>
	)
}

export default ContactFormController

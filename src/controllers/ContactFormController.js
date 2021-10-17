import ContactFormView from '../views/ContactFormView'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../redux/blockchain/blockchainActions'
import { fetchData } from '../redux/data/dataActions'
import Countdown from 'react-countdown'
import whitelistedUsers from '../whitelistedUsers.json'
import * as s from '../styles/globalStyles'
import { get } from 'request'

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
			saleStatus &&
			(whitelist.indexOf(blockchain.account) > -1 ||
				publicSaleStatus ||
				blockchain.account === owner)
		) {
			setLoading(true)
			setStatus('MINTING YOUR TURTLES...')
			// setButtonName('MINT')
			try {
				mint(mintAmount)
			} catch (err) {
				console.log(err)
				setLoading(false)
				setStatus('UNEXPECTED ERROR OCCURED :(')
			}
		} else {
			// setButtonName('MINTING UNAVAILABLE')
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
				if (_mintAmount > 5 || _mintAmount == 0) {
					setStatus('YOU CANNOT MINT MORE THAN 5 RIGHT NOW')
					return
				} else sentValue = 0.04
			} else if (publicSaleStatus === true) {
				sentValue = 0.04
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
				console.log(receipt)
				setLoading(false)
				dispatch(fetchData(blockchain.account))
				setMintAmount(1)
				setStatus('SUCCESS! YOUR TURTLES ARE NOW ON THE BLOCKCHAIN!')
			})
	}

	const addTurtle = () => {
		let newNum = mintAmount + 1
		if (newNum > 20) {
			newNum = 20
		}
		setMintAmount(newNum)
	}

	const subtractTurtle = () => {
		let newNum = mintAmount - 1
		if (newNum < 0) {
			newNum = 0
		}
		setMintAmount(newNum)
	}

	const whitelistUsersToContract = () => {
		whitelistedUsers['users'].forEach((element) => {
			whitelist.push(element)
		})

		console.log('whitlist 1234', whitelist)
		try {
			blockchain.smartContract.methods
				.whitelistUsers(whitelist)
				.send({ from: blockchain.account })
				.then((error) => {
					console.log(error)
				})
		} catch (err) {
			console.log(err)
		}
	}

	const isSaleOn = async () => {
		const saleValue = await blockchain.smartContract.methods
			.saleIsActive()
			.call()
		console.log('sale value', saleValue)
		return saleValue
	}

	const isPublicSaleOn = async () => {
		const publicSaleValue = await blockchain.smartContract.methods
			.publicMintingStatus()
			.call()
		console.log('public sale value', publicSaleValue)
		return publicSaleValue
	}

	const getOwner = async () => {
		const ownerValue = await blockchain.smartContract.methods.owner().call()
		console.log('owner', ownerValue)
		return ownerValue.toLowerCase()
	}

	const getWhitelist = async () => {
		const whitelistAddresses = await blockchain.smartContract.methods
			.getWhitelistedAddresses()
			.call()
		console.log('contractAddresses', whitelistAddresses)
		return whitelistAddresses
	}

	const getOwnerBalance = async () => {
		const ownerBalance = await blockchain.smartContract.methods
			.getBalance()
			.call()
		console.log('balance', ownerBalance)
		return ownerBalance
	}

	const Completionist = () => {
		return (
			<s.TextDescription
				style={{
					textAlign: 'center',
					color: 'var(--accent-text)',
					fontFamily: 'BaksoSapi',
					fontSize: 20,
				}}
			>
				Sale is on!
			</s.TextDescription>
		)
	}

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return <Completionist />
		} else if (days === 1 && whitelist.indexOf(blockchain.account) > -1) {
			return (
				<>
					<span style={{ fontFamily: 'BaksoSapi', fontSize: 20 }}>
						Whitelisted Users Can Now Mint!
					</span>
					<s.SpacerMedium />
					<span style={{ fontFamily: 'BaksoSapi', fontSize: 20 }}>
						{days} days, {hours} hours, {minutes} minutes, {seconds} seconds
					</span>
				</>
			)
		} else {
			return (
				<span style={{ fontFamily: 'BaksoSapi', fontSize: 20 }}>
					{days} days, {hours} hours, {minutes} minutes, {seconds} seconds
				</span>
			)
		}
	}

	useEffect(() => {
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			dispatch(fetchData(blockchain.account))
		}
	}, [blockchain.smartContract, dispatch])

	useEffect(async () => {
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			saleStatus = await isSaleOn()
			publicSaleStatus = await isPublicSaleOn()
			owner = await getOwner()
			whitelist = await getWhitelist()
			whitelist = whitelist.map((address) => address.toLowerCase())
			balance = await getOwnerBalance()

			console.log('saleStatus', saleStatus)
			console.log('publicSaleStatus', publicSaleStatus)
			console.log('owner', owner)
			console.log('whitelist', whitelist)
			console.log('ownerBalance', balance)

			if (saleStatus) {
				if (
					whitelist.indexOf(blockchain.account) > -1 ||
					publicSaleStatus ||
					blockchain.account === owner
				) {
					setStatus('MINTING IS NOW LIVE!')
					setButtonName('passed')
				} else {
					setStatus('SORRY, MINTING IS NOT LIVE RIGHT NOW')
					setButtonName('failed')
				}
			}
		} else {
			// setStatus('UNEXPECTED ERROR OCCURED :(')
			setButtonName('failed')
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
							fontFamily: 'BaksoSapi',
							fontSize: 20,
						}}
					>
						{status}
					</s.TextDescription>
					<s.SpacerSmall />
					<s.Container flex={1} ai={'center'} jc={'center'}>
						<Countdown date={'2021-10-19T13:00:00-04:00'} renderer={renderer} />
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

					<s.TextDescription
						style={{
							textAlign: 'center',
							color: 'var(--accent-text)',
							fontFamily: 'BaksoSapi',
							fontSize: 25,
						}}
					>
						{blockchain.account}
					</s.TextDescription>

					<s.SpacerSmall />

					<s.Container flex={1} ai={'center'} jc={'center'}>
						<div style={{ display: 'flex', float: 'left' }}>
							<div>
								<button
									style={{
										fontFamily: 'BaksoSapi',
										fontSize: 35,
										backgroundColor: 'transparent',
									}}
									onClick={(e) => subtractTurtle()}
								>
									<FontAwesomeIcon icon={faAngleDown} />
								</button>
							</div>
							<s.SpacerMedium />

							<s.TextDescription
								style={{
									textAlign: 'center',
									color: 'var(--accent-text)',
									fontFamily: 'BaksoSapi',
									fontSize: 35,
								}}
							>
								{mintAmount}
							</s.TextDescription>
							<s.SpacerSmall />
							<div>
								<button
									style={{
										fontFamily: 'BaksoSapi',
										fontSize: 35,
										backgroundColor: 'transparent',
									}}
									onClick={(e) => addTurtle()}
								>
									<FontAwesomeIcon icon={faAngleUp} />
								</button>
							</div>
						</div>
					</s.Container>
					<s.Container flex={1} ai={'center'} jc={'center'}>
						<s.SpacerSmall />
						{blockchain.account === owner ? (
							<button
								style={{
									fontFamily: 'BaksoSapi',
									fontSize: 25,
									backgroundColor: 'transparent',
								}}
								onClick={(e) => {
									whitelistUsersToContract()
								}}
							>
								Presale
							</button>
						) : (
							<s.TextDescription
								style={{
									textAlign: 'center',
									color: 'var(--accent-text)',
									fontFamily: 'BaksoSapi',
									fontSize: 20,
								}}
							>
								{status}
							</s.TextDescription>
						)}
						<s.SpacerSmall />
						<Countdown date={'2021-10-19T13:00:00-04:00'} renderer={renderer} />
						<s.SpacerMedium />
					</s.Container>
				</div>
			)}
		</>
	)
}

export default ContactFormController

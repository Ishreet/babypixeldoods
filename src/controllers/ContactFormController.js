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

function ContactFormController() {
	const dispatch = useDispatch()
	const blockchain = useSelector((state) => state.blockchain)
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [mintAmount, setMintAmount] = useState(1)
	const [buttonName, setButtonName] = useState('MINT')

	const startProcess = async () => {
		var saleStatusValue = await isSaleOn()
		var publicSaleStatusValue = await isPublicSaleOn()
		if (
			saleStatus &&
			(makeWhitelist().indexOf(blockchain.account) > -1 ||
				publicSaleStatus ||
				blockchain.account === owner.toLowerCase())
		) {
			setLoading(true)
			setStatus('Uploading')
			// setButtonName('MINT')
			try {
				mint(mintAmount)
			} catch (err) {
				console.log(err)
				setLoading(false)
				setStatus('Error')
			}
		} else {
			// setButtonName('MINTING UNAVAILABLE')
			alert('sorry sale is not active')
		}
	}

	const mint = (_mintAmount) => {
		var sentValue = 0
		if (blockchain.account !== owner.toLowerCase()) {
			sentValue = 0.04
		} else {
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
				setStatus('Error')
			})
			.then((receipt) => {
				console.log(receipt)
				setLoading(false)
				dispatch(fetchData(blockchain.account))
				setMintAmount(0)
				setStatus('Successfully minting your NFT')
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

	const makeWhitelist = () => {
		var whitelist = []
		whitelistedUsers['users'].forEach((element) => {
			whitelist.push(element.toLowerCase())
		})
		return whitelist
	}

	const whitelistUsersToContract = () => {
		var _whitelist = []

		whitelistedUsers['users'].forEach((element) => {
			_whitelist.push(element)
		})

		console.log(typeof _whitelist, _whitelist)
		try {
			blockchain.smartContract.methods
				.whitelistUsers(_whitelist)
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
		const saleValue = await blockchain.smartContract.methods
			.publicMintingStatus()
			.call()
		console.log('public sale value', saleValue)
		return saleValue
	}

	const getOwner = async () => {
		const ownerValue = await blockchain.smartContract.methods.owner().call()
		console.log('owner', ownerValue)
		return ownerValue
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
		} else if (days === 1 && makeWhitelist().indexOf(blockchain.account) > -1) {
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
			console.log('saleStatus', saleStatus)
			console.log('publicSaleStatus', publicSaleStatus)
			console.log('owner', owner)
			if (saleStatus) {
				if (
					makeWhitelist().indexOf(blockchain.account) > -1 ||
					publicSaleStatus ||
					blockchain.account === owner.toLowerCase()
				) {
					setButtonName('passed')
				} else {
					setButtonName('failed')
				}
			}
		} else {
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
							}}
						>
							CONNECT
						</submit>
					</ContactFormView>
					<s.SpacerMedium />
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
							<s.SpacerMedium />
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
						<Countdown date={'2021-10-19T13:00:00-04:00'} renderer={renderer} />
						<s.SpacerMedium />
					</s.Container>
				</div>
			)}
		</>
	)
}

export default ContactFormController

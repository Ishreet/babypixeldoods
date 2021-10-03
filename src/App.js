import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from './redux/blockchain/blockchainActions'
import { fetchData } from './redux/data/dataActions'
import * as s from './styles/globalStyles'
import styled from 'styled-components'
import Countdown from 'react-countdown'
import whitelistedUsers from './whitelistedUsers.json'
import axios from 'axios'

export const StyledButton = styled.button`
	padding: 8px;
`

// add error handling for everything
function App() {
	const dispatch = useDispatch()
	const blockchain = useSelector((state) => state.blockchain)
	const data = useSelector((state) => state.data)
	var numberOfTurtles = 0
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [NFTs, setNFTs] = useState([])

	// add value to send ethereum; make it payable
	const mint = (_numberOfTurtles) => {
		blockchain.smartContract.methods
			.getAllTokens()
			.call()
			.then((r) => console.log('r', r))

		blockchain.smartContract.methods
			.mint(_numberOfTurtles)
			.send({
				from: blockchain.account,
				value: blockchain.web3.utils.toWei(
					(0.06 * _numberOfTurtles).toString(),
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
				setStatus('Successfully minting your NFT')
			})
	}

	const Completionist = () => {
		return <span>You are good to go!</span>
	}

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed) {
			blockchain.smartContract.methods.whitelist(false)

			return <Completionist />
		} else {
			// Render a countdown
			return (
				<span>
					{hours}:{minutes}:{seconds}
				</span>
			)
		}
	}
	const checkWithdraw = async () => {
		if (blockchain.account === '0xede0cec0ab1d1d6c0d12a55628c72606768001c5') {
			const value = await blockchain.smartContract.methods.getBalance().call()
			console.log('value', value)
			await blockchain.smartContract.methods.withdraw().send({
				from: blockchain.account,
				value: value,
			})
			console.log('check withdraw function ran')
		}
	}

	const createMetaDataAndMint = async () => {
		setLoading(true)
		setStatus('Uploading')

		try {
			mint(numberOfTurtles)
		} catch (err) {
			console.log(err)
			setLoading(false)
			setStatus('Error')
		}
	}

	const fetchMetaDataForNFTs = () => {
		setNFTs([])
		data.allTokens.forEach((nft) => {
			fetch(nft.uri)
				.then((response) => axios.get(response.url).then((r) => r.data))
				.then((metadata) => {
					setNFTs((prevState) => [
						...prevState,
						{ id: nft.id, metadata: metadata },
					])
				})
				.catch((err) => {
					console.error(err)
				})
		})
	}

	const whitelistUsersToContract = () => {
		var whitelist = []

		whitelistedUsers['users'].forEach((element) => {
			whitelist.push(element)
		})

		console.log(typeof whitelist, whitelist)
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
		blockchain.smartContract.methods
			.getwhitelistAddresses()
			.call()
			.then((r) => {
				console.log('whitelisted addressed', r)
			})
	}

	useEffect(() => {
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
			console.log('blockchain account', blockchain.account)
			dispatch(fetchData(blockchain.account))
		}
	}, [blockchain.smartContract, dispatch])

	useEffect(() => {
		fetchMetaDataForNFTs()
	}, [data.allTokens])

	return (
		<s.Screen>
			{blockchain.account === '' || blockchain.smartContract === null ? (
				<s.Container flex={1} ai={'center'} jc={'center'}>
					<s.TextTitle>Connect to the Blockchain</s.TextTitle>
					<s.SpacerSmall />
					<StyledButton
						onClick={(e) => {
							e.preventDefault()
							dispatch(connect())
						}}
					>
						CONNECT
					</StyledButton>
					<s.SpacerSmall />
					{blockchain.errorMsg !== '' ? (
						<s.TextDescription>Error Please Try Again</s.TextDescription>
					) : null}
				</s.Container>
			) : (
				<s.Container flex={1} ai={'center'} style={{ padding: 24 }}>
					<s.TextTitle style={{ textAlign: 'center' }}>
						Welcome, mint your signature below
					</s.TextTitle>

					{loading ? (
						<>
							<s.SpacerSmall />
							<s.TextDescription style={{ textAlign: 'center' }}>
								loading...
							</s.TextDescription>
						</>
					) : null}
					{status !== '' ? (
						<>
							<s.SpacerSmall />
							<s.TextDescription style={{ textAlign: 'center' }}>
								{status}
							</s.TextDescription>
						</>
					) : null}
					<s.SpacerLarge />
					<s.Container fd={'row'} jc={'center'}>
						<StyledButton
							disabled={loading ? 1 : 0}
							onClick={(e) => {
								e.preventDefault()
								createMetaDataAndMint()
							}}
						>
							MINT
						</StyledButton>

						<s.SpacerSmall />
						{blockchain.account ===
						'0xede0cec0ab1d1d6c0d12a55628c72606768001c5' ? (
							<>
								<StyledButton
									disabled={loading ? 1 : 0}
									onClick={(e) => {
										e.preventDefault()
										checkWithdraw()
									}}
								>
									WITHDRAW
								</StyledButton>
								<s.SpacerSmall />

								<StyledButton
									disabled={loading ? 1 : 0}
									onClick={(e) => {
										e.preventDefault()
										whitelistUsersToContract()
									}}
								>
									PRE SALE
								</StyledButton>
							</>
						) : null}
						<s.SpacerSmall />

						<form>
							<input
								type='number'
								min='1'
								max='20'
								onChange={(e) => {
									numberOfTurtles = parseInt(e.target.value)
								}}
							/>
						</form>
						<s.SpacerSmall />

						<Countdown date={Date.now() + 1000000} renderer={renderer} />
					</s.Container>

					<s.SpacerLarge />
					<s.SpacerLarge />
					<s.Container fd={'row'} style={{ flexWrap: 'wrap' }}>
						{data.loading ? (
							<>
								<s.SpacerSmall />
								<s.TextDescription style={{ textAlign: 'center' }}>
									loading...
								</s.TextDescription>
							</>
						) : (
							NFTs.map((nft, index) => {
								return (
									<s.Container key={index} style={{ padding: 16 }}>
										<s.TextTitle>{nft.metadata.name}</s.TextTitle>
										<img
											alt={nft.metadata.name}
											src={nft.metadata.image}
											width={150}
										/>
									</s.Container>
								)
							})
						)}
					</s.Container>
				</s.Container>
			)}
		</s.Screen>
	)
}

export default App

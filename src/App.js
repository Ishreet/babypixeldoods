import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from './redux/blockchain/blockchainActions'
import { fetchData } from './redux/data/dataActions'
import * as s from './styles/globalStyles'
import styled from 'styled-components'
import { create } from 'ipfs-http-client'
import SignatureCanvas from 'react-signature-canvas'
import { Minimatch } from 'minimatch'
import StackUtils from 'stack-utils'

const ipfsClient = create({
	host: 'ipfs.infura.io',
	port: '5001',
	protocol: 'https',
	apiPath: '/api/v0',
})

export const StyledButton = styled.button`
	padding: 8px;
`

function App() {
	const dispatch = useDispatch()
	const blockchain = useSelector((state) => state.blockchain)
	const data = useSelector((state) => state.data)
	const elementRef = useRef()
	const ipfsBaseUrl = 'https://ipfs.infura.io/ipfs/'
	const name = 'TINY TURTLE'
	const description = 'Minted to IPFS'
	const [loading, setLoading] = useState(false)
	const [status, setStatus] = useState('')
	const [NFTs, setNFTs] = useState([])

	// add value to send ethereum; make it payable
	const mint = (_uri) => {
		blockchain.smartContract.methods
			.mint(blockchain.account, _uri)
			.send({ from: blockchain.account })
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
				clearCanvas()
			})
	}

	const createMetaDataAndMint = async (_name, _des, _imgBuffer) => {
		setLoading(true)
		setStatus('Uploading to IPFS')

		try {
			const addedImage = await ipfsClient.add(_imgBuffer)
			const metaDataObj = {
				name: _name,
				description: _des,
				image: ipfsBaseUrl + addedImage.path,
			}
			const addedMetaData = await ipfsClient.add(JSON.stringify(metaDataObj))
			console.log(ipfsBaseUrl + addedMetaData.path)
			mint(ipfsBaseUrl + addedMetaData.path)
		} catch (err) {
			console.log(err)
			setLoading(false)
			setStatus('Error')
		}
	}

	const startMintingProcess = () => {
		// can add name, description here
		createMetaDataAndMint(name, description, getImageData())
	}

	const getImageData = () => {
		const canvasEl = elementRef.current
		let dataURL = canvasEl.toDataURL('image/png')
		const buffer = Buffer(dataURL.split(',')[1], 'base64')
		return buffer
	}

	const fetchMetaDataForNFTs = () => {
		setNFTs([])
		data.allTokens.forEach((nft) => {
			fetch(nft.uri)
				.then((response) => response.json())
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

	const clearCanvas = () => {
		const canvasEl = elementRef.current
		canvasEl.clear()
	}

	useEffect(() => {
		if (blockchain.account !== '' && blockchain.smartContract !== null) {
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
						<s.TextDescription>{blockchain.errorMsg}</s.TextDescription>
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
							onClick={(e) => {
								e.preventDefault()
								startMintingProcess()
							}}
						>
							MINT
						</StyledButton>
						<s.SpacerSmall />
						<StyledButton
							onClick={(e) => {
								e.preventDefault()
								clearCanvas()
							}}
						>
							CLEAR
						</StyledButton>
					</s.Container>

					<s.SpacerLarge />
					<SignatureCanvas
						backgroundColor={'#73FEA4'}
						canvasProps={{ width: 350, height: 350 }}
						ref={elementRef}
					/>
					<s.SpacerLarge />
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
			)}
		</s.Screen>
	)
}

export default App

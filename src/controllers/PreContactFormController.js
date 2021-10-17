import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from '../redux/blockchain/blockchainActions'
import PreContactFormView from '../views/PreContactFormView'
import Countdown from 'react-countdown'
import * as s from '../styles/globalStyles'
import Web3 from 'web3'
import { get } from 'request'

function PreContactFormController() {
	const dispatch = useDispatch()
	const blockchain = useSelector((state) => state.blockchain)

	const Completionist = () => {
		return <span>You are good to go!</span>
	}

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return <Completionist />
		} else {
			return (
				<span style={{ fontFamily: 'BaksoSapi', fontSize: 20 }}>
					{days} days, {hours} hours, {minutes} minutes, {seconds} seconds
				</span>
			)
		}
	}

	return (
		<>
			<PreContactFormView>
				<connect
					onClick={(e) => {
						dispatch(connect())
					}}
				/>
			</PreContactFormView>
			<s.SpacerMedium />
			<s.Container flex={1} ai={'center'} jc={'center'}>
				<Countdown date={'2021-10-13T12:00:00-04:00'} renderer={renderer} />
			</s.Container>
		</>
	)
}

export default PreContactFormController

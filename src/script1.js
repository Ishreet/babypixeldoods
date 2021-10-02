// import { create } from 'ipfs-http-client'

const { create } = require('ipfs-http-client')
const fs = require('fs')
const directoryName = './coolcats/'
const { Buffer } = require('buffer')
const axios = require('axios')
const ipfsClient = create()
const fetch = require('node-fetch')

const { initializeApp } = require('firebase/app')
const { getStorage, uploadString } = require('firebase/storage')
const { getDatabase, ref, set } = require('firebase/database')

const firebaseConfig = {
	apiKey: 'AIzaSyB1bQcK2Mz1fGYkiILDO496HWaIuIH6egk',
	authDomain: 'tinyturtles-a8ca1.firebaseapp.com',
	projectId: 'tinyturtles-a8ca1',
	storageBucket: 'tinyturtles-a8ca1.appspot.com',
	messagingSenderId: '609625553430',
	appId: '1:609625553430:web:ae0ded66dfaaa06a545337',
	measurementId: 'G-3PF55YP4HG',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage()

let counter = 0

const createMetaData = async (_name, _des, _imgBuffer) => {
	try {
		const addedImage = await ipfsClient.add(_imgBuffer)
		const metaDataObj = {
			name: _name,
			description: _des,
			image: 'https://ipfs.infura.io/ipfs/' + addedImage.path,
		}
		const addedMetaData = await ipfsClient.add(JSON.stringify(metaDataObj))
		const url = 'https://ipfs.infura.io/ipfs/' + addedMetaData.path
		console.log(url)

		fetch(url)
			.then((res) => res.json())
			.then((out) => {
				// const storageRef = ref(storage, out.name)
				// uploadString(storageRef, JSON.stringify(out)).then((snapshot) => {
				// 	console.log('Uploaded a raw string!')
				// })
				const db = getDatabase()
				set(ref(db, 'users/' + counter), {
					out,
				})
			})
			.catch((err) => {
				throw err
			})
		counter = counter + 1
	} catch (err) {
		console.log(err)
	}
}

fs.readdir(directoryName, (err, filenames) => {
	if (err) {
		onError(err)
		return
	}
	filenames.forEach(function (filename) {
		fs.readFile(directoryName + filename, (err, data) => {
			let str = data.toString('base64')
			data = Buffer.from(str, 'base64')
			createMetaData(filename, 'description', data)
		})
	})
})

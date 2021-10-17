/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = []

let Controller

class ContactFormView extends React.Component {
	static get Controller() {
		if (Controller) return Controller

		try {
			Controller = require('../controllers/ContactFormController')
			Controller = Controller.default || Controller

			return Controller
		} catch (e) {
			if (e.code == 'MODULE_NOT_FOUND') {
				Controller = ContactFormView

				return Controller
			}

			throw e
		}
	}

	componentDidMount() {
		/* View has no WebFlow data attributes */

		scripts.concat(null).reduce((active, next) =>
			Promise.resolve(active).then((active) => {
				const loading = active.loading.then((script) => {
					new Function(`
          with (this) {
            eval(arguments[1])
          }
        `).call(window, script)

					return next
				})

				return active.isAsync ? next : loading
			})
		)
	}

	render() {
		const proxies =
			ContactFormView.Controller !== ContactFormView
				? transformProxies(this.props.children)
				: {
						submit: [],
						connect: [],
						withdraw: [],
						presale: [],
				  }

		return (
			<span>
				<style
					dangerouslySetInnerHTML={{
						__html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/tinyturtles.webflow.css);
        `,
					}}
				/>
				<span className='af-view'>
					<div className='af-class-div-block-3'>
						{map(proxies['submit'], (props) => (
							<a
								href='#'
								{...{
									...props,
									className: `af-class-button w-button ${
										props.className || ''
									}`,
								}}
							>
								{props.children ? (
									props.children
								) : (
									<React.Fragment> MINT </React.Fragment>
								)}
							</a>
						))}
					</div>
				</span>
			</span>
		)
	}
}

export default ContactFormView

/* eslint-enable */

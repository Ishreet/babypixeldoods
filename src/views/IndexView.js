/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'
import ContactFormView from './ContactFormView'
import styled from 'styled-components'

const scripts = [
	{
		loading: fetch(
			'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6128132df241c2665299b003'
		).then((body) => body.text()),
		isAsync: false,
	},
	{
		loading: fetch('js/webflow.js').then((body) => body.text()),
		isAsync: false,
	},
]

let Controller

class IndexView extends React.Component {
	static get Controller() {
		if (Controller) return Controller

		try {
			Controller = require('../controllers/IndexController')
			Controller = Controller.default || Controller

			return Controller
		} catch (e) {
			if (e.code == 'MODULE_NOT_FOUND') {
				Controller = IndexView

				return Controller
			}

			throw e
		}
	}

	componentDidMount() {
		const htmlEl = document.querySelector('html')
		htmlEl.dataset['wfPage'] = '6128132df241c229dc99b004'
		htmlEl.dataset['wfSite'] = '6128132df241c2665299b003'

		scripts.concat(null).reduce((active, next) =>
			Promise.resolve(active).then((active) => {
				const loading = active.loading.then((script) => {
					new Function(`
          with (this) {
            eval(arguments[0])
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
			IndexView.Controller !== IndexView
				? transformProxies(this.props.children)
				: {}

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
					<div className='af-class-body'>
						<div className='af-class-section af-class-wf-section'>
							<img
								src='images/tinyturtles_logo.png'
								loading='lazy'
								width={291}
								sizes='(max-width: 479px) 100vw, 291px'
								srcSet='images/tinyturtles_logo-p-500.png 500w, images/tinyturtles_logo.png 1064w'
								alt
								className='af-class-image'
							/>
						</div>
						<div className='af-class-section-2 af-class-wf-section'>
							<img
								src='images/thing_bulma.png'
								loading='lazy'
								sizes='100vw'
								srcSet='images/thing_bulma-p-500.png 500w, images/thing_bulma-p-800.png 800w, images/thing_bulma-p-1080.png 1080w, images/thing_bulma.png 2112w'
								alt
								className='af-class-image-3'
							/>
						</div>
						<div className='af-class-section-3 af-class-wf-section'>
							<ContactFormView.Controller />
							<div className='af-class-div-block-20'>
								<div className='af-class-text-block-4'></div>
							</div>
						</div>
						<div className='af-class-section-4 af-class-wf-section'>
							<div className='af-class-div-block-4'>
								<div className='af-class-div-block-6'>
									<h1 className='af-class-heading'>
										<strong>Tiny Turtles</strong>? What are they??
									</h1>
									<div className='af-class-text-block'>
										Tiny Turtles are a <strong>movement!</strong> 10,000
										randomly generated NFT’s with over{' '}
										<strong>150+ different traits</strong>, for 0.06 Ethereum.
										Our traits differ from Turtle color, types of shells,
										stylish clothing, facial expressions and much more! Even the
										tiniest Turtle is unique but some are much rarer than
										others...
									</div>
								</div>
								<img
									src='images/angry_turtle.gif'
									loading='lazy'
									width={368}
									alt
									className='af-class-image-4'
								/>
							</div>
						</div>
						<div className='af-class-section-7 af-class-wf-section' />
						<div className='af-class-section-5 af-class-wf-section'>
							<div className='af-class-div-block-11'>
								<div className='af-class-div-block-12'>
									<img
										src='images/save_us.png'
										loading='lazy'
										width={383}
										data-w-id='19d7a77c-cb3f-ea72-6a1b-09308ac7750d'
										srcSet='images/save_us-p-500.png 500w, images/save_us-p-800.png 800w, images/save_us-p-1080.png 1080w, images/save_us-p-1600.png 1600w, images/save_us.png 2000w'
										sizes='(max-width: 479px) 100vw, (max-width: 767px) 70vw, 383px'
										alt
										className='af-class-image-5'
									/>
									<div className='af-class-div-block-13'>
										<h1 className='af-class-heading-2'>
											Why should I get a Turtle?
										</h1>
										<div className='af-class-text-block-2'>
											You get to join our incredible community, an exciting,
											close-knit, open, and safe space where all Turtles can
											enjoy themselves. Supporting Tiny Turtles is also
											supporting our Earth!{' '}
											<strong>
												15% of our primary sales will be donated to marine life
												conservation initiatives!
											</strong>
										</div>
									</div>
									<div className='af-class-div-block-21'>
										<img
											src='images/save_us.png'
											loading='lazy'
											sizes='(max-width: 479px) 90vw, 100vw'
											srcSet='images/save_us-p-500.png 500w, images/save_us-p-800.png 800w, images/save_us-p-1080.png 1080w, images/save_us-p-1600.png 1600w, images/save_us.png 2000w'
											alt
											className='af-class-image-9'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='af-class-section-6 af-class-wf-section'>
							<div className='af-class-div-block-16'>
								<div className='af-class-div-block-15'>
									<div>
										<h1 className='af-class-heading-3'>Roadmap?</h1>
										<div className='af-class-text-block-3'>
											A roadmap shows the plans an NFT project has as the
											project’s <strong>community grows</strong>. Many projects
											don’t end up completing their roadmap, we don’t try to
											entice you with a roadmap full of fools gold, we will{' '}
											<strong>under-promise</strong> and{' '}
											<strong>overdeliver!</strong>
										</div>
									</div>
									<img
										src='images/roadmap.png'
										loading='lazy'
										width={409}
										sizes='(max-width: 479px) 90vw, (max-width: 767px) 70vw, 409px'
										srcSet='images/roadmap-p-800.png 800w, images/roadmap-p-1080.png 1080w, images/roadmap-p-1600.png 1600w, images/roadmap.png 2600w'
										alt
										className='af-class-image-8'
									/>
								</div>
								<div className='af-class-div-block-22'>
									<div />
									<div />
								</div>
							</div>
						</div>
						<div className='af-class-section-8 af-class-wf-section'>
							<div>
								<div className='af-class-div-block-17'>
									<img src='images/snory.gif' loading='lazy' width={383} alt />
									<div className='af-class-div-block-19'>
										<div>
											<h1 className='af-class-heading-4'>
												Connect with us on twitter or discord
											</h1>
										</div>
										<div className='af-class-div-block-18'>
											<a
												href='https://twitter.com/TinyTurtlesNFT'
												target='_blank'
												className='af-class-link-block w-inline-block'
											>
												<img
													src='images/twitter.svg'
													loading='lazy'
													width={51}
													alt
													className='af-class-image-6'
												/>
											</a>
											<a
												href='https://discord.com/invite/63FsHgCbmt?fbclid=IwAR0zIX9u1I7g0P-Nzjq9TlFM91Tf8qz2YMCAkvl75M2-S61a5Qg4VG_iqlI'
												target='_blank'
												className='w-inline-block'
											>
												<img
													src='images/discord.svg'
													loading='lazy'
													width={51}
													alt
													className='af-class-image7'
												/>
											</a>
											<a
												href='#'
												className='af-class-link-block-2 w-inline-block'
											>
												<img
													src='images/medium.svg'
													loading='lazy'
													width={50}
													alt
													className='af-class-image-7'
												/>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='af-class-section-9 af-class-wf-section' />
						{/* [if lte IE 9]><![endif] */}
					</div>
				</span>
			</span>
		)
	}
}

export default IndexView

/* eslint-enable */

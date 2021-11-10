/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'
import ContactFormView from './ContactFormView'

const scripts = [
	{
		loading: fetch(
			'https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6185b031ef3a00116bb3f571'
		).then((body) => body.text()),
		isAsync: false,
	},
	{
		loading: fetch('js/webflow.js').then((body) => body.text()),
		isAsync: false,
	},
	{
		loading: fetch(
			'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
		).then((body) => body.text()),
		isAsync: false,
	},
	{
		loading: Promise.resolve(
			'particlesJS("particles-js",{particles:{number:{value:43,density:{enable:!0,value_area:800}},color:{value:"#b33687"},shape:{type:"image",stroke:{width:0,color:"#000"},polygon:{nb_sides:6},image:{src:"https://uploads-ssl.webflow.com/6185b031ef3a00116bb3f571/61870624b8b3a90fe2389ab8_Love_Heart_SVG.png",width:10,height:10}},opacity:{value:.3,random:!0,anim:{enable:!1,speed:1,opacity_min:.1,sync:!1}},size:{value:15.782952832645451,random:!1,anim:{enable:!1,speed:10,size_min:13.586413586413586,sync:!1}},line_linked:{enable:!1,distance:200,color:"#ffffff",opacity:1,width:2},move:{enable:!0,speed:1,direction:"top",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!1,mode:"grab"},onclick:{enable:!1,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:1},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0});'
		),
		isAsync: false,
	},
	{
		loading: fetch('https://momentjs.com/downloads/moment.min.js').then(
			(body) => body.text()
		),
		isAsync: false,
	},
	{
		loading: fetch(
			'https://momentjs.com/downloads/moment-timezone-with-data.min.js'
		).then((body) => body.text()),
		isAsync: false,
	},
	{
		loading: Promise.resolve(
			'var timer,now=new Date,now=new Date,then=new Date(2021,10,10,16,0,0,0),utcOffset=moment.tz(moment.utc(),"America/New_York").utcOffset(),localOffset=moment().utcOffset(),offset=utcOffset-localOffset,compareDate=new Date(then)-now.getDate()-60*offset*1e3;function timeBetweenDates(e){var t=new Date(e),o=new Date,a=t.getTime()-o.getTime();a<=0?($("#days").text("0"),$("#hours").text("0"),$("#minutes").text("0"),$("#seconds").text("0")):(e=Math.floor(a/1e3),t=Math.floor(e/60),o=Math.floor(t/60),a=Math.floor(o/24),o%=24,t%=60,e%=60,$("#days").text(a),$("#hours").text(o),$("#minutes").text(t),$("#seconds").text(e))}timer=setInterval(function(){timeBetweenDates(compareDate)},1e3);'
		),
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
		htmlEl.dataset['wfPage'] = '6185b031ef3a00af70b3f572'
		htmlEl.dataset['wfSite'] = '6185b031ef3a00116bb3f571'

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
          @import url(/css/heartz-219951h.webflow.css);
        `,
					}}
				/>
				<span className='af-view'>
					<div className='af-class-body'>
						<div id='particles-js' className='af-class-floating-hearts'>
							<div className='af-class-div-block-30'>
								<div>
									<div className='af-class-div-block-29'>
										<div className='af-class-div-block-31'>
											<a href='#about' className='af-class-topright'>
												ABOUT
											</a>
											<a href='#roadmap' className='af-class-topright'>
												ROADMAP
											</a>
											<a href='#team' className='af-class-topright'>
												TEAM
											</a>
											<a
												href='#faq'
												className='af-class-topright af-class-thing'
											>
												FAQ
											</a>
										</div>
										<a
											href='https://twitter.com/heartz_nft'
											target='_blank'
											className='w-inline-block'
										>
											<img
												src='images/twitter_icon.svg'
												loading='lazy'
												alt
												className='af-class-image-9'
											/>
										</a>
										<a
											href='https://instagram.com/heartz_nft?utm_medium=copy_link'
											target='_blank'
											className='af-class-link-block-2 w-inline-block'
										>
											<img
												src='images/Icon-awesome-instagram.svg'
												loading='lazy'
												alt
												className='af-class-image-11'
											/>
										</a>
										<a
											href='https://discord.gg/JrVeuPAj'
											target='_blank'
											className='af-class-link-block w-inline-block'
										>
											<img
												src='images/discord.svg'
												loading='lazy'
												alt
												className='af-class-image-10'
											/>
										</a>
									</div>
								</div>
							</div>
							<style
								dangerouslySetInnerHTML={{
									__html:
										'\n.af-view .af-class-particles-js-canvas-el {\nposition: absolute;\nmax-width: 100%;\nmax-height:100%;\nleft: 0%;\ntop: 0%;\nright: 0%;\nbottom: 0%;\nz-index: 0;\n}',
								}}
							/>

							<div className='af-class-div-block-33'>
								<div
									id='particles-js'
									className='af-class-section-2 af-class-wf-section'
								>
									<div className='af-class-div-block'>
										<div className='af-class-div-block-2'>
											<img
												src='images/heartz_logo.png'
												loading='lazy'
												sizes='(max-width: 479px) 100vw, (max-width: 991px) 175.984375px, 24vw'
												srcSet='images/heartz_logo-p-800.png 800w, images/heartz_logo.png 1601w'
												alt
												className='af-class-image-2'
											/>
											<p className='af-class-paragraph'>
												<strong>7500</strong> unique Heartz have been released
												onto the <strong>Ethereum blockchain</strong> and are
												looking for their perfect match!
											</p>
											<ContactFormView.Controller />
											<a
												href='#'
												className='af-class-button af-class-other w-button'
											>
												Connect{' '}
											</a>
											<img
												src='images/Ceasar.png'
												loading='lazy'
												alt
												className='af-class-image'
											/>
											<h1 className='af-class-heading-9'>
												*November 10th for Presale and November 11th for Public
												Sale*
											</h1>
											<div className='af-class-div-block-28'>
												<div className='af-class-countdown-row'>
													<div className='af-class-countdown-block'>
														<div id='days' className='af-class-countdown-time'>
															00
														</div>
														<div className='af-class-countdown-detail'>
															Days
														</div>
													</div>
													<div className='af-class-countdown-block'>
														<div id='hours' className='af-class-countdown-time'>
															00
														</div>
														<div className='af-class-countdown-detail'>
															Hours
														</div>
													</div>
													<div className='af-class-countdown-block'>
														<div
															id='minutes'
															className='af-class-countdown-time'
														>
															00
														</div>
														<div className='af-class-countdown-detail'>
															Minutes
														</div>
													</div>
													<div className='af-class-countdown-block'>
														<div
															id='seconds'
															className='af-class-countdown-time'
														>
															00
														</div>
														<div className='af-class-countdown-detail'>
															Seconds
														</div>
													</div>
												</div>
												<div className='af-class-mobile'>
													<a
														href='https://twitter.com/heartz_nft'
														target='_blank'
														className='w-inline-block'
													>
														<img
															src='images/twitter_icon.svg'
															loading='lazy'
															alt
															className='af-class-image-9'
														/>
													</a>
													<a
														href='https://instagram.com/heartz_nft?utm_medium=copy_link'
														target='_blank'
														className='af-class-link-block-3 w-inline-block'
													>
														<img
															src='images/Icon-awesome-instagram.svg'
															loading='lazy'
															alt
															className='af-class-image-12'
														/>
													</a>
													<a
														href='https://discord.gg/JrVeuPAj'
														target='_blank'
														className='w-inline-block'
													>
														<img
															src='images/discord.svg'
															loading='lazy'
															alt
															className='af-class-image-10'
														/>
													</a>
												</div>
											</div>
											<div className='af-class-countdown-outer' />
										</div>
										<img
											src='images/Ceasar.png'
											loading='lazy'
											alt
											className='af-class-image af-class-mobile'
										/>
									</div>
								</div>
							</div>
							<div
								id='about'
								className='af-class-section-3 af-class-wf-section'
							>
								<div className='af-class-div-block-3'>
									<img
										src='images/heartz_carnival.jpg'
										loading='lazy'
										height={300}
										width={300}
										srcSet='images/heartz_carnival-p-500.jpeg 500w, images/heartz_carnival-p-800.jpeg 800w, images/heartz_carnival.jpg 1024w'
										sizes='(max-width: 479px) 80vw, 400px'
										alt
										className='af-class-image af-class-heartz'
									/>
									<div className='af-class-div-block-4'>
										<h1 className='af-class-heading-3'>
											<span className='af-class-text-span'>Heartz World</span>
										</h1>
										<p className='af-class-paragraph-2'>
											The Heartz NFT project is a DAO based initiative offering
											holders access to voting on decisions regarding purchasing
											Blue Chip NFTs and overall community direction. 10% of the
											initial mint proceeds and 20% of secondary sales will go
											toward the Heartz DAO. From there, fractional ownership
											voting will determine how we allocate funds. $HEARTZ will
											be the utility token that powers Heartz World. The DAO
											purchases will be placed into a
											<a href='https://fractional.art/'>
												{' '}
												https://fractional.art/
											</a>{' '}
											vault which creates a $HEARTZ token that will be
											distributed to holders via staking. A staked Heartz NFT
											will earn 10 $HEARTZ per day. In addition, Heartz World
											will expand with breeding, a free companion mint, reward
											early minters with cash based prizes, host weekly
											competitions awarding cash based prizes, and create a
											metaverse!
										</p>
									</div>
								</div>
							</div>
							<div className='af-class-rarities-staking-roadmap af-class-wf-section'>
								<div className='af-class-rarities'>
									<div className='af-class-div-block-34'>
										<h1 className='af-class-heading-4'>Rarities</h1>
										<div className='af-class-div-block-7'>
											<p className='af-class-paragraph-4'>
												The Heartz project is a unique and exclusive NFT
												collection consisting of 7,500 randomly generated lovely
												creations. There are no two identical Heartz and all
												have different combinations of traits. Look out for our
												rare 1 of 1 hand drawn Heartz!
											</p>
										</div>
										<div className='af-class-div-block-5'>
											<img
												src='images/image0-5.jpg'
												loading='lazy'
												sizes='(max-width: 479px) 80vw, 300px'
												srcSet='images/image0-5-p-500.jpeg 500w, images/image0-5.jpg 600w'
												alt
												className='af-class-image-3'
											/>
											<img
												src='images/image0-4.jpg'
												loading='lazy'
												alt
												className='af-class-image-4'
											/>
											<img
												src='images/image0-3.jpg'
												loading='lazy'
												sizes='(max-width: 479px) 80vw, 300px'
												srcSet='images/image0-3-p-500.jpeg 500w, images/image0-3.jpg 600w'
												alt
												className='af-class-image-5'
											/>
										</div>
									</div>
								</div>
								<div className='af-class-staking'>
									<h1 className='af-class-heading-5'>Staking</h1>
									<p className='af-class-paragraph-3'>
										The Heartz DAO purchases and fractionalizes Blue Chip NFTs
										and distributes them to members. The $HEARTZ token
										represents fractional shares of Blue Chip NFTs held in the
										vault hosted at{' '}
										<a href='https://fractional.art/'>
											https://fractional.art/
										</a>
										. Each Heartz NFT earns 10 $HEARTZ per day. In addition,
										each Heartz NFT grants access to the exclusive DAO community
										and voting rights over the DAO’s assets and direction. The
										Heartz DAO will provide holders with exclusive access to NFT
										drops, periodically claimable NFTs, and much more future
										utility.
										<br />
										<br />
										<br />
										<br />
										<br />‍<br />
									</p>
								</div>
								<div id='roadmap' className='af-class-roadmap'>
									<div>
										<h1 className='af-class-heading-6'>Roadmap</h1>
									</div>
									<div>
										<div className='af-class-div-block-9'>
											<div className='af-class-div-block-10'>
												<div className='af-class-text-block'>
													<h1 className='af-class-header'>DAO</h1>
												</div>
											</div>
											<p className='af-class-paragraph-5'>
												{' '}
												10% of the initial mint proceeds and 20% of secondary
												sales will be deposited into the Heartz DAO. From there,
												fractional ownership voting will determine the direction
												of the Heartz DAO. I will leave it up to the community
												vote to determine how those funds will be used. Blue
												chip NFT acquisitions, staking, fund disbursement,
												charitable donations, etc. will be voted on.
												Transparency will be provided throughout the entire
												project. We want to build a family here.
											</p>
										</div>
										<div className='af-class-div-block-9'>
											<div className='af-class-div-block-10'>
												<h1 className='af-class-header'>Staking</h1>
											</div>
											<p className='af-class-paragraph-5'>
												$HEARTZ will be the utility token that powers Heartz
												World. The DAO purchases will be placed into a
												https://fractional.art/ vault which creates a $HEARTZ
												token that will be distributed to holders via staking. A
												staked Heartz will earn 10 $HEARTZ per day.
												<br />
												Fractionalized Ownership- The amount of Heartz you own
												will determine your voting power. The more Heartz you
												own, the stronger your voice will be in the community.
												<br />
											</p>
										</div>
										<div className='af-class-div-block-9'>
											<div className='af-class-div-block-10'>
												<h1 className='af-class-header'>Breeding</h1>
											</div>
											<p className='af-class-paragraph-5'>
												Owning at least 2 Heartz NFTs + $HEARTZ will give you
												access to claiming offspring.
											</p>
										</div>
										<div className='af-class-div-block-9'>
											<div className='af-class-div-block-10'>
												<h1 className='af-class-header'>Free Companion Mint</h1>
											</div>
											<p className='af-class-paragraph-5'>
												Heartz World will also expand by including a companion.
												The DAO will determine who/what would make a good
												complement to your Heartz.
											</p>
										</div>
										<div className='af-class-div-block-9'>
											<div className='af-class-div-block-10'>
												<h1 className='af-class-header'>
													Early Minter Reward Program
												</h1>
											</div>
											<p className='af-class-paragraph-5'>
												Cash prizes will be awarded to minters. As the mint
												progresses, we will host four giveaways with descending
												tiers of cash prizes. If you mint early enough, you will
												be eligible to win our largest cash prize. Owning one
												Heartz NFT grants you a single entry while owning
												multiple will grant you multiple entries (1 Heartz NFT :
												1 entry). Owning one of the first 25% of the mints will
												give you entry into a raffle with 5 lucky entries
												winning 0.25 ETH. Owning one of the top 50% of the mints
												will give you an entry into a raffle with 10 lucky
												winners winning 0.2 ETH. Owning one of the top 75% of
												the mints will give you an entry into a raffle with 20
												lucky entries winning 0.15 ETH. Upon sellout, owning a
												Heartz NFT will grant you an entry into a raffle with 50
												lucky entries winning 0.125 ETH. If you hold one of the
												first 25% minted, you will have four chances to win.
											</p>
										</div>
										<div className='af-class-div-block-9'>
											<div className='af-class-div-block-10'>
												<h1 className='af-class-header'>Weekly competition</h1>
											</div>
											<p className='af-class-paragraph-5'>
												We will host competitions to keep community engagement
												up. We will giveaway special 1/1 Heartz for winners and
												also award cash based prizes
											</p>
										</div>
										<div className='af-class-div-block-9'>
											<div className='af-class-div-block-10'>
												<h1 className='af-class-header'>Merchandise</h1>
											</div>
											<p className='af-class-paragraph-5'>
												The expansion of our website to include Heartz official
												clothing and accessories
											</p>
										</div>
										<div className='af-class-div-block-9'>
											<div className='af-class-div-block-10'>
												<h1 className='af-class-header'>Metaverse</h1>
											</div>
											<p className='af-class-paragraph-5'>
												The creation of the Heartz universe in either{' '}
												<strong>Sandbox</strong>, <strong>Decentraland</strong>{' '}
												or <strong>Cryptovoxels</strong>. The DAO will decide
												which we will develop
											</p>
										</div>
									</div>
								</div>
							</div>
							<div
								id='team'
								className='af-class-meet-the-team af-class-wf-section'
							>
								<h1 className='af-class-heading-7'>
									Meet the <span className='af-class-text-span-3'>Team</span>
								</h1>
								<div className='af-class-div-block-11'>
									<div className='af-class-div-block-13'>
										<img
											src='images/image0-6.jpg'
											loading='lazy'
											sizes='(max-width: 479px) 84vw, 300px'
											srcSet='images/image0-6-p-500.jpeg 500w, images/image0-6.jpg 600w'
											alt
											className='af-class-image-6'
										/>
										<div className='af-class-text-block-2'>
											<a
												href='https://www.instagram.com/manamilist'
												target='_blank'
												className='af-class-link'
											>
												<strong>Manami</strong>
											</a>{' '}
											- Co-Founder &amp; Creative Director
											<br />
										</div>
									</div>
									<div className='af-class-div-block-12'>
										<img
											src='images/image0-2.jpg'
											loading='lazy'
											sizes='(max-width: 479px) 84vw, 300px'
											srcSet='images/image0-2-p-500.jpeg 500w, images/image0-2.jpg 600w'
											alt
											className='af-class-image-7'
										/>
										<div className='af-class-text-block-3'>
											<a
												href='https://twitter.com/CookerBlackToe'
												target='_blank'
												className='af-class-link-2'
											>
												<strong>Black Toe </strong>
											</a>
											- Co-Founder &amp; Operations/Marketing
											<br />
										</div>
									</div>
									<div className='af-class-div-block-14'>
										<img
											src='images/82.png'
											loading='lazy'
											sizes='(max-width: 479px) 84vw, 300px'
											srcSet='images/82-p-500.png 500w, images/82.png 600w'
											alt
											className='af-class-image-8'
										/>
										<div className='af-class-text-block-3'>
											<strong>Ishreet </strong>- Lead Smart Contract Developer
											<br />
										</div>
									</div>
								</div>
							</div>
							<div id='faq' className='af-class-faq af-class-wf-section'>
								<div className='af-class-div-block-26'>
									<h1 className='af-class-heading-8'>FAQ</h1>
									<div className='af-class-div-block-25'>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8aa'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													How much does a Heartz cost to mint?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													0.05 ETH
													<br />
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8b2'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													When is the launch?
													<br />
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													November 10th for Presale and November 11th for Public
													Sale.
													<br />
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8ba'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													Where can I mint?
													<br />
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													Directly through our website www.heartznft.io and a
													link will be posted in our discord when sale goes
													live.
													<br />
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8c3'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													How many can I mint during the pre-sale?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													5 per wallet (whitelist required)
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8cb'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													How many can I mint during the pre-sale?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													20 per transaction
													<br />
												</p>
											</nav>
										</div>
									</div>
									<div className='af-class-div-block-25'>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8d4'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													What blockchain is this on?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>Ethereum</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8dc'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													When will NFT be revealed?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													72 hours after the public mint has concluded.
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8e4'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													Is there a pre-sale?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													Yes! Check our discord to learn how to qualify.
													<br />
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8ed'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													How many are reserved by the team?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													The team has 40 Heartz reserved for future giveaways,
													marketing promotions, and airdrops for our top
													community members!
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c077044e-4e99-2029-31d6-42000bbff8f5'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													What is the Heartz NFT utility
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													By owning a Heartz NFT, you have membership rights to
													the Heartz DAO. Holders will vote on decisions
													regardings the Heartz DAO. Every Heartz NFT you own
													will count as 1 vote in the DAO. The DAO will
													determine every move in our community. Further, owning
													a Heartz NFT will give you access to staking the
													$HEARTZ token which will provide even more utility!
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='f55146a5-c001-cd2b-6f9d-4d8de2ce4567'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													What is the $HEARTZ token?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													<strong>$HEARTZ</strong> tokens will be earned by the
													holders of Heartz. <strong>$HEARTZ</strong> are
													fractionalized tokens of Blue Chip NFTs purchased by
													the <strong>Heartz DAO</strong>. Your Heartz NFT can
													generate $HEARTZ while it remains in the{' '}
													<strong>staking pool</strong>. The
													<strong> $HEARTZ</strong> token will also be used in
													the future for different things such as breeding in
													Heartz World.
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='bb80fb2c-285b-c748-aa25-953bd2002d7b'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													How much $HEARTZ will I earn per day?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													1 Heartz NFT will provide 10 $HEARTZ per day.
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='c50ac460-eb75-1e80-800c-10a056c21d10'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													What is staking?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													Staking is depositing your Heartz into a staking pool
													smart contract. The contract pays you $HEARTZ token
													rewards daily while you stake your NFTs with us.
												</p>
											</nav>
										</div>
										<div
											data-hover='false'
											data-delay={0}
											data-w-id='0dc2c43e-65de-3b60-cc35-bb4d378d4535'
											style={{ height: 80 }}
											className='af-class-accordion-item w-dropdown'
										>
											<div className='af-class-accordion-toggle w-dropdown-toggle'>
												<div
													style={{
														WebkitTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														MozTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														msTransform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
														transform:
															'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)',
													}}
													className='af-class-accordion-icon w-icon-dropdown-toggle'
												/>
												<div className='af-class-text-block-5'>
													Will Heartz be available on any secondary markets?
												</div>
											</div>
											<nav className='af-class-dropdown-list w-dropdown-list'>
												<p className='af-class-paragraph-7'>
													Yes, Heartz will be available on{' '}
													<strong>Opensea</strong>.
												</p>
											</nav>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* [if lte IE 9]><![endif] */}
						<style
							dangerouslySetInnerHTML={{
								__html:
									'\n.af-view .af-class-particles-js-canvas-el {\nposition: absolute;\nmax-width: 100%;\nmax-height:100%;\nleft: 0%;\ntop: 0%;\nright: 0%;\nbottom: 0%;\nz-index: 0;\n}',
							}}
						/>
						{/*  MOMENT.JS  */}
						{/*  MOMENT.JS TIMEZONE DATA  */}
					</div>
				</span>
			</span>
		)
	}
}

export default IndexView

/* eslint-enable */

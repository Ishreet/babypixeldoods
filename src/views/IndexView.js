/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'
import ContactFormView from './ContactFormView'
import ContactFormView from './ContactFormView'

const scripts = [
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=61d3f34c400426744787419b").then(body => body.text()), isAsync: false },
  { loading: fetch("js/webflow.js").then(body => body.text()), isAsync: false },
]

let Controller

class IndexView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/IndexController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = IndexView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '61d3f34c4004266d3e87419c'
    htmlEl.dataset['wfSite'] = '61d3f34c400426744787419b'

    scripts.concat(null).reduce((active, next) => Promise.resolve(active).then((active) => {
      const loading = active.loading.then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script)

        return next
      })

      return active.isAsync ? next : loading
    }))
  }

  render() {
    const proxies = IndexView.Controller !== IndexView ? transformProxies(this.props.children) : {

    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/xyz-70aee2.webflow.css);
        ` }} />
        <span className="af-view">
          <div className="af-class-body">
            <div className="af-class-section-3 af-class-wf-section">
              <div className="af-class-div-block-18">
                <div className="w-layout-grid af-class-pixel_box">
                  <div id="w-node-d1d9ed48-d56f-9619-480f-82c237a94a2e-3e87419c" className="af-class-content_middle">
                    <div className="af-class-highlight" />
                    <div className="af-class-nav_holder">
                      <div className="af-class-left_shade" />
                      <a href="#" className="af-class-link-block-3 w-inline-block"><img src="images/opensea_bket.svg" loading="lazy" alt className="af-class-image" /></a>
                      <a href="#" className="af-class-link-block-3 w-inline-block"><img src="images/twitter_bket.svg" loading="lazy" alt className="af-class-image" /></a>
                      <a href="#" className="af-class-link-block-3 w-inline-block"><img src="images/discord_bket.svg" loading="lazy" alt className="af-class-image" /></a>
                      <ContactFormView.Controller />
                      <div className="af-class-left_shade" />
                    </div>
                    <div className="af-class-bottom_shade" />
                  </div>
                  <div id="w-node-_967096f2-17e1-e57c-8848-9064bfde63a6-3e87419c" className="af-class-left" />
                  <div id="w-node-bdeb6f5b-d4f4-e79f-2fd0-2b71b4321fe4-3e87419c" className="af-class-right" />
                  <div id="w-node-_155a59d0-e8f4-0fb1-382f-8c32f142f6af-3e87419c" className="af-class-top" />
                  <div id="w-node-_8f99cf7f-f73d-0887-f2fb-b07a3cbb5ebb-3e87419c" className="af-class-bottom" />
                </div>
              </div>
              <div className="af-class-div-block-20">
                <div className="af-class-div-block-22"><img src="images/thing.svg" loading="lazy" alt className="af-class-image-3" /><img src="images/spaceguy.png" loading="lazy" sizes="(max-width: 767px) 58vw, 300px" srcSet="images/spaceguy-p-500.png 500w, images/spaceguy-p-800.png 800w, images/spaceguy-p-1080.png 1080w, images/spaceguy-p-1600.png 1600w, images/spaceguy.png 2000w" alt className="af-class-image-4" /></div>
                <ContactFormView.Controller />
              </div>
            </div>
            <div className="af-class-section-4 af-class-wf-section">
              <div className="af-class-div-block-23">
                <h1 className="af-class-heading-4">--- Unique Traits ---</h1>
                <p className="af-class-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
              </div>
              <div className="af-class-div-block-24">
                <div className="w-layout-grid af-class-grid-3">
                  <div id="w-node-_0323587e-e3b7-2c2d-a59c-91f2b9bbbdc2-3e87419c" className="af-class-pictop" />
                  <div id="w-node-_0fa02c04-50d1-c834-b18f-f2b6a78b9f3e-3e87419c" className="af-class-picleft" />
                  <div id="w-node-d0d1c74b-cc3d-bdce-e0a3-ea46fd3cd9dd-3e87419c" className="af-class-picbot" />
                  <div id="w-node-daffcf38-562d-6c12-faad-1a9b6313058c-3e87419c" className="af-class-picmid"><img src="images/asset1.svg" loading="lazy" alt className="af-class-image-9" /></div>
                  <div id="w-node-_7f8a17cf-ba81-0f6e-aad7-828bc8f0834d-3e87419c" className="af-class-picright" />
                </div>
                <div className="w-layout-grid af-class-grid-3">
                  <div id="w-node-e4e1f7a3-a908-f5d0-1286-c89f26b3b9d8-3e87419c" className="af-class-pictop" />
                  <div id="w-node-e4e1f7a3-a908-f5d0-1286-c89f26b3b9d9-3e87419c" className="af-class-picleft" />
                  <div id="w-node-e4e1f7a3-a908-f5d0-1286-c89f26b3b9da-3e87419c" className="af-class-picbot" />
                  <div id="w-node-e4e1f7a3-a908-f5d0-1286-c89f26b3b9db-3e87419c" className="af-class-picmid"><img src="images/asset2.svg" loading="lazy" alt className="af-class-image-8" /></div>
                  <div id="w-node-e4e1f7a3-a908-f5d0-1286-c89f26b3b9dd-3e87419c" className="af-class-picright" />
                </div>
                <div className="w-layout-grid af-class-grid-3">
                  <div id="w-node-aaeef5df-5fda-fabe-d02f-71d8e4645820-3e87419c" className="af-class-pictop" />
                  <div id="w-node-aaeef5df-5fda-fabe-d02f-71d8e4645821-3e87419c" className="af-class-picleft" />
                  <div id="w-node-aaeef5df-5fda-fabe-d02f-71d8e4645822-3e87419c" className="af-class-picbot" />
                  <div id="w-node-aaeef5df-5fda-fabe-d02f-71d8e4645823-3e87419c" className="af-class-picmid"><img src="images/asset3.svg" loading="lazy" alt className="af-class-image-6" /></div>
                  <div id="w-node-aaeef5df-5fda-fabe-d02f-71d8e4645825-3e87419c" className="af-class-picright" />
                </div>
                <div className="w-layout-grid af-class-grid-3">
                  <div id="w-node-_92f4d612-0f14-bb86-8a3e-4ece30cf572c-3e87419c" className="af-class-pictop" />
                  <div id="w-node-_92f4d612-0f14-bb86-8a3e-4ece30cf572d-3e87419c" className="af-class-picleft" />
                  <div id="w-node-_92f4d612-0f14-bb86-8a3e-4ece30cf572e-3e87419c" className="af-class-picbot" />
                  <div id="w-node-_92f4d612-0f14-bb86-8a3e-4ece30cf572f-3e87419c" className="af-class-picmid"><img src="images/asset4.svg" loading="lazy" alt className="af-class-image-7" /></div>
                  <div id="w-node-_92f4d612-0f14-bb86-8a3e-4ece30cf5731-3e87419c" className="af-class-picright" />
                </div>
              </div>
            </div>
            <div className="af-class-section-5 af-class-wf-section">
              <div className="af-class-div-block-27">
                <div className="w-layout-grid af-class-pixel_box">
                  <div id="w-node-_11de1648-7c29-8595-5194-dcca8130f235-3e87419c" className="af-class-content_middle">
                    <div className="af-class-highlight" />
                    <div className="af-class-nav_holder">
                      <div className="af-class-left_shade" />
                      <div className="af-class-div-block-28">
                        <div className="af-class-div-block-29">
                          <div className="af-class-text-block-4">10%</div>
                        </div>
                      </div>
                      <div className="af-class-left_shade" />
                    </div>
                    <div className="af-class-bottom_shade" />
                  </div>
                  <div id="w-node-_11de1648-7c29-8595-5194-dcca8130f248-3e87419c" className="af-class-left" />
                  <div id="w-node-_11de1648-7c29-8595-5194-dcca8130f249-3e87419c" className="af-class-right" />
                  <div id="w-node-_11de1648-7c29-8595-5194-dcca8130f24a-3e87419c" className="af-class-top" />
                  <div id="w-node-_11de1648-7c29-8595-5194-dcca8130f24b-3e87419c" className="af-class-bottom" />
                </div>
                <div className="w-layout-grid af-class-pixel_box">
                  <div id="w-node-_13441c95-00bf-9a72-c6a7-7662309cf155-3e87419c" className="af-class-content_middle">
                    <div className="af-class-highlight" />
                    <div className="af-class-nav_holder">
                      <div className="af-class-left_shade" />
                      <div className="af-class-div-block-28">
                        <div className="af-class-div-block-29">
                          <div className="af-class-text-block-4">25%</div>
                        </div>
                      </div>
                      <div className="af-class-left_shade" />
                    </div>
                    <div className="af-class-bottom_shade" />
                  </div>
                  <div id="w-node-_13441c95-00bf-9a72-c6a7-7662309cf15f-3e87419c" className="af-class-left" />
                  <div id="w-node-_13441c95-00bf-9a72-c6a7-7662309cf160-3e87419c" className="af-class-right" />
                  <div id="w-node-_13441c95-00bf-9a72-c6a7-7662309cf161-3e87419c" className="af-class-top" />
                  <div id="w-node-_13441c95-00bf-9a72-c6a7-7662309cf162-3e87419c" className="af-class-bottom" />
                </div>
                <div className="w-layout-grid af-class-pixel_box">
                  <div id="w-node-a18cc481-f452-5de8-220b-95de4f60cd79-3e87419c" className="af-class-content_middle">
                    <div className="af-class-highlight" />
                    <div className="af-class-nav_holder">
                      <div className="af-class-left_shade" />
                      <div className="af-class-div-block-28">
                        <div className="af-class-div-block-29">
                          <div className="af-class-text-block-4">50%</div>
                        </div>
                      </div>
                      <div className="af-class-left_shade" />
                    </div>
                    <div className="af-class-bottom_shade" />
                  </div>
                  <div id="w-node-a18cc481-f452-5de8-220b-95de4f60cd83-3e87419c" className="af-class-left" />
                  <div id="w-node-a18cc481-f452-5de8-220b-95de4f60cd84-3e87419c" className="af-class-right" />
                  <div id="w-node-a18cc481-f452-5de8-220b-95de4f60cd85-3e87419c" className="af-class-top" />
                  <div id="w-node-a18cc481-f452-5de8-220b-95de4f60cd86-3e87419c" className="af-class-bottom" />
                </div>
                <div className="w-layout-grid af-class-pixel_box">
                  <div id="w-node-_905f0a9a-d18c-00ff-9b30-ebea4d154663-3e87419c" className="af-class-content_middle">
                    <div className="af-class-highlight" />
                    <div className="af-class-nav_holder">
                      <div className="af-class-left_shade" />
                      <div className="af-class-div-block-28">
                        <div className="af-class-div-block-29">
                          <div className="af-class-text-block-4">75%</div>
                        </div>
                      </div>
                      <div className="af-class-left_shade" />
                    </div>
                    <div className="af-class-bottom_shade" />
                  </div>
                  <div id="w-node-_905f0a9a-d18c-00ff-9b30-ebea4d15466d-3e87419c" className="af-class-left" />
                  <div id="w-node-_905f0a9a-d18c-00ff-9b30-ebea4d15466e-3e87419c" className="af-class-right" />
                  <div id="w-node-_905f0a9a-d18c-00ff-9b30-ebea4d15466f-3e87419c" className="af-class-top" />
                  <div id="w-node-_905f0a9a-d18c-00ff-9b30-ebea4d154670-3e87419c" className="af-class-bottom" />
                </div>
                <div className="w-layout-grid af-class-pixel_box">
                  <div id="w-node-_398347a8-08ce-3814-4231-c7bd80ec4402-3e87419c" className="af-class-content_middle">
                    <div className="af-class-highlight" />
                    <div className="af-class-nav_holder">
                      <div className="af-class-left_shade" />
                      <div className="af-class-div-block-28">
                        <div className="af-class-div-block-29">
                          <div className="af-class-text-block-4">100%</div>
                        </div>
                      </div>
                      <div className="af-class-left_shade" />
                    </div>
                    <div className="af-class-bottom_shade" />
                  </div>
                  <div id="w-node-_398347a8-08ce-3814-4231-c7bd80ec440c-3e87419c" className="af-class-left" />
                  <div id="w-node-_398347a8-08ce-3814-4231-c7bd80ec440d-3e87419c" className="af-class-right" />
                  <div id="w-node-_398347a8-08ce-3814-4231-c7bd80ec440e-3e87419c" className="af-class-top" />
                  <div id="w-node-_398347a8-08ce-3814-4231-c7bd80ec440f-3e87419c" className="af-class-bottom" />
                </div>
              </div>
            </div>
            <div className="af-class-section-7 af-class-wf-section" />
            <div className="af-class-section-6 af-class-wf-section">
              <div className="af-class-div-block-26">
                <div className="af-class-text-block-2"><strong>©BabyPixelDoods</strong></div>
                <div className="af-class-text-block-3">Terms and Policy</div>
              </div>
              <div>
                <a href="#" className="af-class-link-block-3 w-inline-block"><img src="images/opensea_bket.svg" loading="lazy" alt className="af-class-image" /></a>
                <a href="#" className="af-class-link-block-3 w-inline-block"><img src="images/twitter_bket.svg" loading="lazy" alt className="af-class-image" /></a>
                <a href="#" className="af-class-link-block-3 w-inline-block"><img src="images/discord_bket.svg" loading="lazy" alt className="af-class-image" /></a>
              </div>
            </div>
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default IndexView

/* eslint-enable */
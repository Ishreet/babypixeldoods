/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [
  { loading: Promise.resolve("/[?&]e=1(&|$)/.test(document.location.search)&&(document.querySelector(\".w-password-page.w-form-fail\").style.display=\"block\");"), isAsync: false },
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6185b031ef3a00116bb3f571").then(body => body.text()), isAsync: false },
  { loading: fetch("js/webflow.js").then(body => body.text()), isAsync: false },
]

let Controller

class UnauthorizedView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/UnauthorizedController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = UnauthorizedView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '61861b6c12cf2da43d459b54'
    htmlEl.dataset['wfSite'] = '6185b031ef3a00116bb3f571'

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
    const proxies = UnauthorizedView.Controller !== UnauthorizedView ? transformProxies(this.props.children) : {

    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/heartz-219951h.webflow.css);
        ` }} />
        <span className="af-view">
          <div>
            <div className="af-class-utility-page-wrap">
              <div className="af-class-utility-page-content w-password-page w-form">
                <form action="/.wf_auth" method="post" className="af-class-utility-page-form w-password-page"><img src="https://d3e54v103j8qbb.cloudfront.net/static/utility-lock.ae54711958.svg" alt />
                  <h2>Protected Page</h2><label htmlFor="pass">Password</label><input type="password" className="w-password-page w-input" autofocus="true" maxLength={256} name="pass" data-name="field" placeholder="Enter your password" id="pass" /><input type="submit" defaultValue="Submit" data-wait="Please wait..." className="w-password-page w-button" />
                  <div className="w-password-page w-form-fail">
                    <div>Incorrect password. Please try again.</div>
                  </div>
                  <div style={{display: 'none'}} className="w-password-page w-embed w-script"><input type="hidden" name="path" defaultValue="<%WF_FORM_VALUE_PATH%>" /><input type="hidden" name="page" defaultValue="<%WF_FORM_VALUE_PAGE%>" /></div>
                  <div style={{display: 'none'}} className="w-password-page w-embed w-script">
                  </div>
                </form>
              </div>
            </div>
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default UnauthorizedView

/* eslint-enable */
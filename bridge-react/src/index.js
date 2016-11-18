import React from 'react'
import ReactDOM from 'react-dom'
import Raven from 'raven-js'
import '../assets/stylesheets/styleguide.css'
import routes from './config/route'

let sentryKey = '940d2962f66a41a6986d12b20cdec383'
let sentryApp = '103466'
let sentryUrl = 'https://'+ sentryKey + '@app.getsentry.com/' + sentryApp

let _APP_INFO = {
    name:'Bridge-React',
    branch:'Master',
    version:'1.0'
}

window.onerror = function(){
  Raven.showReportDialog()
}

Raven.config(sentryUrl,{
    release : _APP_INFO.version,
    tags : {
        branch: _APP_INFO.branch,
        github_commit: 'Initial Commit'
    }
}).install()

ReactDOM.render(
  routes,
  document.getElementById('root')
)

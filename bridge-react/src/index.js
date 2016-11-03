import React from 'react';
import ReactDOM from 'react-dom';
import Raven from 'raven-js';
import BridgeContainer from './containers/BridgeContainer';
import '../assets/stylesheets/styleguide.css';

var sentryKey = '940d2962f66a41a6986d12b20cdec383';
var sentryApp = '103466';
var sentryUrl = 'https://'+ sentryKey + '@app.getsentry.com/' + sentryApp;

var _APP_INFO = {
    name:'Bridge-React',
    branch:'Master',
    version:'1.0'
};

window.onerror = function(){
  Raven.showReportDialog();
};

Raven.config(sentryUrl,{
    release : _APP_INFO.version,
    tags : {
        branch: _APP_INFO.branch,
        github_commit: 'Initial Commit'
    }
}).install();

ReactDOM.render(
  <BridgeContainer />,
  document.getElementById('root')
);

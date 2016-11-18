import Raven from 'raven-js'

function logCustomMessage(message,context){
    Raven.captureMessage(message,{
        level : 'error',
        extra : context
    })
    console.error(message)
    return null
}

export default logCustomMessage
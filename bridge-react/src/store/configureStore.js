import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from '../reducers'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

// enable Redux Dev Tools
const enhancers = compose(
	window.devToolsExtension
		? window.devToolsExtension()
		: f => f
)

const configureStore = preloadedState => {
	const store = createStore(
		rootReducer,
		preloadedState,
		compose(
			applyMiddleware(thunkMiddleware,createLogger()),
			enhancers
		)		
	)
	return store
}

export default configureStore
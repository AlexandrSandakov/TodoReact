import React from 'react'
import ReactDOM from 'react-dom'
import App  from './components/App.js'

function Root() {
    return (
        <App/>
    );
}


// ========================================

ReactDOM.render(<Root />, document.getElementById('root'))

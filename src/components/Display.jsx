import React from 'react'
import './Display.css'

export default props => <>
        <div className="display-historic">{props.fullOperation}</div>
        <div className="display">{props.value}</div>
    </>
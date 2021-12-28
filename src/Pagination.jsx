import React from 'react'

export default function Pagination(props) {
    return (
        <div>
            <button onClick={props.getNextPage}>Prev</button>&nbsp;	&nbsp;	
            <button onClick={props.getPrevPage}>Next</button>
        </div>
    )
}

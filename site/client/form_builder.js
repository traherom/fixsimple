import React from 'react'

export default function addField(id, desc, issues, type='text', options=[]) {
    let warningField = ''
    issues.forEach((el) => {
        if(el.id === id) {
            warningField = <div className="error">{el.desc}</div>
        }
    })

    return (
        <div key={id}>
            <label htmlFor={id}>{desc}:</label>
            <input type={type} id={id} ref={id} name={id} />
            {warningField}
        </div>
    )
}

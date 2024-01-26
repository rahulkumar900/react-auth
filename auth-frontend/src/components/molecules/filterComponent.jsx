import React from 'react'

export default function FilterComponent({ allFilterKeys = [], selectedFilterKeys = [], className = "" }) {

    const rawData = allFilterKeys.filter(el => new Set(selectedFilterKeys).has(el));
    console.log(rawData)
    return (
        <ul>
            {rawData.map((el, i) => <li className={`${className}`} key={i}>
            <span>
            {el}
            </span>
            
            </li>)}
        </ul>
    )
}

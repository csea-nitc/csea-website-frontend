import React from 'react'
import styles from './YearBookNav.module.css'
import YearBookEditionChip from './YearBookEditionChip'

const YearBookNav = ({ batches, activeEdition, setActiveEdition }) => {
    return (
        <div className={`${styles.navcontainer}`}>
            {batches?.map((batch, i) => (
                <YearBookEditionChip
                    key={batch}
                    batch={batch}
                    onClick={() => {
                        setActiveEdition(batch)
                        // console.log('Set Active Edition as: ', item?.edition)
                    }}
                    isSelected={activeEdition === batch} // Fixed comparison
                />
            ))}
        </div>
    )
}

export default YearBookNav

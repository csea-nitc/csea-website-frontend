import React from 'react'
import styles from './YearBookEditionChip.module.css'

const YearBookEditionChip = ({batch, onClick, isSelected}) => {
  return (
    <>
    <div className={`${styles.container} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
      <img src='/svgs/tag-triangle.svg' alt='triangle' /> 
      <span>Batch of {batch}</span>
    </div>
    </>
  )
}

export default YearBookEditionChip

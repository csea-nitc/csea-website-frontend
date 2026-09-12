import React from 'react'
import styles from './EditionChip.module.css'

const EditionChip = ({number, onClick, isSelected, date}) => {
  return (
    <>
    <div className={`${styles.container} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
      {/* the multiple spans are used to align stuff using the semi-colon */}
      <img src='/svgs/tag-triangle.svg' alt='triangle' />
      <span>Edition</span>
      <span>{number}</span>
      <span>:</span>
      <span>{date}</span>
    </div>
    <div className={`${styles.containerMobile} ${isSelected ? styles.selectedMobile : ''}`} onClick={onClick}>
      <img src='/svgs/tag-triangle.svg' alt='triangle' />
      <span>Ed.</span>
      <span>{number}</span>
      <span>:</span>
      <span>{date}</span>
    </div>
    </>
  )
}

export default EditionChip

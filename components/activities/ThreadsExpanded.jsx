import React, { useEffect } from 'react'
import styles from './ThreadsExpanded.module.css'
import Button from '../common/Button'

const ThreadsExpanded = ({ edition }) => {

  // console.log('current edition', edition)

  function numberSuffix(number) {
    if (!number) return
    if (number === 1) {
      return 'st'
    } else if (number === 2) {
      return 'nd'
    } else if (number === 3) {
      return 'rd'
    } else {
      return 'th'
    }
  }

  function getMonthYear(date) {
    if (!date) return null
    return new Date(date).toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  function getDayMonthYear(date) {
    if (!date) return null
    return new Date(date).toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (

    <div key={edition?.edition} className={` ${styles.container} flex justify-center`}>

      <div className={styles.coverContainer}>
        <div  className={styles.cover} style={{ background: `url(${edition?.cover})`, backgroundSize: 'contain' }} ></div>
      </div>

      <div className={styles.description}>
        <h1 className={styles.title}>
          Threads{' - '}
          {getMonthYear(edition?.release_date) ?? '---'}
          {':'} {(edition?.edition ?? 'n')}
          {numberSuffix(edition?.edition) ?? 'th'} Edition
        </h1>
        <div className={styles.details}>
          <h2 className={styles.detailsChip}>
            <span className={styles.key}> RELEASED  {` : `}</span>
            <span className={styles.value}>{getDayMonthYear(edition?.release_date) ?? '---'}</span>
          </h2>
          <h2 className={styles.detailsChip}>
            <span className={styles.key}> EDITION  {` : `}</span>
            <span className={styles.value}>{edition?.edition ?? '---'}</span>
          </h2>
          <h2 className={styles.detailsChip}>
            <span className={styles.key}> SIZE  {` : `}</span>
            <span className={styles.value}>{(edition?.pdf?.size / 1024).toPrecision(3) ?? 'x'} {'MB'}</span>
          </h2>
          <div className="py-5">
            <Button
              text={'PDF'}
              link={edition?.link}
            />
          </div>


        </div>
      </div>

    </div>
  )
}

export default ThreadsExpanded

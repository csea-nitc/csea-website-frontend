import React, { useEffect } from 'react'
import styles from './YearBookExpanded.module.css'
import Button from '../common/Button'
import Image from 'next/image'

const YearBookExpanded = ({ edition }) => {

  return (

    <div key={edition?.edition} className={` ${styles.container} flex justify-center`}>

      <div className={styles.cover}>
        <Image 
          src={edition?.cover} 
          alt="Cover"
          fill={true}
          unoptimized
          style={{ border: '2px dashed gray', padding: '4px' }}
        />
      </div>

      <div className={styles.description}>
        <h1 className={styles.title}>
          Yearbook{' - '} Batch of {edition?.edition ?? '---'}
        </h1>
        <div className={styles.details}>
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

export default YearBookExpanded

import React from 'react'
import Image from 'next/image'
import styles from './YearBookGrid.module.css'

const YearBookCard = ({ title, cover, link }) => {
  const content = (
    <>
      <div className={styles.cover}>
        {cover && (
          <Image
            src={cover}
            alt={`${title} yearbook cover`}
            fill={true}
            unoptimized
            className={styles.coverImage}
          />
        )}
      </div>
      <h2 className={styles.title}>{title}</h2>
    </>
  )

  // A card without a PDF stays visible but isn't clickable
  if (!link) return <div className={styles.card}>{content}</div>

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${styles.cardLink}`}
    >
      {content}
    </a>
  )
}

const YearBookGrid = ({ yearbooks }) => {
  if (!yearbooks?.length) {
    return <p className={styles.empty}>No yearbooks available yet.</p>
  }

  return (
    <div className={styles.grid}>
      {yearbooks.map((yearbook) => (
        <YearBookCard
          key={yearbook.id}
          title={yearbook.title}
          cover={yearbook.cover}
          link={yearbook.link}
        />
      ))}
    </div>
  )
}

export default YearBookGrid

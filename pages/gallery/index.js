import { useEffect, useState } from 'react'
import { firstThree, formatGallery, latestEventsFilter } from '@/lib/utils'
import Fuse from 'fuse.js'
import axios from 'axios'

import styles from './gallery.module.css'
import SubNav from '@/components/common/SubNav'
import SectionTitle from '@/components/common/SectionTitle'
import BlogPostHorizontal from '@/components/blog/BlogPostHorizontal'
import Archive from '@/components/common/Archive'
import LatestGalleries from '@/components/gallery/LatestGalleries'
import GalleryHorizontal from '@/components/gallery/GalleryHorizontal'
import { BACKEND_URL } from '@/lib/constants'
// import { log } from 'console'

export async function getServerSideProps() {
	try {
		let res = await axios.get(`${BACKEND_URL()}/api/galleries` ,{
			params: {
				'populate[event][populate][cover]' : '*',
				'populate[event][populate][event_category]' : '*',
				'populate[images]': '*'
			}
		})
		// console.log(res?.data?.data[0].attributes)
		const galleries = res?.data?.data?.map(formatGallery);

		galleries?.sort((a, b) => {
			return a?.date < b?.date ? 1 : -1
		})

		// console.log('galleries');
		// console.log(galleries?.event);

		res = await axios.get(`${BACKEND_URL()}/api/event-categories`, 
			{ params: { 'populate': '*' } })

		const eventCategories = await res?.data?.data?.map((item) => {
			return { id: item?.id, name: item?.attributes?.name }
		})

		const latestGalleries = firstThree(galleries);
		const archiveGallery = galleries;

		return {
			props:{
				galleries : galleries ?? [],
				eventCategories : eventCategories ?? [],
				latestGalleries : latestGalleries ?? [],
				archiveGallery: archiveGallery ?? []
			}
		}

	} catch {
		return {
			props: {
				galleries : [],
				eventCategories : [],
				latestGalleries : [],
				archiveGallery : []
			}
		}
	}
}


export default function Gallery({ galleries, eventCategories, latestGalleries, archiveGallery }) {
	const [selectedCategories, setSelectedCategories] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [shownArchiveGallery, setShownArchiveGallery] = useState([])


	useEffect(() => {
		const categoryFiltered = archiveGallery?.filter((item) => {
			if (selectedCategories?.length == 0) return true
			return selectedCategories?.includes(item?.event_category?.id)
		})

		if (!searchQuery) {
			setShownArchiveGallery(categoryFiltered)
			return
		}

		const fuse = new Fuse(categoryFiltered, { includeScore: true, keys: ['title'] })
		const result = fuse.search(searchQuery).map((item) => item.item)

		setShownArchiveGallery(result)
	}, [shownArchiveGallery, selectedCategories, searchQuery])

	return (
		<>
			<SubNav
				pageTitle='Gallery'
				links={[
					{ name: 'Feautured', href: '/gallery#featuredGallery' },
					{ name: 'Archive', href: '/gallery#archiveGallery' },
				]}
			/>

			<LatestGalleries latestGalleries={latestGalleries} id='featuredGallery' />

			<Archive
				id={'archiveGallery'}
				categories={eventCategories}
				onSelectedCategoriesChange={setSelectedCategories}
				onSearchQueryChange={setSearchQuery}
			>
				{shownArchiveGallery?.map((item) => (
					<div className={styles['blog-post-horizontal-wrapper']} key={item?.id}>
						<GalleryHorizontal
							id={item?.id}
							slug={item?.slug}
							imageUrl={item?.cover_img}
							tag={item?.event_category?.name || ''}
							date={item?.date || 'No Date Available'}
							title={item?.title}
							count={item?.count}

						/>
					</div>
				))}
			</Archive>

			<div style={{ height: 400 }}></div>
		</>
	)
}

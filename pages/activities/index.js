import { useEffect, useState } from 'react'
import { firstThree, firstX, formatEvent, latestEventsFilter } from '@/lib/utils'
import Fuse from 'fuse.js'
import axios from 'axios'

import styles from './activities.module.css'
import SubNav from '@/components/common/SubNav'
import LatestActivites from '@/components/activities/LatestActivites'
import Archive from '@/components/common/Archive'
import ActivitiesHorizontal from '@/components/activities/ActivitesHorizontal'
import { BACKEND_URL } from '@/lib/constants'

export async function getServerSideProps() {
	try {
		let res = await axios.get(`${BACKEND_URL()}/api/event-categories?populate=*`)

		const eventCategories = await res?.data?.data?.map((item) => {
			return { id: item?.id, name: item?.name }
		})

		res = await axios.get(`${BACKEND_URL()}/api/events?populate=*`)

		const events = res?.data?.data?.map(formatEvent)
		events?.sort((a, b) => {
			return new Date(b?.date) - new Date(a?.date); // Sort by descending order of date
		});

		const latestEvents = firstX(events, 3);
		console.debug("Event Categories: ", eventCategories);
		console.debug("Latest Events: ", latestEvents);
		console.debug("All Events: ", events);


		return {
			props: {
				eventCategories: eventCategories ?? [],
				latestEvents: latestEvents ?? [],
				events: events ?? [],
			}
		}

	} catch (err) {
		console.log("Error: ", err)
		return {
			props: {
				latestEvents: [],
				eventCategories: [],
				events: [],
			},
		}
	}
}


export default function Activities({ latestEvents, eventCategories, events }) {
	const [selectedCategories, setSelectedCategories] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [shownArchiveEvents, setShownArchiveEvents] = useState([])


	useEffect(() => {
		const categoryFiltered = events?.filter((item) => {
			if (selectedCategories?.length == 0) return true
			return selectedCategories?.includes(item?.event_category?.id ?? null)
		})

		if (!searchQuery) {
			// console.log("categoryFiltered: ", categoryFiltered)
			setShownArchiveEvents(categoryFiltered)
			return
		}

		const fuse = new Fuse(categoryFiltered, { includeScore: true, keys: ['title'] })
		const result = fuse.search(searchQuery).map((item) => item.item)

		setShownArchiveEvents(result)
	}, [selectedCategories, searchQuery])

	useEffect(() => {
		const initialEvents = events || []
		setShownArchiveEvents(initialEvents)
	}, [events])


	return (
		<>
			<SubNav
				pageTitle='Activities'
				links={[
					{ name: 'Events', href: '/activities#events' },
					{ name: 'Threads', href: '/activities/threads' },
					{ name: 'Interview Diaries', href: 'https://sites.google.com/nitc.ac.in/interviewdiaries/home' },
				]}
			/>

			<LatestActivites latestEvents={latestEvents} />

			<Archive
				categories={eventCategories}
				onSelectedCategoriesChange={setSelectedCategories}
				onSearchQueryChange={setSearchQuery}
			>
				{shownArchiveEvents?.map((item) => (
					<div className={styles['blog-post-horizontal-wrapper']} key={item?.id}>
						<ActivitiesHorizontal
							id={item?.id}
							slug={item?.slug}
							imageUrl={item?.cover_img}
							tag={item?.event_category?.name || ''}
							date={item?.date || 'No Date Available'}
							title={item?.title}
							baseUrl={'event'}

						/>
					</div>
				))}
			</Archive>

			<div style={{ height: 400 }}></div>
		</>
	)
}

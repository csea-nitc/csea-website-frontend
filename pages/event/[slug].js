import { formatBlog, formatEvent } from '@/lib/utils'
import axios from 'axios'

import RichText from '@/components/common/RichText'

import styles from './event.module.css'
import EventHeader from '@/components/event/EventHeader'
import Link from 'next/link'
import SectionTitle from '@/components/common/SectionTitle'
import { BACKEND_URL } from '@/lib/constants'

export default function Event({ event,slug }) {
	return (
		<div className={styles['event-post']}>
			<div className='absolute top-2 left-2'>
				<SectionTitle title={'Event'} />
			</div>
			

			<EventHeader
				id={event?.id}
				slug={event?.slug}
				imageUrl={event?.cover_img}
				description={event?.description}
				event_category={event?.event_category}
				tag={event?.event_category?.name}
				date={event?.date}
				title={event?.title}
				body={event?.body}
			/>
			
			<div className={styles['rich-text-wrapper']}>
				<div className='galleryLink w-full bg-[#EEF9FF] h-20 flex items-center p-4'>
					<div className='w-full flex flex-col h-full'>
						<h3 className='font-epilogue text-2xl'>Gallery</h3>
						<p  className='font-inter text-sm'>View this event&apos;s gallery</p>
					</div>
					<div className='w-max px-4 py-0  h-max border-l border-[var(--border-color)] cursor-pointer transition-transform hover:-translate-y-1 '>
						<Link href={`/gallery/${slug}`} className='bg-[var(--primary)] p-2 px-4 rounded-full text-white'>VIEW</Link>
					</div>

				</div>
				<RichText content={event?.body} />
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	try {
		const slug = context.params?.slug
		let res = await axios.get(
			`${BACKEND_URL()}/api/events/?filters[slug][$eq]=${slug}&populate=*`
		)

		const events = res?.data?.data?.map(formatEvent)
		const event = events.length === 0 ? null : events[0]

		return { 
			props: { 
				event: event ?? null ,
				slug: slug ?? null
			}, 
			notFound: !event 
		}
	} catch (err) {
		console.error(err)
		return { 
			props: {
				event: null ,
				slug: null
			} 
		}
	}
}

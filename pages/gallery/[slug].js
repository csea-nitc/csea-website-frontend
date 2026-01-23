import { formatBlog, formatEvent, formatImages } from '@/lib/utils'
import axios from 'axios'

import styles from '../event/event.module.css'
import ImageGrid from '@/components/gallery/ImageGrid'
import SectionTitle from '@/components/common/SectionTitle'
import GalleryHeader from '@/components/gallery/GalleryHeader'
import { BACKEND_URL } from '@/lib/constants'

export default function Event({ event,slug, images }) {
	return (
		<div className={styles['event-post']}>
			<div className='absolute top-2 left-2'>
				<SectionTitle title={'Event'} />
			</div>
			<GalleryHeader
				id={event?.id}
				slug={event?.slug}
				imageUrl={event?.cover_img}
				description={images?.length ?? 0}
				event_category={event?.event_category}
				tag={event?.event_category?.name}
				date={event?.date}
				title={event?.title}
			/>
            <ImageGrid 
                images={images}
            />

		</div>
	)
}

export async function getServerSideProps(context) {
	try {
		const slug = context.params?.slug
		let res = await axios.get(
			`${BACKEND_URL()}/api/events/?filters[slug][$eq]=${slug}&populate=*`
		)

        // console.debug("Event data:", res?.data?.data);


		const events = res?.data?.data?.map(formatEvent)
		const event = events.length === 0 ? null : events[0]
        
        res = await axios.get (
            `${BACKEND_URL()}/api/galleries?filters[event][slug][$eq]=${slug}&populate=*`
        )

        // console.debug("Images data:", res?.data?.data);

        
        const images = res?.data?.data[0]?.images?.map(formatImages);

		return { 
			props: { 
				event: event ?? null ,
				slug: slug ?? null,
                images : images ?? null
			}, 
			notFound: !event 
		}
	} catch (err) {
		console.error(err)
		return { 
			props: {
				event: null ,
				slug: null,
                images: []
			} 
		}
	}
}

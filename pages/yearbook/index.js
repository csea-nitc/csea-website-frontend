import { useState } from 'react'
import SubNav from '@/components/common/SubNav'
import YearBookNav from '@/components/activities/YearBookNav'
import axios from 'axios'
import { BACKEND_URL } from '@/lib/constants'
import YearBookExpanded from '@/components/activities/YearBookExpanded'

export async function getServerSideProps() {
	try {
		const res = await axios.get(`${BACKEND_URL()}/api/threads-posts`, { 
			params: { 'populate': '*', 'sort': 'edition:desc' } 
		})	

		// Extract editions
		const editions = res?.data?.data?.map((item) => ({
			id: item?.id, 
			edition: item?.edition, 
			release_date: item?.release_date,
			pdf: item?.pdf,
			cover: (BACKEND_URL() + (item?.cover?.formats?.large?.url ?? item?.cover?.url)),
			link : (BACKEND_URL() + (item?.pdf?.url)) ?? '#',
		}))

		// Extract threads
		const threads = res?.data?.data?.map((item) => ({
			id: item?.id, 
			...item
		}))

		return {
			props: {
				editions: editions ?? [],
				threads: threads ?? [],
			}
		}

	} catch (err) {
		console.log("Error: ", err)
		return {
			props: {
				editions: [],
				threads: [],
			},
		}
	}
}

export default function Threads({ editions, threads }) {
	// Initialize state
	const [activeEdition, setActiveEdition] = useState(editions[0]?.edition ?? 0)
	const activeEditionData = editions.find((item) => item?.edition === activeEdition)

	return (
		<>
			<SubNav
				pageTitle='Yearbook'
			/>

			<div className='flex w-full h-max '>
				{/* Threads Navigation */}
				<YearBookNav
					batches={[10, 20, 30]}
                    activeEdition={activeEdition}
                    setActiveEdition={setActiveEdition}
				/>

				{/* Render Singular Thread */}
				<YearBookExpanded edition={activeEditionData} />	
			</div>

			{/* <div style={{ height: 400 }}></div> */}
		</>
	)
}

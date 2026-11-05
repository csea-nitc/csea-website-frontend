import SubNav from '@/components/common/SubNav'
import YearBookGrid from '@/components/activities/YearBookGrid'
import axios from 'axios'
import { BACKEND_URL } from '@/lib/constants'

export async function getServerSideProps() {
	try {
		const res = await axios.get(`${BACKEND_URL()}/api/yearbooks`, {
			params: { 'populate': '*', 'sort': 'title:desc' }
		})

		const yearbooks = res?.data?.data?.map((item) => {
			const coverPath = item?.cover?.formats?.large?.url ?? item?.cover?.url
			const pdfPath = item?.pdf?.url

			return {
				id: item?.id,
				title: item?.title ?? 'Yearbook',
				cover: coverPath ? BACKEND_URL() + coverPath : null,
				link: pdfPath ? BACKEND_URL() + pdfPath : null,
			}
		})

		return {
			props: {
				yearbooks: yearbooks ?? [],
			}
		}

	} catch (err) {
		console.log("Error: ", err)
		return {
			props: {
				yearbooks: [],
			},
		}
	}
}

export default function Yearbook({ yearbooks }) {
	return (
		<>
			<SubNav
				pageTitle='Yearbook'
			/>

			<YearBookGrid yearbooks={yearbooks} />
		</>
	)
}

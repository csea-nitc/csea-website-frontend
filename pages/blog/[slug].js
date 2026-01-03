import { formatBlog } from '@/lib/utils'
import axios from 'axios'

import RichText from '@/components/common/RichText'
import BlogPostHeader from '@/components/blog-post/BlogPostHeader'

import styles from './blog-post.module.css'
import { BACKEND_URL } from '@/lib/constants'

export default function BlogPost({ blog }) {
	return (
		<div className={styles['blog-post']}>
			<BlogPostHeader
				id={blog?.id}
				slug={blog?.slug}
				imageUrl={blog?.cover_image_url}
				tag={blog?.blog_category?.name}
				date={blog?.publish_date}
				title={blog?.title}
				description={blog?.description}
				authors={blog?.authors}
			/>
			<div className={styles['rich-text-wrapper']}>
				<RichText content={blog?.body} />
			</div>
		</div>
	)
}

export async function getServerSideProps(context) {
	try {
		const slug = context.params?.slug
		let res = await axios.get(
			`${BACKEND_URL()}/api/blog-posts/?filters[slug][$eq]=${slug}&populate=*`
		)

		const blog = formatBlog(res?.data?.data?.[0])

		return { props: { blog: blog ?? null }, notFound: !blog }
	} catch (err) {
		console.error(err)
		return { props: { blog: null } }
	}
}

import { useEffect, useState } from 'react'
import { formatBlog } from '@/lib/utils'
import Fuse from 'fuse.js'
import axios from 'axios'

import BlogPostBig from '@/components/blog/BlogPostBig'
import SectionTitle from '@/components/common/SectionTitle'
import BlogPostHorizontal from '@/components/blog/BlogPostHorizontal'
import SubNav from '@/components/common/SubNav'
import TrendingBlogs from '@/components/blog/TrendingBlogs'
import Archive from '@/components/common/Archive'

import styles from './blog.module.css'
import { BACKEND_URL } from '@/lib/constants'

export async function getServerSideProps() {
	try {
		// Fetching blog categories
		let res = await axios.get(`${BACKEND_URL}/api/blog-categories`, {
			params: { 'pagination[pageSize]': 100 },
		})
		
		const blogCategories = res?.data?.data?.map((item) => {
			return { id: item?.id, name: item?.attributes?.name }
		})	

		// Fetching all blogs
		res = await axios.get(`${BACKEND_URL}/api/blog-posts`, {
			params: { 'pagination[pageSize]': 100, populate: '*', sort: 'createdAt:desc' },
		})

		const archiveBlogs = res?.data?.data?.map(formatBlog)	
		archiveBlogs?.sort((a, b) => {
			return a?.publish_date < b?.publish_date ? 1 : -1
		})

		const latestBlog = archiveBlogs?.[0] ;

		// Fetching trending blogs
		res = await axios.get(`${BACKEND_URL}/api/trending-blog`, {
			params: {
				'populate[blog_posts][populate][blog_category]': '*',
				'populate[blog_posts][populate][cover_image]': '*',
				'populate[blog_posts][populate][authors][populate][image]' : '*'
				}
		})
		// console.log(res.data)
		const trendingBlogs = res?.data?.data?.attributes?.blog_posts?.data?.map(formatBlog) ?? []

		// console.log("trendingBlogs: ", trendingBlogs);
		// console.log("latestBlog: ", latestBlog);
		// console.log("archiveBlogs: ", archiveBlogs);
		// console.log("blogCategories: ", blogCategories);

		return {
			props: {
				latestBlog: latestBlog ?? null,
				trendingBlogs: trendingBlogs ?? [],
				archiveBlogs: archiveBlogs ?? [],
				blogCategories: blogCategories ?? [],
			},
		}
	} catch (err) {
		console.error(err)
		return { 
			props: { 
				latestBlog: null,
				trendingBlogs: [],
				archiveBlogs: [],
				blogCategories: [],

			}
		}
	}
}


export default function Blog({ trendingBlogs,latestBlog,blogCategories,archiveBlogs }) {
	const [selectedCategories, setSelectedCategories] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [shownArchiveBlogs, setShownArchiveBlogs] = useState(archiveBlogs)

	useEffect(() => {
		const categoryFiltered = archiveBlogs?.filter((item) => {
			if (selectedCategories?.length == 0) return true
			return selectedCategories?.includes(item?.blog_category?.id)
		})

		if (!searchQuery) {
			setShownArchiveBlogs(categoryFiltered)
			return
		}

		const fuse = new Fuse(categoryFiltered, { includeScore: true, keys: ['title'] })
		const result = fuse.search(searchQuery).map((item) => item.item)

		setShownArchiveBlogs(result)
	}, [ selectedCategories, searchQuery])

	return (
		<>
			<SubNav
				pageTitle='Blog'
				links={[
					{ name: 'Latest', href: '/blog#latest' },
					{ name: 'Trending', href: '/blog#trending' },
					{ name: 'Archive', href: '/blog#archive' },
				]}
			/>
			<header className={styles['header']} id='latest'>
				<div className={styles['header-left']}>
					<SectionTitle title={'Latest'} />
				</div>
				<div className={styles['header-right']}>
					<BlogPostBig
						id={latestBlog?.id}
						slug={latestBlog?.slug}
						imageUrl={latestBlog?.cover_image_url}
						tag={latestBlog?.blog_category?.name}
						date={latestBlog?.publish_date}
						title={latestBlog?.title}
						description={latestBlog?.description}
						authors={latestBlog?.authors}
					/>
				</div>
			</header>

			<TrendingBlogs trendingBlogs={trendingBlogs} />

			<Archive
				categories={blogCategories}
				onSelectedCategoriesChange={setSelectedCategories}
				onSearchQueryChange={setSearchQuery}
			>
				{shownArchiveBlogs?.map((item) => (
					<div className={styles['blog-post-horizontal-wrapper']} key={item?.id}>
						<BlogPostHorizontal
							id={item?.id}
							slug={item?.slug}
							imageUrl={item?.cover_image_url}
							tag={item?.blog_category?.name}
							date={item?.publish_date}
							title={item?.title}
							description={item?.description}
							authors={item?.authors}
						/>
					</div>
				))}
			</Archive>

			<div style={{ height: 400 }}></div>
		</>
	)
}

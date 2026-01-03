import Slider from '@/components/common/Slider'
import BlogPostVertical from '@/components/blog/BlogPostVertical'
import SectionTitle from '@/components/common/SectionTitle'

import styles from './TrendingBlogs.module.css'
import Button from '../common/Button'

// export async function getStaticProps() {
// 	const res = await fetch( env.BACKEND_API + '/trending-blog');
// 	const data = await res.json();

// 	return {
// 		props: {
// 			posts: data.data,
// 		}
// 		,
// 		revalidate: 10,
// 	};
// }

export default function TrendingBlogs({ trendingBlogs, title, more }) {
	if (!(trendingBlogs)) return <>No data</>
	// console.log('trending blog data : ',trendingBlogs)
	// else
	
		return (
			<section className={styles['trending']} id='trending'>
				<div className={styles['trending-header']}>
					<SectionTitle title={title ?? 'Trending'} />
					{more ? <Button text={'View More'} link={'/blog'} /> : ''}
					
				</div>

				<Slider spacerClassName={styles['slider-spacer']}>
					{trendingBlogs.map((item, index) => (
						<div className={styles['blog-post-vertical-wrapper']} key={item?.id}>
							<BlogPostVertical
								index={index + 1}
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
				</Slider>
			</section>
		)
}

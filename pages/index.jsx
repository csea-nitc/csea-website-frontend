import { firstThree, formatBlog, formatEvent } from '@/lib/utils';
import axios from 'axios';
import LatestActivites from '@/components/activities/LatestActivites';
import AboutMain from '@/components/main/AboutMain';
import ThreadsMain from '@/components/main/Threads';
import { BACKEND_URL } from '@/lib/constants';

export async function getServerSideProps() {
  try {

    let res = await axios.get(`${BACKEND_URL()}/api/trending-blog`, {
      params: {
        'populate[blog_posts][populate][authors]': true,
        'populate[blog_posts][populate][blog_category]': true,
        'populate[blog_posts][populate][cover_image]': true,
				}
		})
		const trendingBlogs = res?.data?.data?.blog_posts?.map(formatBlog) ?? []

    res = await axios.get(`${BACKEND_URL()}/api/events?populate=*`)
		const events = res?.data?.data?.map(formatEvent)

		events?.sort((a, b) => {
      return new Date(b?.date) - new Date(a?.date); // Sort by descending order of date
    });
		const latestEvents = firstThree(events);

    const response = await axios.get( `${BACKEND_URL()}/api/about-us-image`, {
      params: {
        populate: '*',
      },
    });
    const imgData = response.data?.data?.img?.url;
    const AboutImg = imgData ? BACKEND_URL() + imgData : null;

    return {
      props: {
        trendingBlogs: trendingBlogs ?? [],
        latestEvents: latestEvents ?? [],
        AboutImg: AboutImg ?? null,
      }
    };
  } catch (err) {
		console.error(err)

    return {
      props: {
        trendingBlogs: [],
        latestEvents : []
      }
    };
  }
}

export default function Home({ trendingBlogs, latestEvents, AboutImg }) {

  return (
    <main>
      <section className="h-max absolute top-0 flex flex-col justify-center w-full pt-10">

        <AboutMain AboutImg={AboutImg} />
        <ThreadsMain />
        <LatestActivites latestEvents={latestEvents} title={'Latest Events'} more />

        {/* <TrendingBlogs trendingBlogs={trendingBlogs} title={'Trending Blogs'} more={true} /> */}

      </section>
    </main>
  );
}

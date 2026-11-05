import '@/styles/globals.css'

import Head from 'next/head'
import Navbar from '@/components/common/Navbar'
import Layout from '@/components/common/Layout'

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<title>Computer Science and Engineering Association</title>
			</Head>
			<Navbar />
			<Component {...pageProps} />
		</Layout>
	)
}

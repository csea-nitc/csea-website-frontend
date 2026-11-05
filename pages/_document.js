/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				{/* <title>CSEA NIT Calicut - Computer Science &amp; Engineering Association</title> */}
				<link rel='icon' type='image/x-icon' href='favicon.png'></link>

				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true" />
				<link
					href='https://fonts.googleapis.com/css2?family=Epilogue:wght@500&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

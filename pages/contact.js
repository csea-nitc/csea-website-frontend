import Navbar from '@/components/common/Navbar'
import SubNav from '@/components/common/SubNav'
import React from 'react'

import styles from './contact.module.css'
import TextInput from '@/components/input/TextInput'
import TextArea from '@/components/input/TextArea'
import Button from '@/components/common/Button'
import Tag from '@/components/common/Tag'
import Form from '@/components/contact/Form'

export default function contact() {
	return (
		<>
			<SubNav pageTitle='Contact' />
			<div className={styles.container}>
				<div className={styles.leftWrapper}>
					<div className={styles.title}>
						<div className={styles.ellipse}></div>
						Message
					</div>
					{/* <div className={styles.inputs}>
						<TextInput label={'Name*'} placeholder={'Name'} />
						<TextInput label={'Email*'} placeholder={'Email'} />
						<TextArea label={'Message*'} placeholder={'Message'} />
						<Button	 text={'Submit'} />
					</div> */}
					<Form />
				</div>
				<div className={styles.rightWrapper}>
					<div className={styles.content}>
						<Tag value={'address'} />
						<div className={styles.address}>
							Department of CSE
							<br />
							National Institute of Technology Calicut
							<br /> 
							NIT Campus P.O 673 601,
							<br />
							Kozhikode, Kerala
							<br />
							India
						</div>
					</div>
					<div className={styles.content}>
						<Tag value={'email'} />
						<a href="mailto:csea@nitc.ac.in" target="_blank" rel="noopener noreferrer" className={styles.link}>
							csea@nitc.ac.in
						</a>
					</div>
					<div className={styles.content}>
						<Tag value={'socials'} />
						<div className={styles.logos}>
							<a href="https://www.instagram.com/csea.nitc" target="_blank" rel="noopener noreferrer" className={styles.logo}>
								<img src='/svgs/instagram.svg' />
							</a>
							<a href="https://www.linkedin.com/company/csea-nitc" target="_blank" rel="noopener noreferrer" className={styles.logo}>
								<img src='/svgs/linkedin.svg' />
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

import { useScrollDirection } from '@/hooks/useScrollDirection'
import { useRouter } from 'next/router'

import Link from 'next/link'

import styles from './Navbar.module.css'
import { useState } from 'react'

const links = [
	{ name: 'Home', href: '/' },
	// { name: 'Blog', href: '/blog' },
	{ name: 'Threads', href: '/threads' },
	{ name: 'Yearbook', href: '/yearbook' },
	{ name: 'Activities', href: '/activities' },
	{ name: 'Gallery', href: '/gallery' },
	{ name: 'Contact', href: '/contact' },
	{ name: 'About', href: '/about' },
]

export default function Navbar() {
	const scrollDirection = useScrollDirection()
	const router = useRouter()
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	return (
		// <div className={`${styles['navbar-wrapper']} ${scrollDirection === 'down' ? styles['hide-nav'] : ''}`}>
		<div className={`${styles['navbar-wrapper']} ${scrollDirection === 'down' ? styles['hide-nav'] : ''}`}>
			<nav className={styles['navbar']}>
				<Link href='/'>
					<img className={styles['logo']} src='/svgs/logo-nav.svg' alt='logo' />
				</Link>

				<div className={styles['links-wrapper']}>
					{links?.map((item) => (
						<Link key={item?.href} href={item?.href}>
							<span className={`${styles['link']} ${router.pathname === item?.href ? styles['selected-link'] : ''}`}>
								{item?.name}
							</span>
						</Link>
					))}
				</div>

				<div className={styles['hamburger']} onClick={toggleMenu}>
					<span className={`${styles['bar']} ${menuOpen ? styles['open'] : ''}`}></span>
					<span className={`${styles['bar']} ${menuOpen ? styles['open'] : ''}`}></span>
					<span className={`${styles['bar']} ${menuOpen ? styles['open'] : ''}`}></span>
				</div>

				<div className={styles['links-wrapper-mobile']} style={{ display: menuOpen ? 'flex' : 'none' }}>
					{links?.map((item) => (
						<Link key={item?.href} href={item?.href}>
							<span className={`${styles['link-mobile']} ${router.pathname === item?.href ? styles['selected-link'] : ''}`} onClick={()=> setMenuOpen(false)}>
								{item?.name}
							</span>
						</Link>
					))}
				</div>


			</nav>
		</div>
		
	)
}

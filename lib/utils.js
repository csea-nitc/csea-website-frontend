import { BACKEND_URL } from "./constants"

export function formatDate(dateString) {
	const date = new Date(dateString)
	if (date.toString() == 'Invalid Date' || isNaN(date)) return null

	const options = { day: 'numeric', month: 'short', year: 'numeric' }
	return new Intl.DateTimeFormat('en-IN', options).format(date)
}

export function formatIndex(index) {
	index = Math.floor(index)
	if (isNaN(index) || index < 0) return '00'

	if (index < 10) return '0' + index

	return index.toString()
}

export function formatBlog(item) {
	if (!item) return null

	const blog = { ...item, id: item?.id }

	blog.publish_date = blog?.publish_date_override ? blog?.publish_date_override : blog?.createdAt

	// console.debug("Formatting blog: ", blog);

	blog.authors = blog?.authors?.map((item) => {
		const author = { id: item?.id, ...item }
		author.image_url = 
		BACKEND_URL() +
			(author?.image?.data?.formats?.thumbnail?.url ?? 
			author?.image?.data?.formats?.small?.url ?? 
			author?.image?.data?.url ?? null ) 
		return author

		// console.debug("Formatted author: ", author);
	});
	if(!blog.authors) blog.authors = []

	blog.blog_category = { id: blog?.blog_category?.id || null, ...blog?.blog_category }
	if(!blog.blog_category) blog.blog_category = []

	// console.debug("Blog Category: ", blog.blog_category);


	blog.cover_image_url =
		BACKEND_URL() +
		(blog?.cover_image?.formats?.large?.url ?? blog?.cover_image?.url)
	
	return blog
}

export function formatEvent(item) {
	if (!item) return null

	const event = { 
		id: item?.id,
		...item
	}

	event.date = event?.date_override ? event?.date_override : event?.date

	event.event_category = {
		id: event?.event_category?.id, 
		name : event?.event_category?.name
	}

	event.cover_img =
		BACKEND_URL() +
		(event?.cover?.formats?.large?.url ?? event?.cover?.formats?.small?.url ?? event?.cover?.formats?.thumbnail?.url ?? event?.cover?.url)

	event.gallery_url = BACKEND_URL() + (event?.gallery?.url)

	return event
}

export function formatImages(item){
	const image = {
		id: item?.id,
		thumbnail: BACKEND_URL() + (item?.formats?.large?.url),
		url: BACKEND_URL() +(item?.url)
	}

	return image
}

export function latestEventsFilter(events){
	if(!events) return []

	const latestEvents =[];
	let count = 0;
	for(let i=0;i<events.length && count<3;i++){
		latestEvents.push(events[i]);
		count++;
	}

	return latestEvents ?? []
}

export function firstThree(item){
	if(!item || item==undefined || item.length <=0) return []

	const res =[];
	let count = 0;
	for(let i=0;i<item.length && count<3;i++){
		res.push(item[i]);
		count++;
	}

	return res ?? []
}


export function firstX(item, x){
	if(!item || item==undefined || item.length <=0) return []

	const res =[];
	let count = 0;
	for(let i=0;i<item.length && count<x;i++){
		res.push(item[i]);
		count++;
	}

	return res ?? []
}

export function formatAboutImg(item) {
	if(!item) return null
	const img = {
		id: item.id,
		...item
	}
	img 
	return event
}

export function formatGallery(item){
	if (!item) return null

	const gallery = { 
		id: item?.id,
		...item
	}

	gallery.date = gallery?.event?.date_override ? gallery?.event?.date_override : gallery?.event?.date
	
	gallery.event_category = {
		id: gallery?.event?.event_category?.id, 
		name : gallery?.event?.event_category?.name
	}

	gallery.title = gallery?.event?.title
	gallery.slug = gallery?.event?.slug
	gallery.cover_img =
		BACKEND_URL() +
		(gallery?.event?.cover?.formats?.large?.url ?? gallery?.event?.cover?.formats?.small?.url ?? gallery?.event?.cover?.formats?.thumbnail?.url ?? gallery?.event?.cover?.url)

	gallery.gallery_url = BACKEND_URL() + (gallery?.event?.gallery?.url)

	gallery.count = gallery?.images?.length ?? 0
	return gallery
}
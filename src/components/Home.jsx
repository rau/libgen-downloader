import React, { useState, useEffect } from "react"
import Request from "../utils/Request"
import Cookies from "universal-cookie"
import { ThreeDots } from "react-loading-icons"

const cookies = new Cookies()

const Home = () => {
	const [query, setQuery] = useState("")
	const [books, setBooks] = useState([])
	const [email, setEmail] = useState(cookies.get("userEmail") || "")
	const [isLoading, setIsLoading] = useState(false) // New state

	useEffect(() => {
		if (!query) return

		setBooks([]) // Clear books when user types
		setIsLoading(true) // Set loading to true when user types

		const debounceSearch = setTimeout(() => {
			handleSearch()
		}, 300)

		return () => clearTimeout(debounceSearch)
	}, [query])

	const handleSearch = async () => {
		const request = new Request(
			`https://openlibrary.org/search.json?q=${query}&limit=10`
		)

		request
			.init()
			.then(async (res) => {
				const filteredBooks = res.data.docs.filter(
					(book) =>
						book.title && book.title.toLowerCase().includes(query.toLowerCase())
				)

				const bookDetailsPromises = filteredBooks.map((book) => {
					const detailsRequest = new Request(
						`https://openlibrary.org/api/books?bibkeys=OLID:${book.cover_edition_key}&format=json`
					)
					return detailsRequest.init()
				})

				const bookDetailsResults = await Promise.all(bookDetailsPromises)

				const booksWithDetails = filteredBooks.map((book, index) => {
					const details =
						bookDetailsResults[index]?.data?.[`OLID:${book.cover_edition_key}`]

					return {
						...book,
						thumbnail_url: details?.thumbnail_url,
					}
				})

				console.log(booksWithDetails)

				setBooks(booksWithDetails)
				setIsLoading(false) // Set loading to false once search is done
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handleEmailChange = (e) => {
		setEmail(e.target.value)
		cookies.set("userEmail", e.target.value, { path: "/" })
	}

	const sendToEmail = (bookTitle) => {
		// Placeholder for the API request
		console.log(`Sending ${bookTitle} to ${email}`)
		// For instance, if you were using axios, it might look something like this:
		// axios.post('/api/send-email', { email, bookTitle });
	}

	return (
		<div className='flex justify-center h-screen bg-gray-100 relative overflow-hidden'>
			<div className='absolute top-4 right-4 flex flex-col items-end'>
				<label htmlFor='email' className='text-sm mb-2 text-gray-600'>
					Enter your email:
				</label>
				<input
					type='email'
					id='email'
					placeholder='user@example.com'
					value={email}
					onChange={handleEmailChange}
					className='p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out w-64'
				/>
			</div>
			<div className='w-full max-w-2xl p-4 bg-white rounded-lg shadow-md h-full flex flex-col h-[90%] my-8'>
				<h1 className='mb-4 text-2xl font-bold text-center text-gray-700'>
					Search for a Book
				</h1>
				<div className='flex space-x-4 mb-4'>
					<input
						type='text'
						placeholder='Enter book title...'
						value={query}
						onChange={(e) => setQuery(e.target.value)} // This triggers the search
						className='flex-grow p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out'
					/>
					<button
						onClick={handleSearch}
						className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150 ease-in-out'
					>
						Search
					</button>
				</div>
				{isLoading && (
					<div className='flex flex-row w-full justify-center items-center'>
						<ThreeDots stroke='#000' className='h-4' />
					</div>
				)}
				{books.length > 0 && (
					<div className='mt-4 flex flex-col flex-grow overflow-y-auto'>
						{books.map((book, index) => (
							<div
								key={index}
								className='flex items-center justify-between px-4 py-2 border-b space-x-4'
							>
								<div className='flex items-center space-x-4'>
									{book.thumbnail_url && (
										<img
											src={book.thumbnail_url}
											alt={book.title}
											className='w-16 object-cover'
										/>
									)}
									<span>{book.title}</span>
								</div>
								<button
									onClick={() => sendToEmail(book.title)}
									className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-150 ease-in-out'
								>
									Send to Email
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Home

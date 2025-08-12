import { useEffect, useState } from "react"

export default function News() {
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null)
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY
    const API_URL = import.meta.env.VITE_NEWS_API_URL

    useEffect(() => {
        async function fetchNews() {
            try {
                const res = await fetch (
                    `${API_URL}everything?q=malaysia&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
                )
                const data = await res.json()
                console.log("News API raw data:", data)
                if (!res.ok || !data.articles) throw new Error(data.error || 'Failed to fetch news')
                setArticles(data.articles.slice(0, 3)) // top 3 news
            } catch (err) {
                setError(err.message)
            }
        }
        fetchNews()
    }, [])

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">News</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="list-disc list-inside space-y-1 text-sm">
            {articles.map((a, i) => (
                <li key={i}>
                <a href={a.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {a.title}
                </a>
                </li>
            ))}
            </ul>
        </div>
    )
}
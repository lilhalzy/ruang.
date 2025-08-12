// import { useEffect, useState } from "react"

// export default function News() {
//     const [articles, setArticles] = useState([])
//     const [error, setError] = useState(null)
//     const API_KEY = import.meta.env.VITE_NEWS_API_KEY
//     const API_URL = import.meta.env.VITE_NEWS_API_URL

//     useEffect(() => {
//         async function fetchNews() {
//             try {
//                 const res = await fetch (
//                     `${API_URL}everything?q=malaysia&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
//                 )
//                 const data = await res.json()
//                 console.log("News API raw data:", data)
//                 if (!res.ok || !data.articles) throw new Error(data.error || 'Failed to fetch news')
//                 setArticles(data.articles.slice(0, 3)) // top 3 news
//             } catch (err) {
//                 setError(err.message)
//             }
//         }
//         fetchNews()
//     }, [])

//     return (
//         <div className="bg-white rounded-xl shadow-md p-4">
//             <h2 className="text-lg font-semibold mb-3">News</h2>
//             {error && <p className="text-red-500">{error}</p>}
//             <div className="space-y-3">
//                 {articles.map((article, index) => {
//                     <a
//                         key={index}
//                         href={article.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
//                     >
//                         {article.urlToImage && (
//                             <img
//                                 src={article.urlToImage}
//                                 alt={article.title}
//                                 className="w-16 h-16 object-cover rounded-md"
//                             />
//                         )}
//                         <div className="flex-1">
//                             <h3 className="text-sm font-medium">{article.title}</h3>
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {article.source?.name} •{" "}
//                                 {new Date(article.publishedAt).toLocaleDateString("en-MY")}
//                             </p>
//                         </div>
//                     </a>
//                 })}
//             </div>
//         </div>
//     )
// }

import { useEffect, useState } from "react"

const News = () => {
    const [articles, setArticles] = useState([]);
    const API_URL = import.meta.env.VITE_NEWS_API_URL
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY

    useEffect(() => {
        const fetchNews = async () => {
            try {
            const res = await fetch(
                `${API_URL}everything?q=malaysia&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
            );
            const data = await res.json();
            if (data.articles) setArticles(data.articles.slice(0, 3));
            } catch (err) {
            console.error("Error fetching news:", err);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="bg-white rounded-xl p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-3">News</h2>
            <div className="space-y-3">
            {articles.map((article, index) => (
                <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                {article.urlToImage && (
                    <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-md"
                    />
                )}
                <div className="flex-1">
                    <h3 className="text-sm font-medium">{article.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                    {article.source?.name} •{" "}
                    {new Date(article.publishedAt).toLocaleDateString("en-MY")}
                    </p>
                </div>
                </a>
            ))}
            </div>
        </div>
    );
};

export default News;

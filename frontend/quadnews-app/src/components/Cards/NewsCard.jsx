import { useState, useEffect } from "react";
import NewsHeadline from "./NewsHeadline";
import axiosInstance from "../../utils/axiosInstance";

const NewsCard = ({ genre }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getNews = async (genre) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get('/get-news', {params: {genre}});
            if (response.data && response.data.genreNews) {
                setNews(response.data.genreNews);
            }
        }
        catch (error) {
            console.error("Error fetching news:", error);
            setError("Failed to load news. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getNews(genre);
        };
        fetchData();
    }, [genre]);


    if (loading) {
        return (
            <div className="rounded border border-gray-300 bg-white p-5">
                <h2 className="text-xl font-bold text-gray-700 mb-4 capitalize">
                    {genre}
                </h2>
                <div className="animate-pulse mb-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="animate-pulse mb-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="animate-pulse mb-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded border border-gray-300 bg-white p-5">
                <h2 className="text-xl font-bold text-gray-700 mb-4 capitalize">
                    {genre}
                </h2>
                <p className="text-red-500 text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="rounded border border-gray-200 bg-white p-5 transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-700 mb-4 capitalize">
                {genre}
            </h2>

            <div className="space-y-[6px]">
                {news.length > 0 ? (
                    news.map((ele) => (
                        <NewsHeadline 
                            key={ele._id} 
                            headline={ele.headline} 
                            link={ele.link}
                            article={ele}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No news available</p>
                )}
            </div>
        </div>
    );
};

export default NewsCard;

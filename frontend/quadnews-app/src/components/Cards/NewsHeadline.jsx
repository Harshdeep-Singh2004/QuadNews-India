import React from 'react'
import { Link } from 'react-router-dom'

const NewsHeadline = ({headline, link, article}) => {
    return (
        <div className="border-b border-gray-100 pb-2">
            <h3 className="text-[14px] text-gray-700 mb-2">
                {headline}
            </h3>
            <div className="flex gap-2">
                <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-2 py-1 text-[11px] font-medium text-white bg-primary rounded hover:bg-blue-600 transition-colors"
                >
                    Original Article
                </a>
                <Link 
                    to="/article" 
                    state={{ article }}
                    className="px-2 py-1 text-[11px] font-medium text-white bg-zinc-900 rounded hover:bg-zinc-800 transition-colors"
                >
                    AI Summary
                </Link>
            </div>
        </div>
    )
}

export default NewsHeadline

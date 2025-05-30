import React from 'react'

const Intro = () => {
  return (
    <>
        <div className='h-4/5 w-4/5 bg-transparent'>
            <h1 className="text-2xl font-bold mb-4">
            <span className="text-primary">Quad</span>
            <span className="text-black">News</span>
            </h1>

            <ol className="text-sm text-gray-800 space-y-3 list-decimal list-inside">
                <li>Get concise, Gemini-generated summaries of the latest news articles for quick and efficient reading.</li>
                <li>Access real-time updates from Trending, Technology, Sports, Business, and Entertainment sections.</li>
                <li>Benefit from robust user authentication for a safe and tailored user experience.</li>
                <li>Save, edit, and manage notes effortlessly to streamline your daily news tracking.</li>
            </ol>
        </div>
    </>
  )
}

export default Intro;

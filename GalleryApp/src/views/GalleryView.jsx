import React, { useState } from 'react';
import GalleryList from "../components/GalleryList";
import { Link } from 'react-router-dom';
//https://tailwindcss.com/docs/installation/using-vite ------> This is basically what i used for my styling, found it quite comprehensive 
// https://stackoverflow.com/questions/47925751/how-to-fill-the-height-of-the-viewport-with-tailwind-css

const GalleryView = ({galleries}, addtoFavorites) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="flex flex-col gap-2 bg-gradient-to-b from-stone-100 via-gray-400  to-stone-500">
            <nav className="bg-stone-100 shadow-md p-4">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-2xl font-bold my-4 sm:my-0">GalleryView App</h1>

                    <div className="flex flex-row space-x-4 items-center">
                        <Link
                            to={{ pathname: '/singlegallery' }}
                            className="font-medium text-lg hover:text-indigo-600 transition duration-300 ease-in-out"
                        >
                            Gallery
                        </Link>
                        <Link
                            to={{ pathname: '/singlegallery' }}
                            className="font-medium text-lg hover:text-indigo-600 transition duration-300 ease-in-out"
                        >
                            Artists
                        </Link>
                        <Link
                            to={{ pathname: '/singlegallery' }}
                            className="font-medium text-lg hover:text-indigo-600 transition duration-300 ease-in-out"
                        >
                            Paintings
                        </Link>
                        <Link
                            to={{ pathname: '/singlegallery' }}
                            className="font-medium text-lg hover:text-indigo-600 transition duration-300 ease-in-out"
                        >
                            Genre
                        </Link>
                        <Link
                            to={{ pathname: '/singlegallery' }}
                            className="font-medium text-lg hover:text-indigo-600 transition duration-300 ease-in-out"
                        >
                            About
                        </Link>

                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="font-medium text-lg hover:text-indigo-600 transition duration-300 ease-in-out"
                            >
                                More
                            </button>
                            {isDropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                                >
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Favourites
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Collections
                                        </a>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            onClick={() => setIsDropdownOpen(false)}
                                        >
                                            Profile
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
                    
            <div className="py-35 m-auto sm:ml-30">
                <button 
                    onClick={toggleDarkMode}
                    className="absolute top-4 right-4 auto rounded-full bg-gray-200 flex items-center justify-center shadow-md focus:outline-none"
                >
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                <GalleryList galleries={galleries} addtoFavorites={addtoFavorites}/>
            </div>
        </div>
    );
}

export default GalleryView;
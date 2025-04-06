"use client"

import { useRef, useEffect, useState } from "react"
import { Link } from "react-router-dom"

const GenreView = () => {
  const [genres, setGenres] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isDisabled, setIsDisabled] = useState(true)
  const myRef = useRef(null)

  useEffect(() => {
    const favouriteGenres = localStorage.getItem("favouriteGenres")
    if (favouriteGenres === null || favouriteGenres === "[]") {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://34.172.61.40:8080/api/genres")
        const data = await response.json()
        setGenres(data)
      } catch (error) {
        console.error("Error fetching genres:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 mt-16">
        <div className="text-center mb-4">
          <div className="inline-block h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-row w-full">
      <div className="sm:bg-gradient-to-br from-gray-300 via-gray-100 to-stone-200 min-h-screen mt-10">
        <div className="hidden sm:flex min-h-full bg-white shadow-md rounded-r-lg flex-col py-6 space-y-2">
          <Link
            to=""
            className="mx-4 px-4 py-3 rounded-lg hover:bg-stone-100 text-stone-700 opacity-50 transition-colors cursor-not-allowed">
            Genres
          </Link>
          <Link
            to="/gallery"
            className="mx-4 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors">
            Gallery
          </Link>
          <Link
            ref={myRef}
            to="/favourites"
            className={`mx-4 px-4 py-3 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-stone-800 transition-colors ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => isDisabled && e.preventDefault()}>
            Favourite Genres
          </Link>
          <Link
            to=""
            className="mx-4 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors">
            Paintings
          </Link>
          <Link
            to=""
            className="mx-4 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors">
            Artists
          </Link>
          <Link
            to=""
            className="mx-4 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors">
            About
          </Link>
        </div>
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-3 bg-white shadow-sm rounded-md hover:bg-slate-50 transition-colors w-full text-left flex items-center">
            <span className="text-xl">≡</span>
            <span className="ml-2 font-medium">Menu</span>
          </button>
          {isDropdownOpen && (
            <div className="absolute rounded-lg mt-2 w-full z-10 bg-white shadow-lg border border-slate-100 overflow-hidden">
              <Link to="" className="block px-4 py-3 hover:bg-stone-50 text-stone-200 opacity-50 font-medium">
                Genres
              </Link>
              <Link to="/gallery" className="block px-4 py-3 hover:bg-stone-50 text-stone-600">
                Gallery
              </Link>
              <Link
                ref={myRef}
                to="/favourites"
                className={`block px-4 py-3 hover:bg-stone-50 text-slate-600 ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={(e) => isDisabled && e.preventDefault()}>
                Favourites
              </Link>
              <Link to="" className="block px-4 py-3 hover:bg-stone-50 text-slate-600">
                Paintings
              </Link>
              <Link to="" className="block px-4 py-3 hover:bg-stone-100 text-slate-600">
                Artists
              </Link>
              <Link to="" className="block px-4 py-3 hover:bg-stone-50 text-slate-600">
                About
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col p-6 w-full mt-10">
      <h1 className="font-display text-4xl font-extrabold text-slate-900 mb-8 text-center"> {/* Apply font-display */}
        Genres
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {genres.map((genre) => (
          <div
            key={`genre-${genre.genreId}-${genre.genreName}`}
            className="bg-white flex  flex-col rounded-lg shadow-md pt-4 px-4 pb-4 border-2 border-gray-200 hover:shadow-lg transition-shadow duration-200" >
            <div className="flex flex-col flex-grow"> 
              <h2 className="text-xl font-semibold text-slate-800 mb-2">{genre.genreName}</h2>
              <p className="text-slate-600  text-sm mb-4">
                {genre.description || "No description available"}
              </p>
            </div>
            <Link
              to={{ pathname: `/GenreDetails/${genre.genreId}` }}
              state={{ data: genre }}
              className="text-sm self-end text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ease-in-out"  
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default GenreView


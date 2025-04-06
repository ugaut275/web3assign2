import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const FavouritesView = () => {
  const [favouriteGalleries, setFavouriteGalleries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [filterOption, setFilterOption] = useState("galleries")

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const favourites = JSON.parse(localStorage.getItem("favourites")) || []
        if (favourites.length === 0) {
          setLoading(false)
          return
        }

        const getData = await Promise.all(
          favourites.map(async (galleryId) => {
            try {
              const response = await fetch(`http://34.172.61.40:8080/api/paintings/galleries/ref/${galleryId}`)
              const data = await response.json()
              return data[0]
            } catch (error) {
              console.error(`Error fetching gallery with ID ${galleryId}:`, error)
              return null
            }
          })
        )
        setFavouriteGalleries(...favouriteGalleries, getData)
      } catch (error) {
        console.error("Error fetching favourite galleries:", error)
        setError("Failed to load favorite galleries")
      } finally {
        setLoading(false)
      }
    }

    fetchFavourites()
  }, [])
  // favouriteGalleries.forEach(gallery => console.log(gallery.galleries.galleryId));

  const removeFromFavourites = (galleryId) => {
    try {

      const updatedFavourites = favouriteGalleries
        .map(gallery => gallery.galleries.galleryId)
        .filter(id => id !== galleryId);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));

      setFavouriteGalleries(items =>
        items.filter(gallery => gallery.galleries.galleryId !== galleryId)
      );
    } catch (error) {
      console.error("Error removing from favourites:", error);
    }
  }

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
      <div className=" sm:bg-gradient-to-br  from-white via-stone-100 to-stone-300 min-h-screen mt-10">
        <div className="hidden sm:flex w-20 bg-white/50 backdrop-blur-sm w-full flex-col items-center py-8 space-y-6">
          <Link to="/ArtistView" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Artists
          </Link>
          <Link to="/gallery" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Gallery
          </Link>
          <Link to="" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group bg-stone-200/50">
            Favourites
          </Link>
          <Link to="" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Paintings
          </Link>
          <Link to="" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            Genres
          </Link>
          <Link to="" className="p-3 rounded-xl hover:bg-stone-200/50 transition-colors group">
            About
          </Link>
        </div>
        <div className="sm:hidden relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-3 rounded-xl bg-stone-200/50 hover:bg-stone-300 transition-colors w-full text-left">
            ≡
          </button>
          {isDropdownOpen && (
            <div className="absolute rounded-lg mt-2 w-full z-10">
              <Link to="/ArtistView" className="block px-4 py-2 hover:text-blue-500">
                Artists
              </Link>
              <Link to="/gallery" className="block px-4 py-2 hover:text-blue-500">
                Gallery
              </Link>
              <Link to="" className="block px-4 py-2 hover:text-blue-500">
                Favourites
              </Link>
              <Link to="" className="block px-4 py-2 hover:text-blue-500">
                Paintings
              </Link>
              <Link to="" className="block px-4 py-2 hover:text-blue-500">
                Genres
              </Link>
              <Link to="" className="block px-4 py-2 hover:text-blue-500">
                About
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex-grow flex flex-col p-8 mt-5 mr-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Favourite Galleries</h1>
            <p className="text-gray-500">
              {favouriteGalleries.length} {favouriteGalleries.length === 1 ? "gallery" : "galleries"}
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-lg inline-flex p-1">
              <button
                className={`px-6 py-2 rounded-md transition ${filterOption === 'galleries' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setFilterOption('galleries')}>
                Galleries
              </button>
              <button
                className={`px-6 py-2 rounded-md transition ${filterOption === 'artists' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setFilterOption('artists')}>
                Artists
              </button>
              <button
                className={`px-6 py-2 rounded-md transition ${filterOption === 'paintings' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => setFilterOption('paintings')}>
                Paintings
              </button>
            </div>
          </div>


          <ul className="divide-y divide-double divide-yellow-400">
            {favouriteGalleries.map(gallery =>
              <li key={`gallery-${gallery.galleries?.galleryId}-${gallery.galleries?.galleryName}`} className="py-4 flex justify-between items-center">
                <div className="flex-1">
                  <Link
                    to={{ pathname: `/singlegallery/${gallery.galleries.galleryId}` }}
                    state={{ dataCollect: gallery }}
                    className="block">
                    <h2 className="text-lg font-medium text-gray-800 hover:text-gray-600 transition duration-300">
                      {gallery.galleries?.galleryName || "Unknown Gallery"}
                    </h2>
                  </Link>
                  {gallery.galleries?.galleryCity && (
                    <p className="text-sm text-gray-600 mt-1">
                      {gallery.galleries.galleryCity}, {gallery.galleries.galleryCountry}
                    </p>
                  )}

                  {gallery.galleries?.galleryWebSite && (
                    <a
                      href={
                        gallery.galleries.galleryWebSite.startsWith("http")
                          ? gallery.galleries.galleryWebSite
                          : `https://${gallery.galleries.galleryWebSite}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:underline mt-1 inline-block">
                      Website
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={{ pathname: `/singlegallery/${gallery.galleries?.galleryId}` }}
                    state={{ dataCollect: gallery }}
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors">
                    View
                  </Link>

                  <button
                    onClick={() => removeFromFavourites(gallery.galleries?.galleryId)}
                    className="hover:text-red-500 hover:cursor-pointer transition-colors duration-300 bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded"
                    title="Remove from favourites">
                    Remove
                  </button>
                </div>
              </li>
            )
            }
          </ul>

        </div>
      </div>
    </div>
  )
}

export default FavouritesView
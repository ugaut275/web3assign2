import { useState,useEffect } from 'react';
import GalleryView from './views/GalleryView';
import SingleGallery from './components/SingleGallery';
import NotFoundPage from './views/NotFound';
// https://flowbite.com/docs/forms/input-field/  for the input field design
// https://flowbite.com/docs/buttons/  for the button design
// https://flowbite.com/docs/cards/  for the card design
const LoginView = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [Favourites, setFavourites] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://35.193.45.17:8080/api/gallery');
        const data = await response.json();
        setGalleryData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const addtoFavorites = (gallery) => {
  setFavourites([...Favourites, gallery]);
  }
  return (
    <>
      <GalleryView galleries={galleryData} addtoFavorites={addtoFavorites}/>
    
    </>
    
    
   
  );
}

export default LoginView;
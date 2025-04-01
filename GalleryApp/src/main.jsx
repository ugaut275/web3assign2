import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import GalleryView from './views/GalleryView.jsx';
import SingleGallery from './components/SingleGallery.jsx';
import NotFound from './views/NotFound.jsx';
import ArtistView from './views/ArtistView.jsx';

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/gallery', element: <GalleryView />},
  {path: '/singlegallery/:galleryId', element: <SingleGallery />},
  {path: '/ArtistView', element: <ArtistView/>},
  {path: '*', element: <h1><NotFound/></h1>},
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

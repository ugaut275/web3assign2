import React from 'react';

//https://flowbite.com/docs/components/modal/
const PaintingModal = ({ imageLink, painting, isOpen }) => {
  return (
    
    <div className="fixed inset-0  flex items-center justify-center bg-transparent bg-blur  backdrop-blur bg-opacity-50">
      <div className="relative w-full max-w-3xl p-4">
        <div className="bg-black rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Painting Details
            </h3>
            <button
                onClick={() => isOpen(false)}
              className="hover:cursor-pointer text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white">
              ✖
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <img
              src={imageLink}
              alt="Painting"
              className="w-full object-contain rounded"/>
            <div>
              
            <p className="text-white text-sm font-bold">
                    {painting.artists.firstName} {painting.artists.lastName},
                    {painting.yearOfWork}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintingModal;
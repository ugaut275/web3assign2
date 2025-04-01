import { useEffect, useState } from "react";
// Layout design same from GalleryItem.jsx minor tweaks in the design

// Using Prettier for code format

const SingleGalleryCard = ({ id, sortOption }) => {
    const [paintingInfo, setPaintingInfo] = useState([]);

    useEffect(() => {
        const getPainitingInfo = async () => {
            try {
                const data = await fetch("http://35.193.45.17:8080/api/paintings/galleries/ref/" + id);
                const response = await data.json();
                console.log(response);
                setPaintingInfo(response);
            } catch (error) {
                console.log(error);
            }


        };
        getPainitingInfo();
    }, [id]);
    const checkPaintId = (paintingId) => {
        if (paintingId.length === 7) {
            console.log("first")
            return paintingId.substring(0, 6);
        }
        else if (paintingId.length === 4) {
            return `00${paintingId}`;
        } else if (paintingId.length === 5) {
            return `0${paintingId}`;
        } else {
            return `${paintingId}`;
        }
    };

    const divElement =(index,item)=>{
        return(
            <div className=" border-2 overflow-hidden shadow-md  p-1 w-xs  bg-gradient-to-b from-orange-200 to-yellow-300" key={index}>
            <div className="p-0.5 border-2 text-center b-0 flex flex-col gap-10 bg-gradient-to-b from-stone-100 to-white min-h-full">
                <a href="" className="relative group ">
                    <img
                        className="w-full transition-transform duration-300 ease-in-out transform  group-hover:opacity-90 "
                        src={`https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${checkPaintId("" + item.imageFileName)}.jpg`}
                        alt={item.title}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </a>
                <a href=""
                    className="font-medium text-lg  hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{item.title}</a>
    
                <p className="text-white-100 text-sm font-bold">
                    {item.artists.firstName} {item.artists.lastName},
                    {item.yearOfWork}
                </p>
            </div>
    
        </div>
        );
       
    };
    if(sortOption==="title"){
        return (
            paintingInfo.sort((a, b) => {
                 return (a.title).localeCompare(b.title);
            }).map((item, index) => divElement(index,item) 
            
                
            )
        

    );
    }else if(sortOption === "year") {
        return (
            paintingInfo.sort((a, b) => {
                return  (a.yearOfWork)-(b.yearOfWork);
            }).map((item, index) => divElement(index,item) 
            
                
            )
    );
    } 
    else if(sortOption==="artistName"){
        return (
            paintingInfo.sort((a, b) => {
                return (a.artists.firstName).localeCompare(b.artists.firstName);
            }).map((item, index) => divElement(index,item) 
            
                
            )
        

    );
    }
    else{
        return (
            paintingInfo.sort((a, b) => {
                return (a.title).localeCompare(b.title);
            }).map((item, index) => divElement(index,item) 
            
                
            )
        

    );
    }


}

export default SingleGalleryCard;
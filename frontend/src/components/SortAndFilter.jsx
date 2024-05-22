
import React, { useState } from 'react';

const SortAndFilter = ({setSortted,setFilter,setMinRating  }) => {


  

  const handleSort = (sortValue) => {
    if (sortValue === "low-high") {
      setSortted("low-high");
    } else if (sortValue === "high-low") {
      setSortted("high-low");
    }
  };
  
  

  const handleFilter = (filtered) => {
   
    setFilter(filtered)
  };
  
  const handleRatingFilter = (ratingValue) => {
   
    const selectedRating = parseInt(ratingValue);
    
   
    setMinRating(selectedRating);
  };
  


  return (
    <div className='w-full flex flex-col gap-4 md:flex-row md:gap-10'>

    {/* Filter By */}
    <div className='flex flex-col items-center'>
      <label className='text-cyan-400 text-xs md:text-lg font-bold rounded-lg'>
        Filter By:
      </label>
      <select 
        onChange={(e)=>handleFilter(e.target.value)}
        className="focus:outline-none rounded-lg text-black font-semibold md:text-md text-sm"
        id="yourSelect"
        name="role"
      >
        <option value="">Select</option>
        <option className='text-black font-semibold text-md' value="Radiology">Radiology</option>
        <option className='text-black font-semibold text-md' value="cardiology">Cardiology</option>
        <option className='text-black font-semibold text-md' value="opthalmology">Opthalmology</option>
        <option className='text-black font-semibold text-md' value="dermatology">Dermatology</option>
      </select>
    </div>
  
    {/* Sort By */}
    <div className='flex flex-col items-center'>
      <label className='text-cyan-400 text-xs md:text-lg font-bold rounded-lg'>
        Sort By:
      </label>
      <select 
        onChange={(e) => handleSort(e.target.value)}
        className="focus:outline-none rounded-lg text-black font-semibold md:text-md text-sm"
        id="sortSelect"
        name="sort"
      >
        <option value="">Fee</option>
        <option className='text-black font-semibold text-md' value="low-high">Low-High</option>
        <option className='text-black font-semibold text-md' value="high-low">High-Low</option>
      </select>
    </div>
  
    {/* Filter Rating */}
    <div className='flex flex-col items-center'>
      <label className='text-cyan-400 text-xs md:text-lg font-bold rounded-lg'>
        Filter Rating:
      </label>
      <select 
        onChange={(e) => handleRatingFilter(e.target.value)}
        className="focus:outline-none rounded-lg text-black font-semibold md:text-md text-sm"
        id="ratingSelect"
        name="rating"
      >
        <option value="0">Select</option>
        <option value="1">1 star</option>
        <option value="2">2 stars</option>
        <option value="3">3 stars</option>
        <option value="4">4 stars</option>
        <option value="5">5 stars</option>
      </select>
    </div>
  
  </div>
  
  
  );
};

export default SortAndFilter;

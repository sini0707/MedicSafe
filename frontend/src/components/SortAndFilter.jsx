
import React, { useState } from 'react';

const SortAndFilter = ({setSortted,setFilter,setMinRating  }) => {


  const handleSort = (sortValue) => {
   setSortted(sortValue)
  };

  const handleFilter = (filtered) => {
   
    setFilter(filtered)
  };
  // const handleRatingFilter = (ratingValue) => {
  //   setMinRating(parseInt(ratingValue));
  // };
  const handleRatingFilter = (ratingValue) => {
    // Convert the selected rating value to an integer
    const selectedRating = parseInt(ratingValue);
    
    // Set the minimum rating state
    setMinRating(selectedRating);
  };
  


  return (
    <div className='w-full flex md:flex-row gap-10' >

<div style={{ display: 'flex', alignItems: 'center' }}>
        <label className='relative text-cyan-400 w-full text-xs md:text-lg font-bold  rounded-lg'>Filter By:</label>
        <select onChange={(e)=>handleFilter(e.target.value)}
              className="focus:outline-none  rounded-lg  text-black font-semibold   md:text-md text-sm  "
              id="yourSelect"
              
              name="role"
            >
              <option value="">Select</option>
              <option className='text-black font-semibold text-md' value="Radiology">Radiology</option>
              <option className='text-black font-semibold text-md' value="cardiology">cardiology</option>
              
              <option className='text-black font-semibold text-md' value="ophtamology">ophtamology</option>
              <option className='text-black font-semibold text-md' value="ophtamology">Dermatology</option>
             


            </select>
       
      </div>

      <div className='flex justify-between items-center'>
  <div>
    <label className='relative text-cyan-400 text-xs md:text-lg font-bold  rounded-lg'>
      Sort By:
      <select onChange={(e)=>handleSort(e.target.value)}
        className="focus:outline-none rounded-lg text-black font-semibold md:text-md text-sm"
        id="sortSelect"
        name="sort"
      >
        <option value="">Fee</option>
        <option className='text-black font-semibold text-md' value="low-high">low-high</option>
      </select>
    </label>
  </div>

  <div className='flex justify-between items-center  ml-8'>
    <label className='relative text-cyan-400 text-xs md:text-lg font-bold rounded-lg'>
      Filter Rating:
      <select onChange={(e) => handleRatingFilter(e.target.value)}
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
    </label>
  </div>
</div>

      
      </div>
    
  );
};

export default SortAndFilter;

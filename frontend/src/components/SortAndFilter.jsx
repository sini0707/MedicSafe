
import React, { useState } from 'react';

const SortAndFilter = ({setSortted,setFilter}) => {


  const handleSort = (sortValue) => {
   setSortted(sortValue)
  };

  const handleFilter = (filtered) => {
    console.log("handleddd",filtered)
    setFilter(filtered)
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

      <div  className='flex justify-start items-center' >
        <label className='relative text-cyan-400 text-xs md:text-lg font-bold  rounded-lg' style={{ }}>Sort By:
        
        <select  onChange={(e)=>handleSort(e.target.value)}
              className="focus:outline-none  rounded-lg  text-black font-semibold   md:text-md text-sm  "
              id="yourSelect"
              
              name="role"
            >
              <option value=""></option>
              <option className='text-black font-semibold text-md' value="low-high">Fee </option>
            </select>
        </label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
           
         
        </div>
       
      </div>

     
    </div>
  );
};

export default SortAndFilter;

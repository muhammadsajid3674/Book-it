import React from "react";

const Loader = () => {
   return (
      <div className='col-md-12 min-w-screen'>
         <div className='flex space-x-2 animate-pulse'>
            <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
            <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
            <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
         </div>
      </div>
   );
};

export default Loader;

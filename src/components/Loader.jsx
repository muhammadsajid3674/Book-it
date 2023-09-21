import React from "react";

const Loader = () => {
   return (
      <div class='col-md-12 min-w-screen'>
         <div class='flex space-x-2 animate-pulse'>
            <div class='w-3 h-3 bg-gray-500 rounded-full'></div>
            <div class='w-3 h-3 bg-gray-500 rounded-full'></div>
            <div class='w-3 h-3 bg-gray-500 rounded-full'></div>
         </div>
      </div>
   );
};

export default Loader;

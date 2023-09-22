const SearchCmp = ({ onSubmit, reference }) => {
   return (
      <div className='container container-fluid'>
         <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
               <form className='shadow-lg' onSubmit={onSubmit}>
                  <h2 className='mb-3'>Search Rooms</h2>
                  <div className='form-group'>
                     <label for='location_field'>Location</label>
                     <input
                        type='text'
                        className='form-control'
                        id='location_field'
                        placeholder='new york'
                        ref={reference.locationRef}
                     />
                  </div>

                  <div className='form-group'>
                     <label for='guest_field'>No. of Guests</label>
                     <select
                        className='form-control'
                        id='guest_field'
                        ref={reference.guestRef}
                     >
                        {[1, 2, 3, 4, 5, 6].map((e, i) => (
                           <option key={i} value={e}>
                              {e}
                           </option>
                        ))}
                     </select>
                  </div>

                  <div className='form-group'>
                     <label for='room_type_field'>Room Type</label>
                     <select
                        className='form-control'
                        id='room_type_field'
                        ref={reference.categoryRef}
                     >
                        {["King", "Single", "Twins"].map((e, i) => (
                           <option key={i} value={e}>
                              {e}
                           </option>
                        ))}
                     </select>
                  </div>

                  <button type='submit' className='btn btn-block py-2'>
                     Search
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default SearchCmp;

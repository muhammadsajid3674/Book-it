import React from "react";
import Loader from "../Loader";

const Register = ({
   reference,
   onSubmit,
   loading,
   state,
   onChange,
}) => {
   return (
      <div className='container container-fluid'>
         <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
               <form className='shadow-lg' onSubmit={onSubmit}>
                  <h1 className='mb-3'>Join Us</h1>

                  <div className='form-group'>
                     <label htmlFor='name_field'>Full Name</label>
                     <input
                        type='text'
                        id='name_field'
                        className='form-control'
                        ref={reference.nameRef}
                     />
                  </div>

                  <div className='form-group'>
                     <label htmlFor='email_field'>Email</label>
                     <input
                        type='email'
                        id='email_field'
                        className='form-control'
                        ref={reference.emailRef}
                     />
                  </div>

                  <div className='form-group'>
                     <label htmlFor='password_field'>Password</label>
                     <input
                        type='password'
                        id='password_field'
                        className='form-control'
                        ref={reference.passwordRef}
                     />
                  </div>

                  <div className='form-group'>
                     <label htmlFor='avatar_upload'>Avatar</label>
                     <div className='d-flex align-items-center'>
                        <div>
                           <figure className='avatar mr-3 item-rtl'>
                              <img
                                 src={state.avatarPreview}
                                 className='rounded-circle'
                                 alt='image'
                              />
                           </figure>
                        </div>
                        <div className='custom-file'>
                           <input
                              type='file'
                              name='avatar'
                              className='custom-file-input'
                              id='customFile'
                              accept="images/*"
                              onChange={onChange}
                           />
                           <label
                              className='custom-file-label'
                              htmlFor='customFile'
                           >
                              Choose Avatar
                           </label>
                        </div>
                     </div>
                  </div>

                  <button
                     id='login_button'
                     type='submit'
                     className='btn btn-block py-3'
                  >
                     {loading ? <Loader /> : "REGISTER"}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Register;

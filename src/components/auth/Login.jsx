import Link from "next/link";
import Loader from "../Loader";

const Login = ({ reference, onSubmit, loading }) => {
   return (
      <div className='container container-fluid'>
         <div className='row wrapper'>
            <div className='col-10 col-lg-5'>
               <form className='shadow-lg' onSubmit={onSubmit}>
                  <h1 className='mb-3'>Login</h1>
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

                  <Link href={"/"} className='float-right mb-4'>
                     Forgot Password?
                  </Link>

                  <button
                     id='login_button'
                     type='submit'
                     className='btn btn-block py-3'
                  >
                     {loading ? <Loader /> : "LOGIN"}
                  </button>

                  <Link href={"/auth/register"} className='float-right mt-3'>
                     New User?
                  </Link>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Login;

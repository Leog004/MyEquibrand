import { getCsrfToken } from "next-auth/react"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
toast.configure();


export default function SignIn({ csrfToken, error }) {

    const errorMessage = (msg) => {
        toast.error(`${msg ? msg : 'Make sure all fields are filled and that you use a vaild email address' }`, {position: toast.POSITION.BOTTOM_RIGHT,  autoClose: 5000});
    }

    if(error){
        errorMessage(error);
    } 



  return (
    <div className=' py-16 px-16 bg-gray-200 '>
    {/* <img className='w-auto mx-auto my-10 h-20' src={'/img/Logo.png'} /> */}
    <h1 className='w-full text-center text-gray-700 font-semibold text-3xl leading-10 my-2 capitalize'>Login</h1>
    <p className='w-full text-center text-md text-gray-500 mb-0'>Welcome Back!</p>

    <form className='w-1/3 my-0 mx-auto grid grid-cols-1 gap-5 justify-between' method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

      <div className='flex flex-col w-full'>
        <label className='text-gray-700 text-lg font-semibold leading-10'>Email</label>
        <input className='bg-gray-300 py-2 px-5 rounded-md' name="username" type="email" required />
      </div>

      <div className='flex flex-col w-full'>
        <label className='text-gray-700 text-lg font-semibold leading-10'>Password</label>
        <input className='bg-gray-300 py-2 px-5 rounded-md' name="password" type="password" required />
      </div>
      <button className='bg-primary text-white px-4 py-3 rounded-lg mt-3' type="submit">Sign in</button>
    </form>
    
    {/* <Subscribe/> */}
    </div>
    
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {

  

  return {
    props: {
      csrfToken: await getCsrfToken(context),
      error: context.query.error ? context.query.error : ''
    },
  }
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/
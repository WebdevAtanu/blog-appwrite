import {useContext,useState} from 'react';
import { useForm } from "react-hook-form";
import {account} from '../config/appwrite';
import { toast } from 'react-toastify';
import Context from '../context/Context';

export default function Loginform() {
  const {flag,setFlag}=useContext(Context);
  const [load,setLoad]=useState(false);
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        setLoad(true);
        const promise = account.createEmailPasswordSession(data.mail, data.password);
        promise.then(res => {
                setFlag(true);
                reset();
            })
            .catch(err => {
                toast.error('Login failed');
                console.log(err);
                setFlag(false);
                setLoad(false);
            });
    }
   
  return (
    <div className="flex justify-center items-center p-5">
        <form onSubmit={handleSubmit(onSubmit)} className='border-black border flex flex-col md:w-1/2 w-full bg-gray-50 rounded drop-shadow-xl'>
          <div className="bg-slate-800 p-2 text-white">
            <h4 className='text-xl'>Log in to your account</h4>
            <p className='text-[0.6rem] mt-3'>Enter your e-mail and password as login credentials.</p>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className='text-sm'>E-mail: {errors.mail && <span className='text-sm text-red-500'>E-mail is required</span>}</div>
              <div><input type='email' {...register("mail", { required: true })} aria-invalid={errors.mail ? "true" : "false"}  className='border-black border p-1 w-full focus:outline outline-slate-500' placeholder='Lucifer@gmail.com'/></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className='text-sm'>Password: {errors.password && <span className='text-sm text-red-500'>Enter your password</span>}</div>
              <div><input type="password" {...register("password", { required: true })} className='border-black border p-1 focus:outline outline-slate-500 w-full' placeholder='******'/></div>
            </div>
            {
              load?<input type="submit" className='p-1 mt-3 btn btn-outline' value='Please wait...' disabled/>:
              <input type="submit" className='border border-black p-1 mt-3 btn btn-outline' value='Log in'/>
            }
          </div>
        </form>
    </div>
  );
}
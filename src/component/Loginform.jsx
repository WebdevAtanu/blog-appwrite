import {useContext} from 'react';
import { useForm } from "react-hook-form";
import {account} from '../config/appwrite';
import { toast } from 'react-toastify';
import Context from '../context/Context';

export default function Loginform() {
  const {flag,setFlag}=useContext(Context);
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
  const onSubmit = data =>{
    console.log(data);
    const promise=account.createEmailPasswordSession(data.mail,data.password);
    promise.then(res=>{
      toast.success('Login successful');
      setFlag(true);
      reset();
    })
    .catch(err=>{
      toast.error('Login failed');
      console.log(err);
      setFlag(false);
    });
  } 
   
  return (
    <div>
      <div className="flex justify-center items-center p-5">
        <form onSubmit={handleSubmit(onSubmit)} className='border-black border flex flex-col md:w-1/4 w-full bg-gray-50 rounded shadow-xl'>
          <div className="bg-slate-800 p-2 text-white text-center">User Login</div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className='text-sm'>E-mail: {errors.mail && <span className='text-sm text-red-500'>E-mail is required</span>}</div>
              <div><input type='email' {...register("mail", { required: true })} aria-invalid={errors.mail ? "true" : "false"}  className='border-black border p-1 w-full focus:outline outline-slate-500' placeholder='Lucifer@gmail.com'/></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className='text-sm'>Password: {errors.password && <span className='text-sm text-red-500'>Enter your password</span>}</div>
              <div><input type="password" {...register("password", { required: true })} className='border-black border p-1 focus:outline outline-slate-500 w-full' placeholder='******'/></div>
            </div>
            <input type="submit" className='border border-black p-1 mt-3 btn btn-outline'/>
          </div>
        </form>
      </div>
    </div>
  );
}
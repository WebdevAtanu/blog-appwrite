import {useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {account} from '../config/appwrite';
import {ID} from 'appwrite';
import { toast } from 'react-toastify';


export default function Signupform() {
  const [load,setLoad]=useState(false);
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
  const onSubmit = data => {
    setLoad(true);
    const promise=account.create(ID.unique(),data.mail,data.password,data.name);
    promise.then(res=>{
      toast.success('Signup complete');
      reset();
      setLoad(false);
    })
    .catch(err=>{
      toast.error('Signup failed');
      setLoad(false);
    })
    
  } 
  return (
      <div className="flex justify-center items-center p-5">
        <form onSubmit={handleSubmit(onSubmit)} className='border-black border flex flex-col md:w-1/2 w-full bg-gray-50 rounded drop-shadow-xl'>
          <div className="bg-slate-800 p-2 text-white">
            <h4 className='text-xl'>Create your account</h4>
            <p className='text-[0.6rem] mt-3'>By clicking “Sign up”, you agree to our terms of service and our privacy policy.</p>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className='text-sm'>Name: {errors.name && <span className='text-sm text-red-500'>Name is required</span>}</div>
              <div><input {...register("name",{ required: true })} className='border-black border p-1 focus:outline outline-slate-500 w-full' placeholder='Lucifer Morningstar'/></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className='text-sm'>E-mail: {errors.mail && <span className='text-sm text-red-500'>E-mail is required</span>}</div>
              <div><input type='email' {...register("mail", { required: true })} aria-invalid={errors.mail ? "true" : "false"}  className='border-black border p-1 focus:outline outline-slate-500 w-full' placeholder='Lucifer@gmail.com'/></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className='text-sm'>Password: {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}</div>
              <div><input type="password" {...register("password", { required: 'password is required',minLength: {
              value: 8,
              message: "Password must be at least 8 characters long"
            }, })} className='border-black border p-1 focus:outline outline-slate-500 w-full' placeholder='******'/></div>
              <p className="text-[0.6rem]">Must contain 8+ characters, including at least 1 letter and 1 number.</p>
            </div>
            {
              load?<input type="submit" className='p-1 mt-3 btn btn-outline' value='Please wait...' disabled/>:
              <input type="submit" className='border border-black p-1 mt-3 btn btn-outline' value='Sign up'/>
            }
          </div>
        </form>
      </div>
  );
}
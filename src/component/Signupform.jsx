import { useForm } from "react-hook-form";


export default function Signupform() {
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    reset();
  } 
   
  return (
    <div>
      <div className="flex justify-center items-center p-5">
        <form onSubmit={handleSubmit(onSubmit)} className='border-black border flex flex-col gap-4 md:w-1/4 w-full bg-gray-50 shadow rounded'>
          <div className="bg-slate-800 p-2 text-white text-center">User Signup</div>
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
              <div className='text-sm'>Password: {errors.password && <span className='text-sm text-red-500'>Password is required</span>}</div>
              <div><input type="password" {...register("password", { required: true })} className='border-black border p-1 focus:outline outline-slate-500 w-full' placeholder='******'/></div>
            </div>
            <input type="submit" className='border border-black p-1 mt-3 btn btn-outline'/>
          </div>
        </form>
      </div>
    </div>
  );
}
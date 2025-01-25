import {useContext,useState} from 'react';
import { useForm } from "react-hook-form";
import {account} from '../config/appwrite';
import { toast } from 'react-toastify';
import Context from '../context/Context';

export default function Loginform() {
  const {flag,setFlag}=useContext(Context);
  const [load,setLoad]=useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
    const onSubmit = data => {
        setLoad(true);
        const promise = account.createEmailPasswordSession(data.mail, data.password);
        promise.then(res => {
                setFlag(true);
                reset();
                toast.success('welcome')
            })
            .catch(err => {
                toast.error('login failed- invalid crendential');
                setFlag(false);
                setLoad(false);
            });
    }
   
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Login now!</h1>
          <p className="py-3">
            Enter your e-mail and password as login credentials.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow animate-scale">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email {errors.mail && <span className='text-sm text-red-500'> is required</span>}</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required {...register("mail", { required: true })}/>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password {errors.password && <span className='text-sm text-red-500'>is required</span>}</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required {...register("password", { required: true })}/>
            </div>
            <div className="form-control mt-6">
              {
              load?<button className="btn btn-primary" disabled>Please wait</button>:
              <button className="btn btn-primary">Login</button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
import {useState,useEffect} from 'react';
import { useForm } from "react-hook-form";
import {account,OAuthProvider} from '../config/appwrite';
import {ID} from 'appwrite';
import { toast } from 'react-toastify';


export default function Signupform() {
  const [load,setLoad]=useState(false);
  const { register, handleSubmit,reset,formState: { errors } } = useForm();
    const onSubmit = data => {
        setLoad(true);
        const promise = account.create(ID.unique(), data.mail, data.password, data.name);
        promise.then(res => {
                toast.success('Signup complete, you can login now');
                reset();
                setLoad(false);
            })
            .catch(err => {
                toast.error('Signup failed');
                setLoad(false);
            })
    }

  // github auth
    // const handleGoogleAuth = () => {
    //         account.createOAuth2Session(
    //             OAuthProvider.Github, // provider
    //             'https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/github/66ab07c80011a7742fc0', // redirect here on success
    //             'http://localhost:5173', // redirect here on failure
    //         );
    // }

  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="py-3">
            By clicking “Sign up”, you agree to our terms of service and privacy policy.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow animate-scale">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name {errors.name && <span className='text-sm text-red-500'> is required</span>}</span>
              </label>
              <input type="text" placeholder="name" className="input input-bordered" required {...register("name", { required: true })}/>
            </div>
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
              <p className="text-sm mt-1">Must contain 8+ characters, including at least 1 letter and 1 number.</p>
            </div>
            <div className="form-control mt-6">
              {
              load?<button className="btn btn-primary" disabled>Please wait</button>:
              <button className="btn btn-primary">Sign up</button>
              }
            </div>
          </form>
        {/* <p onClick={handleGoogleAuth}>signup with Github</p> */}
        </div>
      </div>
    </div>
  );
}
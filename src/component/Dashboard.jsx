import React,{useState,useRef,useContext,useEffect} from 'react';
import {db,account} from '../config/appwrite';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { Editor } from '@tinymce/tinymce-react';
import Context from '../context/Context';
import moment from 'moment';
import Avatar from './daisy/Avatar'

function Dashboard() {
    const {flag,setFlag,postcount,setPostcount}=useContext(Context);
    const[user,setUser]=useState({});
    const[flag1,setFlag1]=useState(false);
    const editorRef = useRef(null);
    const post = async(e) => {
        // toast.warning('Posting is under development');
        setFlag1(true);
        console.log(editorRef.current.getContent());
        try {
            const response = await db.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_POST_ID,
                'unique()',
                {
                    name:user.name,
                    post:String(editorRef.current.getContent()),
                    picture:'',
                    userid:user.$id
                }
            )
            await toast.success('Post Added');
            setFlag1(false);
            await setPostcount(postcount+1);
            console.log(response);
        } catch (error) {
            console.error(error);
            setFlag1(false);
        }
    }

    const logoutSession = async() => {
        try {
            const session = await account.deleteSession('current');
            console.log('delete session:', session);
            setFlag(false);
            toast.warning('User Logged out')
        } catch (error) {
            console.error('No active session:', error.message);
        }
    }

    const userDetails = async() => {
        try {
            const result = await account.get();
            setUser(result);
        } catch (error) {
            console.error('No user:', error.message);
        }
    }

    useEffect(() => {
        userDetails();
    }, [])
    
    return (
        <>
        <div className='grid md:grid-cols-4 gap-3'>
        <div className="flex md:justify-center md:col-span-1">
        <div className="p-5 flex md:flex-col justify-between md:items-center items-start w-full bg-gray-100">
        <div className="flex flex-col items-center">
            <Avatar image='user.jpg'/>
            <p className='mt-2'>{user.name}</p>
            <p className='text-xs'>{user.email}</p>
            <p className='text-xs'>{moment(user.$createdAt).format('Do MMMM,YYYY').toLowerCase()}</p>
        </div>
        <div className='bg-red-700 hover:bg-red-800 flex items-center gap-1 p-2 text-white rounded cursor-pointer' onClick={logoutSession}>
            <i className="bi bi-power text-xs"></i>
            <p className="text-xs">logout</p>
        </div>
        </div>
        </div>
        <div className="md:col-span-3 p-2">
            <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API}
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue="
            <h1>Post header</h1>
            <p>Write something awesome...</p>
            "
            init={{
            height: 500,
            menubar: false,
            plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
            />
            <div className="text-center mt-5">
            {
                flag1?<button className='p-2 mt-3 text-sm rounded bg-blue-800 hover:bg-blue-900 text-white px-3'>Publishing...</button>
                :<button onClick={post} className='p-2 mt-3 text-sm rounded bg-blue-800 hover:bg-blue-900 text-white px-3'>Publish</button>
            }
            </div>
        </div>
        </div>
            <Footer/>
        </>
	)
}

export default Dashboard

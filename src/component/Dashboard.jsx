import React,{useState,useRef,useContext,useEffect} from 'react';
import {db,account} from '../config/appwrite';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { Editor } from '@tinymce/tinymce-react';
import Context from '../context/Context';

function Dashboard() {
    const {flag,setFlag,postcount,setPostcount}=useContext(Context);
    const[user,setUser]=useState({});
    const editorRef = useRef(null);
    const post = async(e) => {
        // toast.warning('Posting is under development');
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
            await setPostcount(postcount+1);
            console.log(response);
        } catch (error) {
            console.error(error);
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
        <div>
        <div className="flex justify-between items-center px-5 mb-3">
        <div className="flex gap-1 item-center bg-gray-200 px-3 py-1 rounded">
            <i className="bi bi-person-hearts"></i>
            <h1>{user.name}</h1>
        </div>
        <div className='bg-red-700 hover:bg-red-800 flex flex-col items-center p-1 text-white rounded-xl cursor-pointer' onClick={logoutSession}>
            <i className="bi bi-power"></i>
            <p className="text-xs">Logout</p>
        </div>
        </div>

            <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API}
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue="
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
                <button onClick={post} className='border-2 border-black p-1 mt-3 text-sm rounded bg-green-800 hover:bg-green-900 text-white px-3'>Submit Post</button>
            </div>
            <Footer/>
        </div>
	)
}

export default Dashboard

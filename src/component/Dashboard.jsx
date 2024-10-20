import React,{useState,useRef,useContext,useEffect} from 'react';
import {db,account} from '../config/appwrite';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { Editor } from '@tinymce/tinymce-react';
import Context from '../context/Context';

function Dashboard() {
    const {flag,setFlag}=useContext(Context);
    const[user,setUser]=useState({});
    const editorRef = useRef(null);
    const post = async(e) => {
        toast.warning('Posting is under development');
        // console.log(editorRef.current.getContent());
        // try {
        //     const response = await db.createDocument(
        //         import.meta.env.VITE_DATABASE_ID,
        //         import.meta.env.VITE_POST_ID,
        //         'unique()',
        //         editorRef.current.getContent()
        //         
        //     )
        //     console.log(response);
        //     toast.success('Post Added');
        // } catch (error) {
        //     console.error(error);
        // }
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
            console.log('current user:', result);
            setUser(result);
            toast.success('Welcome ' + result.name);
        } catch (error) {
            console.error('No user:', error.message);
        }
    }

    useEffect(() => {
        userDetails();
    }, [])
    
    return (
        <div id='main'>
        <h1>{user.name}</h1>
            <div className='text-end mb-3'>
                <button onClick={logoutSession} className='btn btn-outline btn-error'>logout</button>
            </div>
            <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API}
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
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
                <button onClick={post} className='border border-black p-1 mt-3 btn btn-outline'>Submit Post</button>
            </div>
            <Footer/>
        </div>
	)
}

export default Dashboard

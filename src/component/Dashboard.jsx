import React,{useState,useRef,useContext,useEffect} from 'react';
import {db,account,Query} from '../config/appwrite';
import { toast } from 'react-toastify';
import Footer from './Footer';
import { Editor } from '@tinymce/tinymce-react';
import Context from '../context/Context';
import moment from 'moment';
import Avatar from './daisy/Avatar';

function Dashboard() {
    const {flag,setFlag,postcount,setPostcount}=useContext(Context);
    const[user,setUser]=useState({});
    const[flag1,setFlag1]=useState(false);
    const[flag2,setFlag2]=useState(false);
    const editorRef = useRef(null);
    const titleRef = useRef();
    const [data,setData]=useState([]);

// =========================user posts=====================
    const userPosts = async() => {
        setFlag2(true)
        try {
            const response = await db.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_POST_ID, [Query.equal('userid', user.$id)]
            );
            setData(response.documents);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Something went wrong! Server is not working');
        }
    }

// =========================posting document=====================
    const post = async(e) => {
        setFlag1(true);
        try {
            const response = await db.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_POST_ID,
                'unique()', {
                    name: user.name,
                    post: String(editorRef.current.getContent()),
                    picture: '',
                    userid: user.$id,
                    title: titleRef.current.value
                }
            )
            await toast.success('Post Added');
            setFlag1(false);
            await setPostcount(postcount + 1);
            console.log(response);
        } catch (error) {
            console.error(error);
            setFlag1(false);
        }
    }

// =========================user logout=====================
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

// =========================user details=====================
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
        <div className="flex md:col-span-1">
            <div className="p-5 flex md:flex-col md:justify-start md:items-center items-start w-full bg-gray-100">
                <ul className="menu bg-base-200 rounded-box w-56">
                    <li><a>
                        <div className="flex flex-col">
                            <Avatar image='user.jpg'/>
                                <p className='mt-2'>{user.name}</p>
                                <p className='text-xs'>{user.email}</p>
                                <p className='text-xs'>{moment(user.$createdAt).format('Do MMMM,YYYY').toLowerCase()}</p>
                            </div>
                        </a></li>
                        <li onClick={()=>setFlag2(false)} className={`${flag2==false?'bg-slate-800 rounded text-white':null}`}><a>Create post</a></li>
                        <li onClick={userPosts} className={`${flag2==true?'bg-slate-800 rounded text-white':null}`}><a>Your posts</a></li>
                        <li onClick={logoutSession} className='text-red-500'><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        {
            flag2?
            <div className="md:col-span-3 grid md:grid-cols-3 grid-cols-2 gap-2">
                {
                    data?.map((item,i)=>{
                        return(
                            <div className='flex flex-col justify-between border border-black rounded p-2' key={i}>
                                <div>
                                    <p className='text-sm'>ID: {item.$id}</p>
                                    <p className='text-sm'>Title: {item.title}</p>
                                    <p className='text-sm'>Created at: {moment(item.$createdAt).format('Do MMMM,YYYY').toLowerCase()}</p>
                                </div>
                                <div className="text-center mt-2">
                                    <button>Edit</button>
                                </div>
                            </div>
                            )
                    })
                }
            </div>
            :
            <div className="md:col-span-3 p-2">
            <input type="text" placeholder='Title of the post' ref={titleRef} className='border border-gray-500 p-1 w-full rounded mb-2'/>
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
            {
                flag1?<button className='p-2 mt-3 text-sm rounded bg-blue-800 hover:bg-blue-900 text-white px-3'>Publishing...</button>
                :<button onClick={post} className='p-2 mt-3 text-sm rounded bg-blue-800 hover:bg-blue-900 text-white px-3'>Publish</button>
            }
            </div>
        </div>
        }
        </div>
            <Footer/>
        </>
	)
}

export default Dashboard

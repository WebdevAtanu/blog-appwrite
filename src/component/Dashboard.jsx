import React,{useState,useRef,useContext,useEffect} from 'react';
import {db,account,Query,storage} from '../config/appwrite';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import Context from '../context/Context';
import moment from 'moment';
import Avatar from './daisy/Avatar';

function Dashboard() {
    const {setFlag,postcount,setPostcount}=useContext(Context);
    const[user,setUser]=useState({});
    const[flag1,setFlag1]=useState(false);
    const[flag2,setFlag2]=useState(false);
    const[flag3,setFlag3]=useState(false);
    const[title,setTitle]=useState('');
    const[image,setImage]=useState('');
    const editorRef = useRef(null);
    const imageRef = useRef();
    const [data,setData]=useState([]);
    const [nopost,setNopost]= useState('');
    const [content,setContent]=useState('');
    const [postDocument,setPostDocument]=useState();

// =========================get user posts=====================
    const userPosts = async() => {
        setFlag2(true)
        try {
            const response = await db.listDocuments(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_POST_ID, [Query.equal('userid', user.$id)]
            );
            if (response.documents.length == 0) {
                setTimeout(() => {
                    setNopost('No post found');
                }, 5000)
            } else {
                setData(response.documents);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Something went wrong! Server is not working');
        }
    }

// =========================posting document=====================
    const createPost = async(e) => {
        if (image && title) {
            setFlag1(true);
            try {
                const upload = await storage.createFile(
                    import.meta.env.VITE_BUCKET_ID,
                    'unique()',
                    image,
                );
                const response = await db.createDocument(
                    import.meta.env.VITE_DATABASE_ID,
                    import.meta.env.VITE_POST_ID,
                    'unique()', {
                        name: user.name,
                        post: String(editorRef.current.getContent()),
                        picture: upload.$id,
                        userid: user.$id,
                        title: title
                    }
                )
                await toast.success('Post Added');
                setFlag1(false);
                setContent('');
                setTitle('');
                setImage('');
                imageRef.current.value = '';
                await setPostcount(postcount + 1);
            } catch (error) {
                console.error(error);
                setFlag1(false);
            }
        } else {
            toast.warning('post title and cover image are required')
        }
    }

// =========================user logout=====================
    const logoutSession = async() => {
        try {
            const session = await account.deleteSession('current');
            setFlag(false);
            toast.warning('You are Logged out')
        } catch (error) {
            console.error('No active session:', error.message);
        }
    }

// =========================get user details=====================
    const userDetails = async() => {
        try {
            const result = await account.get();
            setUser(result);
        } catch (error) {
            console.error('No user:', error.message);
        }
    }

// =========================post editor=====================
    const handleEditor = (item) => {
        setFlag2(false);
        setFlag3(true);
        setTitle(item.title);
        setContent(item.post);
        setPostDocument(item);
    }

    const handleEditorChange = (content) => {
        setContent(content);
    };

// =========================update post=====================
    const updatePost = async(e) => {
        setFlag1(true);
        try {
            const response = await db.updateDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_POST_ID,
                postDocument.$id, {
                    title: title,
                    post: String(editorRef.current.getContent())
                }
            )
            await toast.success('Post Updated');
            setFlag1(false);
            await setPostcount(postcount + 1);
            setContent('');
            setTitle('');
            setFlag3(!flag3);
        } catch (error) {
            console.error(error);
            setFlag1(false);
        }
    }

// =========================delete post=====================
    const handleDelete = async(item, i) => {
        try {
            await db.deleteDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_POST_ID,
                item.$id
            )
            await storage.deleteFile(
                import.meta.env.VITE_BUCKET_ID,
                item.picture
            );
            await toast.success('Post Deleted');
            await setPostcount(postcount + 1);
            await userPosts();
        } catch (error) {
            console.error(error);
        }
    }

// ==============================================
    useEffect(() => {
        userDetails();
        scrollTo(0,0);
    }, [])
    
    return (
        <>
        <div className='grid md:grid-cols-4 gap-3'>
        {/* avatar box */}
            <div className="p-5 flex flex-col bg-gray-100 w-full md:h-screen">
                <div className='flex items-center justify-center'>
                    <div className="text-white flex flex-col bg-slate-800 items-center px-8 py-3 rounded">
                        <Avatar image='user.jpg'/>
                        <p className='mt-2'>{user.name}</p>
                        <p className='text-xs'>{user.email}</p>
                    </div>
                </div>
                <ul className="menu bg-base-200 rounded-box">
                    <li onClick={()=>setFlag2(false)} className={`${flag2==false?'bg-slate-800 rounded-lg text-white':null}`}><a><i className="bi bi-pen"></i> {flag3?'Update post':'Create post'}</a></li>
                    <li onClick={userPosts} className={`${flag2==true?'bg-slate-800 rounded-lg text-white':null}`}><a><i className="bi bi-files"></i> Your posts</a></li>
                    <li onClick={logoutSession} className='text-red-500'><a><i className="bi bi-box-arrow-left"></i>Logout</a></li>
                </ul>
            </div>
        {
            flag2?
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    data.length==0?
                        <div className='col-span-3 flex flex-col justify-center items-center gap-5'>
                        {
                           (nopost=='')?
                           <>
                           <p>looking for posts</p>
                        <span className="loading loading-bars loading-lg"></span>
                        </>
                           :
                           <p className='text-lg'>{nopost}</p>
                        }
                        </div>
                    :
                    data?.map((item,i)=>{
                        return(
                            <div className='h-fit flex flex-col justify-between border border-black rounded overflow-auto' key={i}>
                                <img src={storage.getFileView(import.meta.env.VITE_BUCKET_ID,item.picture)} alt="picture" className='w-full aspect-video'/>
                                <div className='p-3'>
                                    <p className='text-sm'><span className="font-bold">ID:</span> {item.$id}</p>
                                    <p className='text-sm'><span className="font-bold">Title:</span> {item.title}</p>
                                    <p className='text-sm'><span className="font-bold">Created at:</span> {moment(item.$createdAt).format('Do MMMM,YYYY, h:mm:ss a').toLowerCase()}</p>
                                    <p className='text-sm'><span className="font-bold">Updated at:</span> {moment(item.$updatedAt).format('Do MMMM,YYYY, h:mm:ss a').toLowerCase()}</p>
                                </div>
                                <div className="flex gap-3 p-2">
                                    <button onClick={()=>handleEditor(item)} className='w-full bg-green-600 hover:bg-green-700 p-1 text-white text-sm rounded'><i className="bi bi-pencil"></i></button>
                                    <button onClick={()=>handleDelete(item,i)} className='w-full bg-red-600 hover:bg-red-700 p-1 text-white text-sm rounded'><i className="bi bi-trash"></i></button>   
                                </div>
                            </div>
                            )
                    })
                }
            </div>
            :
            <div className="md:col-span-3 p-2">
            <label className="input input-bordered flex items-center gap-2 mb-3">
                Post title<input type="text" className="grow" value={title} onChange={e=>setTitle(e.target.value)} required/>
            </label>
            <p className="text-sm mb-1">Select cover image for your post</p>
            <input type="file" className="file-input file-input-bordered w-full mb-3" ref={imageRef} onChange={e=>setImage(e.target.files[0])} required/>
            <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API}
            onInit={(_evt, editor) => editorRef.current = editor}
            value={content}
            onEditorChange={handleEditorChange}
            init={{
            height: 400,
            menubar: true,
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
            flag3?<>
            {
                flag1?<button className='p-2 mt-3 text-sm rounded bg-blue-800 hover:bg-blue-900 text-white px-3'>Publishing...</button>
                :<button onClick={updatePost} className='p-2 mt-3 text-sm rounded bg-blue-800 hover:bg-blue-900 text-white px-3'>Update</button>
            }
            </>:
            <>
            {
                flag1?<button className='p-2 mt-3 text-sm rounded bg-blue-800 hover:bg-blue-900 text-white px-3'>Publishing...</button>
                :<button onClick={createPost} className='p-2 mt-3 text-sm rounded bg-blue-800 hover:bg-blue-900 text-white px-3'>Publish</button>
            }
            </>
        }
            </div>
        </div>
        }
        </div>
        </>
	)
}

export default Dashboard

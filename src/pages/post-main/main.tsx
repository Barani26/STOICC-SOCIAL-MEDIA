import {getDocs,collection} from 'firebase/firestore'
import {db} from '../../config/firebase'
import { useEffect, useState } from 'react';

import { Post } from './post';
export interface Post{
    id:string,
    userid:string,
    description:string,
    title:string,
    username:string
}

export const Main=()=>{
    const [postslist,setpostslist]=useState<Post[] | null>(null)
    const postRef=collection(db,"Posts");
    
    const getposts=async()=>{
        const data=await getDocs(postRef)
        setpostslist(data.docs.map((doc)=>({
            ...doc.data(),id:doc.id
        }))as Post[])
    }
    useEffect(()=>{
        getposts()
    },[])
    return <div>
        {postslist?.map((post)=>(
<Post post={post}/>
        ))}
    </div>
}
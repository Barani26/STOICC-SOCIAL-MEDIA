import { Post as Ipost } from "./main"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp,faThumbsDown} from '@fortawesome/free-regular-svg-icons'
import { addDoc,deleteDoc, collection,getDocs,query, where, doc } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
 
interface Props{
    post:Ipost
}
interface Like{
    userId:string
    likeId:string
}
export const Post=(props:Props)=>{
const {post}=props

const likesRef=collection(db,"Likes");

const[user]=useAuthState(auth);

const [likes,setlikes]=useState<Like[] |null>(null)

const likesdoc=query(likesRef,where("postId","==",post.id))
const getlikes= async()=>{
    const data=await getDocs(likesdoc)
    setlikes(data.docs.map((doc)=>({
        userId:doc.data().userId,likeId:doc.id
    })))
  
}
useEffect(()=>{
    getlikes()
},[])
const hasLiked=likes?.find((like)=>
    like.userId===user?.uid
)

const addlike=async()=>{
    try{
   const newdoc=await addDoc(likesRef,{
    userId:user?.uid,
    postId:post.id
   })
   if(user){
   setlikes((prev)=>
    prev ?[...prev,{userId:user?.uid,likeId:newdoc.id}]:[{userId:user?.uid,likeId:newdoc.id}])
};
    }catch(error){
console.log(error)
    }
}

const deletelike=async()=>{
    
    try{
        const deleteliked=query(likesRef,where
            ("postId","==",post.id),
            where("userId","==",user?.uid)
        
    )
    const liketodeletedata=await getDocs(deleteliked)
    const likeid=liketodeletedata.docs[0].id
    const liketodel=doc(db,"Likes",likeid)
   await deleteDoc(liketodel)
  if(user){
   setlikes((prev)=>
    prev && prev.filter((like)=>like.likeId!==likeid))
};
    }catch(error){
console.log(error)
    } 
}

    return(

    <div className="postcon">
        
        <div className="Post">
        <div>
            <h1>{post.title}</h1>
        </div>
        <div>
            <p>{post.description}</p>
        </div>
        <div>
            <p className="postUserName">{post.username}</p>
        <button onClick={hasLiked?deletelike:addlike}>{hasLiked?<FontAwesomeIcon icon={faThumbsDown}/>:<FontAwesomeIcon icon={faThumbsUp}/>}</button>
        {likes && <p>Likes:{likes?.length}</p>}
        </div>
        </div>
    </div>

)
}
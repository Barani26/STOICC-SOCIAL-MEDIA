import { Form } from "react-router-dom"
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import  {addDoc,collection} from 'firebase/firestore'
import {db,auth} from "../../config/firebase"
import { title } from "process"
import {Await,useNavigate} from 'react-router-dom'

import { useAuthState } from "react-firebase-hooks/auth"
interface CreateFormData{
    title:string,
    description:string
}


export const CreateForm=()=>{
    const [user] = useAuthState(auth);
    const schema=yup.object().shape({
        title:yup.string().required("Title is needed"),
        description:yup.string().required("Description is needed")
    })
    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver: yupResolver(schema) 
    })
    
    const postRef=collection(db,"Posts");

    const nav=useNavigate()
    const onUpload=async(data:CreateFormData)=>{
       await addDoc(postRef,{
        ...data,
        username:user?.displayName,
        id:user?.uid

       });
       nav("/")
    }
    return(
        <form className="Form" onSubmit={handleSubmit(onUpload) } >
        <h2>POST SOMETHING AWESOME</h2>
        <input placeholder="Title" {...register("title")} />
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder="Description" {...register("description")} />
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input className="formButton"type="submit" />
    </form>
    
)
    
}
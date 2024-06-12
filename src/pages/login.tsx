import {auth,provider} from "../config/firebase"
import {signInWithPopup} from "firebase/auth"
import {Await,useNavigate} from 'react-router-dom'
import ParticlesComponent from "../components/particles"
export const Login=()=>{

    const nav=useNavigate()

const signInWithGoogle=async()=>{
    const result=await signInWithPopup(auth,provider)
   
    nav("/")
    }
    return <div  className="Logincon">
        <ParticlesComponent id="particles"/>

        <div className="Loginbox">
        <p>Sign in with Google to Continue</p>
        <button onClick={signInWithGoogle}>Sign In With GOOGLE</button>
        </div>
    </div>
}

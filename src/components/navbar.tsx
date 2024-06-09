import { Link } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { signOut } from 'firebase/auth';
import { CreatePost } from '../pages/create-post/createPost';
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {
    const [user] = useAuthState(auth);
    const use=useNavigate()
    const logout = async () => {
        await signOut(auth)
        use("/")

    }
    return <div className='Navbar'>
        <h1>STOICC</h1>
        <div className='Navbarlinks'>
        <Link to="/" className='Navbarlink'>HOME</Link>
        {!user ?( <Link to="/Login" className='Navbarlink'>LOGIN</Link>)
        :(<Link to="/CreatePost" className='Navbarlink'>UPLOAD</Link>)}
            {user && (
                <>
                    <p className='Navbarlink'>{user?.displayName}</p>
                    <img className='Navbarlink'src={user?.photoURL || ""} width='30px' height="30px" />
                    <button onClick={logout}>Log Out</button>
                </>
            )
        }
        
        </div>
        
    
    </div>
}
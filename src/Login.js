import {useNavigate} from 'react-router-dom';

export default function Login(){
    const navigate = useNavigate();

    return(
        <>
        
        <form className='flex flex-col'>

        <label for='user'>Username: </label>
        <input type='text' id='user' placeholder="username" />
        <label for='password'>Password: </label>
        <input type='password' id='password' />
        </form>

        <div className='flex flex-col'>
        <button>Login</button>
        <button onClick={()=>{
            navigate('/register')
        }}>Register</button>
        </div>
        </>
    )
}
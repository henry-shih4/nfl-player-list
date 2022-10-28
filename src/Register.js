export default function Register(){
    return(
        <>
        
        <form className='flex flex-col'>
        <label for='user'>Username: </label>
        <input type='text' id='user' placeholder="username" />

        <label for='password'>Password: </label>
        <input type='password' id='password' />

        <label for='email'>Email: </label>
        <input type='email' id='email' placeholder="henry@gmail.com" />
        </form>

        <button>Register</button>
        </>
    )
}
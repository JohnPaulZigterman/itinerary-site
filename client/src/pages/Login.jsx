// log in

export default function Login() {
    return (
        <div className='login-signup-container'>

            <div className='login-container'>

                <h2>Login</h2>
                <input type="email" id="email-login" placeholder="email@email.com"/>
                <input type="password" id="password-login" placeholder="password"/>

                <button class="button" id="login-btn">Login</button>

            </div>


            <div className='signup-container'>

                <h2>New Users</h2>

                <input type="text" id="first-name-signup" placeholder="First Name (required)"/>
                <input type="text" id="last-name-signup" placeholder="Last Name (required)"/>
                <input type="email" id="email-signup" placeholder="email@email.com (required)"/>
                <input type="password" id="password-signup" placeholder="password"/>
    
                <button class="button" id="signup-btn">Sign Up</button>
                
            </div>
            
        </div>
    );
}
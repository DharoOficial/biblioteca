import './style.css';
import { jwtDecode } from 'jwt-decode';

function Header() {

    const token = localStorage.getItem('jwtToken');
    var decodedToken;
    if(token){
        decodedToken = jwtDecode(token);
    }

    return (
        <div className="header">
            <div className="containerheader">
                <a href='/' className='linkLogin'>Biblioteca  API</a>
                {!token ? (
                <a href='/login' className='linkLogin'>Login</a>)
                :( <a href='/dashboard' className='profil_name linkLogin'>
                    {decodedToken.UserName}
                </a>
                )
                }
            </div>
        </div>
    )
}

export default Header;
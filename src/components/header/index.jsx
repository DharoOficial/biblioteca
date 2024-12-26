import './style.css';

function Header() {
    return (
        <div className="header">
            <div className="containerheader">
                <h1>Biblioteca  API</h1>
                <a href='/login' className='linkLogin'>Login</a>
            </div>
        </div>
    )
}

export default Header;
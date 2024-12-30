import './style.css'
import Header from '../../components/header';
import Footer from '../../components/footer';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dados enviados:", formData);
        // Aqui você pode adicionar lógica de autenticação
        try {
            const response = await fetch("https://localhost:7180/Usuario/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => {
                if (!response.ok) {
                  throw new Error("Erro na requisição");  // Lidar com status de erro
                }
                return response.json();  // Transformar a resposta em JSON
              })
              .then((data) => {
                const token = data.token;  // A resposta será o token gerado, já que o backend retorna como string
                console.log("Token JWT recebido:", token);
            
                // Armazenar o token no LocalStorage
                localStorage.setItem("jwtToken", token);
                navigate('/dashboard')
              })
        } catch (err) {
            setError("Login falhou. Verifique suas credenciais.");
            console.error(err);
            alert(error);
        }
    };
    return (
        <>
            <Header />
            <div className="containerlogin">
                <h1 className="title">Login</h1>
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="email" className="label">
                        Usuário:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Digite seu usuário"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input"
                        required
                    />

                    <label htmlFor="password" className="label">
                        Senha:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Digite sua senha"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="input"
                        required
                    />

                    <button type="submit" className="button">
                        Entrar
                    </button>
                </form>
                <div className="register-link">
                    Não tem uma conta? <a href="/register" className="link">Cadastre-se</a>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;
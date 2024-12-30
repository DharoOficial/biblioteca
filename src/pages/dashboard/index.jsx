import './style.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";




function Dashboard() {
    
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(false);

    function CreateBook (){
        navigate('./createBook')
    }
        
    const chargeBooks = async () => {
        try {
            const response = await fetch("https://localhost:7180/Livro", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const data = await response.json();
            setLivros(data); // Atualiza os livros no estado
            console.log(data);
        } catch (err) {
            console.error("Erro ao buscar livros:", err);
            setError("Falha ao buscar livros. Tente novamente.");
        }
    };

    // useEffect para carregar livros ao montar o componente
    useEffect(() => {
        chargeBooks();
    }, []);

    return (
        <>
            <Header />
            <div className="livros-container">
                {loading && <p>Carregando...</p>}
                {error && <p className="error">{error}</p>}

                <div className="cards-container">
                    {livros.map((livro) => (
                        <div className="card" key={livro.id}>
                            <h3 className="card-title">{livro.nomeLivro}</h3>
                            <p className="card-description">
                                {livro.descLivro ? livro.descLivro : "Descrição não disponível"}
                            </p>
                            <p className="card-pages">Páginas: {livro.numeroPagina}</p>
                            <p className="card-author">
                                Autor ID: {livro.idAutor ? livro.idAutor : "Não especificado"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="livros-container">

            <button onClick={CreateBook} className='buttonCreateBook'>Cadastrar Livro</button>
            </div>
            <Footer />
        </>
    );
}
export default Dashboard
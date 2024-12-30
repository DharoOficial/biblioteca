import './style.css';
import React, { useState } from "react";
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useNavigate } from "react-router-dom";

function CreateBook() {
    
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        nomeLivro: "",
        descLivro: "",
        numeroPagina: 0,
        idAutor: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData));
        // Aqui você pode enviar `formData` para sua API usando fetch/axios.

        try {
            const response = await fetch("https://localhost:7180/Livro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify(formData),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na requisição");  // Lidar com status de erro
                }
                alert("Livro cadastrado com sucesso");
                setFormData({
                    nomeLivro: "",
                    descLivro: "",
                    numeroPagina: 0,
                    idAutor: "",
                  });
                return response.json();  // Transformar a resposta em JSON

            })
        } catch (err) {
            setError("Falha no cadastro do livro");
            console.error(err);
            alert(error);
        }


    };

    return (
        <>
            <Header />
            <form className="livro-form" onSubmit={handleSubmit}>
                <h2 className="livro-form-title">Cadastrar Livro</h2>

                <div className="livro-form-group">
                    <label htmlFor="nomeLivro" className="livro-form-label">Nome do Livro:</label>
                    <input
                        type="text"
                        id="nomeLivro"
                        name="nomeLivro"
                        className="livro-form-input"
                        value={formData.nomeLivro}
                        onChange={handleChange}
                        placeholder="Digite o nome do livro"
                        required
                    />
                </div>

                <div className="livro-form-group">
                    <label htmlFor="descLivro" className="livro-form-label">Descrição:</label>
                    <textarea
                        id="descLivro"
                        name="descLivro"
                        className="livro-form-textarea"
                        value={formData.descLivro}
                        onChange={handleChange}
                        placeholder="Digite a descrição do livro"
                        rows="4"
                    />
                </div>

                <div className="livro-form-group">
                    <label htmlFor="numeroPagina" className="livro-form-label">Número de Páginas:</label>
                    <input
                        type="number"
                        id="numeroPagina"
                        name="numeroPagina"
                        className="livro-form-input"
                        value={formData.numeroPagina}
                        onChange={handleChange}
                        placeholder="Digite o número de páginas"
                        required
                    />
                </div>

                <div className="livro-form-group">
                    <label htmlFor="idAutor" className="livro-form-label">ID do Autor:</label>
                    <input
                        type="text"
                        id="idAutor"
                        name="idAutor"
                        className="livro-form-input"
                        value={formData.idAutor}
                        onChange={handleChange}
                        placeholder="Digite o ID do autor"
                        required
                    />
                </div>

                <button type="submit" className="livro-form-button">Enviar</button>
            </form>
            <Footer />
        </>
    );
}

export default CreateBook;
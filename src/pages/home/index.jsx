import './style.css';
import Header from '../../components/header';
import Footer from '../../components/footer';

function Home() {
    return (
        <>
            <Header />
            <div className="container">
                <section className='sobrenosmaior'>
                    <img className='imagemsobrenos' src="https://img.elo7.com.br/product/zoom/4A29F43/imagem-alta-resolucao-para-quadro-ceu-01-quadro.jpg" alt="porDoSol" />
                    <div className="aboutUs">
                        <h1>Sobre Nós</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus beatae, laboriosam illum iste ex accusamus ratione veritatis. Ab aliquid ducimus, modi ex iste magni iusto explicabo eum voluptatibus voluptate consequatur.</p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
export default Home; 
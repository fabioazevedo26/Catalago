import React from 'react'
import styles from './Home.module.css'
import { RiSearch2Line } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoStorefront } from "react-icons/io5";
import { GiClothes } from "react-icons/gi";
import { MdWidgets } from "react-icons/md";
import { FaBus } from "react-icons/fa6";
import { PiBooksFill } from "react-icons/pi";
import { BiCoffeeTogo } from "react-icons/bi";
import { BsAirplane } from "react-icons/bs";
import Card from '../components/Card';
import { IoMdAdd } from "react-icons/io";

import { useNavigate } from 'react-router-dom';
import useFetchFirebase from '../hooks/useFetchFirebase';
import Loading from '../components/Loading';


export default function Home() {

    const { data, loading, error } = useFetchFirebase('Produtos')
    const navigate = useNavigate()
    const handleCreateNewProduct = () => {
        navigate('/control-panel')
    }

    return (
        <main className={styles.main}>
            <div className={styles.texts}>
                <h1>Grandes Produtos.</h1>
                <h1>Ainda muito mais baratos.</h1>
                <p>Produtos aleatorios anunciados por pessoas aleatorias.</p>
            </div>
            <form className={styles.searchField}>
                <input type="text" placeholder='Roupas, moveis e muito mais' />
                <button type='submit'><RiSearch2Line /></button>
            </form>
            {loading ? (
                <div className={styles.loadingAnimation}><Loading /></div>
            ) : (
                <div className={styles.cardContainer}>
                    {data && data.slice(0, 10).map((prod) => ( // Limita para os primeiros 10 produtos
                        <div key={prod.id} className={styles.cardProducts}>
                            <Card
                                product={prod}
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.pros}>
                <div className={styles.prosDetail}>
                    <span><FaShippingFast /></span>
                    <div className={styles.prosContainer}>
                        <strong>Entrega Rapida</strong>
                        <p>Em menos de 48 horas</p>
                    </div>
                </div>
                <div className={styles.divide}></div>
                <div className={styles.prosDetail}>
                    <span><BsFillPersonCheckFill /></span>
                    <div className={styles.prosContainer}>
                        <strong>Segurança</strong>
                        <p>Compras seguras</p>
                    </div>
                </div>
                <div className={styles.divide}></div>
                <div className={styles.prosDetail}>
                    <span> <IoStorefront /></span>
                    <div className={styles.prosContainer}>
                        <strong>183,499 Lojas</strong>
                        <p>Produção em grande quantidade</p>
                    </div>
                </div>


            </div>
            <div className={styles.explore}>
                <h2>Explore nossas categorias</h2>
                <button>Ver Todas</button>
            </div>
            <ul className={styles.categories}>
                <li className={styles.categoriesDetails}>
                    <span><GiClothes /></span>
                    <div className={styles.prosContainer}>
                        <strong>Fashion</strong>
                        <p>837 itens</p>
                    </div>
                </li>
                <li className={styles.categoriesDetails}>
                    <span><MdWidgets /></span>
                    <div className={styles.prosContainer}>
                        <strong>Diversos</strong>
                        <p>837 itens</p>
                    </div>
                </li>
                <li className={styles.categoriesDetails}>
                    <span><FaBus /></span>
                    <div className={styles.prosContainer}>
                        <strong>Transporte</strong>
                        <p>837 itens</p>
                    </div>
                </li>
                <li className={styles.categoriesDetails}>
                    <span><PiBooksFill /></span>
                    <div className={styles.prosContainer}>
                        <strong>Escritorio</strong>
                        <p>837 itens</p>
                    </div>
                </li>
                <li className={styles.categoriesDetails}>
                    <span><BiCoffeeTogo /></span>
                    <div className={styles.prosContainer}>
                        <strong>Comida</strong>
                        <p>837 itens</p>
                    </div>
                </li>
                <li className={styles.categoriesDetails}>
                    <span>< BsAirplane /></span>
                    <div className={styles.prosContainer}>
                        <strong>Viagens</strong>
                        <p>837 itens</p>
                    </div>
                </li>
            </ul>
            <h2 className={styles.aga2}>Conheça nossos produtos diversos</h2>
            {loading ? (
                <div className={styles.loadingAnimation}><Loading /></div>
            ) : (
                <div className={styles.productsContainer}>
                    <button onClick={handleCreateNewProduct} className={styles.newProd}>
                        <IoMdAdd />
                    </button>
                    {data.filter(prod => prod.category === 'diverse').slice(0, 5).map((product) => (
                        <div key={product.id} className={styles.product}>
                            <Card
                                product={product}
                            />
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}

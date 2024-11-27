import React from 'react'
import logo from '../assets/main-icon.png'
import styles from './Footer.module.css'
import { IoMailOutline } from "react-icons/io5";
import { GoGlobe } from "react-icons/go";
import { LuPhone } from "react-icons/lu";
import { MdAirplay } from "react-icons/md";
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.contact}>
                <div className={styles.logo}>
                    <img src={logo} alt="logo" />
                    <p>Shop</p>
                </div>
                <p className={styles.logoText}>Transformamos seu imperio de negócios hoje usando as ultimas tecnologias.</p>
                <div className={styles.social}>
                    <span><IoMailOutline /></span>
                    <span><GoGlobe /></span>
                    <span><LuPhone /></span>
                    <span><MdAirplay /></span>
                </div>
            </div>
            <div className={styles.links}> 
                <strong>Produtos</strong>
                <ul>
                    <li>Computadores</li>
                    <li>Jaquetas</li>
                    <li>Cozinha</li>
                    <li>Ferramentas</li>
                    <li>Banho</li>
                </ul>
            </div>
            <div className={styles.links}>
            <strong>Ajuda</strong>
                <ul>
                    <li>Suporte</li>
                    <li>Ajuda</li>
                    <li>Como usar</li>
                    <li>Blog e dicas</li>
                    <li>Sobre nós</li>
                </ul>
            </div>
            <div className={styles.links}>
            <strong>Empresa</strong>
                <ul>
                    <li>Politica de privacidade</li>
                    <li>Termos e serviços</li>
                    <li>Investimentos</li>
                    <li>Afiliar-se</li>
                    <li>Nossas estartisticas</li>
                    <li>Api</li>
                </ul>
            </div>
        </footer>
    )
}

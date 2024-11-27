import React, { useEffect } from 'react'
import styles from './LoginPage.module.css'
import { Link } from 'react-router-dom'
import googleIcon from '../assets/google-icon.png'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function LoginPage() {
    const {user, login, logout, loading} = useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        if (user != null && !loading){
            navigate('/')
        }
    }, [user])
    const handleSubmit = async (e)=>{
        e.preventDefault()
     
        await login()
        
    }
    return (
        <div onSubmit={handleSubmit} className={styles.loginPage}>
            <div className={styles.formContainer}>
                <h1>Faça Login</h1>
                <p>O sistema de login com email e senha esta desabilitado porque o programador é preguiçoso. Faça login com o google. O site usa Firebase pra autenticação, então suas credenciais estao seguras</p>
                <form className={styles.form}>
                    <label><input type="text" disabled placeholder='Email' /></label>
                    <label><input type="password" disabled placeholder='Senha' /></label>
                    <label className={styles.link}><Link>Esqueceu sua senha?</Link></label>
                    <label className={styles.buttonEnter}><button disabled>Entrar</button></label>
                    <label className={styles.ou}><span>ou</span></label>
                    <label className={styles.loginGoogle}>
                        <button type='submit'>
                            <img src={googleIcon} alt="google" />
                            Login com o Google
                        </button>

                    </label>
                </form>
            </div>
        </div>
    )
}

import React from 'react'
import styles from './Done.module.css'
import done from '../assets/done.svg'
import { useNavigate } from 'react-router-dom'

export default function Preview() {
    const navigate = useNavigate()
    const handleRedirectPanel = ()=>{
        navigate('/control-panel')
    }
    const handleRedirectHome = ()=>{
        navigate('/')
    }
    return (
        <div className={styles.mainContainer} >
            <div className={styles.content}>
                <div className={styles.container}>
                    <img src={done} alt="done" />
                    <h1>Produto cadastrado!!</h1>
                </div>
                <div className={styles.btns}>
                    <button onClick={handleRedirectPanel}>Voltar</button>
                    <button onClick={handleRedirectHome}>Pagina inicial</button>
                </div>
            </div>

        </div>
    )
}

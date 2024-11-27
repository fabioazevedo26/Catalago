import React, { useEffect } from 'react'
import styles from './ControlPanel.module.css'
import { db } from '../firebase/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import Product from './Product'
import { useAuth } from '../context/AuthContext'
export default function ControlPanel() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [imgURL, setImgURL] = useState('');
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const {user} = useAuth()

    useEffect(()=>{
        if (user === null){
            navigate('/login')
        }
    },[user])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await addDoc(collection(db, 'Produtos'), {
                name,
                price,
                category,
                imgURL,
                description,
            })
            setName('')
            setPrice(0)
            setCategory('')
            setDescription('')
            setImgURL('')
            navigate('/control-panel/done')
            setLoading(false)
        }
        catch (error) {
            console.error('erro ao adicionar codumento', error)
        }
    }
    return (
        <div className={styles.mainContainer}>

            <div className={styles.formContainer}>
                {loading ? (<div className={styles.loadingAnimation}><Loading /></div>) :
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <h1>Cadastrar produtos</h1>
                        <div className={styles.fields}>
                            <div className={styles.fieldOne}>
                                <label >
                                    <span>Nome do produto *</span>
                                    <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder='Digite o nome do seu produto' />
                                </label>
                                <label >
                                    <span>Preço *</span>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)} required type="number" />
                                </label>
                                <label >
                                    <span>Categoria *</span>
                                    <select required value={category} onChange={(e) => setCategory(e.target.value)} >
                                        <option value="">Selecione</option>
                                        <option value="eletronics">Eletronicos</option>
                                        <option value="clothes">Roupas</option>
                                        <option value="diverse">Variados</option>
                                        <option value="furniture">Moveis</option>
                                    </select>
                                </label>
                            </div>
                            <div className={styles.fieldTwo}>
                                <label>
                                    <span>Imagem *</span>
                                    <input required value={imgURL} onChange={(e) => setImgURL(e.target.value)} type="url" placeholder='digite a url da imagem do seu produto' />
                                </label>
                                <label>
                                    <span>Descrição *</span>
                                    <textarea required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </label>
                            </div>
                        </div>
                        <button type='submit'>Cadastrar</button>
                    </form>
                }
            </div>
        </div>
    )
}

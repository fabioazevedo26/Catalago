import React, { useState } from 'react'
import example from '../assets/example.jpg'
import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom'
export default function Card({ product }) {
    const [imageURL] = useState(product.imgURL)
    const [prodTitle] = useState(product.name)
    const [prodPrice] = useState(product.price)
    const [prodCategory] = useState(product.category)
    const navigate = useNavigate()
    const handleProductPage = ()=>{
        navigate(`/product/${product.id}`)
    }
    return (
        <div onClick={()=>handleProductPage(product.id)} className={styles.cardContainer}>

            <div className={styles.imageContainer}>
                <img src={imageURL} alt="imagem do produto" />
            </div>

            <div className={styles.textContainer}>
                {product && (
                    <>
                        <div className={styles.nameAndCategory}>
                            <strong className={styles.title}>{prodTitle.length > 8 ? prodTitle.slice(0, 8) + '...' : prodTitle}</strong>
                            <p className={styles.category}>{prodCategory}</p>
                        </div>
                        <p className={styles.price}>
                            R$ {parseFloat(prodPrice).toFixed(2)}
                        </p>
                    </>
                )}


            </div>

        </div>
    )
}

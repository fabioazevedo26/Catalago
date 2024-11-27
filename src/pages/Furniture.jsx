import React from 'react'
import Card from '../components/Card'
import styles from './Furniture.module.css'
import useFetchFirebase from '../hooks/useFetchFirebase'
import Loading from '../components/Loading'
export default function Furniture() {
  const { data, loading, error } = useFetchFirebase('Produtos')
  return (
    <main className={styles.main}>
      <h1>Tudo em Moveis</h1>
      {loading ? (<div className={styles.loadingAnimation}><Loading /></div>) :
        <div className={styles.productsContainer}>
          {data.filter((prod) => prod.category == 'furniture').map((product) => (
            <div key={product.id} className={styles.product}><Card product={product}/></div>
          ))}
        </div>
      }

    </main>
  )
}
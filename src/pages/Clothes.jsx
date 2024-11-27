import React from 'react'
import Card from '../components/Card'
import styles from './Clothes.module.css'
import useFetchFirebase from '../hooks/useFetchFirebase'
import Loading from '../components/Loading'
export default function Clothes() {
  const { data, loading, error } = useFetchFirebase('Produtos')
  return (
    <main className={styles.main}>
      <h1>Tudo em Roupas</h1>
      {loading ? (<div className={styles.loadingAnimation}><Loading /></div>) :
        <div className={styles.productsContainer}>
          {data.filter((prod) => prod.category == 'clothes').map((product) => (
            <div key={product.id} className={styles.product}><Card product={product}/></div>
          ))}
        </div>
      }

    </main>
  )
}

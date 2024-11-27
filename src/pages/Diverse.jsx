import React from 'react'
import Card from '../components/Card'
import styles from './Diverse.module.css'
import useFetchFirebase from '../hooks/useFetchFirebase'
import Loading from '../components/Loading'
export default function Diverse() {
  const { data, loading, error } = useFetchFirebase('Produtos')

  return (
    <main className={styles.main}>
      <h1>Produtos Diversos</h1>

      {
        loading ? (<div className={styles.loadingAnimation}><Loading /></div>) :
          <div className={styles.productsContainer}>
            {data.filter((prod) => prod.category == 'diverse').map((product) => (
              <div key={product.id} className={styles.product}><Card product={product}/></div>
            ))}
          </div>
      }


    </main>
  )
}

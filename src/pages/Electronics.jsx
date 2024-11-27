import React from 'react'
import example from '../assets/example.jpg'
import styles from './Electronics.module.css'
import Card from '../components/Card'
import useFetchFirebase from '../hooks/useFetchFirebase'
import Loading from '../components/Loading'
export default function Electronics() {
  const { data, loading, error } = useFetchFirebase('Produtos')
  return (
    <main className={styles.main}>
      <h1>Tudo em Eletronicos</h1>
      {loading ? (<div className={styles.loadingAnimation}><Loading /></div>) :
        <div className={styles.productsContainer}>
          {data.filter((prod) => prod.category == 'eletronics').map((product) => (
            <div key={product.id} className={styles.product}><Card product={product}/></div>
          ))}
        </div>
      }

    </main>
  )
}

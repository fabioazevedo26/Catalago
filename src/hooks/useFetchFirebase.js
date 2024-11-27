import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const useFetchFirebase = (Produtos, productId = null) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let items;
                if (productId){
                    const docRef = doc(db, Produtos, productId)
                    const docSnapShot = await getDoc(docRef)
                    if (docSnapShot.exists()){
                        items = [{id: docSnapShot.id, ...docSnapShot.data()}]
                    } else {
                        setError('Produto nao encontrado')
                        items = []
                    }
                } else {
                    const querySnapshot = await getDocs(collection(db, Produtos));
                    items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                }

                
                
                setData(items)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [Produtos, productId])
    return {data, loading, error}
    
}

export default useFetchFirebase
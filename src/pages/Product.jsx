import React, { useEffect, useState } from 'react';
import styles from './Product.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchFirebase from '../hooks/useFetchFirebase';
import { db } from '../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import Loading from '../components/Loading';
import { useAuth } from '../context/AuthContext';
import google from '../assets/google-icon.png';

export default function Product() {
  const { id } = useParams();
  const { data, loading } = useFetchFirebase('Produtos', id);
  const { user } = useAuth();
  const [textArea, setTextArea] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const { data: commentsData } = useFetchFirebase(`Produtos/${id}/comments`);

  useEffect(() => {
    if (commentsData) {
      setCommentsList(commentsData);
    }
  }, [commentsData]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user === null) {
      navigate('/login');
      return;
    }
    if (textArea.length === 0) {
      alert("Por favor, adicione um comentário.");
      return;
    }
    try {
      const newComment = {
        userId: user.uid,
        userName: user.displayName || "Usuário Anônimo",
        imageURL: user.photoURL || google,
        content: textArea,
        timestamp: new Date(),
      };
      await addDoc(collection(db, `Produtos/${id}/comments`), newComment);
      setCommentsList(prevComments => [...prevComments, newComment]);
      setTextArea('');
    } catch (error) {
      console.log('erro ao enviar', error);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loadingAnimation}><Loading /></div>
      ) : data?.length === 0 ? (
        <p>O produto foi removido ou ocorreu algum outro erro</p>
      ) : (
        data?.map((produto) => (
          <React.Fragment key={produto.id}>
            <div className={styles.contentContainer}>
              <div className={styles.image}>
                <img src={produto.imgURL} alt="imagem do produto" />
              </div>
              <div className={styles.info}>
                <div className={styles.texts}>
                  <h1>{produto.name}</h1>
                  <p>R$ {produto.price}</p>
                </div>
                <div className={styles.btn}>
                  <button>Adicionar ao carrinho</button>
                </div>
                <div className={styles.description}>
                  {produto.description}
                </div>
              </div>
            </div>
            
            <div className={styles.commentsContainer}>
              <div className={styles.addComment}>
              <h3>Comentários</h3>
                <form onSubmit={handleSubmit} className={styles.formComment}>
                  <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)} placeholder='Adicionar um comentario' />
                    <div className={styles.submitBtn}>
                      <button type='submit'>
                        {user ? ('Comentar') : ('Fazer login')}
                      </button>
                    </div>
                </form>
              </div>
              <div className={styles.comments}>
                {commentsList.length === 0 ? (
                  <div className={styles.noComments}>
                    <span>Nao ha comentarios</span>
                  </div>
                ) : (
                  commentsList
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .map((comment) => (
                    <section key={comment.id}>
                      <img src={comment.imageURL} alt="profile" />
                      <div className={styles.profile}>
                        <span>{comment.userName}</span>
                        <p>{comment.content}</p>
                      </div>
                    </section>
                  ))
                )}
              </div>
            </div>
          </React.Fragment>
        ))
      )}
    </div>
  );
}

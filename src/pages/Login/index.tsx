import { useEffect, useState } from 'react';
import styles from './login-form.module.css';
import { useUser } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const { user, login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
    if (user) {
      navigate('/admin')
    }
  }), [user]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = {
        email: email,
        password: password
      }
      setError('');
      login(user);
      setEmail('');
      setPassword('');
      navigate('/admin')
    } catch (e) {
      console.log('aqui erro', e)
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>
          Entre com seu email e senha para acessar sua conta.
        </p>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password" className={styles.label}>
                Senha
              </label>
              <a href="#" className={styles.forgotPassword}>
                Esqueceu a senha?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

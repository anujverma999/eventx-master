import { Container, TextInput, Button, Title, Card, Image, LoadingOverlay } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { login } from '../../store/actions/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/tcg_logo.png';
// import { loginUser } from '../../services/apiService';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // const handleLogin = async () => {
  //   setUsernameError('');
  //   setPasswordError('');
  //   setGeneralError('');

  //   let valid = true;

  //   if (!username.trim()) {
  //     setUsernameError('Username is required');
  //     valid = false;
  //   }

  //   if (!password.trim()) {
  //     setPasswordError('Password is required');
  //     valid = false;
  //   }

  //   if (!valid) return;

  //   setLoading(true);
  //   const userId = username.trim().toLowerCase();

  //   try {
  //     const result = await loginUser({ username: userId, password });
  //     if (result.user) {
  //       const authToken = result.accessToken;
  //       const userData = result.user;

  //       dispatch(
  //         login({
  //           user: userData,
  //           token: authToken,
  //         })
  //       );
  //       navigate('/dashboard', { replace: true });
  //     } else {
  //       setGeneralError(result.error.message);
  //     }

  //   } catch (err) {
  //     console.error('Login error:', err);
  //     const msg =
  //       err.response?.data?.error?.message || err.message || 'An error occurred during login';
  //     setGeneralError(msg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Container className={styles.containerStyle} fluid>
      <div className={styles.loginBoxContainer}>
        <Card className={styles.loginCard}>
          <LoadingOverlay visible={loading} />
          <div className={styles.logoAlignment}>
            <Image
              src={logo}
              alt="Logo"
              fit="contain"
              className={styles.logoStyle}
            />
            <Title order={2} align="center" mb="md">
              <div className={styles.loginTitle}>Login to your account</div>
              <div className={styles.loginSubTitle}>
                Welcome back! Please enter your details.
              </div>
            </Title>
            <div className={styles.inputContainer}>
              <TextInput
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                classNames={{ input: styles.usernameTextInput }}
                disabled={loading}
                error={usernameError}
              />
              <TextInput
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                classNames={{ input: styles.passwordTextInput }}
                disabled={loading}
                error={passwordError}
              />
              {generalError && (
                <div className={styles.errorMessage}>
                  {generalError}
                </div>
              )}
              <Button
                fullWidth
                // onClick={handleLogin}
                className={styles.loginButton}
                disabled={loading}
              >
                <div className={styles.loginButtonText}>
                  {loading ? 'Logging in...' : 'LOGIN'}
                </div>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
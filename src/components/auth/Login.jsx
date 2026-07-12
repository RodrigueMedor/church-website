import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField, Button, Box, Typography, Container, Paper, Alert } from '@mui/material';
import { auth } from '../../cms';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError(t('admin.login.errorRequired', 'Please enter both email and password'));
      return;
    }

    try {
      setIsLoading(true);
      const response = await auth.login(trimmedEmail, password);
      localStorage.setItem('adminToken', response.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message || t('admin.login.errorInvalid', 'Invalid credentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          {t('admin.login.signIn', 'Sign In')}
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2, mb: 1 }}>{error}</Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('admin.login.email', 'Email Address')}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('admin.login.password', 'Password')}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? t('admin.login.signingIn', 'Signing in...') : t('admin.login.signIn', 'Sign In')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

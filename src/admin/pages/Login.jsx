import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Paper, Alert, CircularProgress,
  InputAdornment, IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, Email } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { auth } from '../../cms';

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 450,
  width: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[10],
}));

const Logo = styled('div')(({ theme }) => ({
  margin: theme.spacing(2, 0),
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
}));

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Please enter both email and password');
      return;
    }
    try {
      setIsLoading(true);
      const response = auth.login(trimmedEmail, password);
      localStorage.setItem('adminToken', response.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const quickFill = (pw) => {
    setEmail('admin@fhbck.org');
    setPassword(pw || 'admin123');
  };

  return (
    <LoginContainer>
      <LoginPaper elevation={3}>
        <Logo>CB</Logo>
        <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" mb={4}>
          Sign in to manage your website content
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 3 }}>{error}</Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal" required fullWidth id="email" label="Email Address"
            name="email" autoComplete="email" autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal" required fullWidth name="password"
            label="Password" type={showPassword ? 'text' : 'password'}
            id="password" autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" size="large"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1rem' }}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
          <Typography variant="caption" color="textSecondary" textAlign="center" display="block">
            Demo: admin@fhbck.org / admin123
            <Box component="span" sx={{ ml: 1, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => quickFill()}>
              (Auto-fill)
            </Box>
          </Typography>
        </Box>
      </LoginPaper>
    </LoginContainer>
  );
};

export default Login;

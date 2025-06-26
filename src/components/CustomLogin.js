import React, { useState } from 'react';
import { useLogin, useNotify } from 'react-admin';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Alert,
  Avatar,
  InputAdornment,
  IconButton,
  Fade,
  LinearProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
  School,
  CheckCircle,
  Error,
  Warning
} from '@mui/icons-material';
import './CustomLogin.css';

const CustomLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await login({ username, password });
      setSuccess('Đăng nhập thành công! Đang chuyển hướng...');
      notify('Đăng nhập thành công!', { type: 'success' });
    } catch (error) {
      console.log('Login error details:', error);

      // Xử lý các loại lỗi khác nhau từ server
      let errorMessage = 'Đã xảy ra lỗi không xác định';

      if (error.message) {
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
          errorMessage = 'Tài khoản hoặc mật khẩu không đúng';
        } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
          errorMessage = 'Bạn không có quyền truy cập vào hệ thống này';
        } else if (error.message.includes('404') || error.message.includes('Not Found')) {
          errorMessage = 'Không thể kết nối đến server. Vui lòng thử lại sau';
        } else if (error.message.includes('500') || error.message.includes('Internal Server Error')) {
          errorMessage = 'Lỗi server nội bộ. Vui lòng liên hệ quản trị viên';
        } else if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
          errorMessage = 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet';
        } else if (error.message.includes('giảng viên') || error.message.includes('instructor')) {
          errorMessage = 'Chỉ tài khoản giảng viên mới có quyền truy cập';
        } else {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
      notify(errorMessage, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      className="login-container"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Container component="main" maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Card
            className="login-card glass-morphism"
            elevation={24}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {loading && (
              <LinearProgress
                sx={{
                  height: 3,
                  backgroundColor: 'rgba(103, 126, 234, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#667eea'
                  }
                }}
              />
            )}

            <CardContent sx={{ p: 6 }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4
              }}>
                <Avatar
                  className="login-avatar"
                  sx={{
                    m: 1,
                    bgcolor: '#667eea',
                    width: 80,
                    height: 80,
                    mb: 2
                  }}
                >
                  <School sx={{ fontSize: 40 }} />
                </Avatar>

                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  className="gradient-text"
                  sx={{
                    fontWeight: 700,
                    textAlign: 'center'
                  }}
                >
                  KMB_Education
                </Typography>

                <Typography
                  variant="h6"
                  color="textSecondary"
                  sx={{ fontWeight: 500, mb: 1 }}
                >
                  Hệ thống quản lý khóa học
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(103, 126, 234, 0.1)',
                    padding: '8px 16px',
                    borderRadius: 2,
                    border: '1px solid rgba(103, 126, 234, 0.2)'
                  }}
                >
                  🎓 Dành riêng cho giảng viên
                </Typography>
              </Box>

              {error && (
                <Fade in={true}>
                  <Alert
                    className="error-alert"
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      '& .MuiAlert-icon': {
                        fontSize: 24
                      }
                    }}
                    icon={<Error />}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {error}
                    </Typography>
                  </Alert>
                </Fade>
              )}

              {success && (
                <Fade in={true}>
                  <Alert
                    className="success-alert"
                    severity="success"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      '& .MuiAlert-icon': {
                        fontSize: 24
                      }
                    }}
                    icon={<CheckCircle />}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {success}
                    </Typography>
                  </Alert>
                </Fade>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Tài khoản"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#667eea',
                    },
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#667eea' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          disabled={loading}
                          sx={{ color: '#667eea' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#667eea',
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={`login-button ${loading ? 'loading' : ''}`}
                  sx={{
                    mt: 4,
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 32px rgba(103, 126, 234, 0.3)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      boxShadow: '0 12px 40px rgba(103, 126, 234, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    '&:disabled': {
                      background: 'rgba(103, 126, 234, 0.5)',
                      color: 'rgba(255, 255, 255, 0.7)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                  disabled={loading || !username || !password}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography>Đang xác thực</Typography>
                      <Box className="loading-spinner" sx={{
                        width: 16,
                        height: 16,
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%'
                      }} />
                    </Box>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>

                <Box sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(103, 126, 234, 0.05)',
                  border: '1px solid rgba(103, 126, 234, 0.1)'
                }}>
                  <Alert
                    severity="info"
                    icon={<Warning />}
                    sx={{
                      backgroundColor: 'transparent',
                      '& .MuiAlert-message': {
                        fontSize: '0.875rem'
                      }
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
                      Lưu ý quan trọng:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      • Chỉ tài khoản giảng viên mới có thể truy cập<br />
                      <br />
                      • Liên hệ quản trị viên nếu gặp sự cố
                    </Typography>
                  </Alert>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default CustomLogin;

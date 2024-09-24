import { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '../redux/api/authApi';
import { Form, Input, Button, Typography, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/authSlice';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const AuthComponent = () => {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(true);
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    try {
      const response = await register({ email, password }).unwrap();
      localStorage.setItem('authLoginToken', response.token)
      dispatch(setUser(response));
      message.success('Registration successful');
      console.log('Registration successful:', response);
    } catch (error) {
      message.error('Registration failed');
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login({ email, password }).unwrap();
      localStorage.setItem('authLoginToken', response.token)
      dispatch(setUser(response));
      console.log('Login successful:', response);
      navigate('/');
    } catch (error) {
      message.error('Login failed');
      console.error('Login failed:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isRegistering) {
        handleRegister();
      } else {
        handleLogin();
      }
    }
  };

  const transitionVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {isRegistering ? (
          <motion.div>
            <Title level={2} className="text-center">{t('Register')}</Title>
            <Form layout="vertical">
              <Form.Item label={t('Email')}>
                <Input 
                  type="email" 
                  name="email"
                  value={email} 
                  onChange={handleChange} 
                  placeholder={t('Enter your email')}
                />
              </Form.Item>
              <Form.Item label={t('Password')}>
                <Input.Password 
                  name="password"
                  value={password} 
                  onChange={handleChange} 
                  placeholder={t('Enter your password')} 
                />
              </Form.Item>
              <Form.Item label={t('Confirm Password')}>
                <Input.Password 
                  name="confirmPassword"
                  value={confirmPassword} 
                  onChange={handleChange} 
                  placeholder={t('Confirm your password')} 
                />
              </Form.Item>
              <Button type="primary" block onClick={handleRegister}>
                {t('Register')}
              </Button>
              <Button type="link" block onClick={() => setIsRegistering(false)}>
                {t('Already have an account? Login')}
              </Button>
            </Form>
          </motion.div>
        ) : (
          <motion.div>
            <Title level={2} className="text-center">{t('Login')}</Title>
            <Form layout="vertical">
              <Form.Item label={t('Email')}>
                <Input 
                  type="email" 
                  name="email"
                  value={email} 
                  onChange={handleChange} 
                  placeholder={t('Enter your email')}
                />
              </Form.Item>
              <Form.Item label={t('Password')}>
                <Input.Password 
                  name="password"
                  value={password} 
                  onChange={handleChange} 
                  placeholder={t('Enter your password')} 
                />
              </Form.Item>
              <Button type="primary" block onClick={handleLogin}>
                {t('Login')}
              </Button>
              <Button type="link" block onClick={() => setIsRegistering(true)}>
                {t('Don\'t have an account? Register')}
              </Button>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
  );
};

export default AuthComponent;

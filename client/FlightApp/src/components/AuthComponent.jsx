import { useState } from 'react';
import { useRegisterMutation, useLoginMutation } from '../redux/api/authApi';
import { Form, Input, Button, Typography, message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

const { Title } = Typography;

const AuthComponent = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    try {
      const response = await register({ email, password }).unwrap();
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
      message.success(response.msg);  
      console.log('Login successful:', response);
    } catch (error) {
      message.error('Login failed');
      console.error('Login failed:', error);
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
            <motion.div
              key="register"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={transitionVariant}
              transition={{ duration: 0.5 }}
            >
              <Title level={2} className="text-center">Register</Title>
              <Form layout="vertical">
                <Form.Item label="Email" required>
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                  />
                </Form.Item>
                <Form.Item label="Password" required>
                  <Input.Password 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                  />
                </Form.Item>
                <Form.Item label="Confirm Password" required>
                  <Input.Password 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm your password" 
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block onClick={handleRegister} style={{ marginBottom: '10px' }}>
                    Register
                  </Button>
                  <Button type="link" block onClick={() => setIsRegistering(false)}>
                    Already have an account? Login
                  </Button>
                </Form.Item>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={transitionVariant}
              transition={{ duration: 0.5 }}
            >
              <Title level={2} className="text-center">Login</Title>
              <Form layout="vertical">
                <Form.Item label="Email" required>
                  <Input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                  />
                </Form.Item>
                <Form.Item label="Password" required>
                  <Input.Password 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" block onClick={handleLogin} style={{ marginBottom: '10px' }}>
                    Login
                  </Button>
                  <Button type="link" block onClick={() => setIsRegistering(true)}>
                    Don't have an account? Register
                  </Button>
                </Form.Item>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthComponent;

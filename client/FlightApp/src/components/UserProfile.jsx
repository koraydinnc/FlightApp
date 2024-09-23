import React from 'react';
import { Avatar, Button, Dropdown, Menu, message } from 'antd';
import { UserOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
     
    const navigate = useNavigate()
    const dispatch = useDispatch()
   
    const handleLogout = () => {
        dispatch(clearUser()); 
        message.success('Logged out successfully');
        navigate('/');
      };

      
  const menu = (
    <Menu>
      <Menu.Item key="0" icon={<UserOutlined />}>
        Biletlerim
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Çıkış Yap
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Avatar size={40} icon={<UserOutlined />} className="cursor-pointer" />
    </Dropdown>
  );
};

export default UserProfile;

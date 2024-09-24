import { Avatar, Dropdown, Menu, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { clearUser } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation(); 
    const userId = useSelector(state => state.user?.userInfo?.user._id); 

    const handleLogout = () => {
        dispatch(clearUser());
        message.success(t('Logged out successfully')); 
        navigate('/');
    };
    const goTicketsPage = () => {
        navigate(`/Tickets/${userId}`); 
    };

    const menu = (
        <Menu>
            <Menu.Item key="0" icon={<UserOutlined />} onClick={goTicketsPage}>
                {t('My Tickets')}
            </Menu.Item>
            <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
                {t('Logout')} 
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

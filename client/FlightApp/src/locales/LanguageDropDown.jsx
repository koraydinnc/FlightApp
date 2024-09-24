import { Dropdown, Menu, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import TRFlag from '../assets/tr-flag.png';
import ENFlag from '../assets/en-flag.png';

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="tr" onClick={() => changeLanguage('tr')}>
        <img src={TRFlag} alt="TR" style={{ width: '20px', marginRight: '8px' }} />
        Türkçe
      </Menu.Item>
      <Menu.Item key="en" onClick={() => changeLanguage('en')}>
        <img src={ENFlag} alt="EN" style={{ width: '20px', marginRight: '8px' }} />
        English
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={languageMenu} placement="bottomRight">
      <Button icon={<GlobalOutlined />}>
        {i18n.language === 'tr' ? (
          <img src={TRFlag} alt="TR" style={{ width: '20px', marginRight: '8px' }} />
        ) : (
          <img src={ENFlag} alt="EN" style={{ width: '20px', marginRight: '8px' }} />
        )}
        {i18n.language === 'tr' ? 'Türkçe' : 'English'}
      </Button>
    </Dropdown>
  );
};

export default LanguageDropdown;

import { Form, Button, Row, Col, Card } from 'antd';
import Header from '../components/Header';
import './HomePage.css';
import FlightSelectComponent from '../components/FlightSelectComponent';

const HomePage = () => {
  return (
    <div className="bg-gray-100 mt-40 min-h-screen font-roboto">
      <Header />

      <section className="p-6">
        <h2 className="text-3xl font-inter font-semibold mb-6 animate-fadeIn">
          Uçuş Ara
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-lg animate-fadeIn">
          <Form layout="vertical" className="flight-search-form">
            <Row gutter={16}>
              <Col xs={24} sm={24}>
                <FlightSelectComponent />
              </Col>
            </Row>
          </Form>
        </div>
      </section>



        </div>
  );
};

export default HomePage;

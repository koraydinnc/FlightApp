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

            <Button
              type="primary"
              htmlType="submit"
              className="m-2 bg-blue-600 hover:bg-blue-500 animate-bounceIn transition-all duration-300"
            >
              Uçuş Ara
            </Button>
          </Form>
        </div>
      </section>

      <section className="p-6">
        <h2 className="text-3xl font-inter font-semibold mb-6 animate-fadeIn">
          Öne Çıkan Uçuşlar
        </h2>

        <Row gutter={[16, 16]}>
          {["İstanbul - Ankara", "İstanbul - İzmir", "İstanbul - Antalya"].map(
            (flight, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  title={flight}
                  className="hover:shadow-lg transition-shadow duration-300 animate-bounceIn"
                  extra={
                    <span className="text-blue-600 font-semibold">
                      ₺{200 + index * 50}
                    </span>
                  }
                >
                  <p className="font-roboto">
                    {index + 1}0:00 - {index + 1}1:30
                  </p>
                </Card>
              </Col>
            )
          )}
        </Row>
      </section>
    </div>
  );
};

export default HomePage;

import { Card, Col, DatePicker, Row, Select, Radio, Space } from "antd";
import airportList from '../../airports.json';
import { useEffect, useState } from "react";
import { MdFlightTakeoff, MdOutlineFlightLand } from "react-icons/md";

const FlightSelectComponent = () => {
    const [data, setData] = useState([]);
    const [tripType, setTripType] = useState("oneWay");
    const [dates, setDates] = useState({ departure: null, return: null });

    useEffect(() => {
        const options = airportList.map((airport) => ({
            label: `${airport.iata} - ${airport.name}`,
            value: airport.iata,
        }));
        setData(options);
    }, []);

    const handleTripTypeChange = (e) => {
        setTripType(e.target.value);
        if (e.target.value === "oneWay") {
            setDates((prevDates) => ({ ...prevDates, return: null })); // Tek yön seçildiğinde dönüş tarihini sıfırla
        }
    };

    const handleDateChange = (field, date) => {
        setDates((prevDates) => ({
            ...prevDates,
            [field]: date
        }));
    };

    return (
        <Row gutter={[16, 16]} justify="center" className="min-w-full">
            <Col span={24}>
                <Card>
                    <Radio.Group value={tripType} onChange={handleTripTypeChange}>
                        <Space>
                            <Radio.Button value="oneWay">Tek Yön</Radio.Button>
                            <Radio.Button value="roundTrip">Çift Yön</Radio.Button>
                        </Space>
                    </Radio.Group>
                </Card>
            </Col>

            <Col span={6}>
                <Card>
                    <div className="flex items-center">
                        <MdFlightTakeoff className="mr-2" style={{ fontSize: '24px', color: '#1690ff' }} />
                        <Select
                            className="w-full"
                            showSearch
                            placeholder="Nereden"
                            optionFilterProp="label"
                            onChange={(value) => console.log(value)}
                            onSearch={(value) => console.log(value)}
                            filterOption={(input, option) =>
                                option?.label.toLowerCase().includes(input.toLowerCase())
                            }
                            options={data}
                        />
                    </div>
                </Card>
            </Col>

            {/* Nereye Seçimi */}
            <Col span={6}>
                <Card>
                    <div className="flex items-center">
                        <MdOutlineFlightLand className="mr-2" style={{ fontSize: '24px', color: '#1690ff' }} />
                        <Select
                            className="w-full"
                            showSearch
                            placeholder="Nereye"
                            optionFilterProp="label"
                            onChange={(value) => console.log(value)}
                            onSearch={(value) => console.log(value)}
                            filterOption={(input, option) =>
                                option?.label.toLowerCase().includes(input.toLowerCase())
                            }
                            options={data}
                        />
                    </div>
                </Card>
            </Col>

            <Col span={6}>
                <Card>
                    <DatePicker
                        className="w-full"
                        placeholder="Kalkış Tarihi"
                        value={dates.departure}
                        onChange={(date) => handleDateChange("departure", date)}
                    />
                </Card>
            </Col>

            {tripType === "roundTrip" && (
                <Col span={6}>
                    <Card>
                        <DatePicker
                            className="w-full"
                            placeholder="Dönüş Tarihi"
                            value={dates.return}
                            onChange={(date) => handleDateChange("return", date)}
                        />
                    </Card>
                </Col>
            )}
        </Row>
    );
};

export default FlightSelectComponent;

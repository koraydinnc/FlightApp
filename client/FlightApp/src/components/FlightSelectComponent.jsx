import { Card, Col, DatePicker, Row, Button, Pagination, Input, Select, Space } from "antd";
import { SearchOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import airportList from '../../airports.json';
import { useEffect, useState } from "react";
import { useFetchFlightsTodayMutation, useFetchFlightsTomorrowMutation, useFetchFlightsWithDateMutation } from '../redux/api/fetchApi';
import FlightCard from "./FlightCard";
import dayjs from "dayjs";

const FlightSelectComponent = () => {
    const [dates, setDates] = useState({ departure: null });
    const [flights, setFlights] = useState([]);
    const [day, setDay] = useState('today');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [airlineCode, setAirlineCode] = useState('');
    const [flightDirection, setFlightDirection] = useState('A');
    const [flightNumber, setFlightNumber] = useState('');

    const [fetchFlightsToday] = useFetchFlightsTodayMutation();
    const [fetchFlightsTomorrow] = useFetchFlightsTomorrowMutation();
    const [fetchFlightWithDate] = useFetchFlightsWithDateMutation();

    const handleDateChange = (field, date) => {
        setDates((prevDates) => ({
            ...prevDates, 
            [field]: date
        }));
    };

    const handleFetchTodayFlights = async () => {
        try {
            const response = await fetchFlightsToday().unwrap();
            setDay('today');
            setDates({ departure: dayjs() });
            setFlights(response);
        } catch (error) {
            console.error("Failed to fetch flights:", error);
        }
    };

    const handleFetchTomorrowFlights = async () => {
        try {
            const response = await fetchFlightsTomorrow().unwrap();
            setDay('tomorrow');
            setFlights(response);
        } catch (error) {
            console.error("Failed to fetch tomorrow flights:", error);
        }
    };

    const handleFetchWithDate = async () => {
        if (dates.departure) {
            try {
                const formattedDate = dates.departure.format("YYYY-MM-DD");
                const response = await fetchFlightWithDate({ date: formattedDate, flightDirection }).unwrap();
                setDay('custom');
                setFlights(response);
            } catch (error) {
                console.error('Tarihli uçuş bulunamadı', error);
            }
        } else {
            console.error("Please select a date");
        }
    };

    useEffect(() => {
        handleFetchTodayFlights();
    }, []);

    useEffect(() => {
        if (flightDirection && dates.departure) {
            handleFetchWithDate();
        }
    }, [flightDirection, dates.departure]);

    const filteredFlights = flights.filter(flight => {
        const isMatchingDate = dates.departure ? 
            flight.scheduleDate === dates.departure.format("YYYY-MM-DD") : true;
        
        const isMatchingAirlineCode = airlineCode ? flight.airlineCode.toString() === airlineCode : true;

        const isMatchingFlightDirection = flightDirection ? flight.flightDirection === flightDirection : true;

        const isMatchingFlightNumber = flightNumber ? flight.flightNumber.toString() === flightNumber : true;

        return isMatchingDate && isMatchingAirlineCode && isMatchingFlightDirection && isMatchingFlightNumber;
    });

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedFlights = filteredFlights.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePurchaseFlight = (flight) => {
        console.log("Purchasing flight:", flight);
    };

    return (
        <Row gutter={[16, 16]} justify="center" className="min-w-full">
            <Col span={24}>
                <Card title="Flight Filters" bordered={false}>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <DatePicker 
                                onChange={(date) => handleDateChange('departure', date)} 
                                placeholder="Departure Date"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={6}>
                            <Input 
                                placeholder="Airline Code" 
                                value={airlineCode} 
                                onChange={(e) => setAirlineCode(e.target.value)} 
                                prefix={<SearchOutlined />}
                            />
                        </Col>
                        <Col span={6}>
                            <Select 
                                placeholder="Flight Direction" 
                                value={flightDirection} 
                                onChange={(value) => setFlightDirection(value)}
                                style={{ width: '100%' }}
                            >
                                <Select.Option value="A">Arrival</Select.Option>
                                <Select.Option value="D">Departure</Select.Option>
                            </Select>
                        </Col>
                        <Col span={6}>
                            <Input 
                                placeholder="Flight Number" 
                                type="number"
                                value={flightNumber} 
                                onChange={(e) => setFlightNumber(e.target.value)} 
                                prefix={<SearchOutlined />}
                            />
                        </Col>
                    </Row>
                    <Space style={{ marginTop: 16 }}>
                        <Button type="primary" onClick={handleFetchTodayFlights} icon={<ArrowDownOutlined />}>
                            Fetch Today Flights
                        </Button>
                        <Button type="primary" onClick={handleFetchTomorrowFlights} icon={<ArrowUpOutlined />}>
                            Fetch Tomorrow Flights
                        </Button>
                    </Space>
                </Card>
            </Col>

            {(day === 'today' || day === 'custom') && (
                <Col span={24}>
                    <span>Today Flights</span>
                    {paginatedFlights.map(flight => (
                        <FlightCard key={flight.id} flight={flight} onPurchase={handlePurchaseFlight} />
                    ))}
                </Col>
            )}
             
            {day === 'tomorrow' && (
                <Col span={24}>
                    <span>Tomorrow Flights</span>
                    {flights.map(flight => (
                        <FlightCard key={flight.id} flight={flight} onPurchase={handlePurchaseFlight} />
                    ))}
                </Col>
            )}

            {flights.length > 0 && (
                <Col span={24}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={filteredFlights.length}
                        onChange={handlePageChange}
                        style={{ textAlign: 'center', marginTop: 16 }}
                    />
                </Col>
            )}
        </Row>
    );
};

export default FlightSelectComponent;

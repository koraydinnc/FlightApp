import { Card, Col, DatePicker, Row, Select, Button } from "antd";
import airportList from '../../airports.json';
import { useEffect, useState } from "react";
import { useFetchFlightsTodayMutation } from '../redux/api/fetchApi';

const FlightSelectComponent = () => {
    const [dates, setDates] = useState({ departure: null, return: null });
    const [flights, setFlights] = useState([]);
    const [fetchFlightsToday] = useFetchFlightsTodayMutation();

    useEffect(() => {
        const options = airportList.map((airport) => ({
            label: `${airport.iata} - ${airport.name}`,
            value: airport.iata,
        }));
        // Store options if needed, e.g., in state
    }, []);

    const handleDateChange = (field, date) => {
        setDates((prevDates) => ({
            ...prevDates, 
            [field]: date
        }));
    };

    const handleFetchFlights = async () => {
        try {
            const response = await fetchFlightsToday().unwrap();
            setFlights(response); // Store the fetched flights
        } catch (error) {
            console.error("Failed to fetch flights:", error);
        }
    };

    const filteredFlights = flights.filter(flight => {
        // Implement your filtering logic here
        // Example: filter by scheduled date or destination
        const isMatchingDate = dates.departure ? 
            flight.scheduleDate === dates.departure.format("YYYY-MM-DD") : true;
        return isMatchingDate;
    });

    return (
        <Row gutter={[16, 16]} justify="center" className="min-w-full">
            <Col span={8}>
                <DatePicker 
                    onChange={(date) => handleDateChange('departure', date)} 
                    placeholder="Departure Date"
                />
            </Col>
            <Col span={8}>
                <Button type="primary" onClick={handleFetchFlights}>
                    Fetch Flights
                </Button>
            </Col>
            <Col span={24}>
                {filteredFlights.map(flight => (
                    <Card key={flight.id} title={`Flight ${flight.flightName}`}>
                        <p>Destination: {flight.route.destinations[0]}</p>
                        <p>Scheduled Time: {flight.scheduleDateTime}</p>
                        <p>Actual Landing Time: {flight.actualLandingTime}</p>
                    </Card>
                ))}
            </Col>
        </Row>
    );
};

export default FlightSelectComponent;

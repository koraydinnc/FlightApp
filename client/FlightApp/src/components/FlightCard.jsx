import { Card, Tooltip, Button } from 'antd';
import { 
    ClockCircleOutlined, 
    RocketOutlined, 
    CheckCircleOutlined, 
    WarningOutlined 
} from '@ant-design/icons';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa'; 
import { useFetchSelectedFlightMutation } from '../redux/api/fetchApi';
import { useEffect } from 'react';

const FlightCard = ({ flight, onPurchase }) => {
  
    const [fetchSelectedFlight] = useFetchSelectedFlightMutation()

    const {
        flightName,
        route: { destinations },
        scheduleDateTime,
        actualLandingTime,
        estimatedLandingTime,
        publicFlightState: { flightStates },
        aircraftType: { iataMain, iataSub },
        isOperationalFlight,
        id,
        flightDirection,
    } = flight;

    const flightStatus = flightStates[0];
    const statusIcon = flightStatus === 'SCH' ? <CheckCircleOutlined /> : <WarningOutlined />;

    useEffect(() => {
        if (id) {
            fetchSelectedFlight({ id }); 
        }
    }, [id, fetchSelectedFlight]);

    const handlePurchaseClick = () => {
        if (onPurchase) {
            onPurchase(flight); 
        }
    };

    return (
        <div className="shadow-lg rounded-lg hover:-translate-y-1 transition-transform duration-300 bg-white p-4 mb-4 font-inter">
            <Card
                title={
                    <div className="flex items-center text-lg font-semibold">
                        <RocketOutlined className="mr-2 text-blue-500" />
                        Flight: {flightName}
                    </div>
                }
                bordered={false}
            >
                <div className="grid grid-cols-3 gap-4">
                    <Tooltip title="Departure Airport">
                        <p className="flex items-center">
                            <FaPlaneDeparture className="mr-2 text-blue-500" /> {destinations[0]}
                        </p>
                    </Tooltip>

                    <Tooltip title="Scheduled Departure Time">
                        <p className="flex items-center">
                            <ClockCircleOutlined className="mr-2" /> {new Date(scheduleDateTime).toLocaleTimeString()}
                        </p>
                    </Tooltip>

                    <Tooltip title="Estimated Landing Time">
                        <p className="flex items-center">
                            <FaPlaneArrival className="mr-2 text-green-500" /> Estimated Landing: {new Date(estimatedLandingTime).toLocaleTimeString()}
                        </p>
                    </Tooltip>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-2">
                    <Tooltip title="Actual Landing Time">
                        <p className="flex items-center">
                            Actual Landing: {actualLandingTime ? new Date(actualLandingTime).toLocaleTimeString() : 'N/A'}
                        </p>
                    </Tooltip>

                    <Tooltip title="Aircraft Information">
                        <p className="flex items-center">
                            Aircraft: {iataMain} ({iataSub})
                        </p>
                    </Tooltip>

                    <Tooltip title="Flight Status">
                        <p className="flex items-center">
                            Status: 
                            <span className={`ml-2 font-semibold px-2 py-1 rounded-lg ${flightStatus === 'SCH' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {statusIcon} {flightStatus}
                            </span>
                        </p>
                    </Tooltip>
                </div>
                <div className="mt-4 flex justify-end">
                    <Button type="primary" onClick={handlePurchaseClick} className="text-center">
                        Satın Al
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default FlightCard;

import { Card, Tooltip, Button, Spin, Alert, message } from 'antd';
import { 
    ClockCircleOutlined, 
    RocketOutlined, 
    CheckCircleOutlined, 
    WarningOutlined 
} from '@ant-design/icons';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa'; 
import { useFetchSelectedFlightMutation } from '../redux/api/fetchApi';
import { useEffect } from 'react';
import { useBuyTicketsMutation } from '../redux/api/ticketsApi';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const FlightCard = ({ flight, onPurchase }) => {
    const { t } = useTranslation(); // Initialize translation function
    const userId = useSelector(state => state?.user?.userInfo?.token); // Get user ID or token
    const [fetchSelectedFlight] = useFetchSelectedFlightMutation();
    const [buyTickets, { isLoading, error }] = useBuyTicketsMutation();

    const {
        flightName,
        route: { destinations },
        scheduleDateTime,
        actualLandingTime,
        estimatedLandingTime,
        publicFlightState: { flightStates },
        aircraftType: { iataMain, iataSub },
        id,
    } = flight;

    const flightStatus = flightStates[0];
    const statusIcon = flightStatus === 'SCH' ? <CheckCircleOutlined /> : <WarningOutlined />;

    useEffect(() => {
        if (id) {
            fetchSelectedFlight({ id }); 
        }
    }, [id, fetchSelectedFlight]);

    const handlePurchaseClick = async () => {
        if (!userId) {
            message.error(t('You must be logged in to purchase tickets.'));
            return;
        }

        if (onPurchase) {
            onPurchase(flight);
            try {
                await buyTickets({ userId, flightId: id }).unwrap();
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="shadow-lg rounded-lg hover:-translate-y-1 transition-transform duration-300 bg-white p-4 mb-4 font-inter">
            <Card
                title={
                    <div className="flex items-center text-lg font-semibold">
                        <RocketOutlined className="mr-2 text-blue-500" />
                        {t('Flight')}: {flightName}
                    </div>
                }
                bordered={false}
            >
                {isLoading && <Spin />}

                <div className="grid grid-cols-3 gap-4">
                    <Tooltip title={t('Departure Airport')}>
                        <p className="flex items-center">
                            <FaPlaneDeparture className="mr-2 text-blue-500" /> {destinations[0]}
                        </p>
                    </Tooltip>
                    <Tooltip title={t('Scheduled Departure Time')}>
                        <p className="flex items-center">
                            <ClockCircleOutlined className="mr-2" /> {new Date(scheduleDateTime).toLocaleTimeString()}
                        </p>
                    </Tooltip>
                    <Tooltip title={t('Estimated Landing Time')}>
                        <p className="flex items-center">
                            <FaPlaneArrival className="mr-2 text-green-500" /> {t('Estimated Landing')}: {new Date(estimatedLandingTime).toLocaleTimeString()}
                        </p>
                    </Tooltip>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-2">
                    <Tooltip title={t('Actual Landing Time')}>
                        <p className="flex items-center">
                            {t('Actual Landing')}: {actualLandingTime ? new Date(actualLandingTime).toLocaleTimeString() : 'N/A'}
                        </p>
                    </Tooltip>
                    <Tooltip title={t('Aircraft Information')}>
                        <p className="flex items-center">
                            {t('Aircraft')}: {iataMain} ({iataSub})
                        </p>
                    </Tooltip>
                    <Tooltip title={t('Flight Status')}>
                        <p className="flex items-center">
                            {t('Status')}: 
                            <span className={`ml-2 font-semibold px-2 py-1 rounded-lg ${flightStatus === 'SCH' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                {statusIcon} {flightStatus}
                            </span>
                        </p>
                    </Tooltip>
                </div>

                <div className="mt-4 flex justify-end">
                    <Button 
                        type="primary" 
                        onClick={handlePurchaseClick} 
                        loading={isLoading} 
                        className="text-center"
                    >
                        {t('Purchase')} 
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default FlightCard;

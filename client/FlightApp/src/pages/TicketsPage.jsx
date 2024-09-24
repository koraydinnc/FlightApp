import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTicketsMutation } from '../redux/api/ticketsApi'; 
import { useFetchSelectedFlightMutation } from '../redux/api/fetchApi';
import { Spin, Alert, List } from 'antd';
import { useTranslation } from 'react-i18next';

const TicketsPage = () => {
    const { userId } = useParams();
    const [getTickets, { data, isLoading, error }] = useGetTicketsMutation(); 
    const [fetchSelectedFlight, { data: flightDetails = [], isLoading: loadingFlightDetails, error: flightError }] = useFetchSelectedFlightMutation();
    const { t } = useTranslation();

    const tickets = data?.tickets || []; 

    useEffect(() => {
        getTickets({ userId });
    }, [getTickets, userId]); 

    useEffect(() => {
        if (Array.isArray(tickets) && tickets.length > 0) {
            tickets.forEach(ticket => {
                fetchSelectedFlight({ id: ticket._id });  // Send one request per ticket ID
            });
        } else {
            console.error('Tickets is not an array or is empty:', tickets);
        }
    }, [tickets, fetchSelectedFlight]);

    if (isLoading || loadingFlightDetails) {
        return <Spin size="large" />;
    }

    if (error) {
        return <Alert message={t('Failed to fetch tickets')} type="error" />;
    }

    if (flightError) {
        return <Alert message={t('Failed to fetch flight details')} type="error" />;
    }

    return (
        <div>
            <h1>{t('My Tickets')}</h1>
            {Array.isArray(tickets) && tickets.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={tickets}
                    renderItem={(ticket) => {
                        const flightDetail = flightDetails.find(flight => flight._id === ticket.flightId);
                        return (
                            <List.Item>
                                <List.Item.Meta
                                    title={ticket.title || t('Ticket title not available')}
                                    description={flightDetail ? flightDetail.name : t('Flight details not available')}
                                />
                            </List.Item>
                        );
                    }}
                />
            ) : (
                <Alert message={t('No tickets found')} type="info" />
            )}
        </div>
    );
};

export default TicketsPage;

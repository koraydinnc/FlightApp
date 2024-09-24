import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTicketsMutation } from '../redux/api/ticketsApi'; 
import { useFetchSelectedFlightMutation } from '../redux/api/fetchApi';
import { Spin, Alert, List } from 'antd';
import { useTranslation } from 'react-i18next';

const TicketsPage = () => {
    const { userId } = useParams();
    const [getTickets, { data: tickets, isLoading, error }] = useGetTicketsMutation(); 
    const [fetchSelectedFlight, { data: flightDetails, isLoading: loadingFlightDetails, error: flightError }] = useFetchSelectedFlightMutation();
    const { t } = useTranslation();

    useEffect(() => {
        // Fetch tickets when the component mounts
        getTickets({ userId });
    }, [getTickets, userId]); 

    useEffect(() => {
        // Ensure tickets is an array before mapping
        if (Array.isArray(tickets) && tickets.length > 0) {
            const ticketIds = tickets.map(ticket => ticket._id); // Accessing _id directly
            console.log(ticketIds); 
            fetchSelectedFlight({ id: ticketIds }); 
        } else {
            console.error('Tickets is not an array or is empty:', tickets);
        }
    }, [tickets, fetchSelectedFlight]);

    // Loading and error handling
    if (isLoading || loadingFlightDetails) {
        return <Spin size="large" />;
    }

    if (error) {
        return <Alert message={t('Failed to fetch tickets')} type="error" />;
    }

    if (flightError) {
        return <Alert message={t('Failed to fetch flight details')} type="error" />;
    }

    console.log(tickets);
    console.log(flightDetails);

    return (
        <div>
            <h1>{t('My Tickets')}</h1>
            {Array.isArray(tickets) && tickets.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={tickets}
                    renderItem={(ticket) => {
                        const flightDetail = flightDetails ? flightDetails.find(flight => flight._id === ticket.flightId) : null;

                       

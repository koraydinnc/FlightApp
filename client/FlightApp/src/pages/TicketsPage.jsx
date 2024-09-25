import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTicketsMutation } from '../redux/api/ticketsApi';
import { useFetchSelectedFlightMutation } from '../redux/api/fetchApi';
import { Spin, Alert, List, Card, Typography, Row, Col, Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const TicketsPage = () => {
    const { userId } = useParams();
    const [ticketsFlight, setTicketsFlight] = useState([]);
    const [getTickets, { data, isLoading, error }] = useGetTicketsMutation();
    const [fetchSelectedFlight, { isLoading: fetchSelectedFlightLoading }] = useFetchSelectedFlightMutation();
    const { t } = useTranslation();

    useEffect(() => {
        if (userId) {
            getTickets({ userId });
        }
    }, [getTickets, userId]);

    useEffect(() => {
        const fetchFlightDetails = async () => {
            if (data && data.tickets) {
                const flightDetailsPromises = data.tickets.map(async (ticket) => {
                    try {
                        const flightDetails = await fetchSelectedFlight({ id: ticket.flightId }).unwrap();
                        return { ...ticket, flightDetails };
                    } catch (err) {
                        console.error(`Failed to fetch flight details for ticket ${ticket.flightId}`, err);
                        return { ...ticket, flightDetails: null };
                    }
                });

                const resolvedFlightDetails = await Promise.all(flightDetailsPromises);
                setTicketsFlight(resolvedFlightDetails);
            }
        };

        fetchFlightDetails();
    }, [data, fetchSelectedFlight]);

    if (isLoading || fetchSelectedFlightLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return <Alert message={t('Failed to fetch tickets')} type="error" />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
                {t('My Tickets')}
            </Title>
            {ticketsFlight.length > 0 ? (
                <Row gutter={[16, 16]}>
                    {ticketsFlight.map((ticket) => {
                        const flightDetail = ticket.flightDetails;

                        return (
                            <Col xs={24} sm={12} lg={8} key={ticket.flightId}>
                                <Card hoverable bordered style={{ borderRadius: '10px' }}>
                                    {flightDetail ? (
                                        <div>
                                            <p><Text strong>{t('Flight Name')}:</Text> {flightDetail.flightName || t('N/A')}</p>
                                            <p><Text strong>{t('Flight Number')}:</Text> {flightDetail.flightNumber || t('N/A')}</p>
                                            <p><Text strong>{t('Aircraft Type')}:</Text> {flightDetail.aircraftType?.iataMain || t('N/A')} ({flightDetail.aircraftType?.iataSub || t('N/A')})</p>
                                            <p><Text strong>{t('Scheduled Landing')}:</Text> {new Date(flightDetail.scheduleDateTime).toLocaleString()}</p>
                                            <p><Text strong>{t('Actual Landing')}:</Text> {flightDetail.actualLandingTime ? new Date(flightDetail.actualLandingTime).toLocaleString() : t('Not available')}</p>
                                            <p><Text strong>{t('Baggage Claim')}:</Text> {flightDetail.baggageClaim?.belts?.join(', ') || t('N/A')}</p>
                                            <p><Text strong>{t('Flight State')}:</Text> {flightDetail.publicFlightState?.flightStates?.join(', ') || t('N/A')}</p>
                                            
                                            <Tag color={flightDetail.actualLandingTime ? 'green' : 'orange'}>
                                                {flightDetail.actualLandingTime ? <CheckCircleOutlined /> : <ClockCircleOutlined />} 
                                                {flightDetail.actualLandingTime ? t('Landed') : t('Pending')}
                                            </Tag>
                                        </div>
                                    ) : (
                                        <Alert message={t('Flight details not available')} type="warning" showIcon />
                                    )}
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            ) : (
                <Alert message={t('No tickets found')} type="info" />
            )}
        </div>
    );
};

export default TicketsPage;

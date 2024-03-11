import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Typography } from 'antd';
import Profile from './profile';
import axios from 'axios';
import { toast } from 'react-toastify';

const { Text } = Typography;

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user.user);
    const userId = user._id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance(`/api/${userId}/orders`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const handleCancel = async (orderId) => {
        try {
            const response = await axios.delete(`http://localhost:3786/api/${orderId}/cancle`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            if (response.status === 200 && response.data.message === 'Order canceled successfully') {
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: 'Cancelled' } : order
                    )
                );
                toast.success('Order canceled successfully')
            } else {
                console.error('Error canceling order:', response.data.error);
                toast.error('Order cannot be canceled at this time')
            }
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    }

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
        return `${formattedDate} & ${formattedTime}`;
    };

    const formaDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

    return (
        <div>
            <Row justify="center">
                <Col xs={24} sm={8} md={6} lg={4} xl={4}>
                    <Profile />
                </Col>
                <Col xs={24} sm={16} md={18} lg={20} xl={20}>
                    <div style={{ maxWidth: '600px', width: '100%', padding: '0 20px', margin: '0 auto' }}>
                        <h4 className='text-primary text-center'>Your Orders</h4>
                        {Array.isArray(orders) && orders.map((order) => (
                            <div key={order._id} style={{ marginBottom: '20px' }}>
                                <Card style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '1px solid #f0f0f0' }}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Text strong>Order ID:</Text> <Text>{order._id}</Text>
                                        </Col>
                                        <Col span={12}>
                                            <Text strong>Restaurant Name:</Text> <Text>{order.restaurantId.name}</Text>
                                        </Col>
                                        <Col span={12}>
                                            <Text strong>Table Number:</Text> <Text>{order.tableId.tableNumber}</Text>
                                        </Col>
                                        <Col span={12}>
                                            <Text strong>Start Date Time:</Text> <Text>{formatDate(order.bookingId.startDateTime)}</Text>
                                        </Col>
                                        <Col span={12}>
                                            <Text strong>End Date Time:</Text> <Text>{formatDate(order.bookingId.endDateTime)}</Text>
                                        </Col>
                                        <Col span={12}>
                                            <Text strong>Order Date:</Text> <Text>{formaDate(order.orderDate)}</Text>
                                        </Col>
                                        <Col span={12}>
                                            <Text strong>Amount:</Text> <Text>{order.amount}</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Text strong>Transaction ID:</Text> <Text>{order.transactionId}</Text>
                                        </Col>
                                        <Col span={24}>
                                            <Text strong>Status</Text> <Text>{order.status}</Text>
                                        </Col>
                                        {order.status !== 'Cancelled' && (
                                            <Col span={24}>
                                                
                                                {new Date() < new Date(order.bookingId.startDateTime) - (30 * 60000) ? (
                                                    <button className='btn btn-danger' onClick={() => { handleCancel(order._id) }}>Cancel</button>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                        )}
                                    </Row>
                                </Card>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </div>
    );
}

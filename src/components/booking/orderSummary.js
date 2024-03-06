import React, { useState, useEffect } from 'react';
import { Page, Text, Document, StyleSheet, View, PDFViewer } from '@react-pdf/renderer';
import axiosInstance from '../../config/axios';
import { useSelector } from 'react-redux';

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#f0f0f0',
    },
    cardHeader: {
        backgroundColor: '#ccc',
        padding: 10,
        borderBottom: '1px solid #999',
    },
    cardBody: {
        padding: 10,
    },
    section: {
        margin: 5,
        fontSize: 12,
        color: '#333',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        textDecoration: 'underline',
        color: '#000',
    },
});

// Create Document Component
const MyDocument = ({ order }) => (
    <PDFViewer style={{ width: '100%', height: '500px' }}>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.heading}>Order Details</Text>
                        <Text style={styles.section}>Order ID: {order._id}</Text>
                    </View>
                    <View style={styles.cardBody}>
                        {/* <Text style={styles.section}>Restaurant Name: {order.restaurantId.name}</Text>
                        <Text style={styles.section}>Table Number: {order.tableId.tableNumber}</Text>
                        <Text style={styles.section}>Start Date Time: {order.bookingId.startDateTime}</Text>
                        <Text style={styles.section}>End Date Time: {order.bookingId.endDateTime}</Text> */}
                        <Text style={styles.section}>Order Date: {order.orderDate}</Text>
                        <Text style={styles.section}>Amount: {order.amount}</Text>
                        <Text style={styles.section}>Transaction ID: {order.transactionId}</Text>
                        <Text style={styles.section}>Status: {order.status}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    </PDFViewer>
);

const OrdersPDF = ({ orderId }) => {
    console.log(orderId,'orderid')
    const [order, setOrder] = useState({});
    console.log('orders', order)
    const user = useSelector(state => state.user.user);
    const userId = user._id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/api/order/65e85a60afa71c95963a4b05`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [orderId, userId]);

    return <MyDocument order={order} />
};

export default OrdersPDF;

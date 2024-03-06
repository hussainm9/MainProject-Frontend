import React from 'react';
import { Card, CardBody } from 'reactstrap';

function About() {
  return (
    <div className="container py-4">
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">About Resofy</h2>
          <p>Resofy is a comprehensive table booking application designed specifically for restaurant owners. It provides restaurant owners with a user-friendly platform to manage their table reservations efficiently and effectively.</p>
          <p>With Resofy, restaurant owners can easily view, accept, and manage table reservations made by customers. The application offers features such as real-time updates, customizable booking options, and integration with existing restaurant management systems.</p>
          <p>Whether you own a small bistro or a bustling restaurant, Resofy streamlines the booking process, allowing you to focus on delivering exceptional dining experiences to your customers.</p>
          <p>Experience the convenience and simplicity of table management with Resofy today!</p>
          <hr /> {/* Horizontal rule */}
          <p>Resofy aims to revolutionize the way restaurants handle table reservations. Our mission is to empower restaurant owners with the tools they need to succeed in today's competitive dining industry.</p>
          <p>Our team is dedicated to continually improving and enhancing the Resofy platform to meet the evolving needs of restaurant owners and diners alike.</p>
          <p>Join the Resofy community and take your restaurant to new heights!</p>
          <p>Contact us today to learn more about how Resofy can benefit your business.</p>
          <p>We look forward to helping you streamline your table booking process and enhance your restaurant's operations.</p>
        </CardBody>
      </Card>
    </div>
  );
}

export default About;
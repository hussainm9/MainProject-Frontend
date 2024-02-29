import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer mt-auto py-3 bg-light" >
            <div className="container text-center">"
                <span className="text-muted">&copy; {currentYear} Resofy. All rights reserved.</span>
            </div>
        </footer>
    );
}

export default Footer

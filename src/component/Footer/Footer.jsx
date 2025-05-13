import React from 'react';

const Footer = () => {
    return (
        <div className='mt-8'>
            <footer className="footer sm:footer-horizontal footer-center bg-gray-900 text-gray-50 p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by RuposheeBazar</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchNotifications = async () => {
            // Ensure you retrieve the token from localStorage
        
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/notifications', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                    },
                });
                
        
                // Set notifications to the response data (an array of notifications)
                setNotifications(Array.isArray(response.data) ? response.data : []);
                console.log(response.data); // Log the response data
            } catch (error) {
                console.error('Error fetching notifications', error);
            }
        };
        

        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleBellClick = async () => {
        
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) {
            try {
                console.log(token)
                const response = await axios.get('http://127.0.0.1:8000/api/notifications/seen', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the headers
                    },
                });
                console.log(response)

            } catch (error) {
                console.error('Error marking notifications as seen', error);
            }
        }
    };

    return (
        <div className="notification-bell" ref={dropdownRef}>
            <button onClick={handleBellClick}>
                <FontAwesomeIcon icon={faBell} className="bell-icon" />
                {notifications.length > 0 && (
                    <span className="notification-count">{notifications.length}</span>
                )}
            </button>

            {isDropdownOpen && (
                <ul className="notification-dropdown">
                    {notifications.length === 0 ? (
                        <li>No new notifications</li>
                    ) : (
                        notifications.map((notification) => (
                            <li key={notification.id}>{notification.data.message}</li>
                        ))
                    )}
                </ul>
            )}

            <style jsx>{`
                .bell-icon {
                    font-size: 24px;
                    cursor: pointer;
                    margin-right: 10px; /* Add right margin */
                }
                .notification-dropdown {
                    position: absolute;
                    background-color: white;
                    border: 1px solid #ccc;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    width: 200px;
                    z-index: 1000;
                }
                .notification-dropdown li {
                    padding: 10px;
                    border-bottom: 1px solid #eee;
                }
                .notification-dropdown li:hover {
                    background-color: #f5f5f5;
                }
                button{
                    position: relative;
                }
                .notification-count {
                    top: -19px;
                    position: absolute;
                    left: 21px;
                    color: #b5ab36;
                }
                
            `}</style>
        </div>
    );
};

export default NotificationBell;

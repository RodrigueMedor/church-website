import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class UsefulLink extends Component {
    render() {
        return (
            <div className="widget widget-services">
                <ul className="one-half first">
                    <li><Link to="/services-v1" onClick={() => {window.location.href="/services-v1"}} title="">Plan a Visit</Link></li>
                    <li><Link to="/about-v2" onClick={() => {window.location.href="/about-v2"}} title="">Baptisim</Link></li>
                    <li><Link to="/about-v3" onClick={() => {window.location.href="/about-v3"}} title="">Connect Groups</Link></li>
                    <li><Link to="/services-v1" onClick={() => {window.location.href="/services-v1"}} title="">Counseling</Link></li>
                </ul>
                <ul className="one-half">
                    <li><Link to="/" onClick={() => {window.location.href="/"}} title="">Home</Link></li>
                    <li><Link to="/blog" onClick={() => {window.location.href="/blog"}} title="">Events</Link></li>
                    <li><Link to="blog-grid" onClick={() => {window.location.href="/blog-grid"}} title="">Worship & Media</Link></li>
                    <li><Link to="/contact-v1" onClick={() => {window.location.href="/contact-v1"}} title="">Contact</Link></li>
                </ul>
            </div>
        );
    }
}

export default UsefulLink;

import React, { Component } from 'react';
import { Header, TopBar, Footer, Loader } from '../layouts/general';
import { Link } from "react-router-dom";

class Contact01 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            feedback: '',
        };
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, subject, message } = this.state;

        try {
            const response = await fetch('/.netlify/functions/contact', { // Updated URL for Netlify
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            if (response.ok) {
                this.setState({ feedback: 'Email sent successfully!' });
            } else {
                const errorText = await response.text();
                this.setState({ feedback: `Error: ${errorText}` });
            }
        } catch (error) {
            this.setState({ feedback: 'Failed to send email. Please try again later.' });
        }
    };

    render() {
        const { name, email, subject, message, feedback } = this.state;

        return (
            <div className="bg-body">
                <div className="boxed">
                    <Loader />
                    <TopBar />
                    <Header data={{ id: 1, names: 'Blog' }} />

                    <div className="page-title">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-title-heading">
                                        <h1 className="h1-title">Contact</h1>
                                    </div>
                                    <ul className="breadcrumbs">
                                        <li><Link to="#">Home<i className="fa fa-angle-right" aria-hidden="true"></i></Link></li>
                                        <li><Link to="#">Contact</Link></li>
                                    </ul>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="flat-row pd-contact-v1">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="flat-form-info">
                                        <form onSubmit={this.handleSubmit} className="form-info">
                                            <div className="one-half v3">
                                                <p className="input-info">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Name"
                                                        value={name}
                                                        onChange={this.handleInputChange}
                                                        required
                                                    />
                                                </p>
                                                <p className="input-info">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Email"
                                                        value={email}
                                                        onChange={this.handleInputChange}
                                                        required
                                                    />
                                                </p>
                                                <p className="input-info">
                                                    <input
                                                        type="text"
                                                        name="subject"
                                                        placeholder="Subject"
                                                        value={subject}
                                                        onChange={this.handleInputChange}
                                                        required
                                                    />
                                                </p>
                                                <p className="input-info">
                                                    <button type="submit" className="submit">Send Message</button>
                                                </p>
                                            </div>
                                            <div className="one-half v4">
                                                <p className="input-info">
                                                    <textarea
                                                        name="message"
                                                        placeholder="Message"
                                                        value={message}
                                                        onChange={this.handleInputChange}
                                                        required
                                                    ></textarea>
                                                </p>
                                            </div>
                                        </form>
                                        {feedback && <p className="feedback">{feedback}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            </div>
        );
    }
}

export default Contact01;
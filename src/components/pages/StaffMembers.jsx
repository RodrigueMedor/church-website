import React, { Component } from 'react';
import { Header, TopBar, Loader, Footer } from '../layouts/general';
import './StaffMembers.css';

const contentData = {
    banner: {
        title: "Staff Members",
        subtitle: "Meet the dedicated team serving our community.",
        backgroundImage: "/images/banner/Church.jpg"
    }
};

class StaffMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffData: [
                { id: 1, name: 'John Doe', role: 'Senior Pastor', photo: '/images/staff/staff.png', bio: 'John has been serving as the Senior Pastor for over 10 years, leading the church with passion and dedication.' },
                { id: 2, name: 'Jane Smith', role: 'Worship Leader', photo: '/images/staff/staff.png', bio: 'Jane leads the worship team, inspiring the congregation through music and praise.' },
                { id: 3, name: 'Michael Brown', role: 'Youth Pastor', photo: '/images/staff/staff.png', bio: 'Michael mentors the youth, helping them grow spiritually and personally.' },
                { id: 4, name: 'Emily Davis', role: 'Children\'s Ministry Director', photo: '/images/staff/staff.png', bio: 'Emily oversees the children\'s ministry, creating a nurturing environment for young believers.' },
                { id: 5, name: 'Robert Wilson', role: 'Church Administrator', photo: '/images/staff/staff.png', bio: 'Robert manages the church\'s operations, ensuring everything runs smoothly.' },
                { id: 6, name: 'Laura Johnson', role: 'Outreach Coordinator', photo: '/images/staff/staff.png', bio: 'Laura organizes community outreach programs to spread the church\'s mission.' },
                { id: 7, name: 'David Martinez', role: 'Music Director', photo: '/images/staff/staff.png', bio: 'David leads the music ministry, coordinating performances and rehearsals.' },
                { id: 8, name: 'Sophia Lee', role: 'Prayer Ministry Leader', photo: '/images/staff/staff.png', bio: 'Sophia leads the prayer ministry, fostering a culture of prayer within the church.' },
                { id: 9, name: 'James Anderson', role: 'Facilities Manager', photo: '/images/staff/staff.png', bio: 'James ensures the church facilities are well-maintained and welcoming.' },
                { id: 10, name: 'Olivia Thompson', role: 'Event Coordinator', photo: '/images/staff/staff.png', bio: 'Olivia plans and organizes church events, bringing the community together.' },
            ]
        };
    }

    render() {
        return (
            <div className="bg-body3">
                <div className="boxed">
                    <Loader />
                    <TopBar />
                    <Header data={{ id: 1, names: 'Staff Ministry' }} />

                    {/* Banner Section */}
                    <section className="flat-row pd-services-post">
                        <div className="banner" style={{ backgroundImage: `url(${contentData.banner.backgroundImage})` }}>
                            <div className="banner-content">
                                <h1 className="banner-title">{contentData.banner.title}</h1>
                                <p className="banner-subtitle">{contentData.banner.subtitle}</p>
                            </div>
                        </div>
                    </section>

                    {/* Staff Members Section */}
                    <section className="staff-section">
                        <div className="staff-container">
                            <div className="staff-header">
                                <h2>Meet Our Staff</h2>
                                <p>Dedicated individuals serving the church community.</p>
                            </div>
                            <div className="staff-grid">
                                {this.state.staffData.map((staff) => (
                                    <div key={staff.id} className="staff-card">
                                        <img
                                            src={staff.photo}
                                            alt={staff.name}
                                            className="staff-photo"
                                        />
                                        <h3 className="staff-name">{staff.name}</h3>
                                        <p className="staff-role">{staff.role}</p>
                                        <p className="staff-bio">{staff.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
            </div>
        );
    }
}

export default StaffMembers;
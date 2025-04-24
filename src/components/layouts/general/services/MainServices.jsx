import React, { Component } from 'react';

class MainServices extends Component {
  render() {
    const weeklySchedule = [
      { id: 1, title: 'Sunday School', time: '9:30 AM – 10:45 AM' },
      { id: 2, title: 'Morning Worship', time: '11:00 AM – 1:00 PM' },
      { id: 3, title: 'Evening Worship', time: '7:30 PM – 9:00 PM' },
      { id: 4, title: 'Monday Bible Study', time: '7:30 PM – 9:30 PM' },
      { id: 5, title: 'Tuesday Prayer Meeting', time: '7:30 PM – 9:00 PM' },
      { id: 6, title: 'Wednesday Home Prayer Requests', time: 'Contact Sister Remonde Juste at (407) 694-1464' },
      { id: 7, title: 'Thursday Fasting/Jeûne', time: '9:30 AM – 12:00 PM' },
    ];

    return (
      <section className="main-services">
        {/* Banner Section */}
          <div
              className="banner-service d-flex align-items-center justify-content-center text-center"
              style={{
                  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/imagebox/5A6A4439.jpg)',
                  height: '650px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: '#fff',
                  paddingTop: '200px', // Increased padding to move the banner down
                  clipPath: 'inset(0px 0px 50px 0px)', // Cuts the bottom of the banner
              }}
          >
              <div>
                  <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
                      Weekly Service Schedule
                  </h1>
                  <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                      Join us for worship, prayer, and fellowship throughout the week.
                  </p>
              </div>
          </div>

        {/* Schedule Section */}
       <div className="container py-5">
          <h2 className="text-center mb-4 fw-bold" style={{ fontSize: '2.5rem', color: '#28a745', marginBottom:'20px' }}>
            Weekly Service Schedule
          </h2>
          <div className="row g-4">
            {weeklySchedule.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <div
                  className="card h-100 shadow-lg"
                  style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    border: 'none',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: '#28a745',
                      color: '#fff',
                      padding: '15px',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="card-body d-flex align-items-center justify-content-center"
                    style={{
                      padding: '20px',
                      fontSize: '1.1rem',
                      color: '#555',
                      textAlign: 'center',
                    }}
                  >
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="cta-section text-center py-5" style={{ backgroundColor: '#28a745', color: '#fff' }}>
          <h3 className="mb-3">We look forward to seeing you!</h3>
          <p className="mb-4">Come and be part of our community. Everyone is welcome!</p>
          <a
            href="/services-v1"
            className="btn btn-light btn-lg"
            style={{ color: '#28a745', fontWeight: 'bold' }}
          >
            Learn More
          </a>
        </div>
      </section>
    );
  }
}

export default MainServices;
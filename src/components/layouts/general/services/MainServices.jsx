import React, { Component } from 'react';

class MainServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [
        {
          id: 1,
          time: 'Sunday 9:00 AM',
          title: 'Morning Worship Service',
          description: 'Join us for a time of worship, prayer, and a message from the Word of God.',
        },
        {
          id: 2,
          time: 'Sunday 11:00 AM',
          title: 'Second Worship Service',
          description: 'A second opportunity to worship and hear the message.',
        },
        {
          id: 3,
          time: 'Wednesday 7:00 PM',
          title: 'Midweek Bible Study',
          description: 'A time for in-depth Bible study and fellowship.',
        },
      ],
    };
  }

  render() {
    return (
      <section className="flat-row pd-services-post">
        <div className="banner" style={{ backgroundImage: 'url(/images/imagebox/5A6A4439.jpg)' }}>
          <div className="banner-content">

            <h1 className="banner-title">Service Schedule</h1>
            <p className="banner-subtitle">Join us for worship, fellowship, and spiritual growth.</p>
          </div>
        </div>

        <div className="box-container">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="dividers dividers-imagebox"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="schedule-list">
                    <h2 className="schedule-title-link">Sunday Mornings</h2>
                  {this.state.schedule.map((service) => (
                      <div className="schedule-item" key={service.id}>
                        <h3 className="schedule-time">{service.time}</h3>
                        <h4 className="schedule-title">{service.title}</h4>
                        <p className="schedule-description">{service.description}</p>
                      </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">

                <img
                    src="/images/banner/banner-01.png"
                    alt="Sunday Mornings"
                    className="img-fluid"
                    // className="img-fluid"
                    // style={{ float: 'right' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="box-container">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="dividers dividers-imagebox"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="schedule-list">
                  <h2 className="schedule-title-link">Sunday Evening</h2>
                  {this.state.schedule.map((service) => (
                      <div className="schedule-item" key={service.id}>
                        <h3 className="schedule-time">{service.time}</h3>
                        <h4 className="schedule-title">{service.title}</h4>
                        <p className="schedule-description">{service.description}</p>
                      </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">

                <img
                    src="/images/imagebox/05.jpg"
                    alt="Sunday Mornings"
                    className="img-fluid"
                    // className="img-fluid"
                    // style={{ float: 'right' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="box-container">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="dividers dividers-imagebox"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="schedule-list">
                  <h2 className="schedule-title-link">Monday Night</h2>
                  {this.state.schedule.map((service) => (
                      <div className="schedule-item" key={service.id}>
                        <h3 className="schedule-time">{service.time}</h3>
                        <h4 className="schedule-title">{service.title}</h4>
                        <p className="schedule-description">{service.description}</p>
                      </div>
                  ))}
                </div>
              </div>
              <div className="col-md-6">

                <img
                    src="/images/imagebox/05.jpg"
                    alt="Sunday Mornings"
                    className="img-fluid"
                    // className="img-fluid"
                    // style={{ float: 'right' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MainServices;
import React, { Component } from 'react';
import { Header, TopBar , Footer,  Loader } from '../layouts/general';
import { Link } from "react-router-dom";
import { SidebarBlog} from '../layouts/blog';
class BlogGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headers: [
                {
                    id: 1,
                    names: 'Upcoming and Past Events at FHBCK.',
                }
            ],
            titleheading: [
                {
                    id: '1',
                    title: 'Upcoming and Past Events at FHBCK.'
                }
            ],
            breadcrumbs: [
                {
                    id: 1,
                    title: 'Events',
                    classicon: 'fa fa-angle-right',
                    aria: 'true'
                },
                {
                    id: 2,
                    title: 'Upcoming and Past Events at First Haitian Baptist Church of Kissimmee.',
                    classicon: '',
                    aria: ''
                }
            ],
            list: [
                {
                    id: 1,
                    text: 'Customer experience, which includes the impression the homepage and overall design style give the customers their satisfaction when they interact with the site and perform tasks.'

                },
                {
                    id: 2,
                    text: 'Service-level, which looks at responsiveness and reliability of websites – scores them on how quickly they respond to user commands and such factors as average downtime.'
                },
                {
                    id: 3,
                    text: 'Best practices, such as ease of use, quality, availability and security – site managers must be compliant with data laws requiring them to protect customer information and the integrity of customer accounts.'
                }
            ],
            datablog: [
                {
                    id: '1',
                    srcimg: 'images/blog/kidss.png',
                    title: 'Upcoming and Past Events at First Haitian Baptist Church of Kissimmee.',
                    time: '11 Jan 2025',
                    author: 'admin',
                    category: 'Youth',
                    comments: 'No comment',
                    description: 'At our church, we welcome all with open hearts, embracing the love and grace of God. Together, we seek spiritual growth, compassion, and peace. Our community fosters an environment where faith flourishes, guiding each individual to live with purpose and service. With a strong foundation in God\'s Word, we stand united in worship and prayer.',
                    description1: 'Our church’s mission is to spread God’s message of love and salvation. We are committed to creating a community where every member can grow spiritually and experience God\'s peace. Through worship, prayer, and fellowship, we seek to share the joy of God\'s grace and provide support for those in need. Our focus is on building lives centered around Christ’s teachings.',
                    description2: 'Here, we strive to follow the teachings of Christ, who calls us to serve one another with humility and kindness. We stand firm in our commitment to love our neighbors and care for the poor and oppressed. In all that we do, we seek God\'s guidance to live justly, be compassionate, and promote peace in our community. We understand that life’s challenges can be difficult, but with God\'s strength, we rise above them to spread His love and truth.'
                },
            ],
            tabcloud: [
                {
                    id: '1',
                    tablink: 'Creative'
                },
                {
                    id: '2',
                    tablink: 'Portfolio'
                },
                {
                    id: '3',
                    tablink: 'ThemeForest'
                },
            ]
        }
    }
    render() {
        return (
            <div className="bg-body">
                <div className="boxed">
                <Loader />
                <TopBar />
                    {
                        this.state.headers.map(data => (
                            <Header data={data} key={data.id}/>
                        ))
                    }
                    <div className="page-title">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="page-title-heading">
                                        {
                                            this.state.titleheading.map(data =>(
                                                <h1 key={data.id} className="h1-title">{data.title}</h1>
                                            ))
                                        }       
                                    </div>
                                    <ul className="breadcrumbs">
                                        {
                                            this.state.breadcrumbs.map(data =>(
                                                <li key={data.id} ><Link to="#" title="">{data.title}<i className={data.classicon} aria-hidden={data.aria}></i></Link></li>
                                            ))
                                        }
                                    </ul>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="main-content">
                        <div className="container">
                            <div className="row">
                            <div className="col-md-8">
						    <div className="post-wrap">
                            {
                                this.state.datablog.map(data =>(
                                    <article className="main-post" key={data.id} >
                                        <div className="entry-post-title">
                                            <h2 className="post-title"><Link to="#" title="">{data.title}</Link></h2>
                                            <ul className="entry-meta">
                                                <li className="date"><Link to="#" title="">{data.time}</Link></li>
                                                <li className="author"><Link to="#" title="">{data.author}</Link></li>
                                                <li className="categories"><Link to="#" title="">{data.category}</Link></li>
                                                <li className="comment"><Link to="#" title="">{data.comments}</Link></li>
                                            </ul>
                                        </div>
                                        <div className="featured-post">
                                            <Link to="#" title="">
                                                <img src={data.srcimg} alt="financial" />
                                            </Link>
                                        </div>
                                        <div className="entry-content">
                                            <p> {data.description}
                                            </p> <br />
                                            <p> {data.description1}
                                            </p> <br />
                                            <ul className="list">
                                                {
                                                    this.state.list.map(data=> (
                                                        <li key={data.id}><em>{data.text}</em></li>
                                                    ))
                                                }
                                                
                                                
                                            </ul>
                                            <p> {data.description2}
                                            </p> <br />
                                            <div className="widget widget-tags">
                                                <div className="tag-cloud">
                                                    {
                                                        this.state.tabcloud.map(data =>(
                                                            <Link key={data.id} to="#" title="" className="tag-link">{data.tablink}</Link>
                                                        ))
                                                    }
                                                </div>
                                            </div>

                                            
                                            
                                            </div>
                                            
							        </article>
                                ))
                            }
                            
						</div>
                            <div className="main-single">
                                <div id="comments" className="comments-area">
                                    <div id="respond" className="comment-respond">
                                        <h3 id="reply-title" className="comment-reply-title">Leave A Reply <small><Link rel="nofollow" id="cancel-comment-reply-link" to="" >Cancel reply</Link></small></h3>
                                        <form action="" method="" id="commentform" className="clearfix"  >
                                            <div className="comment-left">
                                                <fieldset className="name-container">									
                                                <input type="text" id="author" placeholder="Name" className="tb-my-input" name="author" tabIndex="1"  size="32" aria-required="true" />
                                                </fieldset>
                                            </div>
                                            <fieldset className="email-container">									
                                                <input type="text" id="email" placeholder="Email" className="tb-my-input" name="email" tabIndex="2"  size="32" aria-required="true" />
                                            </fieldset>
                                            <p className="comment-form-cookies-consent"><input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" />
                                                <label htmlFor="wp-comment-cookies-consent">Save my name, email, and website in this browser for the next time I comment.
                                                </label>
                                            </p>
                                            <div className="comment-right">
                                                <fieldset className="message">
                                                    <textarea id="comment-message" placeholder="Comment" name="comment" rows="8" tabIndex="4"></textarea>
                                                </fieldset>
                                            </div>
                                                <p className="form-submit">
                                                    <input name="submit" type="submit" id="comment-reply" className="submit" value="Post Comment" />
                                                    {/* <input type="hidden" name="comment_post_ID" value="225" id="comment_post_ID" />
                                                    <input type="hidden" name="comment_parent" id="comment_parent" value="0" /> */}
                                                </p>
                                        </form>
                                </div>
                            </div>
					</div>        
                            
                            </div>
			            
                            <SidebarBlog /></div>
                        </div>
                    </section>
                <Footer />
                </div>
            </div>
            
        );
    }
}

export default BlogGrid;

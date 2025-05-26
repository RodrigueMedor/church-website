import React from 'react';
import './OurBelief.css';

const beliefSections = [
    {
        section: 'Core Doctrines',
        beliefs: [
            {
                id: 1,
                title: 'The Bible',
                content: 'We believe in the verbal inspiration of the Bible.',
                image: '/images/beliefs/bible1.png',
            },
            {
                id: 2,
                title: 'The Trinity',
                content: 'We believe in one God eternally existing in three persons: the Father, the Son, and the Holy Spirit.',
                image: '/images/beliefs/jesus.jpg',
            },
            {
                id: 3,
                title: 'Jesus Christ',
                content: 'We believe that Jesus Christ is the only begotten Son of the Father, conceived of the Holy Spirit, and born of the Virgin Mary. He was crucified, buried, and raised from the dead. He ascended to heaven and is today at the right hand of the Father as the intercessor.',
                image: '/images/beliefs/jesuschrist.webp',
            },
        ],
    },
    {
        section: 'Salvation & Christian Living',
        beliefs: [
            {
                id: 4,
                title: 'Salvation',
                content: 'We believe that all have sinned and come short of the glory of God and that repentance is commanded of God for all and necessary for forgiveness of sins. Justification, regeneration, and the new birth are received by faith in the blood of Jesus Christ.',
                image: '/images/beliefs/salvation.jpg',
            },
            {
                id: 5,
                title: 'Sanctification',
                content: 'We believe in sanctification subsequent to the new birth, through faith in the blood of Jesus Christ; through the Word, and by the Holy Spirit.',
                image: '/images/beliefs/sanctification.webp',
            },
            {
                id: 6,
                title: 'Holiness',
                content: 'We believe holiness to be God’s standard of living for His people.',
                image: '/images/beliefs/holiness.jpg',
            },
        ],
    },
    {
        section: 'Spiritual Gifts & Ordinances',
        beliefs: [
            {
                id: 7,
                title: 'Baptism and the Holy Spirit',
                content: 'We believe in the baptism and the receiving of the Holy Spirit on the day of our conversion.',
                image: '/images/beliefs/baptism.jpg',
            },
            {
                id: 8,
                title: 'Speaking in Tongues',
                content: 'We believe in speaking in tongues as prompted by the Holy Spirit.',
                image: '/images/beliefs/tongues.jpg',
            },
            {
                id: 9,
                title: 'Water Baptism',
                content: 'We believe that water baptism is by immersion only in the name of the Father, the Son, and the Holy Spirit.',
                image: '/images/beliefs/baptismcopy.png',
            },
            {
                id: 10,
                title: 'Divine Healing',
                content: 'We believe in divine healing provided by God according to His sovereignty.',
                image: '/images/beliefs/healing.jpg',
            },
            {
                id: 11,
                title: 'The Lord’s Supper',
                content: 'We believe in the Lord’s Supper as a memorial to the death, burial, and resurrection of Jesus.',
                image: '/images/beliefs/lord.webp',
            },
        ],
    },
    {
        section: 'Eschatology & Human Identity',
        beliefs: [
            {
                id: 12,
                title: 'Second Coming of Jesus',
                content: 'We believe in the premillennial second coming of Jesus: first, to resurrect the righteous dead and to gather the living saints to Him in the air; second, to reign on the earth for a thousand years.',
                image: '/images/beliefs/jesus-coming.jpg',
            },
            {
                id: 13,
                title: 'Eternal Life and Punishment',
                content: 'We believe in eternal life for the righteous living with Christ, and eternal punishment for the wicked.',
                image: '/images/beliefs/eternellife.jpg',
            },
            {
                id: 14,
                title: 'Creation of Humanity',
                content: 'We believe that God creates each person as male or female in the image and nature of God, and rejection of one’s biological sex is a rejection of the image of God within that person.',
                image: '/images/beliefs/creation.webp',
            },
            {
                id: 15,
                title: 'Marriage',
                content: 'We believe that the term “marriage” has one meaning: the joining of one man and one woman in a single exclusive union as stated in the Holy Bible, and that sexual intimacy should only occur between a man and a woman who are married to each other.',
                image: '/images/beliefs/marraige.jpg',
            },
        ],
    },
];

const OurBelief = () => (
    <main className="our-belief-bg">
        <header className="our-belief-banner" role="banner">
            <h1>OUR BELIEF</h1>
            <p>Learn about the core principles that guide our faith and mission.</p>
        </header>
        <section className="our-belief-content">
            {beliefSections.map((section) => (
                <article key={section.section} className="belief-section">
                    <h2 className="section-title">{section.section}</h2>
                    <div className="belief-cards">
                        {section.beliefs.map((belief, index) => (
                            <div
                                key={belief.id}
                                className={`belief-card ${index % 2 === 0 ? 'left' : 'right'}`}
                            >
                                <div className="belief-card-text">
                                    <h3>{belief.title}</h3>
                                    <p>{belief.content}</p>
                                </div>
                                <figure className="belief-card-image">
                                    <img src={belief.image} alt={belief.title} loading="lazy" />
                                </figure>
                            </div>
                        ))}
                    </div>
                </article>
            ))}
        </section>
    </main>
);

export default OurBelief;
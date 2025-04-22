const menus = [
    {
        id: 1,
        name: 'Our Family',
        linkmenu: '/',
        namesub: [
            {
                id: 1,
                sub: 'Our Family',
                links: '/',
                submenu: undefined
            }
            // {
            //     id: 2,
            //     sub: 'Home Widget Header',
            //     links: '/index-v3',
            //     submenu: undefined
            // },
            // {
            //     id: 3,
            //     sub: 'Home Modern Header',
            //     links: '/index-v2',
            //     submenu: undefined
            // },
            // {
            //     id: 4,
            //     sub: 'Home Transparent Header',
            //     links: '/index-v4',
            //     submenu: undefined
            // },
            // {
            //     id: 5,
            //     sub: 'Home Layout 02',
            //     links: 'index-layout2',
            //     submenu: undefined
            // },
            // {
            //     id: 6,
            //     sub: 'Home Layout 03',
            //     links: '/index-v5',
            //     submenu: undefined
            // }
        ]
    },
    {
        id: 2,
        name: 'About',
        linkmenu: '/about-v2',
        namesub: [
            {
                id: 1,
                sub: 'Church History',
                links: '/about-v2',
                submenu: undefined
            },
            {
                id: 2,
                sub: 'Our Belief',
                links: '/about-v3',
                submenu: undefined
            },
            // {
            //     id: 3,
            //     sub: 'Our Vision for incoming years',
            //     links: '/about-v3',
            //     submenu: undefined
            // },
            // {
            //     id: 3,
            //     sub: 'Ministry team',
            //     links: '/about-v4',
            //     submenu: undefined
            // }
        ],
    },
    {
        id: 3,
        name: 'Services',
        linkmenu: '/services-v1',
        namesub:  [
            {
                id: 1,
                sub: 'Worship Together',
                links: '/services-v1',
                submenu: undefined
            }
            // {
            //     id: 2,
            //     sub: 'Join the volunteer team',
            //     links: '/services-v2',
            //     submenu: undefined
            // }
            // {
            //     id: 3,
            //     sub: 'Youth Services',
            //     links: '/services-v2',
            //     submenu: undefined
            // }
        ],
    },
    // {
    //     id: 4,
    //     name: 'Portfolio',
    //     linkmenu: '/portfolio-v3',
    //     namesub: [
    //         {
    //             id: 1,
    //             sub: 'Portfolio Default',
    //             links: '/portfolio-v3',
    //             submenu: undefined
    //         },
    //         {
    //             id: 2,
    //             sub: 'Layout 02',
    //             links: '/portfolio-v2',
    //             submenu: undefined
    //         },
    //         {
    //             id: 3,
    //             sub: 'Portfolio Load More',
    //             links: '/portfolio-v1',
    //             submenu: undefined
    //         }
    //     ],
    // },
    {
        id: 4,
        name: 'Ministries',
        linkmenu: '/all-ministries',
        namesub: [
            {
                id: 1,
                sub: 'All Ministries',
                links: '/all-ministries',
                submenu: undefined
            },
            {
                id: 2,
                sub: 'Men Ministry',
                links: '/men-ministry',
                submenu: undefined
            },
            {
                id: 3,
                sub: 'Women Ministry',
                links: '/women-ministry',
                submenu: undefined
            },
            {
                id: 4,
                sub: 'Youth Ministry',
                links: '/youth-ministry',
                submenu: undefined
            }
        ]
    },
    {
        id: 5,
        name: 'Leadership',
        linkmenu: '/staff',
        namesub: [
            {
                id: 1,
                sub: 'Staff Member',
                links: '/staff',
                submenu: undefined
            },
            {
                id: 2,
                sub: 'Leadership',
                links: '/leadership',
                submenu: undefined
            },
        ]
    },
    {
        id: 6,
        name: 'Events',
        linkmenu: '/blog',
        namesub: [
            {
                id: 1,
                sub: 'Events',
                links: '/blog',
                submenu: undefined
            }
        ]
    },
    {
        id: 7,
        name: 'Contact',
        linkmenu: '/contact-v1',
        namesub: [
            {
                id: 1,
                sub: 'Contact',
                links: '/contact-v1',
                submenu: undefined
            }
        ]
    }
]

export default menus;

module.exports = {
    title: 'los-angeles-ends',
    songs: [
        require('./through-the-windshield/index.js'),
        require('./los-angeles-ends/index.js'),
        require('./high-occupancy-vehicle/index.js'),
        require('./horizon/index.js'),
        require('./blue/index.js')
    ],
    listenLinks: [
        {
            href: 'http://simulcast.bandcamp.com',
            text: 'Bandcamp'
        },
        {
            href: '',
            text: 'Spotify'
        },
        {
            href: '',
            text: 'Apple Music'
        }
    ],
    socialLinks: [
        {
            href: 'http://twitter.com/thisissimulcast',
            text: 'Twitter'
        },
        {
            href: 'http://instagram.com/thisissimulcast',
            text: 'Instagram'
        },
        {
            href: 'http://soundcloud.com/thisissimulcast',
            text: 'Soundcloud'
        }
    ],
    // Use asterisks around *someone's name* to make it pink
    credits: markdown`
        *END CREDITS*

        All research, writing, performance, arrangement, engineering, production, and mixing by *[Tristan Rodman](www.tristanrodman.com)* unless noted here.

        Tracks 2, 3, 4, and 5 contain material sampled from master recordings mixed by *Seth Manchester* at *[Machines With Magnets](http://www.machineswithmagnets.com)* in Pawtucket, RI
        & mastered by *Heba Kadry* at *[Timeless Mastering](http://www.timelessmastering.com/hebakadry/)* in Brooklyn, NY.

        *[J. Mamana](https://jmamana.net/)* plays synthesizer on track 3 and takes a guitar solo on track 4.
        *Matthew Marsico* plays drums on tracks 2 and 4. They also play the wurlitzer stabs on track 4.
        *Seth Manchester* engineered the drum recordings at Machines With Magnets in Pawtucket, RI.

        Tracks 2 and 4 feature recordings of the ARP 2500 at Brown University sequenced using *[Braid](http://braid.live/)*, written in Python by *[Brian House](https://brianhouse.net/)*.

        *[Will Urmston](http://urmston.xyz)* designed and developed this website.

        Jesenya Maldonado drew the homepage map.

        *[David Anthony King](http://davidanthonyking.com/)* designed the Simulcast logo.

        Endless thanks to Howard A. Rodman, Jay Mamana, Matthew Marsico, Connor McGuigan, Isaac Schneider, and Jesenya Maldonado for their love, collaboration, and support.

        Dedicated to my mother, *Anne Friedberg*, who is listening, somewhere, on the other side.

        📡 – *[Simulcast](http://www.simulcast.fm)*
    `
}

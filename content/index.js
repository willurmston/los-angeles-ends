module.exports = {
    title: 'Los Angeles Ends',
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
        All songs written, arranged, engineered, produced, and mixed by *Tristan Rodman*.

        Tracks 2, 3, 4, and 5 contain material sampled from master recordings mixed by *Seth Manchester* at *[Machines With Magnets](http://www.machineswithmagnets.com)* in Pawtucket, RI
        & mastered by *Heba Kadry* at *[Timeless Mastering](http://www.timelessmastering.com/hebakadry/)* in Brooklyn, NY.

        *[J. Mamana](https://jmamana.net/)* plays synthesizer on track 3 and takes a guitar solo on track 4.
        *[Matthew Marsico](https://theplacenames.bandcamp.com/)* plays drums on tracks 2 and 4. They also play the wurlitzer stabs on track 4.
        *Seth Manchester* engineered the drum recordings at Machines With Magnets in Pawtucket, RI.

        Tracks 2 and 4 feature recordings of the ARP 2500 at Brown University sequenced using *[Braid](http://braid.live/)*, written in Python by *[Brian House](https://brianhouse.net/)*.

        *[Will Urmston](http://urmston.xyz)* designed and developed this website.

        Dedicated my mother, *Anne Friedberg*, who is listening, somewhere, on the other side.

        Endless thanks to Howard A. Rodman, J. Mamana, Matthew Marsico, Connor McGuigan, Isaac Schneider, and Jesenya Maldonado for their love, collaboration, and support.
    `
}

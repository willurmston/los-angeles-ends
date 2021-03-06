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
            href: 'http://twitter.com/simulcast__',
            text: 'Twitter'
        },
        {
            href: 'http://instagram.com/simulcast__',
            text: 'Instagram'
        },
        {
            href: 'http://soundcloud.com/simulcastsimulcast',
            text: 'Soundcloud'
        }
    ],
    // Use asterisks around *someone's name* to make it pink
    credits: markdown`

        Research, writing, performance, arrangement, engineering, production, and re-mixing by *[Tristan Friedberg Rodman](http://www.instagram.com/simulcast__)*.

        ## SOUND

        Tracks 2, 3, 4, and 5 contain material sampled from master recordings mixed by *Seth Manchester* at *[Machines With Magnets](http://www.machineswithmagnets.com)* in Pawtucket, RI & mastered by *Heba Kadry* at *[Timeless Mastering](http://www.timelessmastering.com/hebakadry/)* in Brooklyn, NY.

        *[J. Mamana](https://jmamana.net/)* plays synthesizer on track 3 and takes a guitar solo on track 4.
        *Matthew Marsico* plays drums on tracks 2 and 4.
        *Seth Manchester* engineered the drum recordings at Machines With Magnets in Pawtucket, RI.

        Tracks 2 and 4 feature recordings of the ARP 2500 at Brown University sequenced using *[Braid](http://braid.live/)*, written in Python by *[Brian House](https://brianhouse.net/)*.

        ## DESIGN

        *[David Anthony King](http://davidanthonyking.com/)* drew the Simulcast logo.
        *[Will Urmston](http://urmston.website)* designed and developed this website. [View source.](https://github.com/simulcast/los-angeles-ends)

        ## ACKNOWLEDGEMENTS

        Endless thanks to *Howard A. Rodman*, *Jay Mamana*, *Matthew Marsico*, *Noah Klein*, *Carly Eiseman*, *Isaac Schneider*, and *Jesenya Maldonado* for their love, collaboration, and support.

        Dedicated to my mother, *Anne Friedberg*, who is still tuning in, somewhere, out of frame.

        📡 – *[Simulcast](http://www.simulcast.fm)*
    `
}

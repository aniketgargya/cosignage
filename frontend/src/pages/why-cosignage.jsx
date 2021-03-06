import Head from "next/head";

const WhyCosignage = () => (
    <>
        <style jsx>{`
            main {
                padding: 50px 100px;
            }

            h1 {
                margin-bottom: 20px;
            }

            h2 {
                margin-top: 20px;
                margin-bottom: 20px;
            }

            p {
                margin-bottom: 10px;
            }

            @media only screen and (max-width: 600px) {
                main {
                    padding: 50px 25px;
                }
            }
        `}</style>
        <Head>
            <title>Why Cosignage</title>
            <meta name="description" content="Why Cosignage? Cosignage is a set of Coronavirus-communication signage meant to ease your business’ communication during the coronavirus pandemic." />
        </Head>

        <main>
            <h1>Why Cosignage?</h1>
            <h2>Cosignage is a Coronavirus-communication signage aimed to support local businesses.</h2>
            <p>Take Jerry’s Pizza, for example. A local pizza parlor that has been a family-favorite for the past 10 years. As the regulations change, Jerry’s is able to offer outdoor seating and curbside pickup, but requires all customers to wear masks and enforces a strict 30-person maximum occupancy due to their size. Unable to afford costly signage and other advertising methods, Jerry’s struggles to efficiently communicate their available services with customers.</p>
            <p>Jerry’s Pizza’s story isn’t unique. Hundreds of businesses across the nation are facing the same issues as they begin to reopen. In the rapidly changing competitive market landscape, having accurate, effective signage is absolutely essential for communication between businesses and customers.</p>
            <h2>How can Cosignage support your business?</h2>
            <p>Cosignage is a set of Coronavirus-communication signage meant to ease your business’ communication during the coronavirus pandemic. Available in a variety of designs, Cosignage is customizable to your specific needs. With its uniform symbols and color, customers will no longer face confusion when looking for the most up-to-date information regarding your business.</p>
            <p>We are dedicated to making Cosignage affordable to businesses of all sizes to ensure that every business can receive the support they need. If you feel that Cosignage does not meet your business’ needs, please feel free to contact us by phone or through email.</p>
        </main>
    </>
);

export default WhyCosignage;

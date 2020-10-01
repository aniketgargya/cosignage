import { useQuery } from "react-query";
import axios from "axios";
import { Message, Loader, CustomButton } from "../components";
import { axiosError } from "../functions";
import Link from "next/link";
import Head from "next/head";

const Order = () => {
    const { data, isLoading, error } = useQuery("products", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const { data } = await axios({
            method: "GET",
            url: "/api/p/products"
        });
        return data;
    }, {
        retry: false
    });

    return (
        <>
            <style jsx>{`
                main {
                    padding: 50px 100px;
                }

                main header {
                    margin-bottom: 20px;
                }

                .signs-container {
                    margin-top: 50px;
                    position: relative;
                    min-height: 40vh;

                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    justify-content: center;
                    justify-items: center;
                    row-gap: 50px;
                    column-gap: 4%;
                }

                .sign-container {
                    width: 100%;
                    max-width: 400px;
                    padding: 50px 35px;
                    box-shadow: 0 4px 4px rgba(0,0,0,0.269);
                    border-radius: 5px;
                    background-color: var(--color-gray-light-1);
                    border: 3px var(--color-gray-light-2) solid;
                }

                .sign-container img {
                    width: 150px;
                    margin: 0 auto 10px auto;
                    display: block;
                }

                .sign-container .sign-name {
                    text-align: center;
                }

                .sign-container .stock-status {
                    font-size: 18px;
                    text-align: center;
                }

                .sign-container .button-container {
                    margin-top: 30px;
                    text-align: center;
                }

                @media only screen and (max-width: 1200px) {
                }

                @media only screen and (max-width: 1000px) {
                    main {
                        padding: 50px 50px;
                    }
                }

                @media only screen and (max-width: 500px) {
                    .signs-container {
                        grid-template-columns: 100%;
                    }

                    .sign-container img {
                        width: 125px;
                    }
                }
            `}</style>
            <Head>
                <title>Order | cosignage.info</title>
                <meta name="description" content="Order Cosignage to ease your business’ communication during the coronavirus pandemic." />
            </Head>

            <main>
                <header>
                    <h1>Customizable Signage to Fit Your Business' Needs</h1>
                    <p>Cosignage is available in a variety of materials and sizes to best suit your business. Choose from six designs or submit your own custom request.</p>
                </header>
                {error ? <Message message={axiosError(error)} /> : null}
                <div className="signs-container">
                    {isLoading ? <Loader /> : (
                        <>
                            {data && data.products.map((product, i) => (
                                <div key={i} className="sign-container">
                                    <img src={`/img/signs/${product.imageName}.png`} />
                                        <div className="sign-name">
                                            <h2>{product.name}</h2>
                                        </div >
                                    <p>{product.description}</p>
                                    <div className="button-container">
                                    <Link href="/order/[_id]" as={`/order/${product._id}`}>
                                        <a>
                                            <CustomButton value={product.stockStatus} />
                                        </a>
                                    </Link>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </main >
        </>
    );
};

export default Order;

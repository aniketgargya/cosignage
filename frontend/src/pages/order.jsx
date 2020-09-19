import { useQuery } from "react-query";
import axios from "axios";
import { Message, Loader, CustomButton } from "../components";
import style from "../styles/pages/order.css";
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
            <style jsx>{style}</style>
            <Head>
                <title>Order | cosignage.info</title>
                <meta name="description" content="Order Cosignage to ease your business’ communication during the coronavirus pandemic." />
            </Head>

            <main>
                <header>
                    <h1>Customizable Signage to Fit Your Business' Needs</h1>
                    <p>Cosignage is available in a variety of materials and sizes to best suit your business. Choose from six designs or submit your own custom request.</p>
                </header>
                <div className="signs-container">
                    {isLoading ? <Loader /> : (
                        <>
                            {error ? <Message message={axiosError(error)} /> : null}
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

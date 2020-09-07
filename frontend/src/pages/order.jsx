import { useQuery } from "react-query";
import axios from "axios";
import { Message, Loader } from "../components";
import style from "../styles/pages/order.css";
import { axiosError } from "../functions";
import Link from "next/link";

const Order = () => {
    const { data, isLoading, error } = useQuery("products", async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
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

            <main>
                <header>
                    <h1>Customizable Signage to Fit Your Business' Needs</h1>
                    <p>Cosignage is available in a variety of materials and sizes to best suit your business. Choose from six designs or submit your own custom request.</p>
                </header>
                <div className="signs-container">
                    {
                        isLoading ? (
                            <Loader />
                        ) : (
                                <>
                                    {error ? <Message message={axiosError(error)} /> : null}
                                    {data && data.products.map((product, i) => (
                                        <div key={i} className="sign-container">
                                            <img src={`/img/signs/${product.imageName}.png`} />
                                            <Link href="/order/[_id]" as={`/order/${product._id}`}>
                                                <a className="sign-name">
                                                    <h2>{product.name}</h2>
                                                </a>
                                            </Link>
                                            <span className="stock-status">{product.stockStatus}</span>
                                            <span className="starting-price">{`$${product.startingPrice}`}</span>
                                        </div>
                                    ))}
                                </>
                            )
                    }
                </div>
            </main >
        </>
    );
};

export default Order;

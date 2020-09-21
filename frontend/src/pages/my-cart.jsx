import axios from "axios";
import { useCart } from "../contexts";
import { Message, Loader, CustomButton } from "../components";
import { axiosError } from "../functions"
import style from "../styles/pages/my-cart.css";
import { useQuery } from "react-query";
import Head from "next/head";
import Link from "next/link";

const MyCart = () => {
    const { cart } = useCart();

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
                <title>My Cart | cosignage.info</title>
                <meta name="description" content="Order Cosignage to ease your business’ communication during the coronavirus pandemic." />
            </Head>

            <main>
                <h1>My Cart</h1>
                {isLoading ? <Loader /> : (
                    <>
                        {error ? <Message message={axiosError(error)} /> : null}
                        {data && (
                            <div className="full">
                                <div className="detailed">
                                    {Object.keys(cart).map((cartItemId, i) => {
                                        const [product] = data.products.filter(({ _id }) => cartItemId == _id);

                                        return (
                                            <div className="product" key={i}>
                                                <img src={`/img/signs/${product.imageName}.png`} />
                                                <div className="text">
                                                    <Link href={`/order/${cartItemId}`}><a className="product-name-link"><h2>{product.name}</h2></a></Link>
                                                    <p className="description">{product.description}</p>
                                                    {Object.keys(cart[cartItemId]).map((variationId, i) => {
                                                        const [variation] = product.variations.filter(variation => variation.variationId == variationId);
                                                        return (
                                                            <div key={i} className="variation">
                                                                <p className="variation-name">{variation.name}</p>
                                                                <p>Quantity: {cart[cartItemId][variationId]}</p>
                                                                <p>Unit Price: ${variation.price}</p>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="summary">
                                    <h2>Summary</h2>
                                    {Object.keys(cart).map((cartItemId, i) => {
                                        const [product] = data.products.filter(({ _id }) => cartItemId == _id);
                                        const totalAmount = Object.keys(cart[cartItemId]).reduce((t, variationId) => t + cart[cartItemId][variationId], 0);
                                        const totalPrice = Object.keys(cart[cartItemId]).reduce((t, variationId) => {
                                            const [{ price }] = product.variations.filter(variation => variation.variationId === variationId);
                                            return t + price * cart[cartItemId][variationId];
                                        }, 0);
                                        return (
                                            <div key={i} className="line">
                                                <p>
                                                    {product.name} (x{totalAmount})
                                                </p>
                                                <p>
                                                    ${(totalPrice).toFixed(2)}
                                                </p>
                                            </div>
                                        );
                                    })}
                                    <Link href="/checkout"><a>
                                        <CustomButton value="Checkout" />
                                    </a></Link>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default MyCart;

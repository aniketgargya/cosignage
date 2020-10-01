import axios from "axios";
import { useCart } from "../contexts";
import { Message, Loader, CustomButton } from "../components";
import { axiosError } from "../functions"
import { useQuery } from "react-query";
import Head from "next/head";
import Link from "next/link";

const MyCart = () => {
    const { cart, setCartItemQuantity } = useCart();

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

    const total = !data ? 0 : Object.keys(cart).reduce((i, cartItemId) => {
        const [product] = data.products.filter(({ _id }) => cartItemId == _id);
        const totalPrice = Object.keys(cart[cartItemId]).reduce((t, variationId) => {
            const [{ price }] = product.variations.filter(variation => variation.variationId === variationId);
            return t + price * cart[cartItemId][variationId];
        }, 0);
        return i + totalPrice;
    }, 0);

    const tax = (total * 0.0625);
    const grandTotal = total + tax;

    return (
        <>
            <style jsx>{`
                main {
                    padding: 50px 100px;
                    min-height: 80vh;
                }

                .full {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                h1 {
                    margin-bottom: 20px;
                }

                .detailed {
                    width: 60%;
                }

                .detailed .product {
                    margin: 50px 0;
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                }

                .detailed .product img {
                    width: 250px;
                    margin-right: 40px;
                }

                .detailed .product .text {
                    margin-top: 10px;
                }

                .detailed .product .product-name {
                    display: flex;
                    align-items: center;
                }

                .detailed .product .product-name h2 {
                    margin-right: 10px;
                }

                .detailed .product .product-link {
                    width: 1.75em;
                    height: 1.75em;
                }

                .detailed .product .description {
                    margin-bottom: 10px;
                }

                .detailed .product .variation:not(:last-child) {
                    margin-bottom: 10px;
                }

                .detailed .product .variation .variation-header {
                    display: flex;
                    align-items: center;
                }

                .detailed .product .variation .variation-name {
                    text-decoration: underline;
                    margin-right: 10px;
                }

                .detailed .product .variation .trash {
                    height: 1.8em;
                    width: 1.8em;
                    cursor: pointer;
                }

                a:link, a:visited, a, a:hover {
                    text-decoration-color: currentColor;
                }

                .summary {
                    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
                    background-color: var(--color-gray-light-2);
                    color: white;
                    width: 35%;
                    padding: 20px;
                    border-radius: 3px;
                }

                .summary .line {
                    display: flex;
                    justify-content: space-between;
                }

                .summary .line {
                    margin: 10px 0;
                }

                .summary .final > * {
                    font-weight: 700;
                    font-size: 1.2em;
                }

                @media only screen and (max-width: 1400px) {
                    .detailed .product img {
                        width: 200px;
                    }
                }

                @media only screen and (max-width: 1250px) {
                    .full {
                        flex-direction: column-reverse;
                    }

                    .detailed {
                        width: 100%;
                    }

                    .summary {
                        width: 100%;
                        padding: 35px 50px;
                    }
                }

                @media only screen and (max-width: 1000px) {
                    main {
                        padding: 50px 50px;
                    }
                }

                @media only screen and (max-width: 700px) {
                    .summary {
                        padding: 20px;
                    }
                }

                @media only screen and (max-width: 600px) {
                    .detailed .product {
                        flex-direction: column;
                        /* text-align: center; */
                    }

                    .detailed .product img {
                        align-self: center;
                    }

                    .detailed .product h2 {
                        align-self: stretch;
                        text-align: center;
                    }
                }

                @media only screen and (max-width: 400px) {
                    .summary {
                        padding: 20px 10px;
                    }
                }
            `}</style>
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
                                                    <div className="product-name">
                                                        <h2>{product.name}</h2>
                                                        <Link href={`/order/${cartItemId}`}><a>
                                                            <svg className="product-link">
                                                                <use
                                                                    xlinkHref="/img/icon/my-cart/pencil.svg#pencil"
                                                                ></use>
                                                            </svg>
                                                        </a></Link>
                                                    </div>

                                                    <p className="description">{product.description}</p>
                                                    {Object.keys(cart[cartItemId]).map((variationId, i) => {
                                                        const [variation] = product.variations.filter(variation => variation.variationId == variationId);
                                                        return (
                                                            <div key={i} className="variation">
                                                                <div className="variation-header">
                                                                    <p className="variation-name">{variation.name}</p>
                                                                    <svg
                                                                        className="trash"
                                                                        onClick={() => setCartItemQuantity(cartItemId, variationId, 0)}
                                                                    >
                                                                        <use
                                                                            xlinkHref="/img/icon/my-cart/trash.svg#trash"
                                                                        ></use>
                                                                    </svg>
                                                                </div>
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
                                    <div className="line">
                                        <p>Tax (6.25%)</p>
                                        <p>${tax.toFixed(2)}</p>
                                    </div>
                                    <div className="line final">
                                        <p>Total</p>
                                        <p>${grandTotal.toFixed(2)}</p>
                                    </div>
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

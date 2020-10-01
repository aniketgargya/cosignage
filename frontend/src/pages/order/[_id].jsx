import axios from "axios";
import { CustomButton, Message, NumberField } from "../../components";
import { has } from "lodash";
import { useEffect, useState } from "react";
import { useCart } from "../../contexts";
import { axiosError } from "../../functions";
import Head from "next/head";

const OrderId = ({ _id, data, error }) => {
    const { cart, getCartItemQuantity, setCartItemQuantity } = useCart();
    const [currentVariationId, setCurrentVariationId] = useState(() => {
        if (has(data, ["product", "variations"]) && data.product.variations[0]) {
            return data.product.variations[0].variationId || null;
        } else {
            return null;
        }
    });
    const [temporaryCart, setTemporaryCart] = useState({});

    useEffect(() => {
        const temporaryCart = {};
        if (currentVariationId) {
            data.product.variations.forEach(({ variationId }) => {
                temporaryCart[variationId] = getCartItemQuantity(cart, _id, variationId);
            });
        }

        setTemporaryCart(temporaryCart);
    }, [cart]);

    return (
        <>
            <style jsx>{`
                main {
                    min-height: 30vw;
                    position: relative;
                    padding: 50px 100px;
                }

                .sign {
                    display: flex;
                    justify-content: space-between;
                }

                .sign .rest {
                    margin-right: 100px;
                }

                .sign .display {
                    display: flex;
                }

                .sign .display .main-img {
                    width: 450px;
                }

                .sign h1 {
                    margin-bottom: 20px;
                }

                .sign .select-input {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    align-items: center;
                }

                select {
                    font-family: inherit;
                    font-size: 18px;
                    padding: 6px 20px 6px 8px;
                    width: 50%;
                    min-width: 250px;
                    margin: 20px 50px 20px 0;
                }

                .sign .select-input-bottom {
                    margin-top: 10px;
                }

                .sign .select-input-bottom  {
                    display: flex;
                    align-items: center;
                }

                :global(.sign .select-input-bottom button) {
                    margin-right: auto;
                }

                @media only screen and (max-width: 1200px) {
                    .sign .display .main-img {
                        width: 300px;
                    }    
                }

                @media only screen and (max-width: 1000px) {
                    main {
                        padding: 50px;
                    }

                    .sign {
                        flex-direction: column-reverse;
                    }

                    .sign .display {
                        margin-bottom: 30px;
                        justify-content: center;
                    }

                    .sign .rest {
                        margin-right: 0;
                    }

                    select {
                        font-size: 14px;
                    }
                }

                @media only screen and (max-width: 500px) {
                    .sign .select-input {
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        align-items: center;
                    }

                    .sign .display .main-img {
                        width: 85%;
                    }

                    .sign .select-input {
                        margin-top: 20px;
                        flex-direction: column;
                        align-items: flex-start;
                        margin-bottom: 20px;
                    }

                    select {
                        min-width: auto;
                        width: 100%;
                        margin: 0;
                        margin-bottom: 20px;
                    }
                }
            `}</style>

            <main>
                <>
                    {error ? (
                        <>
                            <Head>
                                <title>Order | cosignage.info</title>
                            </Head>
                            <Message message={axiosError(error)} />
                        </>
                        ) : (
                        <>
                            <Head>
                                <title>Order {data.product.name} | cosignage.info</title>
                            </Head>

                            <div className="sign">
                                <div className="rest">
                                    <h1>{data.product.name}</h1>
                                    <p className="description">{data.product.description}</p>
                                    <div>
                                        <div className="select-input">
                                            <select onChange={e => setCurrentVariationId(e.target.value)}>
                                                {data.product.variations.map((variation, i) => (
                                                    <option key={i} value={variation.variationId}>{variation.name}</option>
                                                ))}
                                            </select>
                                            
                                            <NumberField
                                                min={0}
                                                max={data.product.variations.find(({variationId}) => variationId == currentVariationId).stock > 9 ? 9 : data.product.variations.find(({variationId}) => variationId==currentVariationId).stock}
                                                value={temporaryCart[currentVariationId] || 0}
                                                onChange={newValue => {
                                                    setTemporaryCart({
                                                        ...temporaryCart,
                                                        [currentVariationId]: newValue
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="select-input-bottom">
                                            <CustomButton
                                                value="Update Cart"
                                                disabled={getCartItemQuantity(cart, _id, currentVariationId) == temporaryCart[currentVariationId]}
                                                onClick={() => setCartItemQuantity(_id, currentVariationId, temporaryCart[currentVariationId])}
                                            />
                                            <h3>${(temporaryCart[currentVariationId] * data.product.variations.find(({variationId}) => variationId == currentVariationId).price).toFixed(2)}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="display">
                                    <img className="main-img" src={`/img/signs/${data.product.imageName}.png`} />
                                </div>
                            </div>
                        </>
                    )}
                </>
            </main>
        </>
    );
};

export const getServerSideProps = async ({ query: { _id } }) => {
    try {
        const { data }= await axios({
            method: "GET",
            url: `http://backend/p/products/${_id}`,
        });

        return {
            props: {
                key: _id,
                _id,
                data
            }
        };
    } catch (e) {
        return {
            props: {
                key: _id,
                _id,
                data: {},
                error: {
                    response: {
                        status: e.response.status,
                        data: e.response.data
                    }
                }
            }
        };
    }
};

export default OrderId;

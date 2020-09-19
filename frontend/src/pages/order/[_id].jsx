import axios from "axios";
import { CustomButton, Message, NumberField } from "../../components";
import { has } from "lodash";
import style from "../../styles/pages/order/[_id].css";
import { useEffect, useState } from "react";
import { useCart } from "../../contexts";
import { axiosError } from "../../functions";

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
            <style jsx>{style}</style>

            <main>
                <>
                    {error ? <Message message={axiosError(error)} /> : (
                        <>
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
                                        <CustomButton
                                            value="Add To Cart"
                                            disabled={getCartItemQuantity(cart, _id, currentVariationId) == temporaryCart[currentVariationId]}
                                            onClick={() => setCartItemQuantity(_id, currentVariationId, temporaryCart[currentVariationId])}
                                        />
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

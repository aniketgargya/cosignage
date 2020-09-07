import { useQuery } from "react-query";
import axios from "axios";
import { Message, Loader, NumberField } from "../../components";
import style from "../../styles/pages/order/[_id].css";
import { axiosError } from "../../functions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCart } from "../../contexts";

const OrderId = () => {
    const router = useRouter();
    const { getCartItemQuantity, setCartItemQuantity } = useCart();
    const { _id } = router.query;

    const { data, isLoading, error, isFetching, refetch } = useQuery(null, async () => {
        const { data } = await axios({
            method: "GET",
            url: `/api/p/products/${_id}`
        });
        return data;
    }, {
        enabled: false,
        retry: false
    });

    useEffect(() => {
        if (_id) refetch();
    }, [_id]);

    return (
        <>
            <style jsx>{style}</style>

            <main>
                {
                    (isLoading || isFetching) || (!data) ? (
                        <Loader />
                    ) : (
                            <>
                                {error ? <Message message={axiosError(error)} /> : null}
                                {data &&
                                    <>
                                        <div className="sign">
                                            <div className="majority">
                                                <h1>{data.product.name}</h1>
                                                <p>{data.product.description}</p>
                                            </div>
                                            <img src={`/img/signs/${data.product.imageName}.png`} />
                                        </div>
                                        <div className="quantity-section">
                                            {data.product.variations.map((variation, i) => (
                                                <NumberField
                                                    key={i}
                                                    min={0}
                                                    max={variation.stock}
                                                    value={getCartItemQuantity(_id, variation.variationId)}
                                                    onChange={newQuantity => setCartItemQuantity(_id, variation.variationId, newQuantity)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                }
                            </>
                        )
                }
            </main>
        </>
    );
};

export default OrderId;

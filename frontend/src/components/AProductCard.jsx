import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = ( { product }) => {

    const p = {
        name: "kanha",
        price: 100
    }
    return (
        <Link
            href={"/user/products/" + product._id}
            className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
        >
            <Image
                width={500}
                height={500}
                src={product.productImage}
                // src='/p1.png'
                alt={product.productName}
            />
            <div className="p-4 text-black/[0.9]">
                <h2 className="text-lg font-medium">{product.productName}</h2>
                <div className="flex items-center text-black/[0.5]">
                    <p className="mr-2 text-lg font-semibold">
                        &#8377;{product.productPrice}
                    </p>

                    {p.original_price && (
                        <>
                            <p className="text-base  font-medium line-through">
                                {/* &#8377;{p.original_price} */}
                                &#8377;{product.productPrice}
                            </p>
                            <p className="ml-auto text-base font-medium text-green-500">
                                p.original_price,
                                % off
                            </p>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
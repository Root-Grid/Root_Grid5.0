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
            className="w-65 justify-center flex flex-col items-center transform overflow-hidden bg-white duration-200 hover:scale-105 hover:bg-black/[0.03] cursor-pointer"
        >
            <Image
                width={200}
                height={200}
                src={product.productImage}
                alt={product.productName}
            />
            <div className="p-4 text-center text-black/[0.9]">
                <h2 className="text-md font-medium">{product.productName}</h2>
                <div className="flex items-center justify-center text-black/[0.5]">
                    <p className="text-lg font-semibold">&#8377;{product.productPrice}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
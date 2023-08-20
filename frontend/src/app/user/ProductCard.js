import Link from "next/link";
// import PriceTag from "./PriceTag";
import Image from "next/image";


export default function ProductCard({ product }) {

  return (
    <Link
      href={"/user/products/" + product._id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
    >
      <figure>
        <Image
          src={product.productImage}
          alt={product.productName}
          width={800}
          height={400}
          className="h-48 object-cover"
          layout="responsive"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.productName}</h2>
        <p>{product.prodctDiscription}</p>
        <div>{product.productPrice}</div>
      </div>
    </Link>
);
}
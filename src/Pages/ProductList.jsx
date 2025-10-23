// src/components/ProductList.jsx
import { Link } from "react-router-dom";

const products = [
  { id: 1, name: "Earthen Bottle", price: "$48", imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-01.jpg", imageAlt: "Tall slender porcelain bottle." },
  { id: 2, name: "Nomad Tumbler", price: "$35", imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-02.jpg", imageAlt: "Olive drab green insulated bottle." },
  { id: 3, name: "Focus Paper Refill", price: "$89", imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-03.jpg", imageAlt: "Person using a pen." },
  { id: 4, name: "Machined Mechanical Pencil", price: "$35", imageSrc: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-04.jpg", imageAlt: "Black machined pencil." },
];

export default function ProductList() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group"
            >
              <img
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 transition"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

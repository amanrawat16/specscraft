import { MOCK_PRODUCTS } from "@/app/data/products";

type BlockProps = {
  name: string;
  image?: string;
  products?: string;
};

export const BlockRenderer = ({ name, image, products }: BlockProps) => {
  const productList = products?.split(",") ?? [];
  const matchedProduct = MOCK_PRODUCTS.filter((p) => productList.includes(p.sku));

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-10 rounded-xl my-10 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{name}</h2>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Block Image */}
        {image && (
          <div className="w-full h-full">
            <img
              src={image}
              alt={name}
              className="rounded-lg w-full h-full object-cover max-h-[400px]"
            />
          </div>
        )}

        {/* Right: 2x2 Product Grid */}
        <div className="grid grid-cols-1 gap-4">
          {matchedProduct.map((p) => (
            <div
              key={p.sku}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-md transition-all"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                  Product : {p.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm">Price: {p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

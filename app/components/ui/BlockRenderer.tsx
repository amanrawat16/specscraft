import { MOCK_PRODUCTS } from "@/app/data/products";

type BlockProps = {
    name : string,
    image? : string,
    products? : string
}

export const BlockRenderer = ({name,image,products}: BlockProps)=>{

    const productList = products?.split(",") ?? [];
    const matchedProduct = MOCK_PRODUCTS.filter((p)=> productList.includes(p.sku));

    return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded my-6 shadow">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      {image && (
        <img src={image} alt={name} className="w-full mb-3 rounded" />
      )}
       {matchedProduct.map((p) => (
          <div key={p.sku} className="p-4 border rounded-xl bg-white dark:bg-gray-900">
            <img src={p.image} alt={p.name} className="w-full h-40 object-contain mb-2" />
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600">{p.price}</p>
          </div>
        ))}
    </div>
  );
}
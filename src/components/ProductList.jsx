import { useState } from "react";
export default function ProductList() {
  const [value, setValue] = useState("");
  function handleChange(element) {
    setValue(element.target.value);
  }

  let valueWithFirstUpperCase;

  if (value.length > 0) {
    valueWithFirstUpperCase = value[0].toUpperCase() + value.slice(1);
  } else {
    valueWithFirstUpperCase = value;
  }

  const products = [
    { id: 1, name: "Laptop", price: 999, category: "Tech" },
    { id: 2, name: "Smartphone", price: 699, category: "Tech" },
    { id: 3, name: "Chaise de bureau", price: 149, category: "Mobilier" },
    { id: 4, name: "Clavier mécanique", price: 129, category: "Tech" },
    { id: 5, name: "Souris gaming", price: 59, category: "Tech" },
    { id: 6, name: "Bureau", price: 299, category: "Mobilier" },
    { id: 7, name: "Lampe LED", price: 39, category: "Mobilier" },
    { id: 8, name: "Casque audio", price: 199, category: "Tech" },
    { id: 9, name: "Webcam HD", price: 89, category: "Tech" },
    { id: 10, name: "Étagère", price: 79, category: "Mobilier" },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.includes(valueWithFirstUpperCase) ||
      product.category.includes(valueWithFirstUpperCase),
  );

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Catégorie</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

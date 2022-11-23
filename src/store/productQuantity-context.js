import { createContext, useState } from 'react';

const ProductQuantityContext = createContext();

const ProductQuantityProvider = ({ children }) => {
  const [quantity, setQuantity] = useState([]);

  return (
    <ProductQuantityContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </ProductQuantityContext.Provider>
  );
};

export { ProductQuantityProvider, ProductQuantityContext };

import {
  Wrap
} from "@chakra-ui/react";
import { Item } from "./ProductCard";


export const ProductGrid = ({ products }) => {
  


  return (
    <Wrap spacing="20px">
      {products &&
        products.map((product) => (
        <Item product={product} key={product.id}/>
        ))}
    </Wrap>
  );
};

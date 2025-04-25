"use client";

import { BookModel } from "@/api/features/authenticate/book/BookModel";
import ProductBook from "@/components/common/product";
import books from "../bookData";
  

const ShopScreen = () => {
    return(
    <div className="flex flex-wrap justify-center p-4">
    {books.map((book) => (
      <ProductBook key={book.id} product={book} />
    ))}
  </div>
);
};

export default ShopScreen;
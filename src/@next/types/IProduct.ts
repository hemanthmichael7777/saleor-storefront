import { ProductList_products_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";
import { ProductList_products_edges_node as pOurs } from "../../views/Product/gqlTypes/ProductList";

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IProduct = WithOptional<
  ProductList_products_edges_node,
  "slug" | "seoTitle" | "seoDescription"
>;

export type IProductControlled = WithOptional<
pOurs,
  "slug" | "seoTitle" | "seoDescription"
>;

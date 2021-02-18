/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: StoreLocator
// ====================================================

export interface StoreLocator_page {
  __typename: "StoreLocator";
  contentJson: any;
  /**
   * The ID of the object.
   */
  id: string;
  seoDescription: string | null;
  seoTitle: string | null;
  slug: string;
  title: string;
}

export interface StoreLocator_shop_homepageCollection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface StoreLocator_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: StoreLocator_shop_homepageCollection_backgroundImage | null;
}

export interface StoreLocator_shop {
  __typename: "Shop";
  /**
   * Collection displayed on homepage.
   */
  homepageCollection: StoreLocator_shop_homepageCollection | null;
}

export interface StoreLocator {
  /**
   * Look up a page by ID or slug.
   */
  page: StoreLocator_page | null;
  /**
   * Return information about the shop.
   */
  shop: StoreLocator_shop;
}

export interface StoreLocatorVariables {
  slug: string;
}

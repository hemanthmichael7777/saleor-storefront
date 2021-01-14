/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FittingPage
// ====================================================

export interface FittingPage_page {
  __typename: "FittingPage";
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

export interface FittingPage_shop_homepageCollection_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface FittingPage_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: FittingPage_shop_homepageCollection_backgroundImage | null;
}

export interface FittingPage_shop {
  __typename: "Shop";
  /**
   * Collection displayed on homepage.
   */
  homepageCollection: FittingPage_shop_homepageCollection | null;
}

export interface FittingPage {
  /**
   * Look up a page by ID or slug.
   */
  page: FittingPage_page | null;
  /**
   * Return information about the shop.
   */
  shop: FittingPage_shop;
}

export interface FittingPageVariables {
  slug: string;
}

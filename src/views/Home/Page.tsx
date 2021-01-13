import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import { generateCollectionUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_collections,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

import noPhotoImg from "../../images/no-photo.svg";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
  collections: ProductsList_collections;
}> = ({ backgroundImage, shop, collections }) => {
  const collectionsExist = () => {
    return collections && collections.edges && collections.edges.length > 0;
  };

  var filteredCollections = [];
  if(collectionsExist()){
    filteredCollections = collections.edges.filter((c) => {
      if(c.node.metadata.length > 0){
        return c.node.metadata.filter((e) => {
          return e.value === 'mood'
        }).length > 0;
      }
    });

    filteredCollections = filteredCollections.sort(function (a, b) {
      var valueA = a.node.metadata.filter((q: any) => {
        return q.key === "homeDisplayOrder";
      });
      var valueB = b.node.metadata.filter((r: any) => {
        return r.key === "homeDisplayOrder";
      });

      // the metadata key doesn't exist somewhere
      if((valueA.length > 0) && (valueB.length < 1)) {
        return 1;
      } else if((valueB.length > 0) && (valueA.length < 1)) {
        return -1;
      } else if((valueB.length == 0) && (valueA.length == 0)) {
        return 0;
      }

      var intA = parseInt(valueA[0].value);
      var intB = parseInt(valueB[0].value);
      if (intA < intB) {
          return -1;
      } else if (intA > intB) {
          return 1;
      } else {
          return 0;
      }
    });
  }

  function convertDescription(j){
    if(j && j !== ""){
      var p = JSON.parse(j);
      if(p.blocks.length > 0){
        return p.blocks[0].text;
      }
    }
    return "";
  }

  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>


      <div
        className="home-page__hero"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage.url})` }
            : null
        }
      >
      </div>

      <div className="home-page__texttop">
        Value Proposition Headline
        <div className="home-page__texttop__bottom">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
          pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. 
          Donec scelerisque sollicitudin enim eu venenatis.
        </div>
      </div>


      {collectionsExist() && (
        <div className="home-page__collections">
          <div className="container">
            <div className="home-page__collections__list">
              {filteredCollections.map(({ node: collection }) => (
                <div key={collection.id}>
                  <Link
                    to={generateCollectionUrl(collection.id, collection.name)}
                    key={collection.id}
                  >
                    <div
                      className={classNames(
                        "home-page__collections__list__image",
                        {
                          "home-page__collections__list__image--no-photo": !collection.backgroundImage,
                        }
                      )}
                      style={{
                        backgroundImage: `url(${collection.backgroundImage
                          ? collection.backgroundImage.url
                          : noPhotoImg
                          })`,
                      }}
                    >
                      <div className="home-page__collections__list__image__text">
                        <h3>{collection.name}</h3>
                        <div className="home-page__collections__list__image__text__hidden">
                          {convertDescription(collection.descriptionJson)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

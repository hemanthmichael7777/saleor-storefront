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

import { RichTextContent } from "@components/atoms";
import { useState } from "react";
import { ProductsFeatured } from "@temp/components";

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

  const [hoveredId, setHovered] = useState("");
  const toggleHover = (id: any) => setHovered(id);
  const toggleHoverOff = () => setHovered("");

  

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
        <div className="home-page__hero__text">
          Shop the new Dominique collection of intimate apparel designed for every YOU.
        </div>
      </div>


      {collectionsExist() && (
        <div className="home-page__collections">
          <div className="container">
            <div className="home-page__collections__list">
              {/* <div className="height-container"> */}
                <div className="home-page__collections__list__image">
                  <div className="home-page__texttop">
                    Match Your Mood
                  </div>
                  <div className="home-page__texttopbottom">
                    True beauty comes from embracing your distinct personality and celebrating what makes you 
                    . . . you, and Dominique is here to make sure you look fabulous while doing it.
                    <br></br><br></br>
                    Whether lounging at home, dressing for a special occasion, or getting in a workout, 
                    we’ve got you covered. Even better, we’ve organized our signature intimate apparel 
                    into five Mood Collections to easily find the perfect bra, shapewear, activewear, 
                    and lingerie to fit the occasion and your mood.
                  </div>
                </div>
              {/* </div> */}
              {filteredCollections.map(({ node: collection }) => (
                <div 
                  key={collection.id}
                >
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
                      onMouseEnter={() => {toggleHover(collection.id);}}
                      onMouseLeave={() => {toggleHoverOff();}}
                    >
                      <div 
                        className={
                          collection.id == hoveredId ? 
                            "home-page__collections__list__image__texthvr" 
                            : 
                            "home-page__collections__list__image__text"
                        }
                      >
                        <h3>{collection.name}</h3>
                        
                        <div className="home-page__collections__list__image__text__hidden">
                          <h4>{collection.metadata[3].value}</h4>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <ProductsFeatured
              title={"Shop our most popular styles" }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;

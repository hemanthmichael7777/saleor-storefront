import * as React from "react";

import { RichTextContent, Button } from "@components/atoms";
import { Breadcrumb, Breadcrumbs, ContactPage } from "../../components";
import { headerImg, returnFormPath } from "./config";

interface PageProps {
  breadcrumbs: Breadcrumb[];
  page: {
    contentJson: any;
    title: string;
    metadata: any;
  };
}

export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  page,
}) => {

  var valueReturnPage = page.metadata.filter((q) => {
    return q.key === "returnPage";
  });

  var valueContactPage = page.metadata.filter((q) => {
    return q.key === "contactPage"
  });

  const isReturnPage = valueReturnPage.length > 0 ? true : false;
  const isContactPage = valueContactPage.length > 0 ? true: false;

  return (
    <div className="article-page">
      {console.log(isContactPage)}
      <div className="article-page__breadcrumbcontainer">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="article-page__container">
        <div className="article-page__flexcontainer">
          <div className="article-page__imagecontainer" style={{ backgroundImage: headerImg }}>

          </div>
          <div className="article-page__infocontainer">

            <div className="article-page__info">

              {
                !isContactPage && <RichTextContent descriptionJson={page.contentJson} />
              }
              

              {
                isContactPage && <ContactPage />
              }
              
              {isReturnPage &&
                <div className="return-form">
                  <Button
                    testingContext={"returnFormLink"}
                  >
                    <a href={returnFormPath} target="_blank"> Return Form</a>
                  </Button>
                </div>
              }

            </div>

          </div>

        </div>
      </div>
    </div>

  );
};
export default Page;

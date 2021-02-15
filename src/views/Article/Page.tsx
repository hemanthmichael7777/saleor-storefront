import * as React from "react";

import { RichTextContent } from "@components/atoms";
import { Breadcrumb, Breadcrumbs } from "../../components";
import { headerImg } from "./config";

interface PageProps {
  breadcrumbs: Breadcrumb[];
  page: {
    contentJson: any;
    title: string;
  };
}
export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  page,
}) => (
  <div className="article-page">
    <div className="article-page__breadcrumbcontainer">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
    </div>
    <div className="article-page__container">
      <div className="article-page__flexcontainer">
        <div className="article-page__imagecontainer" style={{ backgroundImage: headerImg }}>

        </div>
        <div className="article-page__infocontainer">
          
            <div className="article-page__info">
              <RichTextContent descriptionJson={page.contentJson} />
            </div>
          
        </div>
      </div>
    </div>
  </div>

);
export default Page;

import { Link, useLocation } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { stringUtils, regExpUtils } from "@/utils";
import { getURL } from "./Breadcrumbs.functions";

const BreadcrumbsComponent: React.FC = () => {
  const { pathname } = useLocation();
  const pathSnippets = pathname.split("/").filter((p) => p);

  return (
    <Breadcrumbs>
      {[
        ...pathSnippets
          .map((path, index) => {
            if (regExpUtils.containNumber(path)) return {};
            return {
              title: (
                <Link to={getURL(pathSnippets, index)} className="link">
                  <h5>{stringUtils.capitalizeFirstLetter(path)}</h5>
                </Link>
              ),
              key: path,
            };
          })
          .filter((item) => item?.title),
      ].map((item) => (
        <BreadcrumbItem key={item.key}>{item.title}</BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;

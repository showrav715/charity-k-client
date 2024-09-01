
import { BreadCrumbSkeleton } from "@/app/ui/skeletons";

import { useStore } from "@/store/index";

import { Link } from "react-router-dom";

interface MenusInterface {
  pageToLink?: string;
  pageLable: string;
}
interface BreadCrumbProps {
  title: string;
  menus: MenusInterface[];
}

export default function BreadCrumb({ title, menus }: BreadCrumbProps) {
  const settings = useStore((state) => state.settings);
  if (settings == null) return <BreadCrumbSkeleton />;
  return (
    <div
      className="ch-breadcrumb-area bg-class"
      style={{ position: "relative", backgroundImage: `url(${settings?.breadcumb})` }}
    >
      <div className="container" style={{ position: "absolute" }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="breadcrumb-content">
              <h2  >
                {title}
              </h2>
              <ul className="breadcrumb-menu">
                {menus &&
                  menus.map((item, index) => (
                    <li
                      key={index}
                    >
                      <Link to={item.pageToLink}>{item.pageLable}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

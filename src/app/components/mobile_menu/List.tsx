
import { useStore } from "../../../store/index";
import { Link } from "react-router-dom";
interface SubmenusInterface {
  pageToLink: string;
  pageLable: string;
}
interface PropsInterface {
  hasSubmenu: boolean;
  pageToLink: string;
  pageLable: string;
  submenus?: SubmenusInterface[];
  submenu_id?: string;
}

export default function MenuList({
  hasSubmenu,
  pageLable,
  pageToLink,
  submenus,
  submenu_id,
}: PropsInterface) {
  const submenu_id_format = `#${submenu_id}`;

  // mobile menu
  const handleMobileMenu = useStore((state) => state.setMobileMenuOpen);

  return (
    <>
      <li onClick={() => {}} className={`${hasSubmenu && "has-submenu"}`}>
        {hasSubmenu ? (
          <Link
            to={`${submenu_id_format}`}
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            {pageLable}
            <i className="fas fa-angle-down cursor-pointer position-absolute right-0"></i>
          </Link>
        ) : (
          <Link onClick={() => handleMobileMenu(false)} to={`${pageToLink}`}>
            {pageLable}
          </Link>
        )}

        {hasSubmenu && (
          <>
         
            <ul id={submenu_id} className={`submenu-wrapper collapse`}>
              {submenus &&
                submenus.map((item, index) => (
                  <li key={index}>
                    <Link
                      onClick={() => handleMobileMenu(false)}
                      to={item.pageToLink}
                    >
                      {item.pageLable}
                    
                    </Link>
                  </li>
                ))}
            </ul>
          </>
        )}
      </li>
    </>
  );
}

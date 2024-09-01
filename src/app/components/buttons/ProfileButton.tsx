

import { useStore } from "../../../store/index";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Logout } from "../../../@actions/auth";
// import avater from "@/public/assets/images/comment_avater.jpg";
import avater from "/assets/images/comment_avater.jpg";
import { translate } from "../../../helper/helper";

export default function ProfileButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  // const router = useRouter();
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const token = useStore((state) => state.token);
  let user = useStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const profileBtnRef = useRef(null);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  if (typeof user == "string") {
    user = JSON.parse(user);
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await Logout(token);
    if (response?.status == true) {
      logout();
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current?.contains(event.target) &&
        profileBtnRef.current &&
        !profileBtnRef.current?.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);

  if (!user || loading) {
    return (
      <div className="login-profile-routes-wrapper">
        <div className="profile-btn">
          <img
            width={48}
            height={48}
            src={avater}
            alt="author img"
            className="profile-img"
          />
          <span className="name">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="login-profile-routes-wrapper">
      <button
        ref={profileBtnRef}
        type="button"
        className={`profile-btn ${showDropdown && "open"}`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          width={48}
          height={48}
          src={user?.api_photo}
          alt="author img"
          className="profile-img"
        />
        <span className="name">{user ? user?.username : ""}</span>
      </button>

      {showDropdown && (
        <div className="route-dropdown active" ref={dropdownRef}>
          <ul>
            <li>
              <Link onClick={() => setShowDropdown(false)} to={"/dashboard"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22.0602 0H14.9507C13.8794 0 13.011 0.868428 13.011 1.93969V9.04922C13.011 10.1205 13.8794 10.9889 14.9507 10.9889H22.0602C23.1315 10.9889 23.9999 10.1205 23.9999 9.04922V1.93969C23.9999 0.868428 23.1315 0 22.0602 0Z"
                    fill="#3A4B68"
                  />
                  <path
                    d="M9.04922 0H1.93969C0.868428 0 0 0.868428 0 1.93969V9.04922C0 10.1205 0.868428 10.9889 1.93969 10.9889H9.04922C10.1205 10.9889 10.9889 10.1205 10.9889 9.04922V1.93969C10.9889 0.868428 10.1205 0 9.04922 0Z"
                    fill="#3A4B68"
                  />
                  <path
                    d="M22.0602 13.0107H14.9507C13.8794 13.0107 13.011 13.8792 13.011 14.9504V22.06C13.011 23.1312 13.8794 23.9996 14.9507 23.9996H22.0602C23.1315 23.9996 23.9999 23.1312 23.9999 22.06V14.9504C23.9999 13.8792 23.1315 13.0107 22.0602 13.0107Z"
                    fill="#3A4B68"
                  />
                  <path
                    d="M9.04922 13.0107H1.93969C0.868428 13.0107 0 13.8792 0 14.9504V22.06C0 23.1312 0.868428 23.9996 1.93969 23.9996H9.04922C10.1205 23.9996 10.9889 23.1312 10.9889 22.06V14.9504C10.9889 13.8792 10.1205 13.0107 9.04922 13.0107Z"
                    fill="#3A4B68"
                  />
                </svg>

                <span className="title">{translate("Dashboard")}</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowDropdown(false)}
                to={"/dashboard/profile-setting"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 0.000976562C5.37328 0.000976562 0 5.3732 0 12.0005C0 18.6277 5.37275 23.9999 12 23.9999C18.6278 23.9999 24 18.6277 24 12.0005C24 5.3732 18.6278 0.000976562 12 0.000976562ZM12 3.58896C14.1927 3.58896 15.9696 5.36635 15.9696 7.55804C15.9696 9.75025 14.1927 11.5271 12 11.5271C9.80831 11.5271 8.03145 9.75025 8.03145 7.55804C8.03145 5.36635 9.80831 3.58896 12 3.58896ZM11.9974 20.8626C9.81042 20.8626 7.80743 20.0662 6.2625 18.7479C5.88615 18.4269 5.66898 17.9562 5.66898 17.4623C5.66898 15.2395 7.46798 13.4605 9.69129 13.4605H14.3098C16.5336 13.4605 18.3257 15.2395 18.3257 17.4623C18.3257 17.9567 18.1096 18.4263 17.7328 18.7474C16.1884 20.0662 14.1848 20.8626 11.9974 20.8626Z"
                    fill="#3A4B68"
                  />
                </svg>

                <span className="title"> {translate("Profile Setting")}</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={() => setShowDropdown(false)}
                to={"/dashboard/change-password"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3463_13862)">
                    <path
                      d="M18.75 9H18V6C18 2.691 15.309 0 12 0C8.691 0 6 2.691 6 6V9H5.25C4.007 9 3 10.007 3 11.25V21.75C3 22.993 4.007 24 5.25 24H18.75C19.993 24 21 22.993 21 21.75V11.25C21 10.007 19.993 9 18.75 9ZM8.25 6C8.25 3.936 9.936 2.25 12 2.25C14.064 2.25 15.75 3.936 15.75 6V9H8.25V6ZM12 17.25C11.31 17.25 10.75 16.69 10.75 16C10.75 15.31 11.31 14.75 12 14.75C12.69 14.75 13.25 15.31 13.25 16C13.25 16.69 12.69 17.25 12 17.25Z"
                      fill="#3A4B68"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3463_13862">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="title"> {translate("Change Password")}</span>
              </Link>
            </li>
            <li>
              <a onClick={handleLogout} href="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.081 12.7501H3.375C2.925 12.7501 2.55 12.3751 2.55 11.9251C2.55 11.4751 2.925 11.1001 3.375 11.1001H15.081L11.775 7.7931C11.469 7.4871 11.469 6.9871 11.775 6.6811C12.081 6.3751 12.581 6.3751 12.887 6.6811L17.318 11.1121C17.625 11.4181 17.625 11.9181 17.318 12.2241L12.887 16.6551C12.581 16.9611 12.081 16.9611 11.775 16.6551C11.469 16.3491 11.469 15.8491 11.775 15.5431L15.081 12.7501ZM20.475 1.87505H9.75C9.3 1.87505 8.925 2.25005 8.925 2.70005C8.925 3.15005 9.3 3.52505 9.75 3.52505H20.475C20.925 3.52505 21.3 3.90005 21.3 4.35005V19.5751C21.3 20.0251 20.925 20.4001 20.475 20.4001H9.75C9.3 20.4001 8.925 20.7751 8.925 21.2251C8.925 21.6751 9.3 22.0501 9.75 22.0501H20.475C21.825 22.0501 22.95 20.9251 22.95 19.5751V4.35005C22.95 2.99305 21.825 1.87505 20.475 1.87505Z"
                    fill="#3A4B68"
                  />
                </svg>
                <span className="title"> {translate("Log Out")}</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

import  { useCallback, useEffect, useState } from "react";
import NiceSelect from "../NiceSelect/NiceSelect";
import { NiceSelectorOption } from "@/@types/frontend";
import { GetCategory } from "@/@actions/frontend";
import { useStore } from "@/store/index";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { error, translate } from "@/helper/helper";

function CampaignFilterBox() {
  const [activeFilterTab, setActiveFilterTab] = useState("all");
  const [sortedValue, setSortedValue] = useState<NiceSelectorOption>();
  const [categoryList, setCategoryList] = useState<NiceSelectorOption[]>([]);
  const [hasParams, setHasParams] = useState<string>("");

  const handleViewList = useStore((state) => state.setCampaignStatus);
  const isList = useStore((state) => state.isCampaignListView);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );


  const handleOnChangeNewstOldest = (selectedOption: NiceSelectorOption) => {
    setSortedValue(selectedOption);
    navigate(
      pathname + "?" + createQueryString("sortby", `${selectedOption?.name}`)
    );
  };

  const handleOnChangeCondition = (query) => {
    if (query === "all") {
      navigate(pathname);
    } else {
      navigate(pathname + "?" + createQueryString("condition", `${query}`));
    }
    setActiveFilterTab(query);
  };

  const options_for_oldest_newst = [
    {
      id: 1,
      name: "newest",
    },
    {
      id: 2,
      name: "oldest",
    },
  ];

  useEffect(() => {
    // Fetch category data on component mount
    fetchCategoryData();

    // Fetch and set search parameters
    const params = new URLSearchParams(window.location.search);
    setHasParams(params.toString());

    // Check for condition query and set active tab
    const condition = params.get("condition");
    if (condition) {
      setActiveFilterTab("featured");
    }
  }, []);

  const fetchCategoryData = async () => {
    try {
      const res = await GetCategory();
      if (Array.isArray(res)) {
        const data = res.map((cat) => ({
          id: cat?.id,
          name: cat?.name,
          slug: cat?.slug,
        }));
        setCategoryList(data);
      } else {
        error("Invalid response format from GetCategory");
      }
    } catch (error) {
      error("Error fetching category data:", error);
    }
  };

  const handleOnChangeCategory = useCallback(
    (selectedOption: NiceSelectorOption) => {
      const params = new URLSearchParams(hasParams);
      params.set("category", selectedOption.slug || "");
      navigate(`${window.location.pathname}?${params.toString()}`);
    },
    [hasParams]
  );

  categoryList.find((item) => item.slug === searchParams.get("category"));
  //   fetch data on load
  useEffect(() => {
    fetchCategoryData();

    const condition = searchParams.get("condition");
    if (condition) {
      setActiveFilterTab("featured");
    }
  }, []);

  return (
    <>
      {/* desktop views */}
      <div
        className="row mb-40 d-none d-lg-flex campaign-filter-area"


      >
        <div className="col-lg-6">
          <div className="ch-campaign-filter-nav">
            <NiceSelect
              onChange={handleOnChangeCategory}
              options={categoryList}
              defaultValue={categoryList && categoryList[0]?.id}
              wrapperClass="filter-select"
            />

            <button
              onClick={() => handleOnChangeCondition("all")}
              className={`ch-btn filter-btn ${activeFilterTab === "all" && "active"
                }`}
            >
              {translate("all")}
            </button>

            <button
              onClick={() => handleOnChangeCondition("featured")}
              className={`ch-btn filter-btn ${activeFilterTab === "featured" && "active"
                }`}
            >
              {translate("Featured")}
            </button>
          </div>
        </div>
        <div className="col-lg-6 d-flex gap-3 justify-content-end d-flex items-center">
          {/* sorting */}
          <h6 className="d-none d-xl-inline-block text-capitalize font-regular">sort by:</h6>

          <NiceSelect
            options={options_for_oldest_newst?.map((item: any) => item)}
            defaultValue={sortedValue && sortedValue.id}
            onChange={handleOnChangeNewstOldest}
            wrapperClass="filter-select sorting-select"
          />

          {/* list trigger btn */}
          <button
            className={`ch-list-trigger-btn ${isList && "active"}`}
            onClick={() => handleViewList(true)}
          >
                       <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 62 48"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.66661 37.5149H7.81835C9.28712 37.5149 10.485 38.7129 10.485 40.1815V45.3333C10.485 46.802 9.28712 48 7.81835 48H2.66661C1.19784 48 0 46.8022 0 45.3333V40.1815C0 38.7127 1.19784 37.5149 2.66661 37.5149ZM21.4241 0H58.8801C60.3487 0 61.5467 1.19797 61.5467 2.66661V7.81835C61.5467 9.28699 60.3487 10.485 58.8801 10.485C31.3823 10.485 48.922 10.485 21.4241 10.485C19.9555 10.485 18.7575 9.28712 18.7575 7.81835V2.66661C18.7575 1.19784 19.9555 0 21.4241 0ZM2.66661 0H7.81835C9.28712 0 10.485 1.19797 10.485 2.66661V7.81835C10.485 9.28712 9.28712 10.485 7.81835 10.485H2.66661C1.19784 10.485 0 9.28712 0 7.81835V2.66661C0 1.19784 1.19784 0 2.66661 0ZM21.4241 18.7574H58.8801C60.3487 18.7574 61.5467 19.9554 61.5467 21.424V26.5757C61.5467 28.0444 60.3487 29.2423 58.8801 29.2423C31.3823 29.2423 48.922 29.2423 21.4241 29.2423C19.9555 29.2423 18.7575 28.0445 18.7575 26.5757V21.424C18.7575 19.9552 19.9555 18.7574 21.4241 18.7574ZM2.66661 18.7574H7.81835C9.28712 18.7574 10.485 19.9554 10.485 21.424V26.5757C10.485 28.0445 9.28712 29.2423 7.81835 29.2423H2.66661C1.19784 29.2423 0 28.0445 0 26.5757V21.424C0 19.9552 1.19784 18.7574 2.66661 18.7574ZM21.4241 37.5149H58.8801C60.3487 37.5149 61.5467 38.7129 61.5467 40.1815V45.3333C61.5467 46.8019 60.3487 47.9999 58.8801 47.9999C31.3823 47.9999 48.922 47.9999 21.4241 47.9999C19.9555 47.9999 18.7575 46.802 18.7575 45.3333V40.1815C18.7575 38.7127 19.9555 37.5149 21.4241 37.5149Z"
                fill="#091e42"
              />
            </svg>
          </button>
          {/* Grid trigger button */}
          <button
            className={`ch-list-trigger-btn ${!isList && "active"}`}
            onClick={() => handleViewList(false)}
          >
              <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clipPath="url(#clip0_2145_8813)">
                <path
                  d="M11.7268 0H2.73169C1.22544 0 0 1.22544 0 2.73169V11.7268C0 13.233 1.22544 14.4584 2.73169 14.4584H11.7268C13.233 14.4584 14.4584 13.233 14.4584 11.7268V2.73169C14.4584 1.22544 13.233 0 11.7268 0Z"
                  fill="#02A95C"
                />
                <path
                  d="M29.2687 0H20.2737C18.7674 0 17.542 1.22544 17.542 2.73169V11.7268C17.542 13.233 18.7674 14.4584 20.2737 14.4584H29.2687C30.775 14.4584 32.0004 13.233 32.0004 11.7268V2.73169C32.0004 1.22544 30.775 0 29.2687 0Z"
                  fill="#02A95C"
                />
                <path
                  d="M11.7268 17.5415H2.73169C1.22544 17.5415 0 18.7669 0 20.2732V29.2683C0 30.7745 1.22544 31.9999 2.73169 31.9999H11.7268C13.233 31.9999 14.4584 30.7745 14.4584 29.2683V20.2732C14.4584 18.7669 13.233 17.5415 11.7268 17.5415Z"
                  fill="#02A95C"
                />
                <path
                  d="M29.2687 17.5415H20.2737C18.7674 17.5415 17.542 18.7669 17.542 20.2732V29.2683C17.542 30.7745 18.7674 31.9999 20.2737 31.9999H29.2687C30.775 31.9999 32.0004 30.7745 32.0004 29.2683V20.2732C32.0004 18.7669 30.775 17.5415 29.2687 17.5415Z"
                  fill="#02A95C"
                />
              </g>
              <defs>
                <clipPath id="clip0_2145_8813">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile views */}
      <button
        type="button"
        className="ch-btn sm-btn ch-primary-btn mobile-filter-trigger-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        {translate("filter")}
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {translate("Filter")}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mobile-campaign-filter-nav">
                <div className="ch-campaign-filter-nav">
                  <NiceSelect
                    onChange={handleOnChangeCategory}
                    options={categoryList}
                    defaultValue={categoryList && categoryList[0]?.id}
                    wrapperClass="filter-select"
                  />
                  <NiceSelect
                    options={options_for_oldest_newst}
                    defaultValue={sortedValue && sortedValue.id}
                    onChange={handleOnChangeNewstOldest}
                    wrapperClass="filter-select"
                  />
                  <button
                    onClick={() => handleOnChangeCondition("all")}
                    className={`ch-btn filter-btn ${activeFilterTab === "all" && "active"
                      }`}
                  >
                    {translate("all")}
                  </button>
                  <button
                    onClick={() => handleOnChangeCondition("featured")}
                    className={`ch-btn filter-btn ${activeFilterTab === "featured" && "active"
                      }`}
                  >
                    {translate("Featured")}
                  </button>

                  {/* List trigger button */}
                  <button
                    className={`ch-list-trigger-btn ${isList && "active"}`}
                    onClick={() => handleViewList(true)}
                  >
                                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 62 48"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.66661 37.5149H7.81835C9.28712 37.5149 10.485 38.7129 10.485 40.1815V45.3333C10.485 46.802 9.28712 48 7.81835 48H2.66661C1.19784 48 0 46.8022 0 45.3333V40.1815C0 38.7127 1.19784 37.5149 2.66661 37.5149ZM21.4241 0H58.8801C60.3487 0 61.5467 1.19797 61.5467 2.66661V7.81835C61.5467 9.28699 60.3487 10.485 58.8801 10.485C31.3823 10.485 48.922 10.485 21.4241 10.485C19.9555 10.485 18.7575 9.28712 18.7575 7.81835V2.66661C18.7575 1.19784 19.9555 0 21.4241 0ZM2.66661 0H7.81835C9.28712 0 10.485 1.19797 10.485 2.66661V7.81835C10.485 9.28712 9.28712 10.485 7.81835 10.485H2.66661C1.19784 10.485 0 9.28712 0 7.81835V2.66661C0 1.19784 1.19784 0 2.66661 0ZM21.4241 18.7574H58.8801C60.3487 18.7574 61.5467 19.9554 61.5467 21.424V26.5757C61.5467 28.0444 60.3487 29.2423 58.8801 29.2423C31.3823 29.2423 48.922 29.2423 21.4241 29.2423C19.9555 29.2423 18.7575 28.0445 18.7575 26.5757V21.424C18.7575 19.9552 19.9555 18.7574 21.4241 18.7574ZM2.66661 18.7574H7.81835C9.28712 18.7574 10.485 19.9554 10.485 21.424V26.5757C10.485 28.0445 9.28712 29.2423 7.81835 29.2423H2.66661C1.19784 29.2423 0 28.0445 0 26.5757V21.424C0 19.9552 1.19784 18.7574 2.66661 18.7574ZM21.4241 37.5149H58.8801C60.3487 37.5149 61.5467 38.7129 61.5467 40.1815V45.3333C61.5467 46.8019 60.3487 47.9999 58.8801 47.9999C31.3823 47.9999 48.922 47.9999 21.4241 47.9999C19.9555 47.9999 18.7575 46.802 18.7575 45.3333V40.1815C18.7575 38.7127 19.9555 37.5149 21.4241 37.5149Z"
                        fill="#091e42"
                      />
                    </svg>
                  </button>
                  {/* Grid trigger button */}
                  <button
                    className={`ch-list-trigger-btn ${!isList && "active"}`}
                    onClick={() => handleViewList(false)}
                  >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_2145_8813)">
                        <path
                          d="M11.7268 0H2.73169C1.22544 0 0 1.22544 0 2.73169V11.7268C0 13.233 1.22544 14.4584 2.73169 14.4584H11.7268C13.233 14.4584 14.4584 13.233 14.4584 11.7268V2.73169C14.4584 1.22544 13.233 0 11.7268 0Z"
                          fill="#02A95C"
                        />
                        <path
                          d="M29.2687 0H20.2737C18.7674 0 17.542 1.22544 17.542 2.73169V11.7268C17.542 13.233 18.7674 14.4584 20.2737 14.4584H29.2687C30.775 14.4584 32.0004 13.233 32.0004 11.7268V2.73169C32.0004 1.22544 30.775 0 29.2687 0Z"
                          fill="#02A95C"
                        />
                        <path
                          d="M11.7268 17.5415H2.73169C1.22544 17.5415 0 18.7669 0 20.2732V29.2683C0 30.7745 1.22544 31.9999 2.73169 31.9999H11.7268C13.233 31.9999 14.4584 30.7745 14.4584 29.2683V20.2732C14.4584 18.7669 13.233 17.5415 11.7268 17.5415Z"
                          fill="#02A95C"
                        />
                        <path
                          d="M29.2687 17.5415H20.2737C18.7674 17.5415 17.542 18.7669 17.542 20.2732V29.2683C17.542 30.7745 18.7674 31.9999 20.2737 31.9999H29.2687C30.775 31.9999 32.0004 30.7745 32.0004 29.2683V20.2732C32.0004 18.7669 30.775 17.5415 29.2687 17.5415Z"
                          fill="#02A95C"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2145_8813">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="ch-btn ch-secondary-btn rounded-3 sm-btn"
                data-bs-dismiss="modal"
              >
                {translate("Close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampaignFilterBox;

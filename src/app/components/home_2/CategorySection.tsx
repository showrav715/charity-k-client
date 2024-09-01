

import { useEffect, useState } from "react";
import { LatestCategory } from "../../../@actions/frontend";
import { Category } from "../../../@types/frontend";
import CategoryCardTwo from "../single/CategoryCardTwo";
import { translate } from "../../../helper/helper";
import { HerosectionSkeleton } from "../../../app/ui/skeletons";
import { CategoriesSliderSettings } from "../../../config/frontend";
import Slider from "react-slick";
export default function CategorySection() {
  const [latestCategory, setLatestCategory] = useState<Category[]>([]);
  const [isUiLoaded, setisUiLoaded] = useState(false);

  useEffect(() => {
    setisUiLoaded(true);
    const fetchData = async () => {
      try {
        const latestCategoryData = await LatestCategory();
        setLatestCategory(latestCategoryData?.latest_category);
      } catch (error) {
        console.error("Error fetching latest category:", error);
      }
    };
    fetchData();
  }, []);

  if (!isUiLoaded) {
    return <HerosectionSkeleton />;
  }

  return (
    <div className={`ch-supports-section ch-supports-section-2 `}>
      <div className="container px-0">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-6">
            <div className="title-box text-center">
              <h5
                className="sm-title"
              >
                {translate("Campaigns Category")}
              </h5>
              <h2
                className="title"
              >
                {translate("Browse by Category")}
              </h2>
            </div>
          </div>
        </div>

        <Slider {...CategoriesSliderSettings}>
          {latestCategory &&
            latestCategory?.map((card) => (
              <CategoryCardTwo
                key={card.id}
                img={card.api_photo}
                title={card.name}
                title_link={`/campaigns?category=${card.slug}`}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
}

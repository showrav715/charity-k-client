
import { useEffect, useState } from "react";
import CategoryCard from "../single/CategoryCard";
import { LatestCategory } from "@/@actions/frontend";
import { Category } from "@/@types/frontend";
import Slider from "react-slick";
import { CategoriesSliderSettings } from "@/config/frontend";

export default function CategorySection() {
  const [latestCategory, setLatestCategory] = useState<Category[]>([]);
  const [isUiLoaded, setisUiLoaded] = useState(false);

  useEffect(() => {
    setisUiLoaded(true);
    const fetchData = async () => {
      try {
        const latestCategoryData = await LatestCategory();
        setLatestCategory(latestCategoryData.latest_category);
      } catch (error) {
        console.error("Error fetching latest category:", error);
      }
    };
    fetchData();
  }, []);


  if (!isUiLoaded || latestCategory.length == 0) {
    return null;
  }

  return (
    <div className={`ch-supports-section`}>
      <div className="container px-0">
        <Slider {...CategoriesSliderSettings}>
          {latestCategory &&
            latestCategory?.map((card) => (
              <CategoryCard
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

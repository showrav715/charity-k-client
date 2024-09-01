import { getBrands } from "@/@actions/frontend";
import { BrandResponse } from "@/@types/frontend";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { translate } from "@/helper/helper";
import { useEffect, useState } from "react";

export default function SponsorsSection() {
  const [brands, setBrands] = useState<BrandResponse>();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBrands()
      .then((result) => {
        setBrands(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if(loading) return <CardsSkeleton/>

  return (
    <section className="ch-sponsors-section">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-6">
            <div className="title-box text-center">
              <h5 className="sm-title">{translate("Sponsors")}</h5>
              <h2 className="title">
                {translate("Beyond Boundaries: Our Impactful")}{" "}
                <span>{translate("Partner Network")}</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="custom-grid">
          {brands?.brands.map((item) => (
            <div key={item.id} data-aos-delay={100} className="single-sponsor">
              <div className="overflow-hidden">
                <img
                  width={152}
                  height={30}
                  alt="sponsor"
                  className="sponsor-img"
                  src={item.api_photo}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

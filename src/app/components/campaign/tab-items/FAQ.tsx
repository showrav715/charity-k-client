import { CampaignFAQ } from "@/@types/frontend";
import NotFounds from "@/app/ui/NotFounds";
export default function FAQ({
  faqs,
  isPage = false
}: {
  faqs: CampaignFAQ[];
  isPage?: boolean;
}) {
  return (
    <div className="custom-faq-wrapper">
      <div className="accordion" id="accordionExample">
        {faqs && faqs?.length > 0 ? (
          faqs?.map((data: CampaignFAQ) => (
            <div
              className="accordion-item"
              key={data?.id}
            >
              <h2 className="accordion-header" id={`heading_${data?.id}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseOne_${data?.id}`}
                  aria-expanded={false}
                  aria-controls={`collapseOne_${data?.id}`}
                >
                  {data?.title}
                </button>
              </h2>
              <div
                id={`collapseOne_${data?.id}`}
                className={`accordion-collapse collapse`}
                aria-labelledby={`heading_${data?.id}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  {isPage ? data?.details : data?.content}
                </div>
              </div>
            </div>
          ))
        ) : (
          <NotFounds />
        )}
      </div>
    </div>
  );
}

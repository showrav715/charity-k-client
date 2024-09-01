
import { useEffect, useState } from "react";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import ContactUsForm from "@/app/components/contact/ContactUsForm";
import ContactInfo from "@/app/components/contact/ContactInfo";
import ContactMap from "@/app/components/contact/ContactMap";
import { contactPageDataResponse } from "@/@types/frontend";
import { ContactPageData } from "@/@actions/frontend";


export default function ContactWrapper() {
  const [contactInfo, setcontactInfo] =
    useState<contactPageDataResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ContactPageData();
        setcontactInfo(data as contactPageDataResponse);
      } catch (error) {
        console.error("Error fetching latest category:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>

      {/* <Suspense fallback={`Data loading`}> */}
        <BreadCrumb
          title="Contact Us"
          menus={[
            { pageToLink: "/", pageLable: "Home" },
            { pageToLink: "/contact", pageLable: "Contact Us" },
          ]}
        />
        <ContactUsForm
          title={contactInfo?.title}
          subtitle={contactInfo?.text}
        />
        <ContactInfo page_data={contactInfo} />
        <ContactMap map_link={contactInfo?.map_link} />
      {/* </Suspense> */}
    </>
  );
}

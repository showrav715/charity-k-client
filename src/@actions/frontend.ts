import {
  AboutDataResponse,
  CategoryResponse,
  CategoryDataResponse,
  AboutPageDataResponse,
  CurrencyResponse,

  recent_blogs,
  contactPageDataResponse,
  BLogListResponse,
  PaymentGatewayResponse,

  CampaignResponse,
  CampaingDetailsResponse,
  FeatureRecentDataResponse,
  EventListResponse,

  TeamListResponse,
  GalleryResponse,
  BlogResponse,

  FAQProps,
  TestimonialResponse,
  DonorListResponse,
  BrandResponse,
  PageResponse,
  DynamicPageResponse,
  HomeMetadataApiResponse,
} from "@/@types/frontend";
import { baseUrl } from "../BaseUrl";
// const api = process.env.NEXT_PUBLIC_API_URL;


const api = baseUrl;

const LatestCategory = async (): Promise<CategoryResponse> => {
  try {
    const res = await fetch(`${api}/api/home-content?content=latest_category`);
    const data = await res.json();
    return data.response as CategoryResponse;
  } catch (error) {
    throw error;
  }
};

const dynamicPageData = async (params): Promise<DynamicPageResponse> => {
  try {
    const res = await fetch(`${api}/api/page/${params}`);
    const data = await res.json();
    return data as DynamicPageResponse;
  } catch (error) {
    throw error;
  }
};

const FeatureRecentData = async (): Promise<FeatureRecentDataResponse> => {
  try {
    const res = await fetch(
      `${api}/api/home-content?content=counters,testimonials,faq,recent_blogs`
    );
    const data = await res.json();
    return data.response as FeatureRecentDataResponse;
  } catch (error) {
    throw error;
  }
};

const FeatureCampaignData = async (): Promise<FeatureRecentDataResponse> => {
  try {
    const res = await fetch(
      `${api}/api/home-content?content=feature_campaign,newest_campaign`
    );
    const data = await res.json();
    return data.response as FeatureRecentDataResponse;
  } catch (error) {
    throw error;
  }
};

const AboutData = async (): Promise<AboutDataResponse> => {
  try {
    const res = await fetch(`${api}/api/home-content?content=about`);
    const data = await res.json();
    return data.response.about as AboutDataResponse;
  } catch (error) {
    throw error;
  }
};

const getBrands = async (): Promise<BrandResponse> => {
  try {
    const res = await fetch(`${api}/api/home-content?content=brands`);
    const data = await res.json();
    return data.response as BrandResponse;
  } catch (error) {
    throw error;
  }
};

const AboutPageData = async (): Promise<AboutPageDataResponse> => {
  try {
    const res = await fetch(`${api}/api/about/page`);
    const data = await res.json();
    return data.response as AboutPageDataResponse;
  } catch (error) {
    throw error;
  }
};

const AboutPageCounters = async (): Promise<any> => {
  try {
    const res = await fetch(`${api}/api/about/page`);
    const data = await res.json();
    return data.response as any;
  } catch (error) {
    throw error;
  }
};
const AboutPageRecentBlogs = async (): Promise<recent_blogs[]> => {
  try {
    const res = await fetch(`${api}/api/home-content?content=recent_blogs`);
    const data = await res.json();
    return data.response.recent_blogs as recent_blogs[];
  } catch (error) {
    throw error;
  }
};

const ContactPageData = async (): Promise<contactPageDataResponse> => {
  try {
    const res = await fetch(`${api}/api/contact/page`);
    const data = await res.json();
    return data.response as contactPageDataResponse;
  } catch (error) {
    throw error;
  }
};

const VolunteerData = async (): Promise<TeamListResponse> => {
  try {
    const res = await fetch(`${api}/api/home-content?content=volunteers`);
    const data = await res.json();
    return data.response as TeamListResponse;
  } catch (error) {
    throw error;
  }
};

const GetCategory = async (): Promise<CategoryDataResponse> => {
  try {
    const res = await fetch(`${api}/api/get/category`);
    const data = await res.json();
    return data.response as CategoryDataResponse;
  } catch (error) {
    throw error;
  }
};

const ContactSubmit = async (request: any) => {
  const formData = new FormData();
  Object.keys(request).forEach((key) => {
    const value = request[key];
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${api}/api/contact/submit`, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const NewsletterSubmit = async (request: any) => {
  const formData = new FormData();
  Object.keys(request).forEach((key) => {
    const value = request[key];
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${api}/api/newsletter/submit`, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const BlogCommentSubmit = async (request: any) => {
  const formData = new FormData();
  Object.keys(request).forEach((key) => {
    const value = request[key];
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${api}/api/comment/submit`, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const GetBlogList = async (query: string): Promise<BLogListResponse> => {
  let url = `${api}/api/blogs`;
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }

  try {
    const res = await fetch(`${url}`);
    const data = await res.json();
    return data.response as BLogListResponse;
  } catch (error) {
    throw error;
  }
};

const GetSingleBlog = async (slug: string): Promise<BlogResponse> => {
  try {
    const res = await fetch(`${api}/api/blog/${slug}`);
    const data = await res.json();
    return data.response as BlogResponse;
  } catch (error) {
    throw error;
  }
};

const GetFaq = async (): Promise<FAQProps> => {
  try {
    const res = await fetch(`${api}/api/get/faqs`);
    const data = await res.json();
    return data.response as FAQProps;
  } catch (error) {
    throw error;
  }
};

const GetAllCurrency = async (): Promise<CurrencyResponse> => {
  try {
    const res = await fetch(`${api}/api/get/currency`);
    const data = await res.json();
    return data.response;
  } catch (error) {
    throw error;
  }
};

const GetAllPage = async (): Promise<PageResponse> => {
  try {
    const res = await fetch(`${api}/api/get/pages`);
    const data = await res.json();
    return data.response as PageResponse;
  } catch (error) {
    throw error;
  }
};

const GetCampaignList = async (query?: string): Promise<CampaignResponse> => {
  let url = `${api}/api/campaigns`;
  if (query) {
    url += `?${query}`;
  }
  try {
    const res = await fetch(`${url}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.response as CampaignResponse;
  } catch (error) {
    throw error;
  }
};

const GetCampaignDetails = async (slug): Promise<CampaingDetailsResponse> => {
  try {
    const res = await fetch(`${api}/api/campaign/${slug}`);
    const data = await res.json();
    return data.response as CampaingDetailsResponse;
  } catch (error) {
    throw error;
  }
};

const VolunteerSubmit = async (request: any) => {
  const formData = new FormData();
  Object.keys(request).forEach((key) => {
    const value = request[key];
    formData.append(key, value);
  });

  const res = await fetch(`${api}/api/volunteer/submit`, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

const SubmitCampaign = async (request: any) => {
  const formData = new FormData();
  Object.keys(request).forEach((key) => {
    const value = request[key];
    formData.append(key, value);
  });

  const res = await fetch(`${api}/api/campaign/submit`, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: formData,
  });

  const data = await res.json();
  return data.response;
};

const GetGateways = async (
  currency: number
): Promise<PaymentGatewayResponse> => {
  try {
    const res = await fetch(`${api}/api/get/gateways?currency=${currency}`);
    const data = await res.json();
    return data.response as PaymentGatewayResponse;
  } catch (error) {
    throw error;
  }
};

const GetEventList = async (query: string): Promise<EventListResponse> => {
  let url = `${api}/api/events`;
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }

  try {
    const res = await fetch(`${url}`);
    const data = await res.json();

    return data.response as EventListResponse;
  } catch (error) {
    throw error;
  }
};

const GetSingleEvent = async (slug: string) => {
  let url = `${api}/api/event/${slug}`;
  try {
    const res = await fetch(`${url}`);
    const data = await res.json();
    if (data.success == true) {
      return data.response;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const GetVolunteers = async (query: string): Promise<TeamListResponse> => {
  let url = `${api}/api/get/volunteer`;
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }
  try {
    const res = await fetch(`${url}`);
    const data = await res.json();

    return data.response as TeamListResponse;
  } catch (error) {
    throw error;
  }
};

const GetTestimonial = async (query: string): Promise<TestimonialResponse> => {
  let url = `${api}/api/testimonials`;
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }
  try {
    const res = await fetch(`${url}`);
    const data = await res.json();
    return data.response as TestimonialResponse;
  } catch (error) {
    throw error;
  }
};

const GetDonor = async (query: string): Promise<DonorListResponse> => {
  let url = `${api}/api/get/donations`;
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }
  try {
    const res = await fetch(`${url}`);
    const data = await res.json();
    return data.response as DonorListResponse;
  } catch (error) {
    throw error;
  }
};

const GetGallery = async (query: any): Promise<GalleryResponse> => {
  let url = `${api}/api/get/gallery`;
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `?${queryString}`;
  }
  try {
    const res = await fetch(`${url}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.response as GalleryResponse;
  } catch (error) {
    throw error;
  }
};

const GetMetaDataForHome = async (): Promise<HomeMetadataApiResponse> => {
  try {
    const res = await fetch(`${api}/api/seo-setting`);
    const data = await res.json();
    return data as HomeMetadataApiResponse;
  } catch (error) {
    throw error;
  }
};

export {
  LatestCategory,
  AboutData,
  getBrands,
  dynamicPageData,
  FeatureRecentData,
  VolunteerData,
  GetCategory,
  AboutPageData,
  FeatureCampaignData,
  AboutPageCounters,
  AboutPageRecentBlogs,
  ContactPageData,
  ContactSubmit,
  BlogCommentSubmit,
  GetTestimonial,
  GetBlogList,
  GetAllCurrency,
  GetCampaignList,
  GetCampaignDetails,
  GetSingleBlog,
  VolunteerSubmit,
  GetGateways,
  SubmitCampaign,
  GetEventList,
  GetSingleEvent,
  GetVolunteers,
  NewsletterSubmit,
  GetGallery,
  GetFaq,
  GetDonor,
  GetAllPage,
  GetMetaDataForHome,
};

interface CurrencyResponse {
  id: number;
  default: string | number;
  symbol: string;
  language: string;
  code: string;
  status: number;
  value: number;
}
[];

interface Category {
  id: number;
  name: string;
  slug: string;
  api_photo: string;
  status: number;
}

interface IDynamicContent {
  id: number;
  title: string;
  slug: string;
  details: any;
}
interface DynamicPageResponse {
  success: boolean;
  message: string;
  response: IDynamicContent;
}

interface CategoryResponse {
  latest_category: Category[];
}

interface Volunteer {
  id: number;
  name: string;
  designation: string;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  photo: string;
  cv: string | null;
  api_photo: string;
}

interface features {
  id: number;
  title: string;
  text: string;
  photo: string;
  api_photo: string;
}
interface counters {
  id: number;
  title: string;
  counter_number: number;
  icon: string;
}
interface contactPageDataResponse {
  id: number;
  email1?: string;
  email2?: string;
  phone1?: string;
  phone2?: string;
  address?: string;
  map_link?: string;
  title?: string;
  text?: string;
}
interface recent_blogs {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  photo: string;
  sort_text: string;
  description: string;
  source: any;
  views: number;
  status: number;
  meta_tag: any;
  meta_description: string;
  tags: any;
  created_at: string;
  updated_at: string;
  formatted_created_at: string;
  api_photo: string;
}

interface NiceSelectorOption {
  id: any;
  name: string;
  slug?: string | null;
}

interface PageResponse {
  data: Page[];
}

interface Page {
  id: number;
  title: string;
  slug: string;
  details: string;
}

interface AboutDataResponse {
  id: number;
  header_title: string;
  title: string;
  btn_text: string;
  btn_url: string;
  description: string | any;
  photo: string;
  photo2: string;
}

interface BrandResponse {
  brands: Brand[];
}

interface Brand {
  id: number;
  api_photo: string;
}

interface AboutPageDataResponse {
  about: AboutDataResponse;
  features: features[];
}

interface CategoryDataResponse {
  id: number;
  name: string;
  slug: string;
  status: string | number;
  api_photo?: string;
}
[];

interface BlogResponse {
  blog: Blog;
  recent_blogs: BlogData;
  comments: any;
}

interface Blog {
  id: number;
  category_id: number;
  title: string;
  slug: string;
  photo: string;
  sort_text: string;
  description: string;
  source: string | null;
  views: number;
  status: number;
  meta_tag: string | null;
  meta_description: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  api_photo: string;
  category: {
    id: number;
    name: string;
    slug: string;
    status: number;
  };
}

interface FeatureRecentDataResponse {
  feature_campaign: Campaign[];
  newest_campaign: Campaign[];
  counters: Counters[];
  testimonials: Testimonial[];
  volunteers: Volunteer[];
  faqs: CampaignFAQ[];
  recent_blogs: BlogData;
  campaign_data: CampaignResponse;
}

interface Counters {
  id: number;
  title: string;
  counter_number: number;
  icon: string;
}

interface BlogData {
  current_page: number;
  data: Blog[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface BLogListResponse {
  categories: CategoryDataResponse;
  blogs: BlogData;
  recent_blogs: BlogData;
}

interface EventListResponse {
  events: EventData;
  recent_events: EventData;
}

interface EventData {
  current_page: number;
  data: Event[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Event {
  id: number;
  title: string;
  slug: string;
  photo: string;
  date: string;
  start_time: string;
  end_time: string;
  event_type: string;
  event_link: string | null;
  event_location: string | null;
  organizar_name: string;
  organizar_email: string;
  organizar_phone: string;
  map_link: string | null;
  website: string | null;
  description: string;
  created_at: string;
  updated_at: string;
  api_photo: string;
}

interface TestimonialResponse {
  current_page: number;
  data: Testimonial[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Testimonial {
  id?: number;
  name: string;
  message: string;
  api_photo: string;
}

interface DonorListResponse {
  current_page: number;
  data: Donor[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface Donor {
  id: number;
  name: string;
  total: number;
  campaign_slug: string;
  api_date: string;
  campaign: {
    id: number;
    title: string;
    slug: string;
    api_photo: string;
  };
}

interface TeamListResponse {
  volunteers: TeamData;
}

interface TeamData {
  current_page: number;
  data: Volunteer[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface VolunteerListResponse {
  volunteers: Volunteer[];
}

interface ImageGalleryInterface {
  original: string;
  thumbnail: string;
}

interface FAQProps {
  success: boolean;
  faqs: CampaignFAQ[];
}

interface CampaignFAQ {
  id: number;
  campaign_id: string | null;
  title: string;
  content?: string;
  details?: string;
}
interface Campaign {
  id: number;
  title: string;
  slug: string;
  category_id: string;
  user_id: null | number;
  photo: string;
  close_type: string;
  raised: number;
  goal: number;
  description: string;
  status: string;
  is_faq: string;
  is_feature: string;
  is_preloaded: string;
  location?: string;
  benefits?: string;
  end_date?: string;
  video_link?: string;
  created_at: string;
  updated_at: string;
  api_photo?: string;
  founded?: number;
  category?: Category;
  galleries?: ImageGalleryInterface[];
  faqs?: CampaignFAQ[];
  author?: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface preloadedAmountInterface {
  id: number;
  amount: number;
}
[];

interface PaginationProps {
  last_page?: number | any;
  per_page: number | string;
  total: number | string;
  links: PaginationLink[];
}
interface CampaignResponse {
  current_page: number | string;
  data: Campaign[];
  first_page_url: string;
  from: number | string;
  last_page: number | string;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number | string;
  prev_page_url: string | null;
  to: number | string;
  total: number | string;
}
interface Preloaded {
  id: number;
  amount: string;
}

interface CampaingDetailsResponse {
  campaign: Campaign;
  preloaded: Preloaded[];
  related_campaigns: Campaign[];
}

type StringOrNumber = string | number;

interface PaymentGatewayResponse {
  id: number;
  name: string;
  api_photo: string;
  keyword: string;
}
[];

interface RazorpayData {
  key: string;
  amount: number;
  name?: string;
  description?: string;
  prefill: {
    name: string;
    email?: string;
    contact?: string;
  };
  notes: {
    address?: string;
    merchant_order_id: string;
  };
  theme?: {
    color?: string;
  };
  order_id: string;
  display_currency?: string;
  display_amount?: number;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface GalleryResponse {
  gallery: GalleryData;
}

interface GalleryData {
  current_page: number | string;
  data: Gallery[];
  first_page_url: string;
  from: number | string;
  last_page: number | string;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string;
  path: string;
  per_page: number | string;
  prev_page_url: string | null;
  to: number | string;
  total: number | string;
}

interface Gallery {
  api_photo: string;
}

interface HomeMetadataApiResponse {
  success: boolean;
  message: string;
  response: HomeMetadataResponseData;
}

interface HomeMetadataResponseData {
  id: number;
  title: string;
  meta_tag: string;
  meta_description: string;
  meta_image: string;
  google_analytics: string;
  facebook_pixel: string;
}

export type {
  NiceSelectorOption,
  Volunteer,
  CurrencyResponse,
  AboutDataResponse,
  Category,
  DynamicPageResponse,
  CategoryResponse,
  CategoryDataResponse,
  AboutPageDataResponse,
  counters,
  recent_blogs,
  contactPageDataResponse,
  BLogListResponse,
  BlogResponse,
  Blog,
  FAQProps,
  Campaign,
  CampaignResponse,
  PaginationLink,
  PaginationProps,
  CampaingDetailsResponse,
  ImageGalleryInterface,
  CampaignFAQ,
  preloadedAmountInterface,
  StringOrNumber,
  FeatureRecentDataResponse,
  PaymentGatewayResponse,
  RazorpayData,
  RazorpayResponse,
  EventListResponse,
  EventData,
  Event,
  Gallery,
  BlogData,
  TestimonialResponse,
  Testimonial,
  DonorListResponse,
  Donor,
  VolunteerListResponse,
  TeamListResponse,
  GalleryResponse,
  BrandResponse,
  Brand,
  PageResponse,
  Page,
  HomeMetadataApiResponse
};

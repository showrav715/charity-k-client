import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComponent from "./app/components/HomeComponent";
import FrontendRouteWrapper from "./routes/FrontendRouteWrapper";
import DashboardRouteWrapper from "./routes/DashboardRouteWrapper";
import Login from "./app/components/auth/Login";
import DashBoardHome from "./app/dashboard/DashBoardHome";
import CampaignsAll from "./app/dashboard/campaigns/all/CampaignsAll";
import Custom404 from "./app/404/page";
import ProtectedRouteWrapper from "./routes/ProtectedRouteWrapper";
import AboutPage from "./app/(front)/about/AboutPage";
import VolunteersPage from "./app/(front)/volunteers/VolunteersPage";
import TestimonialPage from "./app/(front)/testimonial/TestimonialPage";
import DonorListPage from "./app/(front)/donor-list/DonorListPage";
import CampaignsPage from "./app/(front)/campaigns/CampaignsPage";
import CampaignsCreate from "./app/dashboard/campaigns/CampaignsCreate";
import CampaignEdit from "./app/dashboard/campaigns/edit/[id]/CampaignEdit";
import Transactions from "./app/dashboard/transactions/Transactions";
import FundRised from "./app/dashboard/funds-raised/FundRised";
import BlogPage from "./app/(front)/blog/BlogPage";
import BlogDetailsPage from "./app/(front)/blog/[slug]/BlogDetailsPage";
import EventsPage from "./app/(front)/events/EventsPage";
import EventsDetailsPage from "./app/(front)/events/[slug]/EventsDetailsPage";
import MyDonationPage from "./app/dashboard/my-donation/MyDonationPage";
import ProfileSettings from "./app/dashboard/profile-setting/ProfileSettings";
import PasswordPage from "./app/dashboard/change-password/PasswordPage";
import CampaignsPending from "./app/dashboard/campaigns/pending/CampaignsPending";
import CampaignsRunning from "./app/dashboard/campaigns/running/CampaignsRunning";
import CampaignsClosed from "./app/dashboard/campaigns/closed/CampaignsClosed";
import WithdrawLog from "./app/dashboard/withdraw/log/WithdrawLog";
import Withdraw from "./app/dashboard/withdraw/Withdraw";
import Tickets from "./app/dashboard/tickets/Tickets";
import ViewTicket from "./app/dashboard/tickets/[id]/ViewTicket";
import TicketCreate from "./app/dashboard/tickets/create-tickets/TicketCreate";
import GalleryPage from "./app/(front)/gallery/GalleryPage";
import FaqPage from "./app/(front)/faq/FaqPage";
import OtherPage from "./app/(front)/page/[slug]/OtherPage";
import DirectCheckoutPage from "./app/(front)/checkout/DirectCheckoutPage";
import SingleCampaign from "./app/(front)/campaigns/[slug]/SingleCampaign";
import ScrollToTop from "./helper/ScrollToTop";
import CheckoutPage from "./app/(front)/checkout/[slug]/Checkout";
import CancelPayment from "./app/(front)/checkout/cancel/CancelPayment";
import FailPayment from "./app/(front)/checkout/fail/FailPayment";
import SuccessPayment from "./app/(front)/checkout/success/SuccessPayment";
import Paystack from "./app/(front)/checkout/paystack/Paystack";
import RezorpayGateway from "./app/(front)/checkout/rezorpay/RezorpayGateway";
import ContactPage from "./app/(front)/contact/ContactPage";
import ForgotPage from "./app/(auth)/forgot/ForgotPage";
import NewPasswordPage from "./app/(auth)/forgot/new-password/NewPasswordPage";
import RegisterPage from "./app/(auth)/register/RegisterPage";
import BecomeVolunteerPage from "./app/(front)/become-volunteer/BecomeVolunteerPage";
import Maintenance from "./app/(front)/maintenance/page";
import Welcome from "./app/installer/Welcome";
import { baseUrl } from "./BaseUrl";
import { useEffect, useState } from "react";
import { CardsSkeleton } from "./app/ui/skeletons";

function App() {
  const [appInstall, setAppInstall] = useState(false);
  const [loading, setLoading] = useState(true);

  // check app install
  const checkAppInstall = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/check/install`);
      const data = await response.json();
      setAppInstall(data?.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false after the check
    }
  };

  useEffect(() => {
    checkAppInstall();
  }, []);

  if (loading) return <CardsSkeleton />;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/********** CHECK INSTALLER ROUTES **********/}
        {
          !appInstall &&
          <Route
            path="/check-install"
            element={<FrontendRouteWrapper children={<Welcome />} />}
          />
        }
        {/********** CHECK INSTALLER ROUTES **********/}


        {/********** FRONTEND PAGES ROUTES **********/}
        <Route
        path="/"
        element={<FrontendRouteWrapper children={appInstall ? <HomeComponent /> : <Welcome />} />}
      />
        <Route
          path="/about"
          element={<FrontendRouteWrapper children={<AboutPage />} />}
        />
        <Route
          path="/volunteers"
          element={<FrontendRouteWrapper children={<VolunteersPage />} />}
        />
        <Route
          path="/testimonial"
          element={<FrontendRouteWrapper children={<TestimonialPage />} />}
        />
        <Route
          path="/donor-list"
          element={<FrontendRouteWrapper children={<DonorListPage />} />}
        />
        <Route
          path="/campaigns"
          element={<FrontendRouteWrapper children={<CampaignsPage />} />}
        />
        <Route
          path="/campaigns/:slug"
          element={<FrontendRouteWrapper children={<SingleCampaign />} />}
        />
        <Route
          path="/blog"
          element={<FrontendRouteWrapper children={<BlogPage />} />}
        />
        <Route
          path="/blog/:slug"
          element={<FrontendRouteWrapper children={<BlogDetailsPage />} />}
        />
        <Route
          path="/contact"
          element={<FrontendRouteWrapper children={<ContactPage />} />}
        />

        <Route
          path="/events"
          element={<FrontendRouteWrapper children={<EventsPage />} />}
        />
        <Route
          path="/events/:slug"
          element={<FrontendRouteWrapper children={<EventsDetailsPage />} />}
        />
        <Route
          path="/gallery"
          element={<FrontendRouteWrapper children={<GalleryPage />} />}
        />
        <Route
          path="/faq"
          element={<FrontendRouteWrapper children={<FaqPage />} />}
        />
        <Route
          path="/page/:slug"
          element={<FrontendRouteWrapper children={<OtherPage />} />}
        />

        <Route
          path="/checkout"
          element={<FrontendRouteWrapper children={<DirectCheckoutPage />} />}
        />

        <Route
          path="/checkout/cancel"
          element={<FrontendRouteWrapper children={<CancelPayment />} />}
        />
        <Route
          path="/checkout/fail"
          element={<FrontendRouteWrapper children={<FailPayment />} />}
        />
        <Route
          path="/checkout/success"
          element={<FrontendRouteWrapper children={<SuccessPayment />} />}
        />
        <Route
          path="/checkout/paystack"
          element={<FrontendRouteWrapper children={<Paystack />} />}
        />
        <Route
          path="/checkout/rezorpay"
          element={<FrontendRouteWrapper children={<RezorpayGateway />} />}
        />

        <Route
          path="/checkout/:slug"
          element={<FrontendRouteWrapper children={<CheckoutPage />} />}
        />
        <Route
          path="/become-volunteer"
          element={<FrontendRouteWrapper children={<BecomeVolunteerPage />} />}
        />
        <Route
          path="/maintenance"
          element={<FrontendRouteWrapper children={<Maintenance />} />}
        />


        {/********** FRONTEND AUTH ROUTES **********/}
        <Route
          path="/login"
          element={<FrontendRouteWrapper children={<Login />} />}
        />
        <Route
          path="/register"
          element={<FrontendRouteWrapper children={<RegisterPage />} />}
        />
        <Route
          path="/forgot"
          element={<FrontendRouteWrapper children={<ForgotPage />} />}
        />
        <Route
          path="/forgot/new-password"
          element={<FrontendRouteWrapper children={<NewPasswordPage />} />}
        />

        {/********** PROTECTED ROUTES **********/}
        <Route element={<ProtectedRouteWrapper />}>
          <Route
            path="/dashboard"
            element={<DashboardRouteWrapper children={<DashBoardHome />} />}
          />

          <Route
            path="/dashboard/campaigns/all"
            element={<DashboardRouteWrapper children={<CampaignsAll />} />}
          />

          <Route
            path="/dashboard/campaigns/pending"
            element={<DashboardRouteWrapper children={<CampaignsPending />} />}
          />

          <Route
            path="/dashboard/campaigns/running"
            element={<DashboardRouteWrapper children={<CampaignsRunning />} />}
          />

          <Route
            path="/dashboard/campaigns/closed"
            element={<DashboardRouteWrapper children={<CampaignsClosed />} />}
          />

          <Route
            path="/dashboard/campaigns"
            element={<DashboardRouteWrapper children={<CampaignsCreate />} />}
          />
          <Route
            path="/dashboard/campaigns/edit/:id"
            element={<DashboardRouteWrapper children={<CampaignEdit />} />}
          />

          <Route
            path="/dashboard/transactions"
            element={<DashboardRouteWrapper children={<Transactions />} />}
          />

          <Route
            path="/dashboard/funds-raised"
            element={<DashboardRouteWrapper children={<FundRised />} />}
          />
          <Route
            path="/dashboard/my-donation"
            element={<DashboardRouteWrapper children={<MyDonationPage />} />}
          />

          <Route
            path="/dashboard/profile-setting"
            element={<DashboardRouteWrapper children={<ProfileSettings />} />}
          />

          <Route
            path="/dashboard/change-password"
            element={<DashboardRouteWrapper children={<PasswordPage />} />}
          />

          <Route
            path="/dashboard/withdraw"
            element={<DashboardRouteWrapper children={<Withdraw />} />}
          />

          <Route
            path="/dashboard/withdraw/log"
            element={<DashboardRouteWrapper children={<WithdrawLog />} />}
          />

          <Route
            path="/dashboard/tickets"
            element={<DashboardRouteWrapper children={<Tickets />} />}
          />

          <Route
            path="/dashboard/tickets/:ticketId"

            element={<DashboardRouteWrapper children={<ViewTicket />} />}
          />

          <Route
            path="/dashboard/tickets/create-tickets"

            element={<DashboardRouteWrapper children={<TicketCreate />} />}
          />
        </Route>



        {/********** 404 ROUTE **********/}
        <Route
          path="*"
          element={<FrontendRouteWrapper children={<Custom404 />} />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;

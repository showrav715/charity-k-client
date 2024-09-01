
import ForgetPassWord from '@/app/components/auth/ForgetPassword'
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';

export default function ForgotPage() {
  const settings = useStore((state) => state.settings);

  if (!settings) return <CardsSkeleton />;

  return <>
    <Header />
    <ForgetPassWord />
    <Footer />
  </>
}

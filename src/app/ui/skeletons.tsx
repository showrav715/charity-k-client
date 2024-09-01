import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function HerosectionSkeleton() {
  return (
    <section className="ch-hero-section bg-class">
      <div className="container">
        <div className="row justify-content-center align-items-center">
        <div className="ch-loading-spinner"></div>
        </div>
      </div>
    </section>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <div className="ch-loading-spinner-wrapper">
        <div className="ch-loading-spinner"></div>
      </div>
    </>
  );
}

export function BreadCrumbSkeleton() {
  return (
    <div
      className="ch-breadcrumb-area bg-class"
      style={{ position: "relative" }}
    >
      <div className="container" style={{ position: "absolute" }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="breadcrumb-content">
              <h2>
                <Skeleton
                  width={300}
                  style={{ opacity: "0.2" }}
                  count={2}
                  height={20}
                />
              </h2>
              <ul className="breadcrumb-menu">
                <li>
                  <Skeleton
                    style={{ opacity: "0.2" }}
                    count={1}
                    width={100}
                    height={40}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

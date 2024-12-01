"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const NotFoundPage = () => {
  const router = useRouter()
  const changeRoute=()=>{
    router.push("/project")
  }
  useEffect(()=>{
    changeRoute()
  },[])
  return (
    <section className="flex items-center  p-16 text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          {/* Error Code */}
          <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
            <span className="sr-only">Error</span>404
          </h2>
          {/* Main Error Message */}
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          {/* Additional Information */}
          <p className="mt-4 mb-8 text-gray-600">
            But don't worry, you can find plenty of other things on our homepage.
          </p>
          {/* Back to Homepage Button */}
          <Link
            rel="noopener noreferrer"
            href="/project"
            className="px-8 py-3 font-semibold rounded bg-blue-500 text-gray-50 hover:bg-blue-700 transition-colors"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;

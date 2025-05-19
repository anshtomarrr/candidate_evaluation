import Link from "next/link";
import Footer from "@/components/shared/Footer";
import TestimonialCard from "@/components/ui/TestimonialCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero section */}
      <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-100 opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-100 opacity-30 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Connect Talent with Opportunities
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              JobMatch is a modern platform that helps recruiters find the
              perfect candidates and job seekers discover their dream roles
              through intelligent matching.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/register"
                className="btn-primary px-6 py-3 text-lg animate-pulse-slow"
              >
                Get started
              </Link>
              <Link
                href="/jobs"
                className="text-lg font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                Browse jobs <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-slide-up">
              <div className="card p-6 text-center">
                <p className="text-4xl font-bold text-blue-600">5,000+</p>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Active Job Listings
                </p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-4xl font-bold text-blue-600">2M+</p>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Registered Users
                </p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-4xl font-bold text-blue-600">10K+</p>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Companies
                </p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-4xl font-bold text-blue-600">85%</p>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Placement Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title sm:text-4xl">How JobMatch Works</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform uses advanced matching algorithms to connect the
              right talent with the right opportunities.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="card flex flex-col p-8 hover:scale-105 transition-transform duration-300">
                <dt className="text-lg font-semibold leading-7 text-gray-900 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 mr-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  For Recruiters
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Post jobs, build custom application forms, and find
                    candidates with the right skills and experience.
                  </p>
                  <p className="mt-6">
                    <Link
                      href="/recruiter/dashboard"
                      className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="card flex flex-col p-8 hover:scale-105 transition-transform duration-300">
                <dt className="text-lg font-semibold leading-7 text-gray-900 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 mr-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  For Job Seekers
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Discover opportunities that match your skills, apply with
                    ease, and track your applications.
                  </p>
                  <p className="mt-6">
                    <Link
                      href="/jobs"
                      className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                    >
                      Browse jobs <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
              <div className="card flex flex-col p-8 hover:scale-105 transition-transform duration-300">
                <dt className="text-lg font-semibold leading-7 text-gray-900 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 mr-3">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </div>
                  Smart Matching
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Our AI-powered matching algorithm ensures the best fit
                    between candidates and job openings.
                  </p>
                  <p className="mt-6">
                    <Link
                      href="/how-it-works"
                      className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
                    >
                      How it works <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title sm:text-4xl">
              Success Stories from Our Users
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Hear from job seekers and recruiters who found success with
              JobMatch.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            <TestimonialCard
              quote="JobMatch helped me find my dream job in just two weeks. The matching algorithm understood exactly what I was looking for in my next role."
              author="Sarah Johnson"
              role="Software Engineer"
              company="TechCorp"
              rating={5}
            />
            <TestimonialCard
              quote="As a recruiter, I've been able to find qualified candidates much faster than with traditional job boards. The quality of applicants is consistently high."
              author="Michael Chen"
              role="HR Director"
              company="DataSystems"
              rating={5}
            />
            <TestimonialCard
              quote="The application process was so smooth, and I appreciated the transparency throughout. I could see exactly where I stood in the hiring process."
              author="Emily Rodriguez"
              role="UX Designer"
              company="CreativeMinds"
              rating={4}
            />
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/testimonials"
              className="text-lg font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Read more success stories <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured companies section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title sm:text-4xl">Featured Companies</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Top employers that trust JobMatch for their hiring needs.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-8 sm:grid-cols-3 lg:max-w-none lg:grid-cols-6">
            {[
              "TechCorp",
              "DataSystems",
              "CreativeMinds",
              "CloudTech",
              "InnovateCo",
              "FinTech",
            ].map((company, index) => (
              <div
                key={index}
                className="flex justify-center items-center h-24"
              >
                <div className="h-16 w-16 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                  {company.charAt(0)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/companies"
              className="text-lg font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              View all companies <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="relative isolate overflow-hidden rounded-2xl bg-blue-600 px-6 py-16 shadow-2xl sm:px-16 md:py-20 lg:flex lg:items-center lg:gap-x-20 lg:px-24">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to find your perfect match?
              </h2>
              <p className="mt-6 text-lg leading-8 text-white">
                Join thousands of companies and job seekers who trust JobMatch
                for their career needs.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Link
                  href="/auth/register"
                  className="rounded-md bg-white px-6 py-3 text-lg font-semibold text-blue-600 shadow-sm hover:bg-gray-100 transition-colors duration-200"
                >
                  Sign up now
                </Link>
                <Link
                  href="/auth/login"
                  className="text-lg font-semibold leading-6 text-white hover:text-blue-100 transition-colors duration-200"
                >
                  Sign in <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-0 lg:h-full lg:w-1/2">
              <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

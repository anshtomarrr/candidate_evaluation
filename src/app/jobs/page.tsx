"use client";

import { useState } from "react";
import JobCard from "@/components/ui/JobCard";
import JobFilter from "@/components/ui/JobFilter";
import SearchBar from "@/components/ui/SearchBar";
import PageHeader from "@/components/ui/PageHeader";

// Mock job data
const MOCK_JOBS = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    description:
      "We are looking for an experienced Frontend Developer to join our team...",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    featured: true,
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Remote",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    description: "Join our backend team to build scalable APIs and services...",
    posted: "1 week ago",
    skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
    featured: false,
  },
  {
    id: "3",
    title: "UX Designer",
    company: "CreativeMinds",
    location: "New York, NY",
    type: "Contract",
    salary: "$70 - $90 per hour",
    description:
      "Looking for a talented UX Designer to help create beautiful user experiences...",
    posted: "3 days ago",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    featured: true,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    description:
      "Help us build and maintain our cloud infrastructure and CI/CD pipelines...",
    posted: "1 day ago",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD", "Docker"],
    featured: false,
  },
  {
    id: "5",
    title: "Product Manager",
    company: "InnovateCo",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description:
      "Lead product development and work with cross-functional teams...",
    posted: "5 days ago",
    skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
    featured: false,
  },
];

// Filter definitions
const FILTERS = [
  {
    id: "jobType",
    name: "Job Type",
    options: [
      { id: "full-time", label: "Full-time" },
      { id: "part-time", label: "Part-time" },
      { id: "contract", label: "Contract" },
      { id: "internship", label: "Internship" },
    ],
  },
  {
    id: "experience",
    name: "Experience Level",
    options: [
      { id: "entry", label: "Entry Level" },
      { id: "mid", label: "Mid Level" },
      { id: "senior", label: "Senior Level" },
      { id: "executive", label: "Executive" },
    ],
  },
  {
    id: "location",
    name: "Location",
    options: [
      { id: "remote", label: "Remote" },
      { id: "onsite", label: "On-site" },
      { id: "hybrid", label: "Hybrid" },
    ],
  },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState({ keyword: "", location: "" });
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const handleSearch = (query: { keyword: string; location: string }) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (
    filterId: string,
    optionId: string,
    isChecked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterId] || [];

      if (isChecked) {
        return {
          ...prev,
          [filterId]: [...currentFilters, optionId],
        };
      } else {
        return {
          ...prev,
          [filterId]: currentFilters.filter((id) => id !== optionId),
        };
      }
    });
  };

  // Filter jobs based on search criteria and filters
  const filteredJobs = MOCK_JOBS.filter((job) => {
    // Search query filtering
    const matchesKeyword =
      searchQuery.keyword === "" ||
      job.title.toLowerCase().includes(searchQuery.keyword.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.keyword.toLowerCase()) ||
      job.description
        .toLowerCase()
        .includes(searchQuery.keyword.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.keyword.toLowerCase())
      );

    const matchesLocation =
      searchQuery.location === "" ||
      job.location.toLowerCase().includes(searchQuery.location.toLowerCase());

    // Filter criteria
    const matchesJobType =
      !selectedFilters.jobType?.length ||
      (job.type === "Full-time" &&
        selectedFilters.jobType.includes("full-time")) ||
      (job.type === "Part-time" &&
        selectedFilters.jobType.includes("part-time")) ||
      (job.type === "Contract" &&
        selectedFilters.jobType.includes("contract")) ||
      (job.type === "Internship" &&
        selectedFilters.jobType.includes("internship"));

    const matchesLocation2 =
      !selectedFilters.location?.length ||
      (job.location.includes("Remote") &&
        selectedFilters.location.includes("remote")) ||
      (!job.location.includes("Remote") &&
        selectedFilters.location.includes("onsite"));

    return (
      matchesKeyword && matchesLocation && matchesJobType && matchesLocation2
    );
  });

  return (
    <div className="pt-24">
      <PageHeader
        title="Find Your Perfect Job"
        description="Search through thousands of job listings to find your next career opportunity."
        hasBackground={true}
      />

      {/* Search bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
          <SearchBar onSearch={handleSearch} className="max-w-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <JobFilter
              filters={FILTERS}
              onFilterChange={handleFilterChange}
              selectedFilters={selectedFilters}
            />
          </div>

          {/* Job listings */}
          <div className="flex-grow">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "job" : "jobs"} found
              </p>
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="form-input py-1 text-sm"
                  defaultValue="relevance"
                >
                  <option value="relevance">Relevance</option>
                  <option value="recent">Most Recent</option>
                  <option value="salary-high">Salary (High to Low)</option>
                  <option value="salary-low">Salary (Low to High)</option>
                </select>
              </div>
            </div>

            <div className="space-y-6 animate-fade-in">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    salary={job.salary}
                    type={job.type}
                    posted={job.posted}
                    skills={job.skills}
                    featured={job.featured}
                  />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-lg text-gray-600">
                    No jobs found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery({ keyword: "", location: "" });
                      setSelectedFilters({});
                    }}
                    className="mt-4 btn-secondary"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

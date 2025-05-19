"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchBar from "@/components/ui/SearchBar";
import CompanyCard from "@/components/ui/CompanyCard";

// Mock company data
const MOCK_COMPANIES = [
  {
    id: "1",
    name: "TechCorp",
    industry: "Software Development",
    location: "San Francisco, CA",
    description:
      "A leading technology company specializing in creating innovative software solutions for businesses of all sizes.",
    jobCount: 12,
    featured: true,
  },
  {
    id: "2",
    name: "DataSystems",
    industry: "Data Analytics",
    location: "Remote",
    description:
      "Specializing in big data solutions and analytics platforms that help businesses make data-driven decisions.",
    jobCount: 8,
    featured: false,
  },
  {
    id: "3",
    name: "CreativeMinds",
    industry: "Design & Creative",
    location: "New York, NY",
    description:
      "An award-winning creative agency focused on creating beautiful user experiences and brand identities.",
    jobCount: 5,
    featured: true,
  },
  {
    id: "4",
    name: "CloudTech",
    industry: "Cloud Services",
    location: "Seattle, WA",
    description:
      "Providing cloud infrastructure and DevOps solutions to help businesses scale efficiently and securely.",
    jobCount: 10,
    featured: false,
  },
  {
    id: "5",
    name: "InnovateCo",
    industry: "Product Development",
    location: "Austin, TX",
    description:
      "An innovation-focused company building next-generation products that transform industries.",
    jobCount: 7,
    featured: false,
  },
  {
    id: "6",
    name: "FinTech Solutions",
    industry: "Financial Technology",
    location: "Chicago, IL",
    description:
      "Revolutionizing financial services through innovative technology solutions and digital banking platforms.",
    jobCount: 9,
    featured: true,
  },
];

// Industry options for filtering
const INDUSTRIES = [
  "All Industries",
  "Software Development",
  "Data Analytics",
  "Design & Creative",
  "Cloud Services",
  "Product Development",
  "Financial Technology",
];

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState({ keyword: "", location: "" });
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");

  const handleSearch = (query: { keyword: string; location: string }) => {
    setSearchQuery(query);
  };

  // Filter companies based on search criteria
  const filteredCompanies = MOCK_COMPANIES.filter((company) => {
    const matchesKeyword =
      searchQuery.keyword === "" ||
      company.name.toLowerCase().includes(searchQuery.keyword.toLowerCase()) ||
      company.description
        .toLowerCase()
        .includes(searchQuery.keyword.toLowerCase());

    const matchesLocation =
      searchQuery.location === "" ||
      company.location
        .toLowerCase()
        .includes(searchQuery.location.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "All Industries" ||
      company.industry === selectedIndustry;

    return matchesKeyword && matchesLocation && matchesIndustry;
  });

  return (
    <div className="pt-24">
      <PageHeader
        title="Discover Top Companies"
        description="Explore leading companies across various industries that are actively hiring."
        hasBackground={true}
      />

      {/* Search and filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
          <div className="flex flex-col gap-6">
            <div className="w-full md:w-64">
              <label htmlFor="industry" className="form-label">
                Industry
              </label>
              <select
                id="industry"
                className="form-input h-10 py-2 text-gray-900"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow">
              <SearchBar
                onSearch={handleSearch}
                className="max-w-full"
                placeholder="Search companies by name or keyword"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Companies list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {filteredCompanies.length}{" "}
            {filteredCompanies.length === 1 ? "company" : "companies"} found
          </p>
          <div className="flex items-center">
            <label htmlFor="sort" className="text-sm text-gray-600 mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              className="form-input py-1 text-sm"
              defaultValue="featured"
            >
              <option value="featured">Featured</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="jobs-desc">Most Jobs</option>
            </select>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                id={company.id}
                name={company.name}
                industry={company.industry}
                location={company.location}
                description={company.description}
                jobCount={company.jobCount}
                featured={company.featured}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-lg text-gray-600">
                No companies found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery({ keyword: "", location: "" });
                  setSelectedIndustry("All Industries");
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
  );
}

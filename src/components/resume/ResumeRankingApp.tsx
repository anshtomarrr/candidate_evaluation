import React, { useState, useEffect, useCallback } from "react";
import Papa from "papaparse";
import _ from "lodash";

// We'll be using the PDF.js library loaded from CDN
const pdfjsLib = window.pdfjsLib;

// Common English stopwords to filter out during processing
const STOPWORDS = new Set([
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "aren't",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can't",
  "cannot",
  "could",
  "couldn't",
  "did",
  "didn't",
  "do",
  "does",
  "doesn't",
  "doing",
  "don't",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "hadn't",
  "has",
  "hasn't",
  "have",
  "haven't",
  "having",
  "he",
  "he'd",
  "he'll",
  "he's",
  "her",
  "here",
  "here's",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "how's",
  "i",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "if",
  "in",
  "into",
  "is",
  "isn't",
  "it",
  "it's",
  "its",
  "itself",
  "let's",
  "me",
  "more",
  "most",
  "mustn't",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "shan't",
  "she",
  "she'd",
  "she'll",
  "she's",
  "should",
  "shouldn't",
  "so",
  "some",
  "such",
  "than",
  "that",
  "that's",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "there's",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "wasn't",
  "we",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "were",
  "weren't",
  "what",
  "what's",
  "when",
  "when's",
  "where",
  "where's",
  "which",
  "while",
  "who",
  "who's",
  "whom",
  "why",
  "why's",
  "with",
  "won't",
  "would",
  "wouldn't",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "your",
  "yours",
  "yourself",
  "yourselves",
]);

// Text preprocessing function
const preprocessText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // Replace punctuation with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim()
    .split(" ")
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));
};

// TF-IDF calculation
const calculateTfIdf = (documents, query) => {
  // Calculate term frequency for each document
  const documentTermFreqs = documents.map((doc) => {
    const termFreq = {};
    doc.forEach((term) => {
      termFreq[term] = (termFreq[term] || 0) + 1;
    });
    return termFreq;
  });

  // Calculate query term frequency
  const queryTermFreq = {};
  query.forEach((term) => {
    queryTermFreq[term] = (queryTermFreq[term] || 0) + 1;
  });

  // Calculate document frequency (how many documents contain each term)
  const docFreq = {};
  const allTerms = new Set();

  // Collect all unique terms from all documents and query
  documentTermFreqs.forEach((doc) => {
    Object.keys(doc).forEach((term) => {
      allTerms.add(term);
      docFreq[term] = (docFreq[term] || 0) + 1;
    });
  });

  // Add query terms to the set of all terms
  Object.keys(queryTermFreq).forEach((term) => {
    allTerms.add(term);
  });

  // Calculate IDF for each term
  const totalDocs = documentTermFreqs.length;
  const idf = {};
  allTerms.forEach((term) => {
    // Using smooth IDF formula: ln(1 + N/df)
    idf[term] = Math.log(1 + totalDocs / (docFreq[term] || 0.01));
  });

  // Calculate TF-IDF vectors for each document
  const tfidfVectors = documentTermFreqs.map((termFreq) => {
    const tfidf = {};
    allTerms.forEach((term) => {
      // TF * IDF
      tfidf[term] = (termFreq[term] || 0) * (idf[term] || 0);
    });
    return tfidf;
  });

  // Calculate TF-IDF vector for query
  const queryTfidf = {};
  allTerms.forEach((term) => {
    queryTfidf[term] = (queryTermFreq[term] || 0) * (idf[term] || 0);
  });

  return { documentVectors: tfidfVectors, queryVector: queryTfidf };
};

// Cosine similarity calculation
const calculateCosineSimilarity = (vector1, vector2) => {
  // Find all unique terms across both vectors
  const allTerms = new Set([...Object.keys(vector1), ...Object.keys(vector2)]);

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  // Calculate dot product and magnitudes
  allTerms.forEach((term) => {
    const val1 = vector1[term] || 0;
    const val2 = vector2[term] || 0;

    dotProduct += val1 * val2;
    magnitude1 += val1 * val1;
    magnitude2 += val2 * val2;
  });

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  // Check for zero vectors to avoid division by zero
  if (magnitude1 === 0 || magnitude2 === 0) return 0;

  return dotProduct / (magnitude1 * magnitude2);
};

// Extract text from PDF using pdf.js loaded from CDN
const extractTextFromPdf = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      try {
        if (!window.pdfjsLib) {
          throw new Error("PDF.js library not loaded. Please try again.");
        }

        const typedArray = new Uint8Array(event.target.result);
        const loadingTask = window.pdfjsLib.getDocument({ data: typedArray });
        const pdf = await loadingTask.promise;

        let fullText = "";

        // Extract text from each page
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + " ";
        }

        resolve(fullText.trim());
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsArrayBuffer(file);
  });
};

// Extract top matching keywords
const extractTopKeywords = (resumeTokens, jobTokens, count = 10) => {
  // Count frequency of each token in both resume and job description
  const resumeFreq = {};
  const jobFreq = {};

  resumeTokens.forEach((token) => {
    resumeFreq[token] = (resumeFreq[token] || 0) + 1;
  });

  jobTokens.forEach((token) => {
    jobFreq[token] = (jobFreq[token] || 0) + 1;
  });

  // Find common keywords
  const commonKeywords = Object.keys(resumeFreq).filter(
    (token) => jobFreq[token]
  );

  // Sort by importance (product of frequencies)
  const sortedKeywords = commonKeywords.sort((a, b) => {
    return jobFreq[b] * resumeFreq[b] - jobFreq[a] * resumeFreq[a];
  });

  return sortedKeywords.slice(0, count);
};

export default function ResumeRankingApp() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [showKeywords, setShowKeywords] = useState(true);

  // Load PDF.js library dynamically when component mounts
  useEffect(() => {
    if (!window.pdfjsLib) {
      const script1 = document.createElement("script");
      script1.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js";
      script1.async = true;
      script1.onload = () => {
        const script2 = document.createElement("script");
        script2.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
        script2.async = true;
        document.body.appendChild(script2);
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js";
      };
      document.body.appendChild(script1);
    }
  }, []);

  // Handle file uploads
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Validate file types (PDFs only)
    const invalidFiles = selectedFiles.filter(
      (file) => file.type !== "application/pdf"
    );

    if (invalidFiles.length > 0) {
      setError(
        `Only PDF files are supported. Please remove: ${invalidFiles
          .map((f) => f.name)
          .join(", ")}`
      );
      return;
    }

    setFiles(selectedFiles);
    setError("");
  };

  // Handle job description changes
  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  // Process resumes and rank them
  const processResumes = async () => {
    if (files.length === 0) {
      setError("Please upload at least one resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    if (!window.pdfjsLib) {
      setError(
        "PDF.js library is still loading. Please wait a moment and try again."
      );
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      // Process job description
      const processedJobDesc = preprocessText(jobDescription);

      // Process each resume
      const processedResumes = await Promise.all(
        files.map(async (file) => {
          try {
            const text = await extractTextFromPdf(file);
            const processedText = preprocessText(text);
            return {
              file,
              text,
              processedText,
            };
          } catch (error) {
            console.error(`Error processing ${file.name}:`, error);
            throw new Error(`Failed to process ${file.name}: ${error.message}`);
          }
        })
      );

      // Calculate TF-IDF vectors
      const documents = processedResumes.map((resume) => resume.processedText);
      const { documentVectors, queryVector } = calculateTfIdf(
        documents,
        processedJobDesc
      );

      // Calculate similarity scores and rank resumes
      const rankedResults = processedResumes.map((resume, index) => {
        const similarity = calculateCosineSimilarity(
          documentVectors[index],
          queryVector
        );
        const topKeywords = extractTopKeywords(
          resume.processedText,
          processedJobDesc
        );

        return {
          fileName: resume.file.name,
          similarity: similarity * 100, // Convert to percentage
          keywords: topKeywords,
        };
      });

      // Sort by similarity score (descending)
      rankedResults.sort((a, b) => b.similarity - a.similarity);

      setResults(rankedResults);
    } catch (error) {
      console.error("Error processing resumes:", error);
      setError(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Export results as CSV
  const exportToCSV = () => {
    if (results.length === 0) return;

    const csvData = results.map((result) => ({
      "Resume Name": result.fileName,
      "Similarity Score (%)": result.similarity.toFixed(2),
      "Top Keywords": result.keywords.join(", "),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume-rankings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Resume Ranking Tool
      </h1>

      {/* Library Status Message */}
      {!window.pdfjsLib && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">
            Loading PDF processing library... Please wait.
          </span>
        </div>
      )}

      {/* Upload and Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Resume Upload */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Upload Resumes
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors inline-block mb-4"
            >
              Select PDF Files
            </label>
            <p className="text-gray-900 text-sm">
              {files.length === 0
                ? "No files selected"
                : `${files.length} file(s) selected`}
            </p>
            {files.length > 0 && (
              <ul className="text-left text-sm mt-4 max-h-32 overflow-y-auto text-gray-900">
                {files.map((file, index) => (
                  <li key={index} className="truncate">
                    {file.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Job Description
          </h2>
          <textarea
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            placeholder="Paste job description here..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px] text-gray-900 bg-white"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <button
            onClick={processResumes}
            disabled={isProcessing}
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mr-4"
          >
            {isProcessing ? "Processing..." : "Rank Resumes"}
          </button>

          {results.length > 0 && (
            <button
              onClick={exportToCSV}
              className="bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 transition-colors"
            >
              Export CSV
            </button>
          )}
        </div>

        {results.length > 0 && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="show-keywords"
              checked={showKeywords}
              onChange={() => setShowKeywords(!showKeywords)}
              className="mr-2"
            />
            <label htmlFor="show-keywords" className="text-sm text-gray-900">
              Show matching keywords
            </label>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Results Table */}
      {results.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rank
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Resume
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Match Score
                </th>
                {showKeywords && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Top Matching Keywords
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 w-16 text-sm font-medium text-gray-900">
                        {result.similarity.toFixed(2)}%
                      </div>
                      <div className="w-full max-w-xs">
                        <div className="bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{
                              width: `${Math.min(100, result.similarity)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  {showKeywords && (
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {result.keywords.map((keyword, kidx) => (
                          <span
                            key={kidx}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client"

import type React from "react"
import { useState } from "react"
import { Upload, FileText, AlertCircle } from "lucide-react"

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)

    if (!e.target.files || e.target.files.length === 0) {
      setFile(null)
      setFileUrl(null)
      return
    }

    const selectedFile = e.target.files[0]

    // Check if file is a PDF
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file")
      setFile(null)
      setFileUrl(null)
      return
    }

    // Check file size (limit to 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB")
      setFile(null)
      setFileUrl(null)
      return
    }

    setFile(selectedFile)

    // Create a URL for the file
    const url = URL.createObjectURL(selectedFile)
    setFileUrl(url)
  }

  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Resume Uploader</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="resume-upload" className="cursor-pointer w-full">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-gray-50 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
              <button type="button" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Select Resume
              </button>
            </div>
            <input id="resume-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-1 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {file && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="font-medium">{file.name}</span>
            <span className="text-sm text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
          </div>
        </div>
      )}

      {fileUrl && (
        <div className="border rounded-lg overflow-hidden bg-white shadow-md">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-semibold">Resume Preview</h2>
          </div>
          <div className="p-4">
            <div className="pdf-container" style={{ height: "600px", width: "100%" }}>
              {/* Using the browser's native PDF viewer with object tag */}
              <object
                data={fileUrl}
                type="application/pdf"
                width="100%"
                height="100%"
                className="border rounded"
              >
                <div className="text-center py-10">
                  <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-2" />
                  <p>Unable to display PDF. <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Download</a> instead.</p>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
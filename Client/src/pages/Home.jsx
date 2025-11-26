import React, { useState } from 'react';
import { Upload, FileText, Image, X, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import useFileAnalysis from '../hooks/useAnalyzeFile';
import AnalysisResults from '../components/AnalysisResults';
import Header from '../components/Header';
import {UseAuthContext} from '../context/authContext.jsx';
import useLogout from '../hooks/useLogout.js';

// Main Home Component
const Home = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const {auth} = UseAuthContext();
  const {logout} = useLogout();
  
  // Use the custom hook
  const { analyzeFiles, loading, error, result, reset } = useFileAnalysis();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      file.type === 'application/pdf' || file.type.startsWith('image/')
    );
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Handle analyze button click
  const handleAnalyze = async () => {
    if (files.length === 0) {
      alert('Please upload at least one file to analyze');
      return;
    }
    
    try {
      await analyzeFiles(files);
    } catch (err) {
      console.error('Analysis failed:', err);
    }
  };

  const handleNewAnalysis = () => {
    reset();
    setFiles([]);
  };

  const getFileIcon = (fileType) => {
    if (fileType === 'application/pdf') {
      return <FileText className="text-red-500" size={24} />;
    }
    return <Image className="text-blue-500" size={24} />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleLogout = () => {
      // e.preventDefault();
      logout();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <Header username={auth.username} onLogout={handleLogout}/>
      <br/><br/>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Document Analyzer</h1>
          <p className="text-gray-600">Upload PDFs or images to get AI-powered insights</p>
        </div>

        {/* Show Results if Available */}
        {result && (
          <>
            <AnalysisResults result={result} onClose={handleNewAnalysis} />
            <button
              onClick={handleNewAnalysis}
              className="w-full py-3 px-6 rounded-2xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-xl transition-all duration-200"
            >
              Analyze Another Document
            </button>
          </>
        )}

        {/* Show Upload Interface if No Results */}
        {!result && (
          <>
            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bg-white rounded-2xl shadow-xl p-8 mb-6 transition-all duration-300 ${
                isDragging ? 'border-4 border-indigo-500 bg-indigo-50' : 'border-2 border-dashed border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
                  <Upload className="text-white" size={40} />
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {isDragging ? 'Drop files here' : 'Drag & Drop files'}
                </h2>
                <p className="text-gray-500 mb-4">or</p>
                
                <label className="inline-block">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <span className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer inline-block">
                    Browse Files
                  </span>
                </label>
                
                <p className="text-sm text-gray-400 mt-4">Supported formats: PDF, JPG, PNG</p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold text-red-800">Analysis Failed</h4>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Uploaded Files List */}
            {files.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Uploaded Files ({files.length})
                </h3>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        {getFileIcon(file.type)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-2 hover:bg-red-100 rounded-full transition-colors"
                        aria-label="Remove file"
                        disabled={loading}
                      >
                        <X className="text-red-500" size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={files.length === 0 || loading}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg shadow-xl transition-all duration-200 flex items-center justify-center space-x-2 ${
                files.length > 0 && !loading
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-2xl hover:from-purple-600 hover:to-indigo-700 transform hover:-translate-y-1'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  <span>Analyze Documents</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
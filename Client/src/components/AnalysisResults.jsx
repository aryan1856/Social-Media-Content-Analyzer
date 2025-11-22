import React from 'react';
import { CheckCircle, X } from 'lucide-react';

const AnalysisResults = ({ result, onClose, showCloseButton = true }) => {
  if (!result || !result.recommendations) {
    return null;
  }

  const recommendations = result.recommendations;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CheckCircle className="text-green-500" size={28} />
          Analysis Complete
        </h3>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close results"
          >
            <X className="text-gray-500" size={24} />
          </button>
        )}
      </div>

      {/* Overall Score */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-700">Overall Score</span>
          <span className="text-3xl font-bold text-indigo-600">
            {recommendations.overallScore}/100
          </span>
        </div>
        <div className="mt-2 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-1000"
            style={{ width: `${recommendations.overallScore}%` }}
          />
        </div>
      </div>

      {/* Summary */}
      {recommendations.summary && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Summary</h4>
          <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
            {recommendations.summary}
          </p>
        </div>
      )}

      {/* Strengths & Weaknesses Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Strengths */}
        {recommendations.strengths && recommendations.strengths.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-green-700 mb-3">Strengths</h4>
            <ul className="space-y-2">
              {recommendations.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Weaknesses */}
        {recommendations.weaknesses && recommendations.weaknesses.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-red-700 mb-3">Weaknesses</h4>
            <ul className="space-y-2">
              {recommendations.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {recommendations.recommendations && recommendations.recommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommendations</h4>
          <ul className="space-y-2">
            {recommendations.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-600 font-bold">{index + 1}.</span>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Sections Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Engagement Tips */}
        {recommendations.engagementTips && recommendations.engagementTips.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Engagement Tips</h4>
            <ul className="space-y-2">
              {recommendations.engagementTips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SEO Suggestions */}
        {recommendations.seoSuggestions && recommendations.seoSuggestions.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">SEO Suggestions</h4>
            <ul className="space-y-2">
              {recommendations.seoSuggestions.map((seo, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-indigo-500">•</span>
                  <span>{seo}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Readability & Tone Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Readability */}
        {recommendations.readability && recommendations.readability.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Readability</h4>
            <ul className="space-y-2">
              {recommendations.readability.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-orange-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tone & Clarity */}
        {recommendations.toneAndClarity && recommendations.toneAndClarity.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Tone & Clarity</h4>
            <ul className="space-y-2">
              {recommendations.toneAndClarity.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-teal-500">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Suggested Rewrite */}
      {recommendations.suggestedRewrite && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Suggested Rewrite</h4>
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <p className="text-gray-700 italic">{recommendations.suggestedRewrite}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;
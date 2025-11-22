import { useState } from 'react';
import axios from 'axios';

export const useFileAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const analyzeFiles = async (files) => {
    if (!files || files.length === 0) {
      throw new Error('No files provided for analysis');
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const file = files[0];
      
      const formData = new FormData();
      formData.append('file', file);

      const base = import.meta.env.VITE_BACKEND_URL;
      const reqAPI = import.meta.env.VITE_INSIGHTS_BASE_URL;

      const response = await axios.post(`${base}${reqAPI}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || 'Analysis was not successful');
      }

      setResult(data.data);
      return data.data;
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setResult(null);
  };

  return { 
    analyzeFiles, 
    loading, 
    error, 
    result, 
    reset 
  };
};

export default useFileAnalysis;
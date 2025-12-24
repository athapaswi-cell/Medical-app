'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Link from 'next/link';

// Define Hospital type based on our API structure
interface Hospital {
  id: string;
  name: string;
  address: {
    line: string[];
    city: string;
    state: string;
    postalCode: string;
  };
  phone: string;
  type: string;
  rating: number;
  emergencyServices: boolean;
}

export default function HomePage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Loading hospitals from API...');
      
      // Fetch from our backend API
      const response = await fetch('/api/hospitals');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        console.log('✅ Successfully loaded hospitals:', result.data.length);
        setHospitals(result.data);
      } else {
        throw new Error('Invalid API response format');
      }
      
    } catch (err) {
      console.error('❌ Failed to load hospitals:', err);
      setError('Unable to load hospital data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={loadHospitals} />;

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F4F8FB'}}>
      {/* Header Section */}
      <div className="header-gradient shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
              <span className="text-white text-xl">🏥</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Healthcare Finder USA - Live API</h1>
          </div>
          <div className="text-center">
            <span className="inline-block bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full">
              🚀 Live Mode - Real API Data
            </span>
          </div>

        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="hospital-card">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Country</label>
              <input 
                type="text" 
                value="United States" 
                disabled 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Select State</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary">
                <option>All States</option>
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto px-6 pb-8">
        <div className="hospital-card">
          <div className="flex items-center mb-4">
            <div className="header-gradient p-2 rounded-lg mr-3">
              <span className="text-white text-lg">🏥</span>
            </div>
            <h2 className="text-xl font-bold text-primary">Hospitals</h2>
          </div>
          <p className="text-secondary mb-6 text-sm">Click on any hospital to view doctors, insurance plans, and bed availability</p>
          
          <div className="flex flex-wrap gap-12 justify-center">
            {hospitals.map((hospital) => {
              // Get address information
              const address = hospital.address;
              const addressStr = address 
                ? `${address.line?.join(', ') || ''}, ${address.city || ''}, ${address.state || ''} ${address.postalCode || ''}`.trim()
                : 'Address not available';
              
              return (
                <div key={hospital.id} className="hospital-card w-80 h-96 flex-shrink-0 flex flex-col">
                  <h3 className="text-lg font-bold text-primary mb-3 uppercase">
                    {hospital.name}
                  </h3>
                  
                  <div className="space-y-2 mb-4 flex-grow">
                    <div className="flex items-start">
                      <span className="text-red-500 mr-2 mt-0.5">📍</span>
                      <div>
                        <span className="text-sm font-semibold text-primary">Address:</span>
                        <span className="text-sm text-secondary ml-1">{addressStr}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">📞</span>
                      <div>
                        <span className="text-sm font-semibold text-primary">Phone:</span>
                        <span className="text-sm text-secondary ml-1">{hospital.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-blue-500 mr-2">🏥</span>
                      <div>
                        <span className="text-sm font-semibold text-primary">Type:</span>
                        <span className="text-sm text-secondary ml-1">{hospital.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-2">⭐</span>
                      <div>
                        <span className="text-sm font-semibold text-primary">Rating:</span>
                        <span className="text-sm text-secondary ml-1">{hospital.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    {hospital.emergencyServices && (
                      <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                        Emergency Services
                      </span>
                    )}
                  </div>
                  
                  <Link href={`/hospital/${hospital.id}`}>
                    <button className="btn-primary w-full py-2.5 px-4 rounded-md flex items-center justify-center text-sm font-medium">
                      <span className="mr-2">👁️</span>
                      View Details 
                    </button>
                  </Link>
                </div>
              );
            })}
            
            {/* Show message if no hospitals loaded */}
            {hospitals.length === 0 && !loading && (
              <div className="col-span-full text-center py-12">
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="text-6xl mb-4">🏥</div>
                  <p className="text-gray-600 text-lg">No hospitals found</p>
                  <p className="text-gray-500 text-sm mt-2">Please check your API connection</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
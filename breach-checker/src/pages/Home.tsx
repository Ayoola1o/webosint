// frontend/src/pages/Home.tsx
import { useState } from 'react';
import SearchInput from '../components/SearchInput';
import {ResultCard} from '../components/ResultCard';
import {Loader} from '../components/Loader';
import {RemediationTips} from '../components/RemediationTips';
import {DarkWebScan} from '../components/DarkWebScan';
//import PremiumBanner from '../components/PremiumBanner';
//import PasswordManagerAd from '../components/PasswordManagerAd';
import useBreachCheck from '../hooks/useBreachCheck';



export default function Home() {
  const [inputType, setInputType] = useState<'email' | 'username' | 'phone'>('email');
  const { checkBreach, result, loading, error } = useBreachCheck();

  // Determine breach type for remediation tips
  const breachType = result?.breaches?.some((b) => b.includes('Password')) 
    ? 'password' 
    : 'email';

  return (

    
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Check Your Data Exposure
        </h1>
        <p className="text-xl text-gray-600">
          See if your personal information was exposed in data breaches
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md mb-8">
        <div className="flex space-x-4 mb-6">
          {['email', 'username', 'phone'].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-full ${
                inputType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setInputType(type as any)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <SearchInput 
          inputType={inputType}
          onSearch={checkBreach} 
        />

        {error && (
          <div className="mt-4 text-red-600">
            {error === 'TOO_MANY_REQUESTS'
              ? 'Too many requests. Please try again later.'
              : 'An error occurred. Please try again.'}
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        {loading && <Loader />}

        {result && (
          <>
            <ResultCard 
              breachCount={result?.breaches?.length || 0} 
              sources={result?.breaches || []} 
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <RemediationTips breachType={breachType} />
              <DarkWebScan />
            </div>
          </>
        )}

        {/* Premium Upsell */}
        {!result && <div className="premium-banner">Upgrade to Premium for more features!</div>}

        {/* Security Recommendations */}
        <div className="password-manager-ad">Try our Password Manager for better security!</div>
      </div>

      {/* Privacy Notice */}
      <div className="mt-16 text-center text-sm text-gray-500">
        <p>
          We never store your raw data. All searches are hashed (SHA-256) for privacy.
        </p>
        <p className="mt-2">
          By using this service, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
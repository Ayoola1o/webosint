// frontend/src/pages/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BreachTimeline from '../components/BreachTimeline';
import RiskMeter from '../components/RiskMeter';
import DataTable from '../components/DataTable';
import useUserData from '../hooks/useUserData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'breaches' | 'monitoring' | 'settings'>('breaches');
  const { userData, loading, error } = useUserData();
  
  // Mock data - replace with real API calls
  const monitoredItems = [
    { type: 'email', value: 'user@example.com', lastChecked: '2023-11-15' },
    { type: 'username', value: 'johndoe', lastChecked: '2023-11-14' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor your digital footprint across data breaches
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Risk Summary Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Exposure Risk</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              Medium Risk
            </span>
          </div>
          <RiskMeter value={65} className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Exposed Emails</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-red-800">Compromised Passwords</p>
              <p className="text-2xl font-bold">1</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-800">Protected Items</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('breaches')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'breaches'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Your Breaches
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'monitoring'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Monitoring
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'breaches' && (
          <div className="space-y-6">
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Breach Timeline
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <BreachTimeline breaches={[
                  new Date('2021-06-01'),
                  new Date('2020-12-15'),
                  new Date('2019-03-22')
                ]} />
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Recent Exposures
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <DataTable
                  headers={['Service', 'Data Exposed', 'Date', 'Actions']}
                  rows={[
                    ['LinkedIn', 'Email, Password', 'June 2021', <Link to="#" className="text-blue-600 hover:underline">Details</Link>],
                    ['Adobe', 'Email, Password Hint', 'December 2020', <Link to="#" className="text-blue-600 hover:underline">Details</Link>]
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Monitored Items
                </h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Add New
                </button>
              </div>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <DataTable
                headers={['Type', 'Value', 'Last Checked', 'Status']}
                rows={monitoredItems.map(item => [
                  item.type.charAt(0).toUpperCase() + item.type.slice(1),
                  item.value,
                  item.lastChecked,
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                ])}
              />
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Notification Settings
              </h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-alerts"
                      name="email-alerts"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-alerts" className="font-medium text-gray-700">
                      Email alerts
                    </label>
                    <p className="text-gray-500">Get notified when new breaches are found</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sms-alerts"
                      name="sms-alerts"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sms-alerts" className="font-medium text-gray-700">
                      SMS alerts (Premium)
                    </label>
                    <p className="text-gray-500">Instant text message notifications</p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
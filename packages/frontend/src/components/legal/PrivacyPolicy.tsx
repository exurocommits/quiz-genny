import React from 'react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Effective Date: February 21, 2026</p>

          <div className="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Introduction</h2>
              <p className="text-gray-600">
                Quiz Genny ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.
                This Privacy Policy explains how we collect, use, and safeguard your information when you use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
              <div className="space-y-3 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-900">Account Information</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Name and email address</li>
                    <li>Password (encrypted)</li>
                    <li>Profile information (optional)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Usage Data</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Quiz generation history</li>
                    <li>Export preferences</li>
                    <li>Account activity logs</li>
                    <li>Device information</li>
                    <li>IP address and location (approximate)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
              <div className="space-y-2 text-gray-600">
                <p><strong>Primary Uses:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Provide and maintain the Service</li>
                  <li>Generate and store your quizzes</li>
                  <li>Process payments and subscriptions</li>
                  <li>Send important account notifications</li>
                  <li>Provide customer support</li>
                </ul>
                <p className="mt-3"><strong>Analytics:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Analyze usage patterns</li>
                  <li>Improve user experience</li>
                  <li>Identify trends and insights</li>
                  <li>Debug technical issues</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Data Storage & Security</h2>
              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Storage Locations</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• User data: Supabase (EU/US)</li>
                    <li>• Payment: Stripe (PCI DSS)</li>
                    <li>• Content: Supabase storage</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Security Measures</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Encryption at rest and in transit</li>
                    <li>• Secure password hashing</li>
                    <li>• Regular security audits</li>
                    <li>• Access controls</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Data Sharing</h2>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-900 font-medium mb-2">Third-Party Services</p>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• <strong>Supabase:</strong> Database and authentication</li>
                  <li>• <strong>Stripe:</strong> Payment processing</li>
                  <li>• <strong>OpenAI:</strong> AI content generation</li>
                  <li>• <strong>Google:</strong> Google Slides API</li>
                </ul>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-900 font-medium">No Sale of Data</p>
                <p className="text-sm text-green-800 mt-1">
                  We never sell, rent, or share your personal data for advertising purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">6. Your Rights</h2>
              <div className="space-y-2 text-gray-600">
                <p><strong>Access Rights:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Access your personal data</li>
                  <li>Request a copy of your data</li>
                  <li>Update or correct your data</li>
                  <li>Delete your account and data</li>
                </ul>
                <p className="mt-3"><strong>Data Portability:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Export all your quizzes</li>
                  <li>Download data in machine-readable format</li>
                  <li>Transfer data to another service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">10. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For privacy-related questions or to exercise your rights:
              </p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-medium">Quiz Genny Privacy</p>
                <p className="text-sm text-gray-600">Email: hey@tomoliver.me</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;

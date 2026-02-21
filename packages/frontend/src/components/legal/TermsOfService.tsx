import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Effective Date: February 21, 2026</p>

          <div className="prose prose-sm max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing or using Quiz Genny ("the Service"), you agree to be bound by these Terms of Service ("Terms").
                If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Description of Service</h2>
              <p className="text-gray-600">
                Quiz Genny is an AI-powered platform that generates quiz presentations for educational, corporate,
                and entertainment purposes. The Service uses artificial intelligence to create questions, organize content,
                and export to various formats.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">3. User Accounts</h2>
              <div className="space-y-3 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-900">3.1 Account Creation</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>You must be at least 18 years old to create an account</li>
                    <li>You must provide accurate, complete, and current information</li>
                    <li>You are responsible for maintaining the confidentiality of your account</li>
                    <li>You agree to notify us immediately of any unauthorized use</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">4. Subscription Plans & Billing</h2>
              <div className="grid md:grid-cols-3 gap-4 my-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Free Tier</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 1 quiz per month</li>
                    <li>• Watermark on exports</li>
                    <li>• Standard formats (PPTX)</li>
                    <li>• Basic support</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Pro Tier ($19/mo)</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 20 quizzes per month</li>
                    <li>• No watermark</li>
                    <li>• All export formats</li>
                    <li>• Priority support</li>
                    <li>• Premium features</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Team Tier ($49/mo)</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Unlimited quizzes</li>
                    <li>• No watermark</li>
                    <li>• Team collaboration</li>
                    <li>• Custom branding</li>
                    <li>• API access</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">5. Acceptable Use Policy</h2>
              <div className="space-y-3 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-900">Permitted Use</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Creating quizzes for educational purposes</li>
                    <li>Creating quizzes for corporate training</li>
                    <li>Creating quizzes for entertainment</li>
                    <li>Personal and commercial use within your subscription limits</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Prohibited Use</h3>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Generating quizzes with illegal, harmful, or offensive content</li>
                    <li>Reselling or redistributing generated content as your own AI tool</li>
                    <li>Using the Service for any illegal purpose</li>
                    <li>Attempting to circumvent usage limits</li>
                    <li>Reverse engineering the Service</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">10. Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For questions about these Terms, please contact:
              </p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-medium">Quiz Genny</p>
                <p className="text-sm text-gray-600">Email: hey@tomoliver.me</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

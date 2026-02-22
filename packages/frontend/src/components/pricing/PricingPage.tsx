import { Wand2, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Simple, Transparent Pricing
        </h1>
        <p className="text-center text-gray-600 mb-12">Choose the plan that fits your needs</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <div className="p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Free</h2>
            <div className="text-4xl font-bold mb-6 text-purple-600">$0</div>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>5 quizzes per month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Basic AI generation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>PPTX export</span>
              </li>
            </ul>
            <button
              onClick={() => navigate('/setup')}
              className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Pro Tier */}
          <div className="p-8 bg-gradient-to-b from-purple-600 to-purple-700 rounded-2xl border-2 border-purple-500 shadow-2xl relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
              MOST POPULAR
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white">Pro</h2>
            <div className="text-4xl font-bold mb-6 text-white">$9.99<span className="text-lg">/mo</span></div>
            <ul className="space-y-3 mb-8 text-white/90">
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">✓</span>
                <span>Unlimited quizzes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">✓</span>
                <span>Premium AI generation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">✓</span>
                <span>All export formats (PPTX, PDF, Slides)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-300">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            <button
              onClick={() => navigate('/setup')}
              className="w-full py-3 bg-white text-purple-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Pro Trial
            </button>
          </div>

          {/* Team Tier */}
          <div className="p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Team</h2>
            <div className="text-4xl font-bold mb-6 text-purple-600">Custom</div>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Everything in Pro plus...</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Team collaboration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Custom branding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Dedicated support</span>
              </li>
            </ul>
            <button
              onClick={() => navigate('/setup')}
              className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

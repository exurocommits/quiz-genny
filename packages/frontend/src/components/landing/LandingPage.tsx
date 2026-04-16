import { useNavigate } from 'react-router-dom';
import { Wand2, Sparkles, Zap, CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2">
            <Wand2 className="w-10 h-10 text-purple-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Quiz Genny
            </h1>
            <Sparkles className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate professional, balanced quiz presentations in minutes with AI-powered intelligence
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/setup')}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105"
            >
              <Zap className="w-6 h-6" />
              Start Creating Quizzes
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Quiz Genny?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">AI-Powered Generation</h3>
              <p className="text-gray-600">
                Smart LLM integration creates balanced, engaging questions with human-in-the-loop curation
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Difficulty Balancing</h3>
              <p className="text-gray-600">
                4-dimension scoring ensures fair question distribution across your audience
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Verified by Default</h3>
              <p className="text-gray-600">
                Every answer is automatically fact-checked via web search before final export
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12">Choose the plan that fits your needs</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Free</h3>
              <div className="text-4xl font-bold mb-6 text-purple-600">$0</div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>5 quizzes per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Basic AI generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
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
              <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-4xl font-bold mb-6 text-white">$9.99<span className="text-lg">/mo</span></div>
              <ul className="space-y-3 mb-8 text-white/90">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span>Unlimited quizzes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span>Premium AI generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                  <span>All export formats (PPTX, PDF, Slides)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
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
              <h3 className="text-2xl font-bold mb-2 text-gray-900">Team</h3>
              <div className="text-4xl font-bold mb-6 text-purple-600">Custom</div>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Everything in Pro plus...</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Custom branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
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
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Trusted by Quiz Hosts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="text-5xl font-bold text-purple-600 mb-2">10K+</div>
              <p className="text-gray-600">Quizzes Generated</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl font-bold text-blue-600 mb-2">500K+</div>
              <p className="text-gray-600">Questions Created</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Amazing Quizzes?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of quiz hosts who save hours every week with Quiz Genny
          </p>
          <button
            onClick={() => navigate('/setup')}
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-purple-700 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            <Wand2 className="w-6 h-6" />
            Get Started for Free
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2026 Quiz Genny. All rights reserved.</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

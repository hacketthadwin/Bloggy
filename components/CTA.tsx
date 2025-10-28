'use client';

import Link from 'next/link';
import { useTheme } from '../lib/theme';

export default function CTA() {
  const { isDark } = useTheme();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to start your blogging journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of writers who are already creating amazing content with our platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/create"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 transform hover:scale-105"
          >
            Get Started Free
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          
          <Link
            href="/posts"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200"
          >
            Explore Content
          </Link>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-white mb-4">
              "The best blogging platform I've ever used. The editor is incredible and the SEO features are top-notch."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold">JS</span>
              </div>
              <div>
                <div className="text-white font-semibold">John Smith</div>
                <div className="text-blue-200 text-sm">Tech Blogger</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-white mb-4">
              "Amazing features and beautiful design. My content has never looked better."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold">MJ</span>
              </div>
              <div>
                <div className="text-white font-semibold">Maria Johnson</div>
                <div className="text-blue-200 text-sm">Content Creator</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-white mb-4">
              "The analytics and insights help me understand my audience better than ever."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold">AD</span>
              </div>
              <div>
                <div className="text-white font-semibold">Alex Davis</div>
                <div className="text-blue-200 text-sm">Digital Marketer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

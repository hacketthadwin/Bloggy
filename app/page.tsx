import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CTA from '../components/CTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
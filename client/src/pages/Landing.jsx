import Features from '../components/Landing/Features';
import Hero from '../components/Landing/Hero';
import Testimonials from '../components/Landing/Testimonials';
import Footer from '../components/layout/Footer';

const Landing = () => {
  return (
    <main className="bg-gray-900">
      <Hero />
      <Features />
      <Testimonials />
        <Footer />
    </main>
  );
};

export default Landing;
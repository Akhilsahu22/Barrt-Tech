import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet';

const Home = () => {
  useEffect(() => {
    // Setup the scroll animation
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight * 0.85) {
          element.classList.add('animate');
        }
      });
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Barry Allen Private Limited | Technology Solutions</title>
        <meta name="description" content="Barry Allen Private Limited offers cutting-edge technology solutions for businesses looking to accelerate their digital transformation journey." />
        <meta name="keywords" content="tech company, digital transformation, software development, web applications, mobile apps, cloud solutions" />
        <meta property="og:title" content="Barry Allen Private Limited | Technology Solutions" />
        <meta property="og:description" content="Barry Allen Private Limited offers cutting-edge technology solutions for businesses looking to accelerate their digital transformation journey." />
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;

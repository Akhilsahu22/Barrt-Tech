import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const testimonials = [
  {
    id: 1,
    content: "Barry Allen's team delivered our finance platform on time and exceeded our expectations. Their technical expertise and project management were outstanding.",
    author: "Sarah Johnson",
    position: "CTO, FinTech Innovations",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5
  },
  {
    id: 2,
    content: "The mobile application developed by Barry Allen has transformed how we deliver healthcare services to our patients. A truly innovative solution!",
    author: "Dr. Michael Chen",
    position: "Director, MediSync Healthcare",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 3,
    content: "Working with Barry Allen was a pleasure. Their team was responsive, creative, and had a deep understanding of e-commerce technology.",
    author: "Amanda Rodriguez",
    position: "CEO, ShopSphere",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.5
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg"
      variants={fadeInUp}
    >
      <div className="flex items-center mb-4">
        <div className="text-yellow-400">
          {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
            <i key={i} className="fas fa-star"></i>
          ))}
          {testimonial.rating % 1 !== 0 && (
            <i className="fas fa-star-half-alt"></i>
          )}
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
        "{testimonial.content}"
      </p>
      <div className="flex items-center">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.author} 
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-medium">{testimonial.author}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  useEffect(() => {
    if (isInView && ref.current) {
      const elements = ref.current.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        element.classList.add('animate');
      });
    }
  }, [isInView]);

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hear from our satisfied clients about their experience working with Barry Allen.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

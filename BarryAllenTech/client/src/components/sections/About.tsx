import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

const About = () => {
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
    <section id="about" ref={ref} className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0 animate-on-scroll"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full"></div>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="About Barry Allen team" 
                  className="relative z-10 rounded-2xl shadow-xl"
                />
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 md:pl-16 animate-on-scroll"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Barry Allen</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Founded in 2015, Barry Allen Private Limited has been at the forefront of technological innovation, helping businesses across various industries accelerate their digital transformation journey.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Our team of experienced developers, designers, and consultants work collaboratively to deliver solutions that drive business growth and enhance operational efficiency.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100+</div>
                  <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">50+</div>
                  <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">30+</div>
                  <p className="text-gray-600 dark:text-gray-400">Team Members</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-500 mb-2">8+</div>
                  <p className="text-gray-600 dark:text-gray-400">Years of Experience</p>
                </div>
              </div>
              
              <a href="#contact" className="inline-flex items-center text-primary hover:text-blue-700 font-medium">
                Get to know our team <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

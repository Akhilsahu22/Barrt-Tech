import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@/lib/types";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const iconColors = [
    "text-primary bg-blue-100 dark:bg-blue-900",
    "text-secondary bg-green-100 dark:bg-green-900",
    "text-accent bg-purple-100 dark:bg-purple-900",
    "text-yellow-500 bg-yellow-100 dark:bg-yellow-900",
    "text-red-500 bg-red-100 dark:bg-red-900",
    "text-indigo-500 bg-indigo-100 dark:bg-indigo-900",
  ];

  const textColors = [
    "text-primary hover:text-blue-700",
    "text-secondary hover:text-green-700",
    "text-accent hover:text-purple-700",
    "text-yellow-500 hover:text-yellow-600",
    "text-red-500 hover:text-red-600",
    "text-indigo-500 hover:text-indigo-600",
  ];

  const colorIndex = index % iconColors.length;

  return (
    <motion.div 
      className="card-glass rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
      variants={fadeInUp}
    >
      <div className={`w-14 h-14 ${iconColors[colorIndex]} rounded-lg flex items-center justify-center mb-6`}>
        <i className={`${service.icon} text-2xl`}></i>
      </div>
      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {service.description}
      </p>
      <a href="#contact" className={`inline-flex items-center ${textColors[colorIndex]} font-medium`}>
        Learn more <i className="fas fa-arrow-right ml-2"></i>
      </a>
    </motion.div>
  );
};

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  useEffect(() => {
    if (isInView && ref.current) {
      const elements = ref.current.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        element.classList.add('animate');
      });
    }
  }, [isInView]);

  return (
    <section id="services" ref={ref} className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We offer a comprehensive range of technology solutions to help your business thrive in the digital era.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {isLoading ? (
            // Loading skeleton
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="card-glass rounded-xl p-8 shadow-lg animate-pulse">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            ))
          ) : (
            services?.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

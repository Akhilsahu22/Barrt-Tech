import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/lib/types";
import { motion, useInView } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const colors = [
    "bg-primary",
    "bg-secondary",
    "bg-accent",
    "bg-indigo-500",
  ];

  const textColors = [
    "text-primary hover:text-blue-700",
    "text-secondary hover:text-green-700",
    "text-accent hover:text-purple-700",
    "text-indigo-500 hover:text-indigo-700",
  ];

  const colorIndex = index % colors.length;

  return (
    <motion.div 
      className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
      variants={fadeInUp}
    >
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6">
            <span className={`px-3 py-1 ${colors[colorIndex]} text-white text-sm font-medium rounded-full`}>
              {project.category}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <a href="#" className={`${textColors[colorIndex]} font-medium flex items-center`}>
          View case study <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
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
    <section id="projects" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Take a look at some of our recent projects that showcase our expertise and commitment to excellence.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {isLoading ? (
            // Loading skeleton
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl animate-pulse">
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array(3).fill(0).map((_, j) => (
                      <div key={j} className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
              </div>
            ))
          ) : (
            projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          )}
        </motion.div>
        
        <div className="text-center mt-12">
          <a href="#contact" className="inline-block px-8 py-4 bg-primary hover:bg-blue-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

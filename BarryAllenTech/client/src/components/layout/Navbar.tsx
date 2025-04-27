import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 transition-all duration-300 ${
      scrolled ? 'bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md shadow-sm' : 'bg-opacity-100 dark:bg-opacity-100'
    }`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-lg">BA</div>
            <span className="text-xl font-bold dark:text-white">Barry Allen</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors">Services</a>
            <a href="#projects" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors">Projects</a>
            <a href="#about" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors">Contact</a>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400" />
              )}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400" />
              )}
            </button>
            <button 
              onClick={toggleMenu} 
              className="text-gray-500 dark:text-gray-400 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-xl absolute w-full left-0 right-0"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <a href="#services" onClick={closeMenu} className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Services</a>
            <a href="#projects" onClick={closeMenu} className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Projects</a>
            <a href="#about" onClick={closeMenu} className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">About</a>
            <a href="#contact" onClick={closeMenu} className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Contact</a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { z } from "zod";
import { contactFormSchema, serviceSchema, projectSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = express.Router();
  app.use("/api", apiRouter);

  // Get services
  apiRouter.get("/services", async (_req, res) => {
    try {
      const services = await storage.getAllServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get projects
  apiRouter.get("/projects", async (_req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Submit contact form
  apiRouter.post("/contact", async (req, res) => {
    try {
      const result = contactFormSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: result.error.format() 
        });
      }

      const contactMessage = await storage.createContactMessage(result.data);
      res.status(201).json({ message: "Message sent successfully", id: contactMessage.id });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Get all contact messages (admin only, in a real app would be protected)
  apiRouter.get("/contact", async (_req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  // Initialize data
  await initializeData();

  const httpServer = createServer(app);
  return httpServer;
}

// Seed initial data
async function initializeData() {
  // Services data
  const services = [
    {
      title: "Web Application Development",
      description: "Custom web applications designed to meet your specific business requirements, built with modern frameworks.",
      icon: "fas fa-code"
    },
    {
      title: "Mobile App Development",
      description: "Intuitive and feature-rich mobile applications for iOS and Android platforms using React Native.",
      icon: "fas fa-mobile-alt"
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services to enhance your business operations.",
      icon: "fas fa-cloud"
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent solutions that leverage AI and machine learning to drive business insights and automation.",
      icon: "fas fa-robot"
    },
    {
      title: "Cybersecurity",
      description: "Comprehensive security solutions to protect your business assets and customer data from threats.",
      icon: "fas fa-shield-alt"
    },
    {
      title: "Data Analytics",
      description: "Advanced analytics solutions that transform your data into actionable business intelligence.",
      icon: "fas fa-chart-line"
    }
  ];

  // Projects data
  const projects = [
    {
      title: "Quantum Finance Dashboard",
      description: "A comprehensive financial analytics platform with real-time data visualization for investment firms.",
      category: "FinTech",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      technologies: ["React", "Node.js", "D3.js"]
    },
    {
      title: "MediSync Mobile App",
      description: "A telemedicine application that connects patients with healthcare providers for virtual consultations.",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      technologies: ["React Native", "Firebase", "WebRTC"]
    },
    {
      title: "ShopSphere Platform",
      description: "An AI-powered e-commerce platform with personalized recommendations and seamless checkout.",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      technologies: ["Next.js", "Express", "MongoDB"]
    },
    {
      title: "SmartCity Connect",
      description: "An IoT-based smart city solution for monitoring and optimizing urban infrastructure.",
      category: "IoT",
      image: "https://images.unsplash.com/photo-1529310399831-ed472b81d589?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      technologies: ["React", "Python", "AWS IoT"]
    }
  ];

  // Initialize services
  for (const service of services) {
    try {
      const parsedService = serviceSchema.parse(service);
      const existingServices = await storage.getAllServices();
      const exists = existingServices.some(s => s.title === parsedService.title);
      if (!exists) {
        await storage.createService(parsedService);
      }
    } catch (error) {
      console.error("Error seeding service:", error);
    }
  }

  // Initialize projects
  for (const project of projects) {
    try {
      const parsedProject = projectSchema.parse(project);
      const existingProjects = await storage.getAllProjects();
      const exists = existingProjects.some(p => p.title === parsedProject.title);
      if (!exists) {
        await storage.createProject(parsedProject);
      }
    } catch (error) {
      console.error("Error seeding project:", error);
    }
  }
}

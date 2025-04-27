import { pgTable, text, serial, integer, timestamp, array } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Service Schema
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const serviceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  icon: true,
});

export type InsertService = z.infer<typeof serviceSchema>;
export type Service = typeof services.$inferSelect;

// Project Schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  technologies: text("technologies").array().notNull(),
});

export const projectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  category: true,
  image: true,
  technologies: true,
});

export type InsertProject = z.infer<typeof projectSchema>;
export type Project = typeof projects.$inferSelect;

// Contact Message Schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactFormSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContactMessage = z.infer<typeof contactFormSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// User Schema (keeping this as it's in the original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// src/data/projects.ts (Create this file)

import type { Project } from "../types/project";
import img1 from '../assets/project1.jpg';
import img2 from '../assets/project2.jpg';
import img3 from '../assets/project3.jpg';
import img4 from '../assets/project4.jpeg';




export const featuredProjects: Project[] = [
  { id: 1, title: "CryptoDash - Financial App", discipline: "Product Design", color: "#00D1FF", imageUrl: img1 },
  { id: 2, title: "Horizon - E-Commerce Rebrand", discipline: "Brand Strategy", color: "#FF00A6", imageUrl: img2 },
  { id: 3, title: "AuraOS - Web Application", discipline: "Front-End Development", color: "#00FF7F", imageUrl: img3 },
  { id: 4, title: "Venture - SaaS Landing Page", discipline: "UI/UX Design", color: "#FFC300", imageUrl: img4 },
];
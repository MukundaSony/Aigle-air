import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Code, Database, Cpu, Globe } from "lucide-react";

const teamMembers = [
  {
    name: "Chandu R T",
    role: "Team Lead, AI Engineer, Product Designer",
    bio: "Leading the AIGLE project with expertise in AI and product design.",
  },
  {
    name: "Abhinav Gupta",
    role: "IoT Architect, AI Engineer",
    bio: "Architecting IoT solutions and implementing AI capabilities.",
  },
  {
    name: "Ayush Mahato",
    role: "Co-IoT Designer, Front-End Developer",
    bio: "Developing user interfaces and IoT system design.",
  },
  {
    name: "Chiranth",
    role: "Product Engineer, IoT Engineer",
    bio: "Engineering product solutions and IoT implementations.",
  },
];

const technologies = [
  { name: "Frontend", tech: "React.js", icon: Code },
  { name: "Backend", tech: "Flask, Node.js", icon: Database },
  { name: "Database", tech: "MongoDB", icon: Database },
  { name: "AI Models", tech: "Gemini API", icon: Brain },
  { name: "IoT Components", tech: "Arduino, Raspberry Pi, ESP32", icon: Cpu },
];

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            About AIGLE System – Revolutionizing Air Purification with Algae
          </h1>
          <p className="text-xl text-muted-foreground">
            Pioneering sustainable air purification through AI-powered algae technology
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              Introduction to AIGLE System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The AIGLE System is an innovative air purification solution that harnesses
              the power of algae and artificial intelligence. Our system efficiently
              converts CO₂ into oxygen through advanced bioreactor technology, monitored
              and optimized by AI algorithms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Our Mission</h3>
                <p>
                  To develop sustainable air purification systems using natural
                  resources like algae and cutting-edge AI technology.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Our Vision</h3>
                <p>
                  To create a cleaner, healthier planet with sustainable bioreactors
                  powered by AI and IoT.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">
            Meet the Minds Behind AIGLE AIR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Our Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {technologies.map((tech) => (
              <Card key={tech.name}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <tech.icon className="h-5 w-5 text-primary" />
                    {tech.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tech.tech}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default AboutUs;
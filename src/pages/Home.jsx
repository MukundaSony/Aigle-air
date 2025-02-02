import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Globe, Leaf, ChartLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-16 text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary">AIGLE</span> System
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            An AI-powered algae bioreactor revolutionizing CO₂ reduction and oxygen generation through sustainable technology.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/dashboard">
              <button className="bg-[#38a169] text-white px-8 py-3 rounded-lg hover:bg-[#2f855a] transition-colors inline-flex items-center gap-2">
                <ChartLine className="w-5 h-5" />
                Explore Dashboard
              </button>
            </Link>
            <button 
              onClick={() => document.getElementById('learn-more').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#1a202c] border border-[#cbd5e0] px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Learn More About AIGLE
            </button>
          </div>
        </motion.div>

        {/* Key Features Section */}
        <div id="learn-more" className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="w-12 h-12 text-[#38a169] mb-4" />
                <CardTitle>Renewable Energy Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Powered by solar energy, our system operates sustainably while maximizing efficiency in CO₂ absorption.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <ChartLine className="w-12 h-12 text-[#38a169] mb-4" />
                <CardTitle>AI-Powered Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced AI algorithms optimize algae growth conditions and monitor system performance in real-time.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <Leaf className="w-12 h-12 text-[#38a169] mb-4" />
                <CardTitle>Real-Time Air Purification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Continuous monitoring and adjustment of CO₂ absorption and oxygen generation for optimal air quality.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center py-16"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join us in creating a sustainable future with AIGLE System.
          </p>
          <Link to="/contact">
            <button className="bg-[#38a169] text-white px-8 py-3 rounded-lg hover:bg-[#2f855a] transition-colors">
              Contact Us Today
            </button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-24 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} AIGLE System. All rights reserved.
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-[#38a169]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-[#38a169]">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-[#38a169]">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

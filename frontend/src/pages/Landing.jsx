import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  MapPin,
  Zap,
  BarChart3,
  Clock,
  Shield,
  Users,
} from "lucide-react";

const Landing = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const features = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description:
        "Live GPS tracking of buses with precise location updates and route visualization",
    },
    {
      icon: Clock,
      title: "Accurate ETAs",
      description:
        "AI-powered estimated time of arrival calculations for better commute planning",
    },
    {
      icon: Zap,
      title: "IoT Simulation",
      description:
        "Advanced IoT-based simulation system for realistic bus movement and data generation",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Comprehensive analytics with performance metrics and operational insights",
    },
    {
      icon: Shield,
      title: "Admin Control",
      description:
        "Secure admin dashboard for managing routes, buses, and system operations",
    },
    {
      icon: Users,
      title: "Multi-Tenant Ready",
      description:
        "Scalable architecture designed for multiple transit operators and regions",
    },
  ];

  const faqs = [
    {
      question: "What is SmartBus Tracker?",
      answer:
        "SmartBus Tracker is a comprehensive IoT-based bus tracking and simulation platform designed for real-time monitoring of public transportation. It provides live bus tracking, ETA calculations, and an admin dashboard for operational management.",
    },
    {
      question: "How accurate is the ETA prediction?",
      answer:
        "Our ETA calculation system uses real-time traffic patterns, route data, and bus speed information to provide highly accurate arrival time estimates. The system continuously learns and improves accuracy based on actual travel data.",
    },
    {
      question: "Can I integrate this with existing systems?",
      answer:
        "Yes! Our platform is designed with REST APIs and WebSocket support for real-time data synchronization. It can be integrated with existing ticketing systems, payment gateways, and management software.",
    },
    {
      question: "What kind of analytics are available?",
      answer:
        "The analytics dashboard provides metrics on bus availability, delay analysis, average speeds, operational efficiency, and custom reporting capabilities for fleet management decisions.",
    },
    {
      question: "Is the system scalable?",
      answer:
        "Absolutely. The platform is built with scalability in mind and can handle thousands of buses across multiple routes and regions simultaneously.",
    },
    {
      question: "How secure is the admin panel?",
      answer:
        "Our admin panel uses industry-standard authentication, role-based access control, and encrypted connections to ensure maximum security of sensitive operational data.",
    },
  ];

  const faqItem = ({ question, answer, index }) => (
    <div
      key={index}
      className="glass-panel overflow-hidden transition hover:border-white/20"
    >
      <button
        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <p className="font-semibold text-slate-100">{question}</p>
        <ChevronDown
          size={20}
          className={`shrink-0 text-accent transition ${
            expandedFAQ === index ? "rotate-180" : ""
          }`}
        />
      </button>
      {expandedFAQ === index && (
        <div className="border-t border-white/10 px-4 py-3">
          <p className="text-sm text-slate-300">{answer}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-20">
      <section className="space-y-8 pt-12">
        <div className="space-y-6 text-center">
          <div className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
            <p className="text-sm font-semibold text-accent">
              🚀 IoT-Powered Bus Tracking Platform
            </p>
          </div>
          <h1 className="brand-font text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            Real-Time Bus Tracking,{" "}
            <span className="text-accent">Simplified</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Experience the future of public transportation with our advanced IoT
            simulation platform. Track buses in real-time, predict accurate
            ETAs, and manage your fleet with confidence.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="rounded-full bg-accent px-8 py-3 font-semibold text-slate-950 transition hover:bg-accent/90 hover:shadow-lg"
            >
              Start Tracking
            </Link>
            <a
              href="#features"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3 font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-b from-accent/10 to-transparent p-1 shadow-lg">
          <div className="rounded-xl bg-slate-950/80 p-8">
            <div className="space-y-4">
              <div className="h-4 w-3/4 rounded bg-slate-800"></div>
              <div className="h-3 w-1/2 rounded bg-slate-800/60"></div>
              <div className="mt-6 grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-slate-800/40"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8" id="demo">
        <div className="text-center">
          <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
            See What's Inside
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Explore the powerful features that make SmartBus Tracker the
            ultimate bus tracking solution
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {[
            {
              title: "Live Tracker - All Buses",
              image: "/screenshots/live-tracker-all-buses.png",
            },
            {
              title: "Live Tracker - Selected Bus",
              image: "/screenshots/live-tracker-selected-bus.png",
            },
            {
              title: "Admin Dashboard",
              image: "/screenshots/admin-dashboard-top.png",
            },
            {
              title: "Configured Routes",
              image: "/screenshots/admin-dashboard-configured-routes.png",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="glass-panel card-enter overflow-hidden rounded-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-64 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-100">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-12" id="features">
        <div className="text-center">
          <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Everything you need for modern transportation management
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="glass-panel card-enter p-6 space-y-4">
                <div className="inline-block rounded-lg bg-accent/10 p-3">
                  <Icon className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-8" id="about">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div>
              <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
                About SmartBus Tracker
              </h2>
              <div className="mt-2 h-1 w-12 bg-accent"></div>
            </div>
            <p className="text-slate-300">
              SmartBus Tracker is a cutting-edge IoT-based bus tracking and
              simulation platform designed specifically for modern
              transportation systems. Built with the latest web technologies and
              cloud infrastructure, it provides seamless real-time tracking and
              analytics.
            </p>
            <p className="text-slate-300">
              Our platform combines advanced GPS tracking, AI-powered ETA
              calculations, and comprehensive analytics to give you complete
              visibility into your fleet operations. Whether you're managing a
              small local route or a complex multi-city network, SmartBus
              Tracker scales with your needs.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: "Active Buses", value: "500+" },
                { label: "Routes", value: "100+" },
                { label: "Uptime", value: "99.9%" },
              ].map((stat, index) => (
                <div key={index} className="glass-panel p-4 text-center">
                  <p className="text-2xl font-bold text-accent">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel p-8">
            <div className="space-y-4">
              <div className="h-40 rounded-lg bg-gradient-to-br from-accent/20 to-warning/10"></div>
              <div className="space-y-3">
                <div className="h-3 w-full rounded bg-slate-800/60"></div>
                <div className="h-3 w-4/5 rounded bg-slate-800/60"></div>
                <div className="h-3 w-3/4 rounded bg-slate-800/60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8" id="faq">
        <div className="text-center">
          <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Get answers to common questions about our platform
          </p>
        </div>
        <div className="grid gap-3 max-w-3xl mx-auto w-full">
          {faqs.map((faq, index) => faqItem(faq, index))}
        </div>
      </section>

      <section className="glass-panel space-y-6 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 to-transparent p-8 text-center sm:p-12">
        <div>
          <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
            Ready to Transform Your Transit?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Start tracking your buses in real-time today. Experience the future
            of transportation management.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-full bg-accent px-8 py-3 font-semibold text-slate-950 transition hover:bg-accent/90 hover:shadow-lg"
          >
            Launch Application
          </Link>
          <Link
            to="/admin"
            className="rounded-full border border-accent/50 bg-accent/5 px-8 py-3 font-semibold text-accent transition hover:bg-accent/10"
          >
            Admin Dashboard
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="brand-font font-bold text-accent">SmartBus Tracker</p>
            <p className="mt-2 text-sm text-slate-400">
              IoT-Powered Bus Tracking Platform
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-200">Product</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <a href="#features" className="transition hover:text-accent">
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="transition hover:text-accent">
                  Demo
                </a>
              </li>
              <li>
                <a href="#faq" className="transition hover:text-accent">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-200">Resources</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <a href="#about" className="transition hover:text-accent">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-accent">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-accent">
                  API Docs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-200">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>
                <a href="#" className="transition hover:text-accent">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-accent">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-slate-400">
          <p>
            &copy; 2024 SmartBus Tracker. Developed as part of Capstone Project.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

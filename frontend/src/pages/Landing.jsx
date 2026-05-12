import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronDown,
  MapPin,
  Zap,
  BarChart3,
  Clock,
  Shield,
  Users,
} from "lucide-react";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Landing = () => {
  const { t } = useTranslation();
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const features = [
    {
      icon: MapPin,
      title: t("landing.features.tracking.title"),
      description: t("landing.features.tracking.desc"),
    },
    {
      icon: Clock,
      title: t("landing.features.eta.title"),
      description: t("landing.features.eta.desc"),
    },
    {
      icon: Zap,
      title: t("landing.features.iot.title"),
      description: t("landing.features.iot.desc"),
    },
    {
      icon: BarChart3,
      title: t("landing.features.analytics.title"),
      description: t("landing.features.analytics.desc"),
    },
    {
      icon: Shield,
      title: t("landing.features.admin.title"),
      description: t("landing.features.admin.desc"),
    },
    {
      icon: Users,
      title: t("landing.features.multitenant.title"),
      description: t("landing.features.multitenant.desc"),
    },
  ];

  const faqs = [
    { question: t("landing.faq.q1"), answer: t("landing.faq.a1") },
    { question: t("landing.faq.q2"), answer: t("landing.faq.a2") },
    { question: t("landing.faq.q3"), answer: t("landing.faq.a3") },
    { question: t("landing.faq.q4"), answer: t("landing.faq.a4") },
    { question: t("landing.faq.q5"), answer: t("landing.faq.a5") },
    { question: t("landing.faq.q6"), answer: t("landing.faq.a6") },
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
    <div>
      {/* Language Switcher Header */}
      <div className="sticky top-0 z-10 mb-4 sm:mb-8 flex justify-end px-4 py-4">
        <LanguageSwitcher />
      </div>

      {/* Main content container with responsive padding */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {/* Hero Section */}
          <section className="space-y-6 sm:space-y-8 pt-8 sm:pt-12">
            <div className="space-y-6 text-center">
              <div className="inline-block rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
                <p className="text-sm font-semibold text-accent">
                  🚀 {t("common.tagline")}
                </p>
              </div>
              <h1 className="brand-font text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                {t("landing.hero.title", { keyword: "Simplified" })}
              </h1>
              <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-300">
                {t("landing.hero.subtitle")}
              </p>
              <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
                <Link
                  to="/tracker"
                  className="rounded-full bg-accent px-6 py-2.5 sm:px-8 sm:py-3 font-semibold text-slate-950 transition hover:bg-accent/90 hover:shadow-lg text-center"
                >
                  {t("landing.hero.cta1")}
                </Link>
                <a
                  href="#features"
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-2.5 sm:px-8 sm:py-3 font-semibold text-slate-100 transition hover:bg-white/10 text-center"
                >
                  {t("landing.hero.cta2")}
                </a>
              </div>
            </div>

            <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-b from-accent/10 to-transparent p-1 shadow-lg">
              <div className="rounded-xl bg-slate-950/80 p-6 sm:p-8">
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

          {/* Demo Screenshots */}
          <section className="space-y-6 sm:space-y-8" id="demo">
            <div className="text-center">
              <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
                {t("landing.demo.title")}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300">
                {t("landing.demo.subtitle")}
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {[
                {
                  title: t("landing.screenshots.all"),
                  image: "/screenshots/live-tracker-all-buses.png",
                },
                {
                  title: t("landing.screenshots.selected"),
                  image: "/screenshots/live-tracker-selected-bus.png",
                },
                {
                  title: t("landing.screenshots.admin"),
                  image: "/screenshots/admin-dashboard-top.png",
                },
                {
                  title: t("landing.screenshots.routes"),
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
                    className="h-48 sm:h-64 w-full object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-slate-100">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="space-y-8 sm:space-y-12" id="features">
            <div className="text-center">
              <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
                {t("landing.features.title")}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300">
                {t("landing.features.subtitle")}
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="glass-panel card-enter p-4 sm:p-6 space-y-4"
                  >
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

          {/* About */}
          <section className="space-y-6 sm:space-y-8" id="about">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
                    {t("landing.about.title")}
                  </h2>
                  <div className="mt-2 h-1 w-12 bg-accent"></div>
                </div>
                <p className="text-slate-300">{t("landing.about.desc1")}</p>
                <p className="text-slate-300">{t("landing.about.desc2")}</p>
                <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4">
                  {[
                    { label: t("landing.about.stats.buses"), value: "500+" },
                    { label: t("landing.about.stats.routes"), value: "100+" },
                    { label: t("landing.about.stats.uptime"), value: "99.9%" },
                  ].map((stat, index) => (
                    <div key={index} className="glass-panel p-3 sm:p-4 text-center">
                      <p className="text-xl sm:text-2xl font-bold text-accent">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-6 sm:p-8">
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

          {/* FAQ */}
          <section className="space-y-6 sm:space-y-8" id="faq">
            <div className="text-center">
              <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
                {t("landing.faq.title")}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300">
                {t("landing.faq.subtitle")}
              </p>
            </div>
            <div className="grid gap-3 max-w-3xl mx-auto w-full">
              {faqs.map((faq, index) => faqItem({ ...faq, index }))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="glass-panel space-y-4 sm:space-y-6 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 to-transparent p-6 sm:p-12 text-center">
            <div>
              <h2 className="brand-font text-3xl font-bold text-slate-50 sm:text-4xl">
                {t("landing.cta.title")}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300">
                {t("landing.cta.subtitle")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/tracker"
                className="rounded-full bg-accent px-6 py-2.5 sm:px-8 sm:py-3 font-semibold text-slate-950 transition hover:bg-accent/90 hover:shadow-lg text-center"
              >
                {t("landing.cta.btn1")}
              </Link>
              <Link
                to="/auth/passenger"
                className="rounded-full border border-accent/50 bg-accent/5 px-6 py-2.5 sm:px-8 sm:py-3 font-semibold text-accent transition hover:bg-accent/10 text-center"
              >
                {t("landing.cta.btn2")}
              </Link>
              <Link
                to="/auth/driver"
                className="rounded-full border border-accent/50 bg-accent/5 px-6 py-2.5 sm:px-8 sm:py-3 font-semibold text-accent transition hover:bg-accent/10 text-center"
              >
                {t("landing.cta.btn3")}
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-white/10 py-8 sm:py-12">
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="brand-font font-bold text-accent">
                  SmartBus Tracker
                </p>
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
            <div className="mt-6 sm:mt-8 border-t border-white/10 pt-6 sm:pt-8 text-center text-sm text-slate-400">
              <p>
                &copy; {new Date().getFullYear()} SmartBus Tracker. Developed as part of Capstone
                Project. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Landing;
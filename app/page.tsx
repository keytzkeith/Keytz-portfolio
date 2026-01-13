"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Database,
  Globe,
  ArrowRight,
  Download,
  MapPin,
  Calendar,
  Figma,
  Braces,
  Atom,
  Server,
  Container,
  GitBranch,
  Layers,
  PenTool
} from "lucide-react"

// Custom hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [hasAnimated])

  return [elementRef, isVisible]
}

// Typing Animator Component
const TypingAnimator = ({ texts, className }) => {
    const [text, setText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typingSpeed = 120;
        const deletingSpeed = 60;
        const pauseDuration = 2000;

        const handleTyping = () => {
            const currentWord = texts[textIndex];
            if (isDeleting) {
                // Deleting logic
                setText(currentWord.substring(0, text.length - 1));
            } else {
                // Typing logic
                setText(currentWord.substring(0, text.length + 1));
            }

            // Switch between typing and deleting
            if (!isDeleting && text === currentWord) {
                // Finished typing, pause then start deleting
                setTimeout(() => setIsDeleting(true), pauseDuration);
            } else if (isDeleting && text === '') {
                // Finished deleting, move to next word and start typing
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }
        };

        const timeout = setTimeout(
            handleTyping,
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timeout);
    }, [text, isDeleting, textIndex, texts]);

    return (
        <div className={className}>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {text}
            </span>
            <span className="animate-blink text-blue-400 ml-1">|</span>
        </div>
    );
};

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  // Animation hooks
  const [aboutImageRef, aboutImageVisible] = useIntersectionObserver()
  const [aboutTextRef, aboutTextVisible] = useIntersectionObserver()
  const [projectsRef, projectsVisible] = useIntersectionObserver()
  const [skillsRef, skillsVisible] = useIntersectionObserver()
  const [experienceRef, experienceVisible] = useIntersectionObserver()
  const [contactRef, contactVisible] = useIntersectionObserver()

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "experience", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const projects = [
    {
      title: "Google Maps Restaurant Scraper",
      description:
        "This project is a Python script that scrapes Google Maps for restaurant data in a specified location. It uses Selenium to automate browser actions, handle dynamic content, and extract key information for a list of restaurants.",
      tags: ["Python", "Selenium", "Pandas"],
      link: "https://github.com/keytzkeith/google-maps-scraper",
      image: "gmaps-scraper.jpg?height=200&width=400",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
      link: "#",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Mobile Fitness App",
      description:
        "Cross-platform mobile application for fitness tracking with social features and workout recommendations.",
      tags: ["React Native", "Firebase", "Redux", "API"],
      link: "#",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Blockchain Voting System",
      description: "Secure and transparent voting system built on blockchain technology with smart contracts.",
      tags: ["Solidity", "Web3.js", "React", "Ethereum"],
      link: "#",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

 const skills = [
    { name: "JavaScript", icon: Braces },
    { name: "Python", icon: Code }, // 'Code' is a good general icon here
    { name: "React", icon: Atom },
    { name: "Node.js", icon: Server },
    { name: "TypeScript", icon: Braces },
    { name: "PostgreSQL", icon: Database }, // 'Database' is accurate for this
    { name: "AWS", icon: Globe },
    { name: "Docker", icon: Container },
    { name: "Photoshop", icon: Layers },
    { name: "Illustrator", icon: PenTool },
    { name: "Figma", icon: Figma },
    { name: "Git", icon: GitBranch },
  ]

  const experiences = [
    {
      role: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      date: "2022 - Present",
      description:
        "Led development of scalable web applications serving 100K+ users. Implemented microservices architecture and improved system performance by 40%.",
    },
    {
      role: "Frontend Developer",
      company: "Digital Innovations",
      date: "2020 - 2022",
      description:
        "Developed responsive web applications using React and TypeScript. Collaborated with design teams to create pixel-perfect user interfaces.",
    },
    {
      role: "Software Engineer Intern",
      company: "StartupXYZ",
      date: "2019 - 2020",
      description:
        "Built RESTful APIs and database schemas. Contributed to open-source projects and learned agile development methodologies.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center hover:scale-105 transition-transform duration-300"
            >
              <img src="/logo.png" alt="iTHs Logo" className="h-12 w-auto" />
            </button>
            <div className="hidden md:flex space-x-8">
              {["About", "Projects", "Skills", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm transition-colors hover:text-blue-400 hover:scale-110 duration-300 hover:font-semibold ${
                    activeSection === item.toLowerCase() ? "text-blue-400" : "text-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/herobg.jpg?height=1080&width=1920')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-950"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
          <TypingAnimator
          texts={["{ ./Keith_C0d3r }", "Creative Technologist", "A    Full-Stack Developer", "iTHs Empire"]}
            className="text-5xl md:text-7xl font-bold mb-6 h-24 md:h-20"
            />
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Crafting digital experiences through code and design.
            </p>
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              ref={aboutImageRef}
              className={`flex justify-center transition-all duration-1000 ${
                aboutImageVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-20 scale-95"
              }`}
            >
              <div className="relative">
                <div className="w-55 h-55 rounded-full p-1 animate-spin-slow">
                  <img
                    src="/profileimgprofile.png?height=256&width=256"
                    alt="Keith Barnabas"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div
              ref={aboutTextRef}
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                aboutTextVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              }`}
            >
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate developer who loves building, designing, and exploring the endless possibilities of
                technology. With a keen eye for detail and a drive for innovation, I create digital solutions that not
                only function flawlessly but also provide exceptional user experiences.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                When I'm not coding, you'll find me experimenting with new design tools, contributing to open-source
                projects, or exploring the latest trends in web development and artificial intelligence.
              </p>
              <Button
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300 bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div
            ref={projectsRef}
            className={`text-center mb-12 transition-all duration-1000 ${
              projectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold">Featured Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${
                  projectsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-20 scale-95"
                }`}
                style={{
                  transitionDelay: projectsVisible ? `${index * 200}ms` : "0ms",
                }}
              >
                <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 to-transparent"></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-0">
              View Project
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            ref={skillsRef}
            className={`text-center mb-12 transition-all duration-1000 ${
              skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold">Skills & Technologies</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-6 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-1000 transform hover:scale-105 hover:bg-gray-800/50 group ${
                  skillsVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-10 -rotate-12"
                }`}
                style={{
                  transitionDelay: skillsVisible ? `${index * 100}ms` : "0ms",
                }}
              >
                <skill.icon className="h-8 w-8 mb-3 text-gray-400 group-hover:text-blue-400 transition-colors" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div
            ref={experienceRef}
            className={`text-center mb-12 transition-all duration-1000 ${
              experienceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold">Experience</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative mb-12 transition-all duration-1000 ${
                  experienceVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                }`}
                style={{
                  transitionDelay: experienceVisible ? `${index * 300}ms` : "0ms",
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex-1 ml-12">
                    <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">{exp.role}</CardTitle>
                        <div className="flex items-center text-blue-400 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {exp.company}
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {exp.date}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300">{exp.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-4 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-950"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            ref={contactRef}
            className={`mb-12 transition-all duration-1000 ${
              contactVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
            }`}
          >
            <h2 className="text-4xl font-bold">Get In Touch</h2>
          </div>
          <div
            className={`grid md:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${
              contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-gray-300 text-lg">
                I'm always open to discussing new opportunities, creative projects, or just having a chat about
                technology.
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/keytzkeith"
                  className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/keith-odera-0437a1317"
                  className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="mailto:keithodera@gmail.com"
                  className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <Input
                  placeholder="Your Name"
                  className="bg-gray-800 border-gray-700 focus:border-blue-500 text-white placeholder-gray-400"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-gray-800 border-gray-700 focus:border-blue-500 text-white placeholder-gray-400"
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  className="bg-gray-800 border-gray-700 focus:border-blue-500 text-white placeholder-gray-400"
                />
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2024 Keith Odera. Built with Next.js</p>
        </div>
      </footer>
    </div>
  )
}

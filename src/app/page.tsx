'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Menu } from 'lucide-react'
import { FaGithub, FaLinkedin, FaJava } from 'react-icons/fa'
import { SiCplusplus, SiPython, SiJavascript, SiGmail, SiReact, SiRedux, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiSocketdotio, SiJsonwebtokens, SiPrisma, SiZod } from 'react-icons/si'
import Image from 'next/image'
import { StaticImageData } from 'next/image'
import meImage from './me.jpg'
import codenexus from './codenexus.png'
import alumniconnect from './alumniconnect.png'

const projectImages: { [key: string]: StaticImageData } = {
  "Code Nexus": codenexus,
  "Alumni Connect": alumniconnect,
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleScroll = () => {
    const sections = ['home', 'experience', 'projects', 'skills', 'contact']
    const scrollPosition = window.scrollY

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop - 100
        if (scrollPosition >= offsetTop) {
          setActiveSection(section)
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <ul className="hidden md:flex justify-center space-x-4 lg:space-x-8 mx-auto">
              {['Home', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <Button
                    variant="ghost"
                    className={`text-sm lg:text-lg ${activeSection === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'}`}
                    onClick={() => scrollToSection(item.toLowerCase())}
                  >
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center">
          <Button
            variant="ghost"
            className="absolute top-4 right-4"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <X className="h-6 w-6" />
          </Button>
          <ul className="flex flex-col space-y-4">
            {['Home', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <li key={item}>
                <Button
                  variant="ghost"
                  className={`text-lg ${activeSection === item.toLowerCase() ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={() => scrollToSection(item.toLowerCase())}
                >
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <main className="pt-20">
        <HomeSection scrollToSection={scrollToSection} />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

function HomeSection({ scrollToSection }: { scrollToSection: (sectionId: string) => void }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <Image
                src={meImage}
                alt="Kumud"
                width={192}
                height={192}
                className="rounded-full object-cover shadow-lg"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl font-bold mb-8 text-foreground text-center"
            >
              Kumud Chandra Bhatt
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button onClick={() => scrollToSection('contact')} size="lg">
                Get in touch
              </Button>
            </motion.div>
          </div>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.5 }}
            className="md:w-1/2"
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-card-foreground">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4 text-muted-foreground">
                  I'm a Computer Science and Engineering student at Graphic Era University, Dehradun. I'm passionate about full-stack development and have experience working on various projects and internships.
                </p>
                <p className="text-lg text-muted-foreground">
                  I'm always eager to learn and take on new challenges in the field of software development.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Work Experience</h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-card border-border mb-8">
            <CardHeader>
              <CardTitle className="text-card-foreground">Full Stack Developer Intern</CardTitle>
              <CardDescription className="text-muted-foreground">National Informatics Centre (NIC) | August 2024 – Present</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Spearheading the development of a comprehensive website for a Self Help Group (SHG), covering both frontend and backend aspects.</li>
                <li>Architecting and managing the database using PostgreSQL, developing backend services with Express.js and Node.js, and creating the frontend interface with React.js.</li>
                <li>Designing and implementing scalable and maintainable system architectures to ensure the robustness and performance of the application.</li>
                <li>Collaborating closely with stakeholders to capture requirements, ensuring the delivery of a user-centric and efficient web application.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const projects = [
    {
      title: "Code Nexus",
      description: "A dynamic code editor offering real-time syntax highlighting, collaborative editing, and secure user authentication, enabling seamless programming collaboration across various languages.",
      technologies: ["React", "Redux", "Monaco Editor", "JWT", "bcrypt", "Socket.IO", "MongoDB", "Mongoose", "Axios", "JavaScript", "RESTful API", "Rate Limiting", "Postman"],
      github: "https://github.com/KumudBhatt/Code-Nexus"
    },
    {
      title: "Alumni Connect",
      description: "A comprehensive alumni networking platform backend facilitating seamless connections among alumni.",
      technologies: ["Node.js", "Express", "Prisma", "PostgreSQL", "Socket.IO", "JWT", "bcrypt", "Zod", "JavaScript", "RESTful API", "Prisma ORM", "Postman"],
      github: "https://github.com/KumudBhatt/Alumini-Connect"
    }
  ]

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: { title: string; description: string; technologies: string[]; github: string }, index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-card border-border h-full flex flex-col overflow-hidden">
        <div className="relative w-full pt-[56.25%]">
          <Image
            src={projectImages[project.title]}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-card-foreground">{project.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span key={i} className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function SkillsSection() {
  const skills = [
    { name: "C++", icon: SiCplusplus },
    { name: "Python", icon: SiPython },
    { name: "Java", icon: FaJava },
    { name: "JavaScript", icon: SiJavascript },
    { name: "React", icon: SiReact },
    { name: "Redux", icon: SiRedux },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express.js", icon: SiExpress },
    { name: "MongoDB", icon: SiMongodb },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Socket.IO", icon: SiSocketdotio },
    { name: "JWT", icon: SiJsonwebtokens },
    { name: "Prisma", icon: SiPrisma },
    { name: "Zod", icon: SiZod },
  ]

  return (
    <section id="skills" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill, index }: { skill: { name: string; icon: React.ElementType }, index: number }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-card border-border h-full flex flex-col items-center justify-center p-4 hover:shadow-md transition-shadow duration-300">
        <skill.icon className="w-16 h-16 mb-4 text-primary" />
        <h3 className="text-lg font-semibold text-card-foreground text-center">{skill.name}</h3>
      </Card>
    </motion.div>
  )
}

function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData()
    formData.append('name', formState.name)
    formData.append('email', formState.email)
    formData.append('message', formState.message)

    try {
      const response = await fetch('https://formspree.io/f/xovazlwk', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setSubmitMessage('Message sent successfully!')
        setFormState({ name: '', email: '', message: '' })
      } else {
        setSubmitMessage('Oops! Something went wrong.')
      }
    } catch (error) {
      setSubmitMessage('Error submitting the form. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center text-foreground">Get in Touch</h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Contact Me</CardTitle>
              <CardDescription className="text-muted-foreground">Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="bg-input border-input-border"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="bg-input border-input-border"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="bg-input border-input-border"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                {submitMessage && (
                  <p className="text-green-500 text-center">{submitMessage}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-secondary/50 py-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-center space-x-6">
          <a href="https://github.com/KumudBhatt" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
            <FaGithub size={24} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/kumud-bhatt-49456a242/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
            <FaLinkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:kumud.bhatt444@gmail.com" className="text-muted-foreground hover:text-primary">
            <SiGmail size={24} />
            <span className="sr-only">Email</span>
          </a>
        </div>
        <p className="mt-8 text-center text-base text-muted-foreground">
          © {new Date().getFullYear()} Kumud Chandra Bhatt. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
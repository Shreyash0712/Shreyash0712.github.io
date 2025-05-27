import React, { useState, useEffect } from 'react';
import './index.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
const sections = [
  { id: 'intro', label: 'Introduction' },
  { id: 'socials', label: 'Social Links' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About Me' },
  { id: 'contact', label: 'Contact Me' },
];

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <div className="font-sans bg-background text-text"> 

      <nav className="fixed top-0 left-0 right-0 bg-background text-text z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-lg">My Portfolio</div>
            <DarkModeSwitch
              checked={darkMode}
              onChange={toggleDarkMode}
              size={20}
            />
        </div>
      </nav>

      {/* Main Sections */}
      <main className="pt-20 space-y-20 px-4 max-w-4xl mx-auto">
        <div className="h-screen">
          <section id="intro" className="scroll-mt-16 text-center">
            <h1 className="text-4xl font-bold mb-2">Hi, I'm Shrey!</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome to my personal portfolio website built with React and Tailwind CSS.
            </p>
          </section>

          <section id="socials" className="scroll-mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Find Me Online</h2>
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-primary">GitHub</a>
              <a href="#" className="hover:text-primary">LinkedIn</a>
              <a href="#" className="hover:text-primary">Twitter</a>
            </div>
          </section>
        </div>

        <section id="projects" className="scroll-mt-16">
          <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
          <ul className="space-y-4">
            <li className="border p-4 rounded shadow bg-foreground">
              Project 1 - Description of what it does
            </li>
            <li className="border p-4 rounded shadow bg-foreground">
              Project 2 - Description of what it does
            </li>
          </ul>
        </section>

        <section id="about" className="scroll-mt-16">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300">
            I'm a passionate web developer who loves building simple and elegant websites with modern
            technologies like React and Tailwind.
          </p>
        </section>

        <section id="contact" className="scroll-mt-16">
          <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded bg-foreground text-text"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-2 rounded bg-foreground text-text"
            />
            <textarea
              placeholder="Your Message"
              className="w-full border p-2 rounded bg-foreground text-text"
              rows="4"
            />
            <button className="bg-primary text-white px-4 py-2 rounded hover:opacity-90">Send</button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-text text-center py-4 mt-20">
        <p>&copy; 2025 Shrey. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

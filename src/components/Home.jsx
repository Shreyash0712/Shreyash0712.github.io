import { motion } from "framer-motion";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <motion.div
        className="home-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <h1>Shreyash Swami</h1>
        <p>This is where the magic happens ✨</p>
      </motion.div>
    </div>
  );
};

export default Home;

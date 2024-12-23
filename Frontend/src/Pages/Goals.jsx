import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

const Goals = () => {
  const [activeTopic, setActiveTopic] = useState("Win back your time");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const topics = {
    "Win back your time": {
      title: "Win back your time",
      content:
        "Learning how to manage your time effectively allows you to focus on meaningful work and reduce procrastination. Techniques such as time blocking, prioritization, and the 80/20 rule help you make the most out of each day. Automating repetitive tasks and removing distractions can further optimize your schedule. This way, you can dedicate energy to personal growth, family, or creative projects.",
    },
    "E-learning": {
      title: "E-learning",
      content:
        "E-learning has revolutionized education by providing access to vast resources and knowledge. Platforms like MOOCs, webinars, and virtual classrooms enable you to learn at your own pace. Interactive learning modules, quizzes, and multimedia presentations make concepts easier to grasp. Online certifications also boost your career prospects, helping you stay competitive in today's rapidly evolving job market.",
    },
    "Learn Far Away": {
      title: "Learn Far Away",
      content:
        "Distance learning opens doors to new cultural experiences and global opportunities. Through remote learning platforms, you can connect with educators and peers worldwide. Travel while staying connected to your studies or work, explore diverse environments, and embrace lifelong learning. This flexibility fosters independence and enriches your perspective on the world.",
    },
    "Conduct Researches": {
      title: "Conduct Researches",
      content:
        "Research is the cornerstone of innovation and problem-solving. By learning how to gather credible data, synthesize information, and present your findings effectively, you can drive progress in any field. Tools such as online databases, statistical software, and AI-driven insights make research more efficient. Collaborate with peers, publish papers, and contribute to the knowledge economy.",
    },
  };

  const images = ["goal1.jpg", "goal2.jpg", "goal3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>

      <style>
        {`
          .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-size: cover;
            background-position: center;
            transition: background-image 1s ease-in-out;
          }

          .main-container {
            color: white;
            padding: 2rem;
            font-family: Arial, sans-serif;
          }

          .main-heading {
            text-align: center;
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 2rem;
            color: #f44336;
          }

          .flex {
            display: flex;
            gap: 0rem;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .sidebar {
            flex: 1;
            max-width: 450px;
            min-width: 250px;
            padding: 1rem;
            background-color: #2d3748;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .content {
            flex: 2;
            max-width: 700px;
            padding: 1rem;
            background-color: #f7fafc;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .sidebar button {
            width: 100%;
            padding: 1rem;
            text-align: left;
            border: 2px solid #4a5568;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
            background-color: #2d3748;
            color: white;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }

          .sidebar button::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: #f44336;
            transform: scaleX(0);
            transition: transform 0.3s ease-in-out;
          }

          .sidebar button:hover::before {
            transform: scaleX(1);
          }

          .sidebar button:hover {
            color: #f44336;
          }

          .sidebar button.active {
            border-color: #f44336;
            background-color: #4a5568;
            color: #f44336;
          }

          .content-card {
            background-color: white;
            color: #2d3748;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .content-card h3 {
            color: #f44336;
          }

          .content-card p {
            line-height: 1.6;
          }
        `}
      </style>

      {/* Background Image */}
      <div
        className="background"
        style={{
          backgroundImage: `url(/${images[currentImageIndex]})`,
        }}
      ></div>

      <div className="main-container mt-20">
        <div className="flex">
          <div className="sidebar">
            <h1 className="main-heading">✔ Our Topics</h1>
            {Object.keys(topics).map((topic) => (
              <button
                key={topic}
                className={activeTopic === topic ? "active" : ""}
                onClick={() => setActiveTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="content">
            <h1 className="main-heading">⁂⁂</h1>
            <CSSTransition
              in={!!activeTopic}
              timeout={300}
              classNames="slide"
              key={activeTopic}
            >
              <div className="content-card">
                <h3>{topics[activeTopic].title}</h3>
                <p>{topics[activeTopic].content}</p>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
    </>
  );
};

export default Goals;

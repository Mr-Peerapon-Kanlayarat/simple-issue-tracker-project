import { useEffect, useState} from "react";

import axios from 'axios';
import "../styles/Home.css";
import ProjectCard from "../components/ProjectCard";
import CreateProjectButton from "../components/CreateProjectButton";

function Home() {
  const [data, setData] = useState([]);

  async function getData() {
  try {
    // Get the token from localStorage (you'll need to store it there after login)
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`http://localhost:4000/api/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setData(response.data.data); // Note: response.data.data since your API returns { success, data }
  } catch (error) {
    console.error('Axios error:', error);
  }
}


  const fetchProjects = () => {
    getData();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleted = (deletedId) => {
    setData((prev) => prev.filter((p) => p.id !== deletedId));
  };

  return (
    <div className="home">
      <div className="head-container">
        <h1>Projects</h1>
        <CreateProjectButton onCreated={fetchProjects} />
      </div>
      <div className="project-list">
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
}

export default Home;
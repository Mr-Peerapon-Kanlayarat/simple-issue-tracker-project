import { useEffect, useState} from "react";

import axios from 'axios';
import "../styles/Home.css";
import ProjectCard from "../components/ProjectCard";
import CreateProjectButton from "../components/CreateProjectButton";
import GoBackButton from "../components/GoBackButton";
import NavBar from "../components/NavBar";

function Home() {
  const [data, setData] = useState([]);

  async function getData() {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.get(`http://localhost:4000/api/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setData(response.data.data);
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
        {Array.isArray(data) && data.length > 0 ? (
          data.map((project) => (
            <ProjectCard key={project.id} project={project} onDeleted={handleDeleted} />
          ))
        ) : (
          <p style={{ color: '#999' }}>Your projects list is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
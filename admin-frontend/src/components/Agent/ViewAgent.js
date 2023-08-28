import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewAgentPage = () => {
  const [agents, setAgents] = useState([]);
  console.log(agents);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/agents");
      setAgents(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (!agents) {
    return <div className="container">No agent data available.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>View Agents</h2>
      <div className="row">
        {agents.map((agent) => (
          <div key={agent._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{agent.name}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {agent.email}
                  <br />
                  <strong>Contact Number:</strong> {agent.contactNumber}
                </p>
                <Link
                  to={{
                    pathname: `/agent-details/${agent._id}`,
                  }}
                  state={agent}
                  className="btn btn-primary"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAgentPage;

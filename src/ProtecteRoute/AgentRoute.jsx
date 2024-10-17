import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AgentRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const json_data = window.localStorage.getItem("user");
        if (json_data) {
          const user_data = JSON.parse(json_data);
          setData(user_data);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data?.role?.roleName === "Agent") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} />;
};

export default AgentRoute;

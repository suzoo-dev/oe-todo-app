import { useAuth } from "./context/AuthContext"; // Import the useAuth hook
import SignIn from "./components/SignIn"; // Import SignIn component
import Task from "./components/Task"; // Import Task component

function App() {
  const { isAuthenticated } = useAuth(); // Get authentication status

  return (
    <>
      {isAuthenticated ? <Task /> : <SignIn />} {/* Conditional rendering */}
    </>
  );
}

export default App;

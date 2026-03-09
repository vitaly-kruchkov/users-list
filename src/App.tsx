import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import UsersPage from "./pages/Users/Users";

function App() {
  return (
    <ErrorBoundary>
      <UsersPage />
    </ErrorBoundary>
  );
}

export default App;

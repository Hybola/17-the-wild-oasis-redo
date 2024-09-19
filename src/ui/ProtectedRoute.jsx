import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import styled from "styled-components";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, isFetching, isAuthenticated } = useUser();
  //Avoid navigate to login page when the initial state of the query is still empty using useEffect and isFetching
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isFetching) navigate("/login");
  }, [isAuthenticated, isLoading, isFetching, navigate]);
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return children;
}

export default ProtectedRoute;

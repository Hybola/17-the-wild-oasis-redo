import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { bookings, isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2 } = useRecentStays();
  if (isLoading1 || isLoading2) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>today</div>
      <div>Chart Stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

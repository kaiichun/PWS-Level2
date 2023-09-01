import { Link } from "react-router-dom";
import { Space, Group, Badge } from "@mantine/core";

export default function Dashboard() {
  return (
    <div className="container mx-auto my-5" style={{ maxwidth: "600px" }}>
      <h1 className="h1 mb-4 text-center">
        <em>Dashboard</em>
      </h1>
      <Space h="50px" />
      <Group position="center">
        <div className="col-6">
          <div className="card mb-2">
            <div className="card-body">
              <h5 className="card-title text-center">
                <div className="mb-1">
                  <i
                    className="bi bi-pencil-square"
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                Manage Bookings
              </h5>
              <div className="text-center mt-3">
                <Link
                  to="/booking_history"
                  className="btn btn-outline-dark btn-sm"
                >
                  Access
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 ">
          <div className="card mb-2">
            <div className="card-body">
              <h5 className="card-title text-center">
                <div className="mb-1">
                  <i className="bi bi-people" style={{ fontSize: "3rem" }}></i>
                </div>
                Manage Rooms
              </h5>
              <div className="text-center mt-3">
                <Link to="/room" className="btn btn-outline-dark btn-sm">
                  Access
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
      </Group>
      <Space h="130px" />
      <Group position="center">
        <Link to="/">
          <Badge color="pink" size="lg">
            <i className="bi bi-arrow-left"></i> <></>Back to Home
          </Badge>
        </Link>
      </Group>
    </div>
  );
}

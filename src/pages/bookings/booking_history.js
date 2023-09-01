import { Space, Group, Badge } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings"));
    setBookings(bookings);
  }, []);

  const deleteBooking = (id) => {
    const newBookings = bookings.filter((p) => parseInt(p.id) !== parseInt(id));
    localStorage.setItem("bookings", JSON.stringify(newBookings));
    setBookings(newBookings);
  };

  return (
    <div className="container mx-auto my-5">
      <div className="d-flex justify-content-center align-items-center mb-2">
        <h1 className="h1">Manage Booking Rooms</h1>
      </div>
      <Space h="30px" />
      <div className="card mb-2 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Room</th>
              <th scope="col">Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings
              ? bookings.map((booking) => {
                  return (
                    <tr key={booking.id}>
                      <td>{booking.room}</td>
                      <td>
                        <span className="">{booking.date.slice(0, 10)}</span>
                      </td>
                      <td>
                        <span className=""> {booking.startTime}</span>
                      </td>
                      <td>
                        <span className=""> {booking.endTime}</span>
                      </td>
                      <td className="text-end">
                        <div className="buttons">
                          <Link
                            to={`/booking_edit/${booking.id}`}
                            className="btn btn-secondary btn-sm me-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deleteBooking(booking.id);
                            }}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
      <Space h="100px" />
      <Group position="center">
        <Link to="/dashboard">
          <Badge color="indigo" size="lg">
            <i className="bi bi-arrow-left"></i> <></>Back to Dashboard
          </Badge>
        </Link>
      </Group>
    </div>
  );
}

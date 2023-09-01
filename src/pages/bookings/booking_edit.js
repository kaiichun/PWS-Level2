import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { TimeInput } from "@mantine/dates";
import { DatePickerInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { Group, Space, Badge } from "@mantine/core";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { notifications } from "@mantine/notifications";

export default function BookingEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState("");
  const [content, setContent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(null);
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings"));
    const booking = bookings
      ? bookings.find((p) => parseInt(p.id) === parseInt(id))
      : null;

    if (booking) {
      setRoom(booking.room);
      setContent(booking.content);
      setStartTime(booking.startTime);
      setEndTime(booking.endTime);
      setDate(new Date(booking.date));
      setBooking(booking);
    }
  }, []);
  const editor = useEditor(
    {
      extensions: [StarterKit, Underline, Highlight, TextAlign],
      content: booking.content,
      onUpdate: ({ editor }) => {
        setContent(editor.getHTML());
      },
    },
    [booking]
  );

  const updateBooking = () => {
    const bookings = JSON.parse(localStorage.getItem("bookings"));
    if (room && content && startTime && endTime && date) {
      const newBooking = bookings.map((p) => {
        if (parseInt(p.id) === parseInt(id)) {
          p.room = room;
          p.content = content;
          p.startTime = startTime;
          p.endTime = endTime;
          p.date = date;

          let syear = date.getFullYear();
          let smonth = date.getMonth() + 1;
          let sday = date.getDate();
          let supdatedDate = new Date(`${syear}-${smonth}-${sday}`);
          supdatedDate.setHours(11, 5);

          p.date = supdatedDate;
        }

        return p;
      });
      localStorage.setItem("bookings", JSON.stringify(newBooking));
      notifications.show({
        title: "Update succesful",
        message: "Thank You!",
        color: "green",
      });
      navigate("/booking_history");
    }
  };

  return (
    <div className="container mx-auto my-5">
      <div className="d-flex justify-content-center align-items-center mb-5">
        <h1 className="h1">Edit Booking Room</h1>
      </div>
      <div>
        <h3>Room: {room}</h3>
        <p className="text-muted">Meeting Room ID: {id}</p>
      </div>

      <div className="card mb-2 p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateBooking();
          }}
        >
          <div className="mb-4">
            <label for="booking-content" className="form-label">
              Content of the Meeting
            </label>
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content />
            </RichTextEditor>
          </div>
          <Group position="apart">
            <Group>
              <TimeInput
                label="Start time"
                icon={<IconClock size="1rem" stroke={1.5} />}
                maw={400}
                mx="end"
                id="start-time"
                value={startTime}
                onChange={(event) => {
                  setStartTime(event.target.value);
                }}
              />
              <Space w="xl">
                <p>TO</p>
              </Space>
              <TimeInput
                label="End time"
                icon={<IconClock size="1rem" stroke={1.5} />}
                maw={400}
                mx="end"
                id="end-time"
                value={endTime}
                onChange={(event) => {
                  setEndTime(event.target.value);
                }}
              />
              <Space w="xl" />
              <DatePickerInput
                value={date}
                onChange={(newDate) => {
                  setDate(newDate);
                }}
                label="Date"
                placeholder="Date"
                maw={400}
                mx="end"
                w={180}
              />
            </Group>
            <div>
              <button type="submit" className="btn btn-primary m-2">
                Update
              </button>
            </div>
          </Group>
        </form>
        <Space h="10px" />
      </div>
      <Space h="60px" />
      <div className="text-center">
        <Link to={`/booking_history`} className="btn btn-sm">
          <Badge size="lg">
            <i className="bi bi-arrow-left"></i> Back
          </Badge>
        </Link>
      </div>
    </div>
  );
}

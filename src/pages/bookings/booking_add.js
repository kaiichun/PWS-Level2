import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TimeInput } from "@mantine/dates";
import { DatePickerInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { Badge, Group, Space } from "@mantine/core";
import { RichTextEditor, Link as EditorLink } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { notifications } from "@mantine/notifications";

export default function BookingAdd() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [room, setRoom] = useState("");
  const [content, setContent] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    const post = posts
      ? posts.find((p) => parseInt(p.id) === parseInt(id))
      : null;

    if (post) {
      setTitle(post.title);
    }
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, Underline, EditorLink, Highlight, TextAlign],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const submitForm = () => {
    let bookings = JSON.parse(localStorage.getItem("bookings"));

    if (!bookings) bookings = [];
    if (title && content && date && startTime && endTime) {
      bookings.push({
        id: Math.floor(Math.random() * 100000),
        room: title,
        content: content,
        status: "review",
        date: date,
        startTime: startTime,
        endTime: endTime,
      });

      localStorage.setItem("bookings", JSON.stringify(bookings));
      notifications.show({
        title: "Create succesful",
        message: "Thank You!",
        color: "green",
      });
      navigate("/booking_history");
    } else {
      notifications.show({
        title: "Please enter your booking information",
        color: "red",
      });
    }
  };

  return (
    <div>
      <div className="container mx-auto my-5">
        <div className="d-flex justify-content-center align-items-center mb-2">
          <h1 className="h1">Booking Meeting Room</h1>
        </div>
        <div className="mt-5 mb-2">
          <h3>Room: {title}</h3>
          <p className="text-muted">Meeting Room ID: {id}</p>
        </div>
        <div className="card mb-5 p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitForm();
            }}
          >
            <div className="mb-4">
              <label for="post-content" className="form-label">
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
                />{" "}
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
                  placeholder="Pick a Date?"
                  maw={400}
                  mx="end"
                  w={180}
                />
              </Group>
              <div>
                <button type="submit" className="btn btn-primary m-2">
                  Add
                </button>
              </div>
            </Group>
          </form>
        </div>
        <Space h="60px" />
        <div className="text-center">
          <Link to={`/`} className="btn btn-sm">
            <Badge size="lg">
              <i className="bi bi-arrow-left"></i> Back
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
}

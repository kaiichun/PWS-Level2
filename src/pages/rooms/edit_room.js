import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { notifications } from "@mantine/notifications";
import { Space, Group, Badge } from "@mantine/core";

export default function EditRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("review");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    const post = posts
      ? posts.find((p) => parseInt(p.id) === parseInt(id))
      : null;

    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setStatus(post.status);
      setPost(post);
    }
  }, []);
  const editor = useEditor(
    {
      extensions: [StarterKit, Underline, Highlight, TextAlign],
      content: post.content,
      onUpdate: ({ editor }) => {
        setContent(editor.getHTML());
      },
    },
    [post]
  );

  const updatePost = () => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    if (title && content && status) {
      const newPosts = posts.map((p) => {
        if (parseInt(p.id) === parseInt(id)) {
          p.title = title;
          p.content = content;
          p.status = status;
        }
        return p;
      });
      localStorage.setItem("posts", JSON.stringify(newPosts));

      notifications.show({
        title: "Update succesful",
        message: "Thank You!",
        color: "green",
      });
      navigate("/room");
    }
  };

  return (
    <div className="container mx-auto my-5">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="h1">Edit Meeting Room</h1>
      </div>
      <div className="card mb-2 p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updatePost();
          }}
        >
          <div className="mb-3">
            <label for="post-title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="post-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-3">
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
          <div className="mb-3">
            <label for="post-content" className="form-label">
              Status
            </label>
            <select
              className="form-control"
              id="post-status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              <option value="pending">Pending for Use</option>
              <option value="publish">Publish</option>
            </select>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
      <Space h="100px" />
      <Group position="center">
        <Link to="/room">
          <Badge color="indigo" size="lg">
            <i className="bi bi-arrow-left"></i> <></>Back
          </Badge>
        </Link>
      </Group>
    </div>
  );
}

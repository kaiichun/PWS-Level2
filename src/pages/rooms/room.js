import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Group, Badge } from "@mantine/core";

export default function Room() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts"));
    setPosts(posts);
  }, []);

  const deletePost = (id) => {
    const newPosts = posts.filter((p) => parseInt(p.id) !== parseInt(id));
    localStorage.setItem("posts", JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  return (
    <div className="container mx-auto my-5">
      <div className="d-flex justify-content-center align-items-center mb-2">
        <h1 className="h1">Manage Meeting Rooms</h1>
      </div>
      <Space h="50px" />
      <div className="text-end">
        <Link to="/add_room" className="btn btn-primary btn-sm">
          Add Room
        </Link>
      </div>
      <Space h="20px" />
      <div className="card mb-2 p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts
              ? posts.map((post) => {
                  return (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td>
                        <span className="badge bg-warning">{post.status}</span>
                      </td>
                      <td className="text-end">
                        <div className="buttons">
                          <Link
                            to={`/edit_room/${post.id}`}
                            className="btn btn-secondary btn-sm me-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              deletePost(post.id);
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

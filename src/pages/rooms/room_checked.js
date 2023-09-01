import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Badge, Button, Divider, Group, Space, Title } from "@mantine/core";
import { BsTrashFill } from "react-icons/bs";
import { AiOutlineFileAdd } from "react-icons/ai";
import { Container } from "react-bootstrap";

export default function Room_checked() {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);

  const posts = JSON.parse(localStorage.getItem("posts"));
  let post = null;
  if (posts) {
    post = posts.find((p) => parseInt(p.id) === parseInt(id));
  }

  if (!post) return "Room no found";

  const { title = "", content = "", status } = post;

  return (
    <div className="container mx-auto my-4">
      <Group position="apart">
        <Button component={Link} to={`/`} className="btn">
          <Badge color="cyan" size="lg">
            <i className="bi bi-arrow-left" /> Home
          </Badge>
        </Button>

        <Button component={Link} to={`/booking/${post.id}`} className="btn">
          <Badge color="cyan" size="lg">
            Add Booking Details <i className="bi bi-arrow-right" />
          </Badge>
        </Button>
      </Group>
      <Space h="40px" />

      <div className="card-body">
        <h1 className="card-title text-center">{title}</h1>
        <p className=" text-muted text-center">Meeting Room ID: {id}</p>
        <div className="card rounded shadow-md">
          <strong className="pt-3 ps-3">Meeting Content:</strong>
          <div
            className="ps-5 pt-3 pb-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />{" "}
          <ul className="">
            {list.map((item, index) => (
              <li
                className=" d-flex justify-content-between align-items-center"
                key={index}
              >
                <div>
                  <button
                    onClick={() => {
                      const newDone = list.map((done) => {
                        if (done.id === item.id) {
                          const doneTodos = {
                            ...done,
                          };
                          if (done.isCompleted === true) {
                            doneTodos.isCompleted = false;
                          } else if (done.isCompleted === false) {
                            doneTodos.isCompleted = true;
                          }
                          return doneTodos;
                        } else {
                          return done;
                        }
                      });
                      setList(newDone);
                    }}
                    className={`btn btn-sm ${
                      item.isCompleted ? "btn-success" : "btn-light"
                    }`}
                  >
                    <i
                      className={`bi ${
                        item.isCompleted ? "bi-check-square" : "bi-square"
                      }`}
                    ></i>
                  </button>
                  {item.isCompleted ? (
                    <span className="ms-2 text-decoration-line-through">
                      {item.text}
                    </span>
                  ) : (
                    <span className="ms-2">{item.text}</span>
                  )}
                </div>
                <button
                  className="btn pe-3"
                  onClick={() => {
                    const newInput = list.filter((num) => num.id !== item.id);
                    setList(newInput);
                  }}
                >
                  <Badge color="red" size="xl">
                    <BsTrashFill />
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Container className="mt-5">
        <form
          className="d-flex justify-content-between align-items-center"
          onSubmit={(event) => {
            event.preventDefault();
            const newList = [...list];
            newList.push({
              id: Math.random(),
              text: input,
              isCompleted: false,
            });
            setList(newList);
            setInput("");
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Add new content..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <button className="btn rounded">
            {" "}
            <Badge size="xl">Add</Badge>
          </button>
        </form>
      </Container>
    </div>
  );
}

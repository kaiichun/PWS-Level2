import { Link } from "react-router-dom";
import { Group, Space, Title, Card, Text, Button, Grid } from "@mantine/core";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Home() {
  const posts = JSON.parse(localStorage.getItem("posts"));

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Meeting Room Booking App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <Link
                  to="/dashboard"
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  Dashboard
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Space h="30px" />
      <div className="container mx-auto my-5">
        <Title align="center" color="dark" size="60px">
          <em>Meeting Room</em>
        </Title>
        <Space h="50px" />
        <Grid>
          {posts ? (
            posts
              .filter((p) => p.status === "publish" || p.status === "private")
              .map((post) => {
                return (
                  <Grid.Col span={3} key={post.id} className="MainContent">
                    <Card align="center" withBorder shadow="md" p="30px">
                      <Title order={5} size={22}>
                        {post.title}
                      </Title>

                      <Text size="sm" color="dimmed">
                        {post.content.length > 15 ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.content.slice(0, 20) + "...",
                            }}
                          />
                        ) : (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.content,
                            }}
                          />
                        )}
                      </Text>

                      <Link
                        to={`/room/${post.id}`}
                        className="text-decoration-none"
                      >
                        <Button
                          variant="light"
                          color="blue"
                          fullWidth
                          mt="md"
                          radius="md"
                        >
                          More Details
                        </Button>
                      </Link>
                    </Card>
                  </Grid.Col>
                );
              })
          ) : (
            <Grid.Col className="mt-5">
              <Space h="120px" />
              <h1 className="text-center text-muted">No Meeting yet .</h1>
            </Grid.Col>
          )}
        </Grid>
      </div>
    </div>
  );
}

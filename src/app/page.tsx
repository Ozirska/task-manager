import { Card } from "antd";
import { StarOutlined } from "@ant-design/icons";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <Card>
        <div
          style={{
            textAlign: "center",
            paddingBottom: "40px",
          }}
        >
          <StarOutlined style={{ fontSize: "30px", color: "#fadb14" }} />
        </div>

        <TaskForm />
        <TaskList />
      </Card>
    </main>
  );
}

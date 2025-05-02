"use client";

import { List, Button, Typography } from "antd";
import { useTaskStore } from "../store/taskStore";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

export default function TaskList() {
  const { tasks, removeTask, toggleTask } = useTaskStore();

  return (
    <List
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          actions={[
            <Button key={task.id} danger onClick={() => removeTask(task.id)}>
              Delete
            </Button>,
            <Button key={task.id} onClick={() => toggleTask(task.id)}>
              {task.completed ? (
                <CheckCircleOutlined />
              ) : (
                <ClockCircleOutlined />
              )}
            </Button>,
          ]}
        >
          <Typography.Text>{task.title}</Typography.Text>
        </List.Item>
      )}
      style={{ marginTop: 24 }}
    />
  );
}

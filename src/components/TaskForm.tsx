"use client";

import { Input, Button, Form } from "antd";
import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = () => {
    if (title.trim()) {
      addTask(title);
      setTitle("");
    }
  };

  return (
    <Form layout="inline" onFinish={handleSubmit}>
      <Form.Item>
        <Input
          placeholder="Add a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
}

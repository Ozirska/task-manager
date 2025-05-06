"use client";

import { Typography, Table, InputRef } from "antd";
import { useRef } from "react";
import flowerData from "../store/FlowerData";
import { getColumnSearchProps } from "../app/functions/searchAnt";
import type { ColumnsType } from "antd/es/table";

const { Title, Paragraph } = Typography;

interface FlowerType {
  key: string;
  name: string;
  color: string;
  price: number;
  type: "садова" | "кімнатна";
}

export default function FlowerTable() {
  const searchInput = useRef<InputRef>(null);

  const columns: ColumnsType<FlowerType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps<FlowerType>("name", { searchInput }),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      ...getColumnSearchProps<FlowerType>("color", { searchInput }),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <>
      <Typography>
        <Title>Квіти</Title>
        <Paragraph>15 базових квітів</Paragraph>
      </Typography>
      <Table columns={columns} dataSource={flowerData} />
    </>
  );
}

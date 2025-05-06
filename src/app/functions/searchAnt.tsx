import { useSearchStore } from "@/store/flowerStore";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import type { InputRef, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import React, { RefObject } from "react";

interface SearchProps<T> {
  searchInput: RefObject<InputRef>;
}

export function getColumnSearchProps<T extends object>(
  dataIndex: keyof T,
  searchProps: SearchProps<T>
): TableColumnType<T> {
  const { searchText, searchedColumn, setSearchText, setSearchedColumn } =
    useSearchStore();

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"]
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleReset = (clearFilters?: () => void) => {
    clearFilters?.();
    setSearchText("");
  };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchProps.searchInput}
          placeholder={`Search ${String(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex as string);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={close}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      String(record[dataIndex])
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange: (open) => {
        if (open) {
          setTimeout(() => searchProps.searchInput.current?.select(), 100);
        }
      },
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? <span>{text}</span> : text,
  };
}

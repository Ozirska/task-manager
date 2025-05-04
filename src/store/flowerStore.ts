import { create } from "zustand";

interface SearchStore {
  searchText: string;
  searchedColumn: string;
  setSearchText: (text: string) => void;
  setSearchedColumn: (column: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchText: "",
  searchedColumn: "",
  setSearchText: (text) => set({ searchText: text }),
  setSearchedColumn: (column) => set({ searchedColumn: column }),
}));

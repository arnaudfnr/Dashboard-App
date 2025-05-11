import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Client from "../../models/client";
import { fetchClients } from "../../app/axiosClient";
import { RootState } from "../../app/store";

export interface ClientTableState {
    page: number;
    count: number;
    clientPage: Client[];
    loading: boolean;
    error: string | null;
}

const initialState: ClientTableState = {
    page: 1,
    count: 0,
    clientPage: [],
    loading: false,
    error: null,
};

// Async thunk for calling backend API and query the client table. 
export const getClientPage = createAsyncThunk<Client[], number>(
  'clientTable/getClientPage',
  async (page: number) => {
    const response = await fetchClients(page);
    console.log('Response from API:', response.data);
    return response.data.results;
  }
);

const clientTableSlice = createSlice({
    name: 'clientTable',
    initialState,
    reducers: {
      setPage: (state, action: PayloadAction<number>) => {
        state.page = action.payload;
      },
      setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      },
      setClientPage: (state, action: PayloadAction<Client[]>) => {
        state.clientPage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getClientPage.pending, (state) => {
          console.log('Fetching clients...');
          state.loading = true;
          state.error = null;
        })
        .addCase(getClientPage.fulfilled, (state, action: PayloadAction<Client[]>) => {
          console.log('Clients fetched successfully:', action.payload);
          state.loading = false;
          state.clientPage = action.payload;
        })
        .addCase(getClientPage.rejected, (state, action) => {
          console.error('Error fetching client page:', action.error);
          state.loading = false;
          state.error = action.error.message || 'An error occurred';
        });
    },
  });

  // Export actions and reducer
  export const { setPage, setError, setClientPage } = clientTableSlice.actions;
  export const selectClientTable = (state: RootState) => state.clientTable;
  export default clientTableSlice.reducer;
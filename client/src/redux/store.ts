import userRedux from "./userRedux";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: { user: userRedux },
});

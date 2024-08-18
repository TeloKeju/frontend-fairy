import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./api/auth";
import pilganSlice from "./api/soalPilgan";
import uraianSingkatSlice from "./api/soalUraianSingkat";
import soalUraianPanjang from "./api/soalUraianPanjang";
import forumQuizSlice from "./api/forumQuiz";
import dongengSlice from "./api/dongeng";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    soalPilihanGanda: pilganSlice,
    soalUraianSingkat: uraianSingkatSlice,
    soalUraianPanjang: soalUraianPanjang,
    forumQuiz : forumQuizSlice,
    dongeng: dongengSlice,
  },
});

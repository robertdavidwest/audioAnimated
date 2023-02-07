export {
  default as authReducer,
  me,
  authenticate,
  logout,
} from "./auth/authSlice";

export {
  default as singleProjectReducer,
  createSectionAsync,
  deleteSectionAsync,
  getFilesAsync,
  fetchSingleProjectAsync,
  addFileAsync,
  deleteFileAsync,
  writeFileAsync,
} from "./projects/SingleProjectSlice";

export {
  default as allProjectsReducer,
  createProjectAsync,
  fetchAllProjectsByUserIdAsync,
} from "./projects/AllProjectsSlice";

export {
  default as playAllReducer,
  setSectionToPlay, setTryToStart, setPlayAllStarted,
  alreadyPlaying, setPlayAllCanvasCreated, setFinished
} from "./projects/playAllSlice"


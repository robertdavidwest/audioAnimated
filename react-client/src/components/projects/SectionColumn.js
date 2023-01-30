import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import AudioContextPlus from "../../audio";
import { useSelector } from "react-redux";

import FileCard from "./FileCard";
import Player from "./Player";

export default function SectionColumn({
  userId,
  projectId,
  files,
  sectionDuration,
  sectionNumber,
}) {
  const audioRawFiles = useSelector(
    (state) => state.singleProject.audioRawFiles
  );

  const setPlayback = (value) => {
    // Need to adjust AC current position in this fn
    // need to figure that out
    // acPlusRef.current.currentTime = value;
  };

  const [disabled, setDisabled] = React.useState(true);
  const acPlusRef = React.useRef(new AudioContextPlus());

  React.useEffect(() => {
    const createBuffers = async () => {
      // wait for raw audio to load before executing
      if (!Object.keys(audioRawFiles).length) return;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name;
        const raw = audioRawFiles[file.name];
        const audioId = `user_${userId}_project_${projectId}_section_${sectionNumber}_file_${fileName}`;
        let audio = document.getElementById(audioId);
        if (!audio) {
          audio = document.createElement("audio");
          audio.setAttribute("id", audioId);
        }
        await acPlusRef.current.createAudioBuffers(raw, audio, fileName);
        setDisabled(false);
      }
    };
    createBuffers();
  }, [userId, projectId, sectionNumber, files, audioRawFiles]);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const playSection = async () => {
    await acPlusRef.current.playNSongs(files.map((x) => x.name));
    setIsPlaying(acPlusRef.current.isPlaying);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Player
            title={`Section ${sectionNumber}`}
            isPlaying={isPlaying}
            playOnClick={playSection}
            setPlayback={setPlayback}
            disabled={disabled}
            duration={sectionDuration}
          />
        </Grid>
        {files && files.length
          ? files.map((file) => (
              <Grid key={file.id} item xs={6} md={8}>
                <FileCard file={file} />
              </Grid>
            ))
          : null}
      </Grid>
    </Box>
  );
}

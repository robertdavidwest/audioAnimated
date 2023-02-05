import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LoopIcon from "@mui/icons-material/Loop";
import MicIcon from "@mui/icons-material/Mic";

import { styled } from "@mui/material/styles";
const TinyText = styled(Typography)({
  fontSize: "1.0rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

function formatDuration(value) {
  const minute = Math.floor(value / 60);
  const secondLeft = value - minute * 60;
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}

export default function Player({
  title,
  currentTime,
  duration,
  playOnClick,
  restartOnClick,
  isPlaying,
  disabled,
  toggleLoop,
  loop,
  record,
}) {
  return (
    <Card
      sx={{
        minWidth: 210,
        minHeight: 180,
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          {title ? (
            <Typography component="div" variant="h5">
              {title}
            </Typography>
          ) : null}
        </CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "25px",
              border: "1px solid grey",
              paddingRight: "15px",
              margin: "5px",
            }}
          >
            <IconButton
              aria-label="play/pause"
              onClick={playOnClick}
              disabled={disabled}
            >
              {isPlaying ? (
                record ? (
                  <MicIcon sx={{ height: 38, width: 38, color: "red" }} />
                ) : (
                  <PauseIcon sx={{ height: 38, width: 38 }} />
                )
              ) : record ? (
                <MicIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <TinyText>{formatDuration(Math.round(currentTime))}</TinyText>
            <TinyText>{"/" + formatDuration(Math.round(duration))}</TinyText>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="restart" onClick={restartOnClick}>
              <RestartAltIcon />
            </IconButton>
            <IconButton aria-label="loop" onClick={toggleLoop}>
              {loop ? <LoopIcon sx={{ color: "lightgreen" }} /> : <LoopIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

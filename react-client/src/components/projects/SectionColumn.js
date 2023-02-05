import * as React from "react";
import { Box } from "@mui/material";

import { SectionButtons } from "./SectionButtons";
import MultiFilePlayer from "./MultiFilePlayer";
import { ToggleAssignFileForm } from "./ToggleAssignFileForm";

export default function SectionColumn({
  singleSection,
  section,
  files,
  sectionNumber,
  sectionId,
  assignSectionFormActive,
  setAssignSectionFormActive,
  togglePreviewOnClick,
  handleDeleteSection,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
      <SectionButtons
        singleSection={singleSection}
        togglePreviewOnClick={togglePreviewOnClick}
        previewTitle={"Exit Preview"}
        handleDeleteSection={handleDeleteSection}
        sectionId={sectionId}
      />
      <MultiFilePlayer
        title={`Section ${sectionNumber}`}
        files={files}
        sectionNumber={sectionNumber}
        inSection={true}
        renderGraphics={false}
      />
      <ToggleAssignFileForm
        section={section}
        sectionId={sectionId}
        assignSectionFormActive={assignSectionFormActive}
        setAssignSectionFormActive={setAssignSectionFormActive}
      />
    </Box>
  );
}

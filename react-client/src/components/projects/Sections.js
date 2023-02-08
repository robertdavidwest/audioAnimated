import * as React from "react";
import { useDispatch } from "react-redux";

import { Box } from "@mui/material";

import SectionColumn from "./SectionColumn";
import SingleSectionView from "./SingleSectionView";
import AddNewSection from "./AddNewSection";

import { deleteSectionAsync } from "../../features";

import {GPU} from "./GPU/GPU"
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close"

export default function Sections({ sections, userId, projectId }) {
  const [singleSection, setSingleSection] = React.useState(false);
  const [singleSectionRender, setSingleSectionRender] = React.useState(false);
  const [selectedSectionId, setSelectedSectionId] = React.useState(1);
  const [selectedSection, setSelectedSection] = React.useState({});
  const [assignSectionFormActive, setAssignSectionFormActive] =
    React.useState(false);

  React.useEffect(() => {
    if (singleSection) {
      setSelectedSection(sections.filter((x) => x.id === selectedSectionId)[0]);
    } else {
      setSelectedSection({});
    }
  }, [sections, singleSection, selectedSectionId, setSelectedSection]);

  React.useEffect(() => {
    if (singleSection & (Object.keys(selectedSection).length > 0)) {
      setSingleSectionRender(true);
    } else {
      setSingleSectionRender(false);
    }
  }, [singleSection, selectedSection]);

  const dispatch = useDispatch();
  const handleDeleteSection = (sectionId) => {
    dispatch(deleteSectionAsync(sectionId));
    // if you delete the section on the single section page
    // then move back to multi section
    if (singleSection) setSingleSection(false);
  };

  const togglePreviewOnClick = (singleSection, sectionId) => {
    if (singleSection) {
      setSingleSection(false);
    } else {
      setSelectedSectionId(sectionId);
      setSingleSection(true);
    }
  };

  const [canvasInitialized,setCanvasInitialized] = React.useState(false)
  const [playAllGPUconfig,setPlayAllGPUconfig] = React.useState({})
  const playAllCanvasRef = React.useRef()
  const acRefs = React.useRef(Array(25).fill(null))
  GPU({
    GPUconfig:playAllGPUconfig,
    gpuDivRef:playAllCanvasRef.current,
    canvasInitialized,
    setCanvasInitialized
  })

  return ([
    <div
      key="playAllCanvas"
      id="playAllCanvas"
      ref={playAllCanvasRef}
      style={{position:"relative",left:"max(14vw,155px)"}}
      className="hidden"
    >
      <IconButton 
        sx={{position:"absolute",left:"0",color:"blue",backgroundColor:"white", 
            "&:hover": { color: "white", backgroundColor:"rgb(50,50,100)" }}}
        onClick={(ev)=>{playAllCanvasRef.current&& playAllCanvasRef.current.classList.add("hidden")}}
      >
        <CloseIcon />
      </IconButton>
    </div>,

    <div key="sectionContainer">
      {singleSectionRender ? (
        <SingleSectionView
          singleSection={singleSection}
          section={selectedSection}
          userId={userId}
          projectId={projectId}
          files={selectedSection.files}
          sectionNumber={selectedSection.sectionNumber}
          sectionId={selectedSection.id}
          assignSectionFormActive={assignSectionFormActive}
          setAssignSectionFormActive={setAssignSectionFormActive}
          setSelectedSectionId={setSelectedSectionId}
          togglePreviewOnClick={togglePreviewOnClick}
          handleDeleteSection={handleDeleteSection}
        />
      ) : (
        <MultiSectionView
          singleSection={singleSection}
          sections={sections}
          projectId={projectId}
          assignSectionFormActive={assignSectionFormActive}
          setAssignSectionFormActive={setAssignSectionFormActive}
          togglePreviewOnClick={togglePreviewOnClick}
          handleDeleteSection={handleDeleteSection}
          playAllCanvasRef={playAllCanvasRef}
          acRefs={acRefs}
          setPlayAllGPUconfig={setPlayAllGPUconfig}
        />
      )}
    </div>
  ]);
}

function MultiSectionView({
  singleSection,
  sections,
  projectId,
  assignSectionFormActive,
  setAssignSectionFormActive,
  togglePreviewOnClick,
  handleDeleteSection,
  playAllCanvasRef,
  acRefs,
  setPlayAllGPUconfig
}) {
  return (
    <Box
      sx={{
        marginLeft: "max(14vw,152px)",
        display: "flex",
        flexDirection: "row",
        gap: "1vw",
      }}
    >
      {sections && sections.length
        ? sections.map((section) => (
            <Box key={section.id} sx={{ flex: "1 0 10%" }}>
              <SectionColumn
                singleSection={singleSection}
                section={section}
                files={section.files}
                sectionNumber={section.sectionNumber}
                sectionId={section.id}
                assignSectionFormActive={assignSectionFormActive}
                setAssignSectionFormActive={setAssignSectionFormActive}
                togglePreviewOnClick={togglePreviewOnClick}
                handleDeleteSection={handleDeleteSection}
                playAllCanvasRef={playAllCanvasRef}
                acRefs={acRefs}
                setPlayAllGPUconfig={setPlayAllGPUconfig}
              />
            </Box>
          ))
        : null}
      <Box sx={{ flex: "1 0 10%" }}>
        <AddNewSection projectId={projectId} />
      </Box>
    </Box>
  );
}

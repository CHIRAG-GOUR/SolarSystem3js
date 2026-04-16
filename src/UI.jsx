import { useEffect, useRef, useState } from "react";
import useStore from "./stores/useStore";
import { EyeIcon, PlanetIcon, SpeakerIcon, TapeIcon } from "./Icons";
import LogoMark from "./LogoMark";
import { ViewSettings, AudioSettings } from "./SettingsPanels";

export default function UI(props) {
  const { setAudioMixerSnapshot, muted, setMuted, muteAll, restoreSnapshot } = useStore();
  const { experienceStarted, setExperienceStarted } = useStore();
  const { setTargetVolume } = useStore();
  const settingsUIRef = useRef(null);
  const [currentSettingsPanel, setCurrentSettingsPanel] = useState(null);

  const startExperience = () => {
    setTargetVolume(1);
    setExperienceStarted(true);
  };

  const handleMenuClick = panel => {
    if (currentSettingsPanel === panel) {
      setCurrentSettingsPanel(null);
    } else {
      setCurrentSettingsPanel(panel);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        setCurrentSettingsPanel(null);
      }
    });

    function handleClickOutside(event) {
      if (settingsUIRef.current && !settingsUIRef.current.contains(event.target)) {
        setCurrentSettingsPanel(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mute = () => {
    setAudioMixerSnapshot();
    setMuted(true);
    muteAll();
  };

  const unmute = () => {
    restoreSnapshot();
    setMuted(false);
  };

  const handleMuteUnmute = () => {
    muted ? unmute() : mute();
  };

  return (
    <div className='z-30'>
    </div>
  );
}

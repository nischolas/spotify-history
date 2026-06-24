import { useEffect } from "react";
import { FileUpload } from "@/components/FileUpload";
import { FAQ } from "@/components/FAQ";
import { TopTracks } from "@/components/TopTracks";
import { TopTracksByYear } from "@/components/TopTracksByYear";
import { TopArtists } from "@/components/TopArtists";
import { SkippedTracks } from "@/components/SkippedTracks";
import { DateRangeFilter } from "@/components/DateRangeFilter";
import { ReasonStartTracks } from "@/components/ReasonStartTracks";
import { Footer } from "@/components/Footer";
import { useSpotifyStore } from "@/store/useSpotifyStore";
import { useTranslation } from "react-i18next";
import { GeneralStats } from "@/components/GeneralStats";
import { PlatformStats } from "@/components/PlatformStats";
import { OneHitWonders } from "@/components/OneHitWonders";
import { CompanionTracks } from "@/components/CompanionTracks";
import { PreviewPlayerDrawer } from "@/components/PreviewPlayerDrawer";
import { usePreviewPlayer } from "@/hooks/usePreviewPlayer.ts";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { Features } from "./components/Features";
import { SampleDataButton } from "@/components/SampleDataButton";

import { useJoyride } from "react-joyride";
import { BsFillRocketTakeoffFill } from "react-icons/bs";

function App() {
  const { isDataLoaded, reset, initialize } = useSpotifyStore();
  const { trackUri, trackName, artistName, closePlayer } = usePreviewPlayer();
  const { t } = useTranslation();

  const steps = [
    { content: "Allgemeine Infos über deinen Datensatz", target: '[data-step="generalstats"]' },
    { content: "Ziehe den Slider um den Zeitraum einzugrenzen", target: '[data-step="daterangefilter"]' },
    { content: "Sortiere nach addierter Zeit oder Anzahl der Wiedergaben", target: '[data-step="toptracks-sortby"]' },
    { content: "Klicke für eine erweiterte Liste", target: '[data-step="toptracks-showmore"]' },
    { content: "Klick auf einen Track für mehr Details", target: ".table-container tr:nth-child(3)" },
  ];

  const { controls, on, Tour } = useJoyride({
    continuous: true,
    steps,
    options: {
      skipBeacon: true,
      scrollOffset: 200,
    },
  });

  useEffect(() => {
    return on("tour:end", () => {
      console.log("Tour finished!");
    });
  }, [on]);

  useEffect(() => {
    document.title = t("app.title");
  }, [t]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [isDataLoaded]);

  return (
    <div className={`app-container${isDataLoaded ? " has-data" : ""}`}>
      {Tour}
      <main>
        {!isDataLoaded ? (
          <>
            <header className="app-header">
              <div>
                <h1>{t("app.title")}</h1>
                <p className="subtitle">{t("app.subtitle")}</p>
                <div className="tutorial-section">
                  <h3>{t("fileImport.tutorialTitle")}</h3>
                  <ol>
                    <li>
                      {t("fileImport.tutorialStep1")}{" "}
                      <a href="https://www.spotify.com/account/privacy" target="_blank" rel="noopener noreferrer">
                        {t("fileImport.tutorialStep1Link")}
                      </a>
                    </li>
                    <li>
                      {t("fileImport.tutorialStep2")} <strong>{t("fileImport.tutorialStep2Bold")}</strong> <br /> {t("fileImport.tutorialStep2End")}
                    </li>
                    <li>{t("fileImport.tutorialStep3")}</li>
                    <li>{t("fileImport.tutorialStep4")}</li>
                  </ol>
                  <h3>{t("fileImport.sampleDataTitle")}</h3>
                  <SampleDataButton />
                </div>
              </div>
              <div className="upload-section">
                <FileUpload />
              </div>
            </header>
            <FAQ />
            <Features />
          </>
        ) : (
          <>
            <div className="data-section">
              <div className="actions">
                <h1>{t("app.title")}</h1>
                <div className="actions-btns">
                  <button onClick={() => controls.start()} className="reset-btn tour-btn">
                    <BsFillRocketTakeoffFill />
                    Kurze Einführung
                  </button>
                  <button onClick={reset} className="reset-btn">
                    <HiArrowsRightLeft /> {t("app.importDifferent")}
                  </button>
                </div>
              </div>
              <div className="sections">
                <GeneralStats />
                <DateRangeFilter />
                <PlatformStats />
                <TopTracks />
                <TopArtists />
                <TopTracksByYear />
                <CompanionTracks />
                <ReasonStartTracks reason_start="clickrow" />
                <ReasonStartTracks reason_start="backbtn" />
                <OneHitWonders />
                <SkippedTracks />
              </div>
            </div>
            <FAQ />
          </>
        )}
      </main>

      <PreviewPlayerDrawer trackUri={trackUri} trackName={trackName} artistName={artistName} onClose={closePlayer} />
      <Footer />
    </div>
  );
}

export default App;

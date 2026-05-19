import { useTranslation } from "react-i18next";

import { CUTOFF } from "./SkippedTracks";

export const Features = () => {
  const { t } = useTranslation();
  return (
    <div className="features">
      <h2>{t("features.title")}</h2>
      <p className="features-subtitle">{t("features.subtitle")}</p>
      <div className="features-grid">
        <div className="feature-card">
          <h4>{t("topTracks.title")}</h4>
          <p>
            {t("topTracks.subtitle")} {t("topTracks.sortByTime")} {t("general.and")} {t("topTracks.sortByCount")}
          </p>
        </div>
        <div className="feature-card">
          <h4>{t("topTracksByYear.title")}</h4>
          <p>{t("topTracksByYear.subtitle")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("topArtists.title")}</h4>
          <p>{t("topArtists.subtitle")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("skippedTracks.title")}</h4>
          <p>{t("skippedTracks.subtitle", { seconds: CUTOFF / 1000 })}</p>
        </div>
        <div className="feature-card">
          <h4>{t("reasonStartTracks.title.clickrow")}</h4>
          <p>{t("reasonStartTracks.subtitle.clickrow")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("reasonStartTracks.title.backbtn")}</h4>
          <p>{t("reasonStartTracks.subtitle.backbtn")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("companionTracks.title")}</h4>
          <p>{t("companionTracks.subtitle")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("oneHitWonders.title")}</h4>
          <p>{t("oneHitWonders.subtitle")}</p>
        </div>
      </div>
      <div className="features-grid features-grid--extras">
        <div className="feature-card">
          <h4>{t("features.extras.dateRange.title")}</h4>
          <p>{t("features.extras.dateRange.subtitle")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("features.extras.generalStats.title")}</h4>
          <p>{t("features.extras.generalStats.subtitle")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("features.extras.platforms.title")}</h4>
          <p>{t("features.extras.platforms.subtitle")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("features.extras.searchByArtist.title")}</h4>
          <p>{t("features.extras.searchByArtist.subtitle")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("features.extras.trackStats.title")}</h4>
          <p>{t("features.extras.trackStats.subtitle")}</p>
        </div>
        <div className="feature-card">
          <h4>{t("features.extras.previewPlayer.title")}</h4>
          <p>{t("features.extras.previewPlayer.subtitle")}</p>
        </div>
      </div>
    </div>
  );
};

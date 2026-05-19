import { useSpotifyStore } from "@/store/useSpotifyStore";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "@/components/Modal";
import { usePreviewPlayer } from "@/hooks/usePreviewPlayer";
import { RiMenuFill } from "react-icons/ri";

interface CompanionTracksProps {
  limit?: number;
  isModal?: boolean;
}

function monthsBetween(yyyyMm: string, to: Date): number {
  const [y, m] = yyyyMm.split("-").map(Number);
  return Math.max(1, (to.getFullYear() - y) * 12 + (to.getMonth() - (m - 1)));
}

const MIN_ACTIVE_MONTHS = 3;

export const CompanionTracks: React.FC<CompanionTracksProps> = ({ limit = 10, isModal = false }) => {
  const { filteredRawData } = useSpotifyStore();
  const { t } = useTranslation();
  const { openPlayer } = usePreviewPlayer();
  const [showMoreModal, setShowMoreModal] = useState(false);

  const companions = useMemo(() => {
    const today = new Date();
    const trackMap = new Map<
      string,
      {
        trackName: string;
        artistName: string;
        uri: string;
        months: Set<string>;
      }
    >();

    for (const item of filteredRawData) {
      if (!item.spotify_track_uri) continue;
      const month = item.ts.slice(0, 7);
      const existing = trackMap.get(item.spotify_track_uri);
      if (existing) {
        existing.months.add(month);
      } else {
        trackMap.set(item.spotify_track_uri, {
          trackName: item.master_metadata_track_name || t("companionTracks.unknownTrack"),
          artistName: item.master_metadata_album_artist_name || t("companionTracks.unknownArtist"),
          uri: item.spotify_track_uri,
          months: new Set([month]),
        });
      }
    }

    return Array.from(trackMap.values())
      .filter((track) => track.months.size >= MIN_ACTIVE_MONTHS)
      .map((track) => {
        const sortedMonths = Array.from(track.months).sort();
        const firstMonth = sortedMonths[0];
        const activeMonths = track.months.size;
        const lifespan = monthsBetween(firstMonth, today);
        const pct = Math.round((activeMonths / lifespan) * 100);
        return { ...track, activeMonths, lifespan, pct };
      })
      .sort((a, b) => b.activeMonths * b.pct - a.activeMonths * a.pct)
      .slice(0, limit);
  }, [filteredRawData, t, limit]);

  return (
    <>
      <div className="table-container companion-tracks">
        <div className="header-row">
          <div className="title">
            <h3>{t("companionTracks.title")}</h3>
            <p>{t("companionTracks.subtitle")}</p>
          </div>
          {!isModal && (
            <button className="reset-btn" onClick={() => setShowMoreModal(true)}>
              <RiMenuFill /> {t("common.showMore")}
            </button>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t("table.headerTitle")}</th>
              <th>{t("table.headerArtist")}</th>
              <th style={{ textAlign: "right" }}>{t("companionTracks.headerScore")}</th>
            </tr>
          </thead>
          <tbody>
            {companions.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <em>{t("companionTracks.noData")}</em>
                </td>
              </tr>
            ) : (
              companions.map((track, index) => (
                <tr
                  key={index}
                  onClick={() => openPlayer(track.uri, track.trackName, track.artistName)}
                  style={{ cursor: "pointer" }}
                  title={t("table.statsAndPreview")}
                >
                  <td>{index + 1}</td>
                  <td>{track.trackName}</td>
                  <td>{track.artistName}</td>
                  <td className="monospace" style={{ textAlign: "right" }}>
                    {track.pct}
                    <span className="muted">
                      % ({track.activeMonths}/{track.lifespan}
                      {t("companionTracks.monthsUnit")})
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showMoreModal} onClose={() => setShowMoreModal(false)}>
        <CompanionTracks limit={100} isModal={true} />
      </Modal>
    </>
  );
};

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpotifyStore } from "@/store/useSpotifyStore";
import { parseSpotifyZip } from "@/utils/parseSpotifyData";

export const SampleDataButton: React.FC = () => {
  const { t } = useTranslation();
  const { loadData, setLoading, isLoading: busy } = useSpotifyStore();
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (busy) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/sample.zip");
      if (!res.ok) throw new Error(`Failed to fetch sample.zip: ${res.status}`);
      const blob = await res.blob();
      const { items } = await parseSpotifyZip(blob);
      if (items.length === 0) {
        setError(t("fileImport.errorSampleFetch"));
        setLoading(false);
        return;
      }
      loadData(items);
    } catch (err) {
      console.error(err);
      setError(t("fileImport.errorSampleFetch"));
      setLoading(false);
    }
  };

  return (
    <div className="sample">
      <button type="button" disabled={busy} onClick={handleClick}>
        {busy ? t("fileImport.processing") : t("fileImport.sampleDataDescription")}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

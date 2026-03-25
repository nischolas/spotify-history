import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "@/components/Modal";
import { PrivacyText } from "@/components/PrivacyText";

export const Footer: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [showMoreModal, setShowMoreModal] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <footer className="app-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-brand-title">{t("app.title")}</h3>
            <p className="footer-not-affiliated">
              {t("footer.notAffiliated")} {t("footer.by")}{" "}
              <a href="https://nicholas-mathi.eu" target="_blank" rel="noopener noreferrer">
                Nicholas Mathieu
              </a>
            </p>
            <div className="footer-links">
              <a href="https://nicholas-mathi.eu/impressum" target="_blank" rel="noopener noreferrer">
                {t("footer.legal")}
              </a>
              <a
                onClick={() => {
                  window.umami?.track("Open Modal in Footer");
                  setShowMoreModal(true);
                }}
              >
                {t("privacy.title")}
              </a>
              <a href="https://github.com/nischolas/antigravity-spotify" target="_blank" rel="noopener noreferrer">
                Source
              </a>
            </div>
          </div>

          <div className="language-selector">
            <button className={`lang-btn ${i18n.language === "en" ? "active" : ""}`} onClick={() => changeLanguage("en")} aria-label="Switch to English">
              🇬🇧 English
            </button>
            <button className={`lang-btn ${i18n.language === "de" ? "active" : ""}`} onClick={() => changeLanguage("de")} aria-label="Zu Deutsch wechseln">
              🇩🇪 Deutsch
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t("footer.privacy")}</p>
        </div>
      </footer>
      <Modal isOpen={showMoreModal} onClose={() => setShowMoreModal(false)}>
        <PrivacyText />
      </Modal>
    </>
  );
};

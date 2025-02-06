import {useState, useEffect, useContext} from "react";
import Cookies from "js-cookie";
import "./RateLimitOverlay.css";
import {WarningCircle} from "@phosphor-icons/react";
import {LanguageContext} from "../../contexts/LanguageContext";
import {RecentContext} from "../../contexts/RecentContext";

function RateLimitOverlay() {
  const [remainingTime, setRemainingTime] = useState(null);
  const {language} = useContext(LanguageContext);
  const {rateLimitActive} = useContext(RecentContext);

  useEffect(() => {
    const checkRateLimit = () => {
      const expiresAt = Number(Cookies.get("rate_limit_expires"));

      if (expiresAt && !isNaN(expiresAt)) {
        const timeLeft = Math.max(0, Math.ceil((expiresAt - Date.now()) / 60000));
        setRemainingTime(timeLeft > 0 ? timeLeft : null);
      } else {
        setRemainingTime(null);
      }
    };

    checkRateLimit();

    const interval = setInterval(checkRateLimit, 60 * 1000);

    return () => clearInterval(interval);
  }, [rateLimitActive]);

  if (!rateLimitActive || remainingTime === null) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <p className="rateLimit--heading">
          <WarningCircle size={32} />
          <span>{language.code === "de" ? "Anfragelimit überschritten." : "Rate limit exceeded."}</span>
        </p>
        <p className="rateLimit--body">
          {language.code === "de"
            ? `Zu viele Anfragen von dieser IP-Adresse. Bitte warte ${remainingTime} Minute${remainingTime > 1 ? "n" : ""}.`
            : `Too many requests from this IP address. Please wait ${remainingTime} minute${remainingTime > 1 ? "s" : ""}.`}
        </p>
      </div>
    </div>
  );
}

export default RateLimitOverlay;

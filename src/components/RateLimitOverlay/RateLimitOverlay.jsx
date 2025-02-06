import {useState, useEffect, useContext} from "react";
import Cookies from "js-cookie";
import "./RateLimitOverlay.css";
import {WarningCircle} from "@phosphor-icons/react";
import {LanguageContext} from "../../contexts/LanguageContext";

function RateLimitOverlay() {
  const [remainingTime, setRemainingTime] = useState(null);
  const {language} = useContext(LanguageContext);

  useEffect(() => {
    const checkRateLimit = () => {
      const expiresAt = Cookies.get("rate_limit_expires");
      if (expiresAt) {
        const timeLeft = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
        setRemainingTime(timeLeft > 0 ? timeLeft : null);
      }
    };

    checkRateLimit();
    const interval = setInterval(checkRateLimit, 1000);

    return () => clearInterval(interval);
  }, []);

  if (remainingTime === null) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <p className="rateLimit--heading">
          <WarningCircle size={32} />
          <span>{language.code === "de" ? "Anfragelimit überschritten." : "Rate limit exceeded."}</span>
        </p>
        <p className="rateLimit--body">
          {" "}
          {language.code === "de"
            ? `Zu viele Anfragen von dieser IP-Adresse. Bitte warte ${Math.ceil(remainingTime / 60)} Minute${Math.ceil(remainingTime / 60) > 1 ? "n" : ""}.`
            : `Too many requests from this IP address. Please wait ${Math.ceil(remainingTime / 60)} minute${Math.ceil(remainingTime / 60) > 1 ? "s" : ""}.`}
        </p>
      </div>
    </div>
  );
}

export default RateLimitOverlay;

import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppSettings } from "../../config/app-settings";

interface ExtraErrorProps {
  code?: number | string;          // error code (default: 404)
  message?: string;                // error title
  description?: string;            // detailed description
  redirectPath?: string;           // link to navigate
  redirectLabel?: string;          // button text
}

function ExtraError({
  code = 404,
  message = "We couldn't find it...",
  description = "The page you're looking for doesn't exist.",
  redirectPath = "/",
  redirectLabel = "Go Home",
}: ExtraErrorProps) {
  const context = useContext(AppSettings);

  useEffect(() => {
    context?.handleSetAppSidebarNone(true);
    context?.handleSetAppHeaderNone(true);
    context?.handleSetAppContentClass("p-0");

    return () => {
      context?.handleSetAppSidebarNone(false);
      context?.handleSetAppHeaderNone(false);
      context?.handleSetAppContentClass("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="error h-auto w-auto">
      <div className="error-code">{code}</div>
      <div className="error-content">
        <div className="error-message">{message}</div>
        {description && <div className="error-desc mb-4">{description}</div>}
        {redirectPath && (
          <div>
            <Link to={redirectPath} className="btn btn-success px-3">
              {redirectLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExtraError;

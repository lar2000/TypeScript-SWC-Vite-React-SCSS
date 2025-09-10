// src/components/panel/Panel.tsx
import React, { useState } from "react";
import { slideToggle } from "../../composables/slideToggle";

// =======================
// Context Type
// =======================
interface PanelContextProps {
  expand: boolean;
  reload: boolean;
  remove: boolean;
  toggleExpand: () => void;
  toggleReload: () => void;
  toggleRemove: () => void;
  toggleCollapse: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PanelStat = React.createContext<PanelContextProps | undefined>(undefined);

// =======================
// Panel
// =======================
interface PanelProps {
  theme?: string;
  className?: string;
  children?: React.ReactNode;
}

function Panel({
  theme = "inverse",
  className = "",
  children,
}: PanelProps): React.ReactElement | null {
  const [expand, setExpand] = useState(false);
  const [reload, setReload] = useState(false);
  const [remove, setRemove] = useState(false);

  const toggleExpand = () => setExpand(!expand);

  const toggleRemove = () => setRemove(!remove);

  const toggleCollapse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget.closest(".panel")?.querySelector(".panel-body");
    if (el instanceof HTMLElement) {
      slideToggle(el);
    }
  };

  const toggleReload = () => {
    if (!reload) {
      setReload(true);
      setTimeout(() => setReload(false), 2000);
    }
  };

  const panelState: PanelContextProps = {
    expand,
    reload,
    remove,
    toggleExpand,
    toggleReload,
    toggleRemove,
    toggleCollapse,
  };

  return (
    <PanelStat.Provider value={panelState}>
      {!remove && (
        <div
          className={`panel panel-${theme} ${expand ? "panel-expand" : ""} ${
            reload ? "panel-loading" : ""
          } ${className}`}
        >
          {children}
        </div>
      )}
    </PanelStat.Provider>
  );
}

// =======================
// PanelHeader
// =======================
interface PanelHeaderProps {
  className?: string;
  noButton?: boolean;
  children?: React.ReactNode;
}

function PanelHeader({
  className = "",
  noButton = false,
  children,
}: PanelHeaderProps): React.ReactElement {
  return (
    <div className={`panel-heading ${className}`}>
      <h4 className="panel-title">{children}</h4>
      {!noButton && (
        <PanelStat.Consumer>
          {(ctx) =>
            ctx && (
              <div className="panel-heading-btn">
                <button
                  className="btn btn-xs btn-icon btn-circle btn-default"
                  onClick={ctx.toggleExpand}
                >
                  <i className="fa fa-expand"></i>
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-xs btn-icon btn-circle btn-success"
                  onClick={ctx.toggleReload}
                >
                  <i className="fa fa-redo"></i>
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-xs btn-icon btn-circle btn-warning"
                  onClick={ctx.toggleCollapse}
                >
                  <i className="fa fa-minus"></i>
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-xs btn-icon btn-circle btn-danger"
                  onClick={ctx.toggleRemove}
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
            )
          }
        </PanelStat.Consumer>
      )}
    </div>
  );
}

// =======================
// PanelBody
// =======================
interface PanelBodyProps {
  className?: string;
  children?: React.ReactNode;
}

function PanelBody({
  className = "",
  children,
}: PanelBodyProps): React.ReactElement {
  return (
    <PanelStat.Consumer>
      {(ctx) => (
        <div className={`panel-body ${className}`}>
          {children}
          {ctx?.reload && (
            <div className="panel-loader">
              <span className="spinner spinner-sm"></span>
            </div>
          )}
        </div>
      )}
    </PanelStat.Consumer>
  );
}

// =======================
// PanelFooter
// =======================
interface PanelFooterProps {
  className?: string;
  children?: React.ReactNode;
}

function PanelFooter({
  className = "",
  children,
}: PanelFooterProps): React.ReactElement {
  return <div className={`panel-footer ${className}`}>{children}</div>;
}

export { Panel, PanelHeader, PanelBody, PanelFooter };

"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";

interface IframeProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
}

const Iframe: React.FC<IframeProps> = ({
  children,
  className,
  style,
  width = "100%",
  height = "540px",
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // Reference to container div
  const rootRef = useRef<Root | null>(null); // Reference to the React root
  const { theme } = useTheme();

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Inject the Inter font from Google Fonts
    const injectFont = () => {
      const fontLink = doc.createElement("link");
      fontLink.rel = "stylesheet";
      fontLink.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
      doc.head.appendChild(fontLink);
    };

    // Inject global styles (including Inter font)
    const injectGlobalStyles = () => {
      const globalStyle = doc.createElement("style");
      globalStyle.textContent = `
        * {
          font-family: 'Inter', sans-serif !important;
        }
      `;
      doc.head.appendChild(globalStyle);
    };

    // Center content with flexbox
    const injectCenterStyles = () => {
      const centerStyle = doc.createElement("style");
      centerStyle.textContent = `
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
      `;
      doc.head.appendChild(centerStyle);
    };

    // Sync the theme with the iframe's body
    const applyTheme = () => {
      doc.body.className = cn("bg-background", theme);
    };

    // Inject styles from the parent document
    const injectParentStyles = () => {
      const styleSheets = Array.from(document.styleSheets) as CSSStyleSheet[];
      styleSheets.forEach((sheet) => {
        const styleElement = doc.createElement("style");
        if (sheet.href) {
          fetch(sheet.href)
            .then((res) => res.text())
            .then((cssText) => {
              styleElement.textContent = cssText;
              doc.head.appendChild(styleElement);
            })
            .catch((err) => console.error("Failed to fetch stylesheet", err));
        } else {
          try {
            Array.from(sheet.cssRules).forEach((rule: CSSRule) => {
              styleElement.textContent += rule.cssText;
            });
          } catch (err) {
            console.error("Failed to read inline styles", err);
          }
          doc.head.appendChild(styleElement);
        }
      });
    };

    // Render content inside iframe
    const renderContent = () => {
      if (!containerRef.current) {
        containerRef.current = doc.createElement("div");
        doc.body.appendChild(containerRef.current);
      }
      if (!rootRef.current) {
        rootRef.current = createRoot(containerRef.current);
      }
      //@ts-ignore
      rootRef.current.render(children);
    };

    // Inject and render
    injectFont();
    injectGlobalStyles();
    injectCenterStyles();
    applyTheme();
    injectParentStyles();
    renderContent();

    // Cleanup on unmount
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
      if (containerRef.current) {
        containerRef.current.remove();
        containerRef.current = null;
      }
    };
  }, [children, theme]);

  return (
    <iframe
      ref={iframeRef}
      className={cn("rounded-lg border p-8", className)}
      style={style}
      width={width}
      height={height}
    />
  );
};

export default Iframe;

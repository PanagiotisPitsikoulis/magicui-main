"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface IframeProps {
  children: React.ReactNode; // Content to render inside the iframe
  className?: string; // Additional className for iframe customization
  style?: React.CSSProperties; // Inline styles for the iframe
  width?: string | number; // Width of the iframe
  height?: string | number; // Height of the iframe
}

const Iframe: React.FC<IframeProps> = ({
  children,
  className,
  style,
  width = "100%", // Default to full width
  height = "540px", // Default to 540px height
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // Store the container reference
  const { theme } = useTheme(); // Access the current theme using next-themes

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Inject global styles, including font family
    const injectGlobalStyles = () => {
      const globalStyle = doc.createElement("style");
      globalStyle.textContent = `
        * {
          font-family: 'Arial', 'Helvetica', sans-serif !important;
        }
      `;
      doc.head.appendChild(globalStyle);
    };

    // Center content using flexbox
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
      doc.body.className = cn("bg-background", theme); // Update body class with theme
    };

    // Inject external and inline styles from the parent document
    const injectParentStyles = () => {
      const styleSheets = Array.from(document.styleSheets) as CSSStyleSheet[];
      styleSheets.forEach((sheet) => {
        const styleElement = doc.createElement("style");
        if (sheet.href) {
          // Handle external stylesheets
          fetch(sheet.href)
            .then((res) => res.text())
            .then((cssText) => {
              styleElement.textContent = cssText;
              doc.head.appendChild(styleElement);
            })
            .catch((err) => console.error("Failed to fetch stylesheet", err));
        } else {
          // Handle inline stylesheets
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

    // Render React children inside the iframe
    const renderContent = () => {
      // Create or reuse the container
      if (!containerRef.current) {
        containerRef.current = doc.createElement("div");
        doc.body.appendChild(containerRef.current);
      }

      // Render children into the container
      if (children) {
        //@ts-ignore
        ReactDOM.render(children, containerRef.current);
      }
    };

    // Cleanup function to unmount children
    const cleanupContent = () => {
      if (containerRef.current) {
        ReactDOM.unmountComponentAtNode(containerRef.current);
      }
    };

    // Execute all injections
    injectGlobalStyles();
    injectCenterStyles();
    applyTheme();
    injectParentStyles();
    renderContent();

    // Cleanup on unmount or dependency change
    return () => {
      cleanupContent();
    };
  }, [children, theme]); // Rerun effect on theme or children changes

  return (
    <iframe
      ref={iframeRef}
      className={cn("rounded-lg border border-content3", className)}
      style={style}
      width={width}
      height={height}
    />
  );
};

export default Iframe;

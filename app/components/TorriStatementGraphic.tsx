"use client";

import type { SVGProps } from "react";
import { useEffect, useRef, useState } from "react";

const TORRI_PATH =
  "M623.501 322.896C556.075 309.973 448.114 389.759 435.827 340.314C435.827 340.314 413.464 273.566 418.775 259.632C428.02 235.373 445.742 254.15 400.221 265.285C349.489 277.693 305.925 270.164 294.391 251.106C282.852 232.046 284.359 142.773 298.904 135.247C313.447 127.726 326.806 128.514 337.609 107.452C337.609 107.452 348.201 83.7684 351.025 62.3907C354.78 33.96 369.504 -2.28459 400.301 1.82092C431.099 5.92818 438.801 30.0539 439.311 47.5045C439.826 64.9551 431.363 99.1409 465.793 118.267C465.793 118.267 457.974 153.064 432.641 152.731C407.365 152.399 414.675 92.6756 419.807 73.1696C424.941 53.6619 424.429 18.2464 406.464 10.5462C388.495 2.84598 374.125 16.1946 368.993 32.1058C363.859 48.0188 359.396 78.5993 368.444 88.7118C377.97 99.3578 396.197 96.2686 393.119 98.8365C390.038 101.401 372.002 99.5047 370.461 111.825C368.919 124.143 375.549 131.765 368.48 138.359C357.612 148.5 341.028 140.089 341.028 140.089C341.028 140.089 369.413 190.856 359.769 204.609C352.429 215.076 314.867 207.534 309.938 216.081C305.005 224.626 328.015 225.612 327.03 198.002C326.043 170.39 315.525 149.028 319.799 148.697C324.07 148.37 336.233 198.333 319.141 205.889C319.141 205.889 329.988 207.207 347.08 223.31C364.174 239.416 348.394 232.513 348.394 227.258C348.394 221.997 353.652 204.249 371.073 199.973C388.494 195.702 421.364 206.549 431.223 213.778C441.085 221.012 442.728 224.626 435.827 212.795C435.827 212.795 446.922 215.236 458.177 211.478C458.177 211.478 468.694 206.878 476.912 207.207C476.912 207.207 479.411 204.395 476.296 202.468C476.296 202.468 479.735 201.633 480.601 199.499C481.918 196.24 466.435 195.275 466.435 195.275C466.435 195.275 480.996 193.261 477.354 191.54C472.379 189.189 456.716 190.452 448.114 195.793C439.511 201.131 454.64 195.793 465.172 189.56C475.703 183.329 472.143 181.255 469.622 180.957C467.527 180.712 461.032 185.997 451.81 188.274C442.658 190.538 437.074 196.573 435.288 198.558C429.816 204.649 430.864 210.983 425.928 213.876C420.991 216.77 413.676 212.683 415.546 186.985C417.418 161.287 417.622 131.854 429.722 125.805C441.821 119.756 469.652 127.015 473.282 141.132C476.912 155.247 474.893 177.431 482.558 189.53C490.222 201.63 486.59 254.869 470.457 260.113C454.325 265.357 399.874 260.113 360.35 238.739C320.822 217.361 310.737 262.536 305.495 282.701C300.252 302.868 290.939 352.15 290.939 352.15C290.939 352.15 327.263 368.217 342.628 359.835C357.997 351.454 363.105 271.002 363.105 271.002C363.105 271.002 351.012 366.821 303.513 366.123C263.448 365.532 224.457 336.778 181.912 345.573C59.0175 370.979 88.592 370.056 1.50075 340.314";
const PATH_LEFT_ENDPOINT_X = 1.50075;
const PATH_LEFT_ENDPOINT_Y = 310;
const PATH_SCALE_Y = 0.9;

type TorriStatementGraphicProps = SVGProps<SVGSVGElement>;

export default function TorriStatementGraphic({
  className,
  ...props
}: TorriStatementGraphicProps) {
  const dotRef = useRef<SVGTSpanElement>(null);
  const [pathTransform, setPathTransform] = useState({ x: 0, y: 999 });

  useEffect(() => {
    const measure = () => {
      const dot = dotRef.current;
      if (!dot) return;

      const dotBox = dot.getBBox();
      const dotCenterX = dotBox.x + dotBox.width / 2;
      const dotCenterY = dotBox.y + dotBox.height / 2;

      setPathTransform({
        x: dotCenterX - PATH_LEFT_ENDPOINT_X,
        y: dotCenterY - PATH_LEFT_ENDPOINT_Y * PATH_SCALE_Y,
      });
    };

    measure();
    document.fonts?.ready.then(measure);
  }, []);

  return (
    <svg
      viewBox="0 -20 1320 390"
      role="img"
      aria-labelledby="torri-statement-title"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title id="torri-statement-title">We rise by lifting others</title>

      <text
        x="0"
        y="142"
        fill="#169D52"
        style={{
          fontFamily:
            "var(--font-runtime-inter), ui-sans-serif, system-ui, sans-serif",
          fontSize: 100,
          fontWeight: 700,
          fontStyle: "normal",
          letterSpacing: "0em",
        }}
      >
        We rise by
      </text>

      <text
        x="0"
        y="252"
        fill="#169D52"
        style={{
          fontFamily:
            "var(--font-runtime-inter), ui-sans-serif, system-ui, sans-serif",
          fontSize: 100,
          fontWeight: 700,
          fontStyle: "normal",
          letterSpacing: "0em",
        }}
      >
        lifting others
        <tspan ref={dotRef}>.</tspan>
      </text>

      <g transform={`translate(${pathTransform.x} ${pathTransform.y}) scale(1 ${PATH_SCALE_Y})`}>
        <path
          d={TORRI_PATH}
          stroke="#169D52"
          strokeWidth="3"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

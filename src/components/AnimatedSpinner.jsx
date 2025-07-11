import React from "react";
import { Div, Text } from "@vkontakte/vkui";

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 48,
};

const spinnerStyle = {
  width: 64,
  height: 64,
  borderRadius: "50%",
  background: "conic-gradient(#3f8ae0, #ff6f61, #f9d423, #3cb371, #3f8ae0)",
  animation: "spin 1s linear infinite",
  boxShadow: "0 0 12px rgba(63, 138, 224, 0.6)",
  position: "relative",
};

const innerCircleStyle = {
  position: "absolute",
  top: 8,
  left: 8,
  right: 8,
  bottom: 8,
  backgroundColor: "#fff",
  borderRadius: "50%",
};

const textStyle = {
  marginTop: 20,
  fontWeight: "bold",
  color: "#3f8ae0",
  fontSize: 17,
  animation: "pulse 1.5s ease-in-out infinite",
};

export const AnimatedSpinner = () => (
  <Div style={wrapperStyle}>
    <div style={spinnerStyle}>
      <div style={innerCircleStyle} />
    </div>
    <Text style={textStyle}>Загрузка...</Text>

    <style>{`
      @keyframes spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes pulse {
        0%   { opacity: 1; transform: scale(1); }
        50%  { opacity: 0.7; transform: scale(1.05); }
        100% { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </Div>
);


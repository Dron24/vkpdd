import React from "react";
import { Div, Text } from "@vkontakte/vkui";

const spinnerWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 40,
};

const spinnerStyle = {
  width: 60,
  height: 60,
  borderRadius: "50%",
  border: "6px solid #3f8ae0",
  borderTopColor: "#ff6f61",
  borderRightColor: "#f9d423",
  borderBottomColor: "#3cb371",
  borderLeftColor: "#3f8ae0",
  animation: "spin 1.2s linear infinite",
};

export const AnimatedSpinner = () => (
  <Div style={spinnerWrapperStyle}>
    <div style={spinnerStyle} />
    <Text style={{ marginTop: 16, fontWeight: "700", color: "#3f8ae0", fontSize: 16 }}>
      Загрузка...
    </Text>

    <style>{`
      @keyframes spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </Div>
);

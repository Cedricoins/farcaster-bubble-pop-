"use client";

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectButton() {
  return (
    <RainbowConnectButton
      accountStatus="avatar"
      showBalance={false}
      chainStatus="icon"
    />
  );
}

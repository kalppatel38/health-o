"use client";

import {
  POUCH_STATS,
  POUCHES,
} from "../../data/live-pouch-status";
import LivePouchStatusScene from "./LivePouchStatusScene";

const LivePouchStatusContainer = () => {
  return (
    <LivePouchStatusScene
      pouchStats={POUCH_STATS}
      pouches={POUCHES}
    />
  );
};

export default LivePouchStatusContainer;


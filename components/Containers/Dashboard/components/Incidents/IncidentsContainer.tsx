"use client";

import { useState } from "react";
import {
  INCIDENT_STATS,
  INCIDENTS,
} from "../../data/incidents";
import { IncidentsScene } from "./IncidentsScene";

const IncidentsContainer = () => {
  const [showReportIncident, setShowReportIncident] = useState(false);
  const [policeNotified, setPoliceNotified] = useState(false);

  return (
    <IncidentsScene
      showReportIncident={showReportIncident}
      policeNotified={policeNotified}
      setShowReportIncident={setShowReportIncident}
      setPoliceNotified={setPoliceNotified}
      incidentStats={INCIDENT_STATS}
      incidents={INCIDENTS}
    />
  );
};

export { IncidentsContainer };


export const fileMockData = {
  "filename": "Detailed User Story 2.docx",
  "raw_text_preview": "Detailed User Story: Multi-Truck Booking & Real-Time Map Tracking\nStory ID: US-201\nEpic: Fleet & Logistics Management\nPriority: High | Estimate: 13 Story Points\nUser Story Statement\nAs a Logistics Operations Manager,\nI want to book multiple trucks simultaneously under a single master order and track their individual live locations, statuses, and routes on an interactive map interface,\nSo that I can coordinate bulk consignments seamlessly, monitor transit health in real-time, and quickly resolve ... (truncated)",
  "ai_insights": {
    "executive_summary": "This document outlines User Story US-201 within the Fleet and Logistics Management epic, which details the requirements for a Multi-Truck Booking and Real-Time Map Tracking system. Designed for Logistics Operations Managers, this feature enables the simultaneous booking of up to 50 trucks under a single master order. It provides comprehensive tools to track individual vehicle routes, telematics, and transit statuses on an interactive map interface. Key functionalities include automated fleet capacity validation, master-child booking reference generation, and dynamic map rendering with marker clustering. Additionally, the system incorporates automated exception handling to trigger high-priority alerts for route deviations and unexpected delays, supported by a robust technical architecture utilizing WebSockets for real-time telemetry.",
    "key_takeaways": [
      "Implement a multi-truck booking interface supporting 1 to 50 vehicles with automated capacity checks and partial allocation warnings.",
      "Establish a master-child database relationship to link a single master booking ID to multiple individual tracking IDs.",
      "Develop an interactive map dashboard featuring marker clustering, route polylines, and real-time telematics popups.",
      "Configure automated alerts for operational exceptions, specifically route deviations greater than 5 km or stops exceeding 30 minutes.",
      "Ensure system resilience by handling edge cases such as GPS signal loss, concurrent booking collisions, and timezone normalization."
    ],
    "important_entities": [
      "Logistics Operations Manager",
      "Fleet and Logistics Management Epic",
      "Maps API",
      "WebSocket Service",
      "Supercluster Library",
      "React/Vue UI Frameworks"
    ],
    "dates_and_numbers": [
      "US-201",
      "13 Story Points",
      "1 to 50 trucks",
      "Up to 30 days future scheduling",
      "Greater than 5 km geo-fence deviation",
      "Greater than 30 minutes unexpected stop",
      "30-second telemetry ping frequency"
    ],
    "decisions_and_risks": [
      "Risk of concurrent booking collisions when inventory is low, mitigated by optimistic locking and reservation mechanisms.",
      "Risk of GPS signal loss in tunnels or remote areas, mitigated by retaining the last known position and displaying a Signal Lost status badge.",
      "Decision to normalize all multi-hub pickup schedules to UTC to prevent timezone discrepancies.",
      "Decision to use WebSockets for real-time telemetry ingestion to ensure up-to-date tracking."
    ]
  }
};
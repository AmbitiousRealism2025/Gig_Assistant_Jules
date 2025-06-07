// GigAssistant/data/mockData.js

export const mockRehearsals = [
  {
    id: "rehearsal-123",
    eventName: "June 14 Trio Rehearsal",
    date: "2025-06-14T18:00:00.000Z",
    location: "Studio 5, Downtown",
    tasks: [
      {
        id: "task-abc",
        title: "Learn solo for Song X",
        note: "Focus on measures 16-24",
        status: "open",
        order: 0
      },
      {
        id: "task-def",
        title: "Confirm practice room reservation",
        note: "",
        status: "closed",
        order: 1
      }
    ]
  },
  {
    id: "rehearsal-456",
    eventName: "July 1 Jazz Quartet",
    date: "2025-07-01T19:00:00.000Z",
    location: "University Hall",
    tasks: [
      {
        id: "task-ghi",
        title: "Review charts for new tunes",
        note: "",
        status: "open",
        order: 0
      }
    ]
  }
];

export const mockGigs = [
  {
    id: "gig-456",
    date: "2025-06-21T21:00:00.000Z",
    callTime: "2025-06-21T19:30:00.000Z",
    venue: {
      name: "The Blue Note",
      address: "131 W 3rd St, New York, NY 10012",
      contact: "booking@bluenote.net"
    },
    compensation: 500.00,
    notes: "2 sets, 45 mins each. Backline provided."
  },
  {
    id: "gig-789",
    date: "2025-07-15T20:00:00.000Z",
    callTime: "2025-07-15T18:00:00.000Z",
    venue: {
      name: "The Local Bar",
      address: "123 Main St, Anytown, USA",
      contact: "manager@localbar.com"
    },
    compensation: 150.00,
    notes: "Acoustic set. Bring small PA."
  }
];

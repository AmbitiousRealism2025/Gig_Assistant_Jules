Gig Assistant Coding Plan

Phase 1: Minimum Viable Product (MVP) Plan
1. Problem Definition & Target Audience
Core Problem: Gigging musicians lack a simple, dedicated tool to manage the two most critical aspects of their work: preparing for rehearsals and handling gig logistics. They currently rely on a fragmented mix of calendar apps, note-taking tools, and email, leading to disorganization, missed details, and unnecessary stress.
Target Audience: The primary users are solo musicians, freelance players, and members of small bands who manage their own schedules and logistics. They are tech-savvy enough to use mobile apps but need a solution that is quick, lightweight, and focused, without the complexity of full-scale project management software.
2. Elevator Pitch
For gigging musicians who need to stay organized on the go, Gig Assistant is a streamlined mobile app that consolidates rehearsal prep and gig logistics into one intuitive workspace. Unlike generic calendar and note apps, Gig Assistant provides dedicated features for managing tasks and venue details, ensuring you never miss a cue or a call time.
3. Core MVP Features (as User Stories)
As a user, I want to see my rehearsals and gigs in separate, clearly marked sections so that I can quickly access the information I need for the task at hand.
As a user, I want to create, view, and manage rehearsal tasks by grouping them under a specific rehearsal event, marking them complete, and reordering them, so I can effectively prepare for my practice sessions.
As a user, I want to add and manage all critical gig details—including date, venue, contacts, call time, and pay—and get one-tap directions so I can handle logistics efficiently.
As a user, I want to be greeted by a simple tutorial on my first launch so that I can immediately understand how to use the app's core functions.
As a user, I want all my data to be saved locally on my device so that I can access it reliably, even when I'm offline at a venue or rehearsal space.
User Flows
Onboarding Flow:
User opens the app for the first time.
A 3-4 screen swipe-through tutorial is displayed, explaining the "Rehearsal" and "Gigs" tabs and the function of the "+" button.
User dismisses the tutorial and lands on the main "Home" screen.
Core Interaction Flow (Adding an Item):
User taps the floating "+" button.
A choice appears: "New Rehearsal" or "New Gig."
If "New Rehearsal": The user is taken to a form to input the event name, date, and location. They can then add individual tasks with titles and optional notes.
If "New Gig": The user is taken to a form to input all gig-related data (date, venue, pay, etc.).
User saves the new item, which now appears as a card in the appropriate list ("Rehearsals" or "Gigs").
4. Initial Technical Specifications (for MVP)
Architecture: The app will be built with a simple, screen-based component structure.


screens/:
RehearsalScreen.js: Displays the list of rehearsal events and tasks.
GigsScreen.js: Displays the list of upcoming gigs.
AddEditRehearsalScreen.js: Form for creating/editing a rehearsal event and its tasks.
AddEditGigScreen.js: Form for creating/editing a gig.
OnboardingScreen.js: Contains the initial tutorial carousel.
components/:
RehearsalCard.js: Reusable component to display a single rehearsal event.
GigCard.js: Reusable component to display a single gig.
TaskItem.js: Component for an individual, draggable rehearsal task.
CustomButton.js: App-wide standardized button.
CalendarPicker.js: Wrapper for the native calendar modal.
navigation/:
AppNavigator.js: Sets up the main tab navigator for "Rehearsal" and "Gigs."
Tech Stack:


Framework: React Native with Expo. This provides a managed workflow, simplified builds, and access to native device features like the calendar and mapping via Expo's universal modules.
State Management: Zustand. For an app of this scale, Zustand offers a simple, lightweight, and boilerplate-free approach to managing global state (like the lists of gigs and rehearsals) without the complexity of Redux.
Styling: React Native StyleSheet. Keeping styling simple and co-located with components is efficient for the MVP. It avoids adding extra dependencies and build complexity.
Data Models (Conceptual JSON):


JSON
// Rehearsal Event
{
  "id": "rehearsal-123",
  "eventName": "June 14 Trio Rehearsal",
  "date": "2025-06-14T18:00:00.000Z",
  "location": "Studio 5, Downtown",
  "tasks": [
    {
      "id": "task-abc",
      "title": "Learn solo for Song X",
      "note": "Focus on measures 16-24",
      "status": "open",
      "order": 0
    },
    {
      "id": "task-def",
      "title": "Confirm practice room reservation",
      "note": "",
      "status": "closed",
      "order": 1
    }
  ]
}

// Gig
{
  "id": "gig-456",
  "date": "2025-06-21T21:00:00.000Z",
  "callTime": "2025-06-21T19:30:00.000Z",
  "venue": {
    "name": "The Blue Note",
    "address": "131 W 3rd St, New York, NY 10012",
    "contact": "booking@bluenote.net"
  },
  "compensation": 500.00,
  "notes": "2 sets, 45 mins each. Backline provided."
}




Data Strategy: For the MVP, all data will be stored locally on the device. AsyncStorage (a simple key-value store bundled with React Native) is sufficient. To prioritize UI development and rapid prototyping, the initial build will use hardcoded mock data based on the models above.


5. Development Workflow
Project Setup: Initialize the React Native project using the Expo CLI: npx create-expo-app GigAssistant. Sync this new project to a new GitHub repository.
Local Environment:
Bash
git clone https://github.com/[YourUsername]/GigAssistant.git
cd GigAssistant
npm install




Running the App: Start the Metro bundler to begin development:
Bash
npm start




Live Testing: Use the Expo Go app on a physical iOS or Android device. Scan the QR code presented by Metro in the terminal to load the app and see live changes as you code.

Phase 2: UI/Feature Refinement and Backend Integration Strategy
1. Iterative Development Strategy
Post-MVP development will follow a user-centric, iterative model.
Incremental Feature Rollout: Features from the "Polish & Accessibility" and "Quality-of-Life" themes will be bundled into small, frequent updates. For example, one update might introduce the dark-stage theme, while the next introduces recurring rehearsals. This allows for focused development and testing.
Feedback-Driven UI/UX: After launch, we will actively collect user feedback through simple in-app forms or TestFlight/Google Play Console feedback channels. This qualitative data will be prioritized to guide UI refinements. For instance, if users report difficulty tapping on task checkboxes, increasing tap target sizes (hitSlop in React Native) will become a priority.
2. Debugging and Problem-Solving Protocol
All bug reports must be submitted as GitHub Issues and follow a strict template to ensure they are actionable.
Descriptive Title: A clear, concise summary of the problem (e.g., "App crashes when saving a gig with an empty venue name").
Replication Steps: A numbered list detailing the exact sequence of actions required to trigger the bug.
Example:
Navigate to the "Gigs" tab.
Tap the "+" button and select "New Gig."
Fill out all fields except for "Venue Name."
Tap "Save."
Expected vs. Actual Behavior:
Expected: The app should display a validation error prompting the user to enter a venue name.
Actual: The app freezes for two seconds and then crashes, returning to the device's home screen.
Environment Details: Include the device (e.g., iPhone 14 Pro, Google Pixel 7), OS version (e.g., iOS 17.5, Android 14), and app version.
3. Backend Integration Plan
To enable features like cloud sync and sharing, the app must transition from local storage to a cloud-based backend.
Next Steps:
Select a Backend Service: Choose a Backend-as-a-Service (BaaS) to accelerate development.
Implement Authentication: Add a simple email/password or social login (Google/Apple) flow.
Refactor Data Layer: Replace AsyncStorage calls with API calls to the chosen backend service. The app should handle online/offline states gracefully, using the local data as a cache.
Suggested Backend Stack: Supabase. It provides a powerful and easy-to-use alternative to Firebase, offering a Postgres database, authentication, instant APIs, and storage. Its client library is straightforward to integrate into a React Native app.
Key API Endpoints (RESTful Convention):
POST /rehearsals: Create a new rehearsal event.
GET /rehearsals: Fetch all rehearsals for the authenticated user.
PUT /rehearsals/:id: Update an existing rehearsal.
DELETE /rehearsals/:id: Delete a rehearsal.
POST /gigs: Create a new gig.
GET /gigs: Fetch all gigs for the authenticated user.
PUT /gigs/:id: Update an existing gig.
DELETE /gigs/:id: Delete a gig.
4. Advanced Feature Brainstorming
Automated Mileage Calculator: Automatically calculate the round-trip mileage to a gig venue from a user-defined home address for tax purposes.
Setlist Integration: Allow users to create and attach a setlist to a specific gig or rehearsal event.
Earnings Dashboard: A dedicated screen that visualizes total, monthly, and per-gig earnings with simple charts and export options.
Brief Technical Specification: Automated Mileage Calculator
User Flow:
In a new "Settings" screen, the user saves their home address.
When creating or viewing a gig, a "Calculate Mileage" button is visible if the venue address is present.
On tap, the app uses a mapping API to calculate the round-trip distance between the saved home address and the venue address.
The calculated distance (e.g., "45.2 miles round trip") is displayed on the gig card.
Technical Implementation:
Geocoding: The home and venue addresses will be converted to geographic coordinates (latitude/longitude) using an Expo module like expo-location.
Directions API: The coordinates will be passed to a directions service API (like the Google Maps Directions API) to request the driving distance.
Data Storage: The calculated mileage will be stored as a new field ("mileage": 45.2) in the Gig data model. This prevents re-calculating the distance every time the gig is viewed.
```

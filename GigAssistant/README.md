# Gig Assistant - Mobile App

This project is a mobile application for gigging musicians to manage rehearsals and gig logistics.

## Progress So Far (MVP Phase 1)

The following foundational steps for the Minimum Viable Product (MVP) have been completed:

1.  **Project Initialization**: React Native project (`GigAssistant`) initialized using Expo CLI.
2.  **Core Directory Structure**: Created `screens/`, `components/`, `navigation/`, and `data/` directories.
3.  **Initial File Placeholders**: Created empty JavaScript files with basic boilerplate for all specified screens, components, and navigation.
4.  **Basic Tab Navigation**: Implemented `AppNavigator.js` with a main tab navigator for "Rehearsal" and "Gigs" screens, linking to `RehearsalScreen.js` and `GigsScreen.js`. Integrated into `App.js`.
5.  **Define Data Models and Mock Data**: Created `data/mockData.js` with example JSON structures for Rehearsal and Gig objects.
6.  **Implement Onboarding Screen**: Developed `OnboardingScreen.js` to display a 3-4 screen swipe-through tutorial using `react-native-swiper`.
7.  **Implement RehearsalCard Component**: Developed `components/RehearsalCard.js` to display basic information for a rehearsal event.
8.  **Implement GigCard Component**: Developed `components/GigCard.js` to display basic information for a gig.
9.  **Develop RehearsalScreen**: Implemented `screens/RehearsalScreen.js` to display a list of rehearsal events using `RehearsalCard.js` and mock data.

## Next Steps (MVP Plan)

The following items are planned to complete the MVP:

10. **Develop GigsScreen**: Implement `screens/GigsScreen.js` to display a list of gig events using `GigCard.js` and mock data.
11. **Implement Core Floating Action Button**: Add a floating "+" button (likely in `AppNavigator.js` or as a global component) that presents options "New Rehearsal" or "New Gig".
12. **Develop AddEditRehearsalScreen Form**: Create the basic form structure in `screens/AddEditRehearsalScreen.js` for event name, date, and location.
13. **Develop AddEditGigScreen Form**: Create the basic form structure in `screens/AddEditGigScreen.js` for gig date, call time, venue details, compensation, and notes.
14. **Implement TaskItem Component**: Develop `components/TaskItem.js` to display a single rehearsal task (title, note, status).
15. **Integrate Task Management in AddEditRehearsalScreen**: Enhance `AddEditRehearsalScreen.js` to allow adding, viewing, and marking tasks as complete.
16. **Implement CustomButton Component**: Create `components/CustomButton.js` for a standardized app-wide button style.
17. **Implement CalendarPicker Component**: Create `components/CalendarPicker.js` as a wrapper for a native calendar modal.
18. **Integrate AsyncStorage for Rehearsals**: Modify rehearsal-related screens and functions to save and load rehearsal data using AsyncStorage.
19. **Integrate AsyncStorage for Gigs**: Modify gig-related screens and functions to save and load gig data using AsyncStorage.
20. **Refine Navigation**: Ensure navigation flows smoothly between lists, detail/edit screens, and the creation process.
21. **Submit MVP**: Commit the completed MVP implementation.

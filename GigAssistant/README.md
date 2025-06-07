# Gig Assistant - Mobile App

This project is a mobile application for gigging musicians to manage rehearsals and gig logistics.

## Progress So Far (MVP Phase 1)

The following foundational steps and features for the Minimum Viable Product (MVP) have been completed:

1.  **Project Initialization**: React Native project (`GigAssistant`) initialized using Expo CLI.
2.  **Core Directory Structure**: Created `screens/`, `components/`, `navigation/`, and `data/` directories.
3.  **Initial File Placeholders**: Created basic boilerplate for specified screens and components.
4.  **Basic Tab Navigation**: Implemented `AppNavigator.js` with "Rehearsal" and "Gigs" tabs.
5.  **Data Models & Mock Data**: Defined JSON structures in `data/mockData.js` (though mock data is progressively being replaced by AsyncStorage).
6.  **Onboarding Screen**: Developed `OnboardingScreen.js` with a swipe-through tutorial.
7.  **RehearsalCard Component**: Developed `components/RehearsalCard.js` to display rehearsal event information, including task previews and formatted dates. Made pressable for navigation.
8.  **GigCard Component**: Developed `components/GigCard.js` for basic gig information display. (Note: Will be updated for AsyncStorage and press functionality in next steps).
9.  **RehearsalScreen**: Implemented `screens/RehearsalScreen.js` to list rehearsals. Initially used mock data, now loads from AsyncStorage.
10. **GigsScreen**: Implemented `screens/GigsScreen.js` to display a list of gig events using `GigCard.js` and mock data. (Note: Will be updated for AsyncStorage in next steps).
11. **Core Floating Action Button (FAB)**: Added a global FAB in `AppNavigator.js` presenting options "New Rehearsal" or "New Gig" (currently logs to console, navigation to be fully implemented).
12. **AddEditRehearsalScreen Form**: Created `screens/AddEditRehearsalScreen.js` with inputs for event name, date, and location.
13. **AddEditGigScreen Form**: Created `screens/AddEditGigScreen.js` with inputs for gig date, call time, venue details, compensation, and notes.
14. **TaskItem Component**: Developed `components/TaskItem.js` to display a single rehearsal task (title, note, status). Uses a textual checkbox (`[ ]`/`[x]`) due to dependency installation issues (see Developer Notes).
15. **Task Management in AddEditRehearsalScreen**: Enhanced `AddEditRehearsalScreen.js` to allow adding, viewing, and marking tasks as complete.
16. **CustomButton Component**: Created `components/CustomButton.js` for a standardized app-wide button style.
17. **CalendarPicker Component**: Code for `components/CalendarPicker.js` is written as a wrapper for a native calendar modal. (Note: Non-functional due to dependency issues, see Developer Notes).
18. **AsyncStorage for Rehearsals**: Integrated AsyncStorage into `RehearsalScreen.js` and `AddEditRehearsalScreen.js` to enable persistent storage (load, save, update, delete) of rehearsal data, including associated tasks.

## Next Steps (MVP Plan)

The following items are planned to complete the MVP:

1.  **Integrate AsyncStorage for Gigs**: Modify gig-related screens (`GigsScreen.js`, `AddEditGigScreen.js`) and `GigCard.js` to save, load, update, and delete gig data using AsyncStorage.
2.  **Refine Navigation**:
    *   Ensure FAB correctly navigates to `AddEditRehearsalScreen` or `AddEditGigScreen`.
    *   Ensure list items (rehearsals, gigs) navigate to their respective edit screens when pressed.
    *   Confirm save/delete actions navigate back appropriately.
    *   Register `AddEditRehearsalScreen` and `AddEditGigScreen` within a stack navigator for proper presentation and back navigation.
3.  **Final Review and Testing**: Perform a general review of the app, test all implemented MVP features, and ensure basic usability.
4.  **Submit MVP**: Commit the completed MVP implementation.

## Developer Notes

**Dependency Installation Issues:**

During development in the automated environment, there were persistent issues installing new npm packages using `npx expo install` (related to `cd` command failures). This has the following impact:

*   **`CalendarPicker.js`**: The code for this component is located in `components/CalendarPicker.js` and is intended to provide a native date selection experience. However, its required dependencies (`react-native-modal-datetime-picker` and its peer dependency `@react-native-community/datetimepicker`) could **not** be installed. For this component to function, you will need to manually run the following command in your local development environment:
    ```bash
    npx expo install react-native-modal-datetime-picker @react-native-community/datetimepicker
    ```
*   **`TaskItem.js` (Checkbox)**: The `components/TaskItem.js` component currently uses a textual representation for checkboxes (e.g., `[ ]` or `[x]`) to indicate task status. This was a workaround because the `expo-checkbox` package also failed to install. If you prefer a native checkbox UI, you can try installing it manually:
    ```bash
    npx expo install expo-checkbox
    ```
    After installation, `TaskItem.js` would need to be slightly modified to import and use the `Checkbox` component from `expo-checkbox` instead of the textual representation.
*   **Navigation (`@react-navigation/stack`)**: The app's navigation was refactored to use a Stack Navigator (`AppNavigator.js`) for managing main tabs and presenting Add/Edit screens. The required dependencies for this (`@react-navigation/stack`, `react-native-safe-area-context`, `react-native-screens`) also failed to install due to the environment issue. For the navigation system to work as intended (especially for opening Add/Edit screens), these must be installed manually:
    ```bash
    npx expo install @react-navigation/stack react-native-safe-area-context react-native-screens
    ```

These components have been coded with the assumption that these dependencies can be made available in the build environment.

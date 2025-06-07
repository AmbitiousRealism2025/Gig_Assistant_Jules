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

## Local Setup, Dependency Installation, and Testing

This section provides guidance for setting up the project locally, installing the aforementioned missing dependencies, and performing basic testing.

**1. Clone the Repository:**

First, clone this repository to your local machine using your preferred method (HTTPS or SSH).
```bash
git clone <repository_url>
cd GigAssistant
```
(Replace `<repository_url>` with the actual URL of this repository).

**2. Install Base Dependencies:**

If not already done, or to ensure all base dependencies from `package.json` are installed:
```bash
npm install
# or
# yarn install
```

**3. Manually Install Missing Dependencies:**

Due to issues in the automated development environment, several key dependencies were not installed. You **must** install them manually for full functionality:

*   **For Navigation (Stack Navigator):**
    ```bash
    npx expo install @react-navigation/stack react-native-safe-area-context react-native-screens
    ```
*   **For Calendar Picker:**
    ```bash
    npx expo install react-native-modal-datetime-picker @react-native-community/datetimepicker
    ```
*   **For Native Checkbox in Task Items (Optional):**
    If you wish to use native checkboxes instead of the textual `[x]`/`[ ]`:
    ```bash
    npx expo install expo-checkbox
    ```
    (Remember to modify `components/TaskItem.js` to use the `Checkbox` component from `expo-checkbox` if you install this).

**4. Run the Application:**

Once all dependencies are installed, you can start the Expo development server:
```bash
npx expo start
```
This will typically open a new tab in your web browser with the Expo Developer Tools.

**5. Testing with Expo Go:**

1. Install the **Expo Go** app from the iOS App Store or Google Play Store.
2. In your project directory run:
   ```bash
   npx expo start
   ```
   This launches the Expo development server and should open the Expo Developer Tools in your browser. If it does not, navigate to [http://localhost:19002](http://localhost:19002) manually.
3. Make sure your mobile device is connected to the **same Wi‑Fi network** as your computer.
4. In Expo Go choose **"Scan QR Code"** and scan the QR code displayed in the Developer Tools (or in your terminal).
5. The Gig Assistant application will then load and run on your device.

**Core Functionalities to Test:**

Ensure the following features work as expected:

*   **Onboarding:**
    *   [ ] App shows onboarding screens on first launch (Note: AsyncStorage might need to be cleared to simulate first launch if you've run it before).
    *   [ ] Swiping through onboarding screens works.
    *   [ ] "Done" button on onboarding leads to the main app.
*   **Rehearsal Management (CRUD & Navigation):**
    *   [ ] **View List:** `RehearsalScreen` loads and displays rehearsals from AsyncStorage (initially empty).
    *   [ ] **Add:** Tap FAB -> "New Rehearsal" -> `AddEditRehearsalScreen` opens.
    *   [ ] Fill rehearsal details (name, date - currently text input, location).
    *   [ ] Add multiple tasks to the rehearsal.
    *   [ ] Toggle task status (should use textual `[ ]` or `[x]`).
    *   [ ] Save rehearsal -> Navigates back to `RehearsalScreen`.
    *   [ ] New rehearsal appears in the list and persists after app restart.
    *   [ ] **Edit:** Tap a rehearsal card -> `AddEditRehearsalScreen` opens with pre-filled data.
    *   [ ] Modify details/tasks -> Update rehearsal -> Navigates back.
    *   [ ] Changes are reflected in the list and persist.
    *   [ ] **Delete:** From edit screen -> Delete rehearsal (with confirmation) -> Navigates back.
    *   [ ] Rehearsal is removed from the list and AsyncStorage.
*   **Gig Management (CRUD & Navigation):**
    *   [ ] **View List:** `GigsScreen` loads and displays gigs from AsyncStorage (initially empty).
    *   [ ] **Add:** Tap FAB -> "New Gig" -> `AddEditGigScreen` opens.
    *   [ ] Fill gig details (date - text input, call time - text input, venue name, address, contact, compensation, notes).
    *   [ ] Save gig -> Navigates back to `GigsScreen`.
    *   [ ] New gig appears in the list (sorted by newest date first) and persists.
    *   [ ] **Edit:** Tap a gig card -> `AddEditGigScreen` opens with pre-filled data.
    *   [ ] Modify details -> Update gig -> Navigates back.
    *   [ ] Changes are reflected in the list and persist.
    *   [ ] **Delete:** From edit screen -> Delete gig (with confirmation) -> Navigates back.
    *   [ ] Gig is removed from the list and AsyncStorage.
*   **Navigation & UI:**
    *   [ ] Bottom tab navigation between "Rehearsals" and "Gigs" screens works.
    *   [ ] Add/Edit screens have a functional back button (from Stack Navigator).
    *   [ ] Form inputs are usable.
    *   [ ] `CustomButton` is styled and functional.
    *   [ ] Empty list messages appear correctly.
    *   [ ] `RehearsalCard` and `GigCard` display information correctly.

**Note on `CalendarPicker.js` and `TaskItem.js` (Checkbox):**
*   If you installed the dependencies for `CalendarPicker.js`, you would need to integrate it into `AddEditRehearsalScreen.js` and `AddEditGigScreen.js` (replacing the text inputs for dates) for it to be testable.
*   If you installed `expo-checkbox` and modified `TaskItem.js`, verify the native checkbox functionality. Otherwise, test the textual checkbox.

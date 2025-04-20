# Change Log - Temporary File

This document is a temporary file that will show all the recent changes I made in each file:

**Overall** I added comments to the top of all my files, explaining thier usage. AI was used to help make the comments clear and consise. I still need to fix styling to my pages.
---


## Index
1. [App.js](#appjs)  
2. [ViewPostGroupOrder.js](#viewpostgrouporderjs)  
3. [BackButton.js](#backbuttonjs)  
4. [LockBodyScroll.js](#lockbodyscrolljs)  
5. [Tracking.css](#trackingcss)  
6. [Tracking.js](#trackingjs)  
7. [Completed.js](#completedjs)  

---

## App.js
- Changed the route path for the `Tracking` component from `/tracking` to `/track-order` to match the navigation used in `OrderConfirmed.js` _(line 16)_

---

## ViewPostGroupOrder.js
- Added **lines 22 and 23** to store the order details onto `localStorage` so that it can be retrieved later for setting the delivery address and map pin in the `Tracking.js` page

---

## Backbutton.js
- **Lines 9-11** were temporarily added to remove `localStorage` when exiting testing purposes. The intended final implementation is to have local storage removed once the order is complete and the user exits the completed order page by either pressing the back button on the top left, or submitting feedback/rating.
- Changed default `className` (**line 21**) from `'back-button'` to `'btn-back'` to avoid CSS conflicts (purpose explained in Tracking.css).

---

## LockBodyScroll.js
- Added a new custom hook and created a `hooks/` folder.
- This hook dynamically locks page scroll depending on the active route/view.

---

## Tracking.css
- Removed `overflow: hidden` from global `body` style to prevent scroll blocking across unrelated pages.
- Changed back button class from `'back-button'` to `'btn-back'` to resolve CSS conflicts with other components.

---

## Tracking.js
-  Added **lines 34–49** to retrieve `deliveryType` and `selectedLocation` from `localStorage` (originally stored in `ViewPostGroupOrder.js`; **lines 22-23**).
- Default value for deliveryType is set to 'pickup', in case there are any errors retrieving localStorage or if localStorage is null
- Fallback defaults:
    - `deliveryType` defaults to `'pickup'` if `localStorage` is null or corrupted.
    - `selectedType.address` defaults to `'1234 W Taylor St, Chicago, IL 60607'` if `selectedLocation` is not found.

---

## Completed.js
- Added an `onExit` function (**lines 22–28**) that removes data from `localStorage` when the user:
  - Clicks the back button
  - Submits their delivery feedback
- Behavior is also described in `BackButton.js`.
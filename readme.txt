--Readme document for Reid Smith, reids1@uci.edu, *reids1--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
16 hours


3. What online resources did you consult when completing this assignment? (list specific URLs)
https://stackoverflow.com/questions/74454764/how-do-i-get-local-time-in-iso-format-in-javascript

https://ionicframework.com/docs/api/datetime

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString

https://ionicframework.com/docs/api/picker

https://www.geeksforgeeks.org/javascript/how-to-clone-an-array-in-javascript/

https://ionicframework.com/docs/api/action-sheet

https://ionicframework.com/docs/api/text

https://ionicframework.com/docs/api/card

https://ionicframework.com/docs/theming/color-generator

https://ionicframework.com/docs/api/select

https://ionic.io/ionicons

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString

Images from Pexel



4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
None


5. Is there anything special we need to know in order to run your code?
No


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
I made my app for people who have variable work hours. Since it has different themes
depending on if you open it at night or the day, a nightshift worker can have a 
more custom experience if they're logging their sleep at night.


7. Did you design your app specifically for iOS or Android, or both?
I made my app for both. Since it was for both I made the entry deletion
a universal action of a tap, instead of something an apple user would used
like a swipe.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
I chose the ionic datetime selector format since it's intuitive. Also if they want to retroactively log sleep the user can.



9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
I chose the ionic selection menu since I wanted the desciptions to all be visble at once, and easy to choose from. Also time is logged
automatically when saved, so logging midshift is easy.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
I chose an ionic list since it provided a place for both overnight sleep logs and sleepiness in the same structure and made it easy
to sort them from newest to oldest.
I thought about seperating the two but it would be hard to relate them to the sleep logs.


11. Which feature choose--using a native device resource, backing up logged data, or both?
I chose to back-up the data.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?



13. If you backed up logged data, where does it back up to?
I chose to back-up the data using indexDB with ionic storage.


14. How does your app implement or follow principles of good mobile design?
1. I have a useful initial view, with the logged data and average sleep at the top,
and telling users what to if it's empty.

2. Uh-oh button. The user can delete entries by clicking on the indiviual logs.

3. Error preventions. Save sleep is diabled if the wake time is before the sleep time
and you can't save a rating if one hadn't been chosen.

4. I used platform conventions. Such as a Action Sheet, Ionic cards, buttons.

5. And I implemented a visual design. I made both a custom day and night mode that switch according
to the time to stay the most readable.
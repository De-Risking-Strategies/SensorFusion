### Sensor Fusion MIT License	 CHANGELOG  
(C) 2020 -2021 - De-Risking Strategies, LLC 
----

## SENSOR FUSION CHANGELOG                     
----

## February 1, 2021 - RE-Login implemented, 'SKIP TO SENSOR FUSION' added, Top Toolbar fixups, Added Registration to settings
1. Made it possible to Re-Login again and suppors multiple users 
2. Added a 'SKIP TO SENSOR FUSION' feature that allows you to login and perform all actions except Uploading files
3. Privacy Policy Link fixed
4. Login Page Forgot Password Hover vixed
5. Added Terms of Service
6. Improved top tool bar spacing
7. Updated the Copyright notices to 2021
8. Register page - hide passwords tag 
9. Changed SKIP to a Button
10. Added Button and Link purple outline on hover

## January 26, 2021 - Final Candidate - Registration , Login, Forgot Password, Reset Password, Privacy Policy, TOC and Age Terms included 
>IMPORTANT - From this point forward, you will need to registration and then sign in to use the App.

1. This update integrates the Login and Registration AWS API's, and changes the way the program is launched.  Now it launches to the Login page and forces you to register or login.
2. Integrated Registration Page with baseline functionality and error checking - no duplicate email address allowed. 6 Character minimum password length
3. Added Login page with baseline functionality and error checking.
4. Added Forgot Password on Login page with Emailed Key and Token based replacement
5. Added Reset Password on Login to create a new Password with the Forgot Password Key
6. Upload Images function now uses the pre-logged in Account and Password. NOTE - It's possible to login under multiple accounts from One Pi, using different email addresses.
7. Added the Avatar Image update and Login indication.  Worked out all the internal navigation flows for Logout and Login.

>NOTE 1 - Login tokens last for 1 day and then auto expire .  You will need to Logoff and Login again to use the app.

>NOTE 2 - Forgot Password Kesy are one-time use, and will  auto-expire in 1 hour 

## January 15, 2021 - Upload to Server with Login and Token, CSS fixups, Validation and Error handling, Progress Bar on Upload, Fixed Score%-Label Model switch bug
- Added full Zip file login with token and upload with description to secure Signed URL
- Incorporated a Progress Bar to show status whil uploading large files in the background
- Updated the CSS to be more responsive to different screen sizes
- Fixed Pushkar's bug for the Scores (%) and Labels toggle setting when switching models.  Now these settings will default back to enabeld when switching models
- Added lots of validation in the Upload dialog for file name, location, size, email, description, and password
- Changed  TensorFlow Camera 1 from static HTML to dynamic creation in the DOM via Javascript (better for future multi-camera implementations)

>NOTE 1 - Uploading files requires a registered user.  While waiting for the registration integration, we can add users via command line

>NOTE 2 - In this update we removed Menu 9 from Main Menu - No longer functional with Login now required to upload

>NOTE 3 - The current Upload images allows you to login before the upload (if you are a registered user).  Later when we integrate the full Login, this won't be neccssary.

## January 9, 2021 - Added Model Toggle, checked Full Screen Model Switching, Modified Capture File Name
- Added a Model Toggle button - far right (replacing the Thermal button) - to switch between currently selected models and resolve the User Experience problems when switchin models.
NOTE - This changes the way model selection works.  Now you can easily toggle between the two highlighted models, either Pre Loaded OR Custom without switching models, and it remembers the last model you were using for each model type.
 Clicking on either the left pre loaded or right side custom buttons increment the model selected as they did before.  In prior releases, both of these functions were combined, making the user experience difficult.
- Checked switching models in Full Screen mode.  Browsers do not allow automatically loading in full-screen mode without auser action first.
- Modified the Captured File Name to “name”-sf-img-####.jpg


## January 7, 2021 - Main Menu Zip Files and Upload Files to Back End added 
NOTE - For details on Upload Download to DRS back-end, pleasee see 'DRS-AWS-Administrator-Access-Upload-Download.doc'
- Menu 8 - Zip Annotated directory - zipdir.sh added
- Menu 9 - Upload Zip File: Email Address, Zipped File and Description with spaces and validation
- Capture Imags - Added a visible file count when saving images, and MOVED Description to Upload Images 
- Fixed spacebar and 'f' key bugs in forms (you can now include spaces in fields)
- Upload Images - Added capabilities to begin Upload from SF (not finished yet)

## December 31 - Removed static label from Custom to fix switching issue
- Moved Custom/Preloaded image switching logic to match

## December 30 - ReadMe/Train - Upload
- Fixed Readme - cd /Sensor Fusion
- Chaiged Train label to Upload Images
- Made heck.ID first custom item

## December 30 - Added CheckID support
- Added CheckID Support to Custom Model switcher
- Changed out Annotate image to 'Capture Images'
- Tweaked the Switching logic for Custom to PreLoaded
- Added Title and RowsxCols to Menu.sh to better place the spawned terminals

## December 28-29 - Added Multi Modal support for PreLoaded and Custom Models 
- Python pickle obj store for inter instance setting
- Added Cookies for inter instance model persistance
- Add PreLoaded Model support for ['Demo90','Model01.Deer', 'Model02.Head', 'Model03.Eyes', 'Model04.Tree'] - Click the 'Models' button to cycle through them
- Added Custom Model support for ['Custom.01','Custom.02', 'Custom.03', 'Custom.04'] - Click the 'Custom' button to cycle through them
- Added train Image On Off image

## December 27 - Annotate API enchancemant and check for existing dir on annotation
- Created a Path check fAPI in Python to check for existing Directory Names  - preventingf overwriting
- Added a status bar and removed the dialog when capturing images for annotation
- Made it so the F and Spacebar are disabled during annotation


## December 24 - Create config, routes and widgets packages
- Modularize configuration (globals)
- Create widgets.meter Package - move the meter bar out of the main line
- Create routes.api, login and register packages

## December 23 - Merge of Pushkar and Drew S changes
- Fixed Menu.sh (launch.sh) problem with large image captures under annotations
  NOTE - Browser has to be launched manually  (for) now
- Removed the Tensor Flow objects when capturing images
- Make the Video Camera Code reentratn! Press'q' key to Relaunch TF service and reload browser.  Also Use the Settings Restart menu.
- Updated the Capture Image Warning message
### December 21, 2020 - Pushkar's changes
- Consolidated all the models in one environment.
- Added new models for custom models placeholder (in PreLoadedModels).
- changed the scripts to work in the SF environment.
### December 18-22,2020 - Drew's Changes
- Merged Puskars' code from last week
- Added CSS @Media tags for small screens: 800 x 420 and 1024 x 768
- Added basic Meter/Scale for single person
- Modified launch.sh to get rid of the ERR_CONNECTION_REFUSED on launch message
- Added Backgrond Camera Off image
- Stubbed out Training - Upload File function 


## December 16, 2020
- Full screen toggle implemented
- Info screen implemented
- Fixups to Menu.sh

##December 15, 2020
- .gitigonre repaired
- Cosmetic fixes to Settings and Annotate dialogs
- README.md spell checked and cleaned up

## December 14, 2020
- Added Keyboard handler - Spacebar for Annotate, F key to toggle Frames per second on and off (off by default now)
- Enabled saving of annotations for: Directory/File name and number of images to save
- Added new images for MVP  - Annotate, train, settings
- Added simple Annotate empty field validation and confirmation messaging
- Made Score and Label Green per Don's spec
- Removed the background rectangle behind the Scores/Labels per Don' spec
 
## December 13, 2020
- Added Javascript to Python/Flask communication via POST,GET
- Created command structure for Capture Images, Labels toggle (and Score%)
- Created baseline Image Capture routine on Annotate spacebar function
- Enable toggle logic and graphics for scores and labels switches
- Worked on deleting Camera insstance for restart (not finished yet)
- Added Selection Dialog to Annotate workflow: Title, Description and Number of images to capture
- Added Main Menu - menu.sh and associated files

## December 4, 2020 - First Repo Update - DAnderson
- Expanded Javascript Templates and Static file archtecture and implemented running stack on Locahost
- Successfully exposed TFLite Python Camera Input as API endpoint in FLask for JS to consume
- Added graphics, toolbars, widgets, sliding sidnavigation left and right, modal dialog
- Inter layer communication end-point exposed Flask -> Javascript

## November 29, 2020 - Initial Release on Flask
- Initial checkin to Github
- Incorporated Flask API into Demo90 TFLite environment
- Initial JS layout, graphics and local tech stack created on top of Demo90 environment

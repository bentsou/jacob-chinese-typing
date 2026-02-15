This is a webapp that a user can use to practice typing Chinese characters.

## Requirements
- Only support one Chinese input method right now: the Pinyin input method (specifically the iPad OS implementation)
- The app will display one sentence at a time, randomly chosen from @./sentences.txt.
- Below the sentence, there is an text input box. This is where the user will be practice their typing
- When the user hit enter, the app will compare the input with the sentence and provide a score:
  - When comparing, punctuations are ignored 
  - If perfect match, the score is 100%
  - If there are mismatches, deduct the 100% score by the ratio of the mismatch with respect to the number of characters in the sentence.
  - Then provide a button for the user to click to proceed to the next sentence

### Levels
Allow the user to select level of difficulty
- Entry level: In addition to the sentence and the text box, also display the corresponding Pinyin for the sentence, allowing the user to follow and type
- Junior level: Display only the sentence and the text box. But if the user is stuck on a character for too long, display the Pinyin for the character the user is stuck on. "Too long" is configurable. User can specify how many seconds should elaspe before the Pinyin is displayed.
- Expert level: Only the sentence and teh text box are display. There is no help

### Render Style
- Make it fun and colorful. This is for children around age 10 to enjoy.

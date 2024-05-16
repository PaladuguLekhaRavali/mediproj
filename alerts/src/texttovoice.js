const fs = require('fs');
const say = require('say');

// Function to convert text to speech and save as MP3 file
function textToSpeech(text, outputFile) {
    return new Promise((resolve, reject) => {
        say.export(text, 'Microsoft David Desktop', 1, outputFile, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}                           

// Example usage:
const text = "Emchestunav tinnavaa medicines 9 ki  annam tinu";
const outputFile = "output.mp3"; // Output file name (change as needed)
textToSpeech(text, outputFile)
    .then(() => console.log(`Text converted to speech and saved to ${outputFile}`))
    .catch(error => console.error('Failed to convert text to speech:', error));

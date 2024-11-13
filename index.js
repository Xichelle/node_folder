// Import the express library and assign it to a variable
import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

// Create an instance of an express application 
const app = express()

// Set the port the application will be running on
const port = process.env.PORT || 3001


app.use(cors({
  origin: '*'
}));

// Set up a response for the root path of the application
app.get('/', (req, res) => {
  res.send("This is a virtual cave. Choose your path")
})

// Example of an application route that makes a request to another server
app.get('/advice', async (req, res) => {
    // Make a request to another wbesite and wait for a response
    const response = await fetch('https://api.adviceslip.com/advice')
  
    // Read the response
    const body = await response.json()
  
    // Print the repsonse body to the console
    console.log(body)
  
    // Get the advice text string from the response body object
    const advice = body.slip.advice
  
    res.json({ data: advice })
  })

const branches = {
	  branch37: "You see 333 bats hanging on the top of the cave. Your heartbeat is so loud that all the bats wake up. The moment you looked into their eyes, you realized this might be the wrong way",
	  branch8: "You start feeling the ground is getting wet, water drips on the ground and on your body. You saw the light in front of you, but another footstep on the wet ground behind you immeditely caught your ears.",
    branch501: "You feel the wind blowing in the cave, that makes you feel safe, because that means this branch may lead to the outside. You start running, and hoping you can escape from this nightmare. Until you run into a soft and warm surface that is breathing...",
    branch1: "You want to leave this place that you have no idea why you are here. But when you look back, the entrance is already disappear like you've walking in the cave for a long time.",
    branch296: "You stay in this place, feeling exhausted.You have no idea why you are here, but you feel like you have been here for so many times. You fall asleep, in the dream you saw yourself died again and again, struggling in this place. You realized that there's no way out. It's virtual, there's only one true exit, right?"
}

app.get('/branches', (req, res) => {
    const branchName = req.query.branch; // Access the branch name
    if (!branches[branchName]) {
        res.json({ message: "You've reached the boundary of this cave, find another way" });
    } else {
        res.json({
            branch: branchName,
            description: branches[branchName],
        });
    }
});

// Route to leave a note in a specific branch
app.get('/branches/:branch/leave-a-note/:note', (req, res) => {
  const branchName = req.params.branch;
  const noteContent = req.params.note;

  // Check if the branch exists
  if (!branches[branchName]) {
    return res.send("This branch does not exist. Go back and choose a valid path.");
  }

  res.send(`You leave one last message on the rock for the next traveler to discover: "${noteContent}" in ${branchName}`);
});

// Set the application to listen on a port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
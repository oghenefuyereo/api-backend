require('dotenv').config();
const mongoose = require('mongoose');
const Professional = require('./models/Professional');

const seedData = {
  professionalName: "Oghenefuyere Okiotorhoro",
  base64Image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgUkhzZ8AAAAASUVORK5CYII=",
  nameLink: {
    firstName: "Oghenefuyere",
    url: "https://example.com/oghenefuyere"
  },
  primaryDescription: "Creative frontend developer with a passion for expressive visuals and clean code.",
  workDescription1: "Skilled in HTML, CSS, JavaScript, and React.",
  workDescription2: "Enjoys solving UI/UX problems and building responsive layouts.",
  linkTitleText: "Connect With Me",
  linkedInLink: {
    text: "LinkedIn",
    link: "https://linkedin.com/in/oghenefuyere"
  },
  githubLink: {
    text: "GitHub",
    link: "https://github.com/oghenefuyere"
  },
  contactText: "Let’s build something together! 🚀"
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/professional')
  .then(async () => {
    await Professional.deleteMany(); // Optional: clears previous entries
    const newEntry = new Professional(seedData);
    await newEntry.save();
    console.log("✅ Seed data inserted!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Error inserting seed data:", err);
  });

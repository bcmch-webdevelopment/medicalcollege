// server/seedDoctors.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Doctor = require("./models/Doctor"); // ✅ path matches exactly

dotenv.config();



const doctors = [
  {
    name: "Dr. Leena Thomas",
    specialty: "Senior Consultant & HOD",
    department: "Cardiology",
    image: "https://www.bcmch.org/asset/uploads/doctors/9296603015e4a1c8020f4e.jpg",
    bio: "Head of the Department of Cardiology, trained at Christian Medical College, Vellore.",
    experience: 18
  },
  {
    name: "Dr. T U Zachariah",
    specialty: "Senior Consultant",
    department: "Cardiology",
    image: "https://www.bcmch.org/asset/uploads/doctors/20363601715e4a1c0398a51.jpg",
    bio: "Known for his exceptional clinical expertise in heart surgery.",
    experience: 15
  },
  {
    name: "Dr. Ravi Cherian Mathew",
    specialty: "Senior Consultant",
    department: "Cardiology",
    image: "https://www.bcmch.org/asset/uploads/doctors/10554475815e4a1d6d62ff6.jpg",
    bio: "Skilled Interventional Cardiologist specializing in complex procedures.",
    experience: 12
  },
  {
    name: "Dr. Saji Jose",
    specialty: "Visiting Consultant",
    department: "Cardiology",
    image: "https://www.bcmch.org/asset/uploads/doctors/2080770555656ea5d3b3d09.webp",
    bio: "Specializes in coronary interventions and patient care.",
    experience: 10
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await Doctor.deleteMany(); // Optional: clear existing doctors
    const createdDoctors = await Doctor.insertMany(doctors);
    console.log(`✅ ${createdDoctors.length} doctors added!`);
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error connecting to MongoDB:", err);
    process.exit(1);
  });
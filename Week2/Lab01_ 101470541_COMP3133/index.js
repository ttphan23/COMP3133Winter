const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const inputFile = path.join(__dirname, "input_countries.csv");
const canadaFile = path.join(__dirname, "canada.txt");
const usaFile = path.join(__dirname, "usa.txt");

function deleteIfExists(file) {
  if (fs.existsSync(file)) fs.unlinkSync(file);
}

// a) delete canada.txt and usa.txt if already exist
deleteIfExists(canadaFile);
deleteIfExists(usaFile);

// write header lines
fs.writeFileSync(canadaFile, "country,year,population\n");
fs.writeFileSync(usaFile, "country,year,population\n");

const canadaStream = fs.createWriteStream(canadaFile, { flags: "a" });
const usaStream = fs.createWriteStream(usaFile, { flags: "a" });

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {
    const country = (row.country || "").trim().toLowerCase();
    const year = (row.year || "").trim();
    const population = (row.population || "").trim();

    if (country === "canada") {
      // b) Filter Canada and write to canada.txt
      canadaStream.write(`${country},${year},${population}\n`);
    }

    if (country === "united states") {
      // c) Filter United States and write to usa.txt
      usaStream.write(`${country},${year},${population}\n`);
    }
  })
  .on("end", () => {
    canadaStream.end();
    usaStream.end();
    console.log("Done! Generated canada.txt and usa.txt");
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });

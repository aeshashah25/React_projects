const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let playerBalance = 1000;

function generateProvablyFairRoll(clientSeed, serverSeed, nonce) {
    const hash = crypto.createHash("sha256").update(`${clientSeed}-${serverSeed}-${nonce}`).digest("hex");
    const roll = (parseInt(hash.substring(0, 8), 16) % 6) + 1;
    return { roll, hash, serverSeed, nonce };
}

app.post("/roll-dice", (req, res) => {
    const { betAmount, clientSeed } = req.body;
    if (!betAmount || betAmount <= 0 || betAmount > playerBalance) {
        return res.status(400).json({ error: "Invalid bet amount" });
    }

    const serverSeed = crypto.randomBytes(16).toString("hex");
    const nonce = Math.floor(Math.random() * 100000);
    const { roll, hash } = generateProvablyFairRoll(clientSeed, serverSeed, nonce);

    if (roll >= 4) {
        playerBalance += betAmount;
    } else {
        playerBalance -= betAmount;
    }

    res.json({ roll, hash, serverSeed, nonce, balance: playerBalance });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

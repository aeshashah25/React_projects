import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DiceGame() {
  const [betAmount, setBetAmount] = useState(100);
  const [balance, setBalance] = useState(1000);
  const [rollResult, setRollResult] = useState(null);
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);

  const rollDice = async () => {
    if (betAmount <= 0 || betAmount > balance) {
      alert("Invalid bet amount!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/roll-dice", {
        betAmount,
        clientSeed: "user-seed",
      });
      setRollResult(response.data.roll);
      setHash(response.data.hash);

      setBalance((prevBalance) => {
        if (response.data.roll % 2 === 0) {
          return prevBalance + betAmount * 2; // Winning gives 2x payout
        } else {
          return prevBalance - betAmount; // Losing deducts bet amount
        }
      });
    } catch (error) {
      alert(error.response?.data?.error || "Error rolling dice");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-fuchsia-500 mb-6">Dice Game</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
        <p className="text-lg font-semibold mb-2">
          Balance: <span className="text-green-400">${balance}</span>
        </p>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="mt-4 p-2 text-black rounded w-full"
          placeholder="Enter bet amount"
        />
        <motion.div
          className="mt-6 cursor-pointer hover:scale-110 transition"
          whileTap={{ scale: 0.8 }}
          onClick={rollDice}
        >
          <img
            src="/dice.png"
            alt="Dice"
            width={96}
            height={96}
            className="mt-6 cursor-pointer hover:scale-110 transition"
            onClick={rollDice}
          />
        </motion.div>
        {rollResult !== null && (
          <motion.div
            className="mt-6 text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🎲 Dice Roll: {rollResult}
          </motion.div>
        )}
        {hash && (
          <p className="mt-2 text-sm break-all text-gray-400">Hash: {hash}</p>
        )}
      </div>
    </div>
  );
}

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

      setTimeout(() => {
        setRollResult(response.data.roll);
        setHash(response.data.hash);

        setBalance((prevBalance) =>
          [2, 4, 6].includes(response.data.roll)
            ? prevBalance + betAmount * 2
            : prevBalance - betAmount
        );

        setLoading(false);
      }, 2000);
    } catch (error) {
      alert(error.response?.data?.error || "Error rolling dice");
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="game-box">
        <h1 className="title">Dice Game</h1>

        <p className="balance">
          Balance: <span className="green">${balance}</span>
        </p>

        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="bet-input"
          placeholder="Enter bet amount"
        />

        <motion.div
          className={`dice-container ${loading ? "rolling" : ""}`}
          animate={loading ? { rotate: 720 } : { rotate: 0 }}
          transition={loading ? { duration: 2, ease: "easeInOut" } : {}}
          onClick={rollDice}
        >
          <Image src="/dice.png" alt="Dice" width={96} height={96} priority />
        </motion.div>

        {rollResult !== null && (
          <motion.div className="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            🎲 Dice Roll: {rollResult}
          </motion.div>
        )}

        {hash && <p className="hash">Hash: {hash}</p>}
      </div>

      <style jsx>{`
        .container {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #1a1a1a;
          color: white;
        }

        .game-box {
          width: min(400px, 50vw);
          height: min(400px, 50vh);
          background-color: #2c2c2c;
          border: 4px solid #ff00ff;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .title {
          font-size: 28px;
          font-weight: bold;
          color: #ff00ff;
          margin-bottom: 20px;
        }

        .balance {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .green {
          color: #00ff00;
        }

        .bet-input {
          width: 80%;
          padding: 10px;
          margin-bottom: 15px;
          border: none;
          border-radius: 6px;
          text-align: center;
          font-size: 16px;
        }

        .dice-container {
          cursor: pointer;
          margin-top: 15px;
          transition: transform 0.2s ease-in-out;
        }

        .rolling {
          animation: spin 2s ease-in-out;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(720deg); }
        }

        .result {
          margin-top: 20px;
          font-size: 20px;
          font-weight: bold;
        }

        .hash {
          margin-top: 10px;
          font-size: 12px;
          color: #aaa;
          word-break: break-all;
        }
      `}</style>
    </div>
  );
}

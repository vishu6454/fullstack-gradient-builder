import React, { useEffect, useState } from "react";

function Home() {
  const [color1, setColor1] = useState("#051937");
  const [color2, setColor2] = useState("#008793");
  const [copied, setCopied] = useState(false);

  const getRandomColor = () => {
    const hex = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    // save existing values so we can restore on cleanup
    const originalBackground = document.body.style.background || "";
    const originalAttachment = document.body.style.backgroundAttachment || "";
    const originalSize = document.body.style.backgroundSize || "";
    const originalAnimation = document.body.style.animation || "";

    // apply gradient correctly with linear-gradient
    document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "400% 400%";
    document.body.style.animation = "linearShift 15s ease infinite";

    return () => {
      // restore originals
      document.body.style.background = originalBackground;
      document.body.style.backgroundAttachment = originalAttachment;
      document.body.style.backgroundSize = originalSize;
      document.body.style.animation = originalAnimation;
    };
  }, [color1, color2]);

  const handleCopy = async () => {
    const linearCode = `background: linear-gradient(135deg, ${color1}, ${color2});`;
    try {
      await navigator.clipboard.writeText(linearCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      // fallback: prompt (optional)
      // window.prompt("Copy to clipboard: Ctrl+C, Enter", linearCode);
    }
  };

  const handleRandomLinear = () => {
    setColor1(getRandomColor());
    setColor2(getRandomColor());
  };

  const saveLinear = () => {
    localStorage.setItem("linearColors", JSON.stringify({ color1, color2 }));
    // feedback to user (re-using copied state for visual feedback)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full transform hover:scale-[1.02] transition-all duration-500 border border-white/20">
        <h1 className="text-4xl font-black bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center mb-6 animate-bounce">
          🎨 Linear Generator
        </h1>

        <div
          className="w-full h-56 rounded-2xl mb-8 border-4 border-white/50 shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-pulse-slow"
          style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}
        ></div>

        <div className="flex space-x-4 mb-8">
          <button
            className="flex-1 py-4 rounded-xl font-black text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md"
            style={{ backgroundColor: color1 }}
            onClick={() => setColor1(getRandomColor())}
          >
            {color1}
          </button>
          <button
            className="flex-1 py-4 rounded-xl font-black text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md"
            style={{ backgroundColor: color2 }}
            onClick={() => setColor2(getRandomColor())}
          >
            {color2}
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={handleCopy}
            className={`w-full font-black text-lg py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg ${
              copied ? "bg-linear-to-r from-green-500 to-emerald-500" : "bg-linear-to-r from-blue-500 to-purple-500"
            }`}
          >
            {copied ? "✅ Copied to Clipboard!" : "📋 Copy linear Code"}
          </button>

          <button
            onClick={handleRandomLinear}
            className="w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-lg py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
          >
            🎲 Random Linear
          </button>

          <button
            onClick={saveLinear}
            className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
          >
            💾 Save Linear
          </button>
        </div>

        <div className="bg-linear-to-r from-gray-50 to-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-gray-100 transform hover:scale-[1.02] transition-all duration-300">
          <code className="text-sm text-gray-800 break-all font-mono font-bold">
            background: linear-gradient(135deg, {color1}, {color2});
          </code>
        </div>
      </div>

      <style jsx>{`
        @keyframes linearShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;

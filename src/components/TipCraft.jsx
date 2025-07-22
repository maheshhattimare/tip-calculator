import { useState, useEffect } from "react";
import {
  Calculator,
  Users,
  Percent,
  DollarSign,
  RotateCcw,
  Sun,
  Moon,
  Receipt,
  TrendingUp,
  PiggyBank,
} from "lucide-react";
import Footer from "./Footer";

const TipCraft = () => {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [numPeople, setNumPeople] = useState(1);
  const [results, setResults] = useState({
    tipAmount: 0,
    totalAmount: 0,
    perPersonAmount: 0,
  });
  const [errors, setErrors] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSplitDetails, setShowSplitDetails] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [history, setHistory] = useState([]);

  // Currency symbols
  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
  };

  // Quick tip percentages
  const quickTipOptions = [10, 15, 18, 20, 25];

  // Calculate tip whenever inputs change
  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercent, numPeople]);

  const validateBillAmount = (value) => {
    if (!value) {
      return "Bill amount is required";
    }
    if (isNaN(value) || parseFloat(value) <= 0) {
      return "Please enter a valid amount";
    }
    if (parseFloat(value) > 999999) {
      return "Amount is too large";
    }
    return null;
  };

  const calculateTip = () => {
    const error = validateBillAmount(billAmount);
    setErrors({ billAmount: error });

    if (error || !billAmount) {
      setResults({ tipAmount: 0, totalAmount: 0, perPersonAmount: 0 });
      return;
    }

    const bill = parseFloat(billAmount);
    const tip = bill * (tipPercent / 100);
    const total = bill + tip;
    const perPerson = total / numPeople;

    setResults({
      tipAmount: tip,
      totalAmount: total,
      perPersonAmount: perPerson,
    });
  };

  const handleBillChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setBillAmount(value);
    }
  };

  const clearAll = () => {
    setBillAmount("");
    setTipPercent(18);
    setNumPeople(1);
    setResults({ tipAmount: 0, totalAmount: 0, perPersonAmount: 0 });
    setErrors({});
    setShowSplitDetails(false);
  };

  const saveToHistory = () => {
    if (billAmount && results.totalAmount > 0) {
      const calculation = {
        id: Date.now(),
        billAmount: parseFloat(billAmount),
        tipPercent,
        numPeople,
        results,
        timestamp: new Date().toLocaleString(),
        currency,
      };
      setHistory((prev) => [calculation, ...prev.slice(0, 4)]);
    }
  };

  const formatCurrency = (amount) => {
    return `${currencySymbols[currency]}${amount.toFixed(2)}`;
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "dark bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg animate-bounce-slow">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1
            className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient`}
          >
            TipCraft
          </h1>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } animate-slide-up`}
          >
            Craft perfect tips with precision and style
          </p>

          {/* Theme Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDarkMode
                  ? "bg-gray-800 text-yellow-400"
                  : "bg-white text-gray-600"
              } shadow-lg`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-3">
            <div
              className={`p-6 rounded-3xl shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
                isDarkMode
                  ? "bg-gray-800/50 border border-gray-700"
                  : "bg-white/80 border border-white/50"
              } animate-slide-right`}
            >
              {/* Currency Selection */}
              <div className="mb-6">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={`w-full p-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white focus:border-purple-400"
                      : "bg-white border-gray-200 focus:border-purple-400"
                  }`}
                >
                  {Object.entries(currencySymbols).map(([code, symbol]) => (
                    <option key={code} value={code}>
                      {symbol} {code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bill Amount */}
              <div className="mb-6">
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Bill Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={billAmount}
                    onChange={handleBillChange}
                    placeholder="0.00"
                    className={`w-full p-4 pl-12 text-xl rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/20 ${
                      errors.billAmount
                        ? "border-red-400 focus:border-red-400 bg-red-50 dark:bg-red-900/20"
                        : isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:border-purple-400"
                        : "bg-white border-gray-200 focus:border-purple-400"
                    }`}
                  />
                  <span
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xl font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {currencySymbols[currency]}
                  </span>
                </div>
                {errors.billAmount && (
                  <p className="text-red-500 text-sm mt-1 animate-shake">
                    {errors.billAmount}
                  </p>
                )}
              </div>

              {/* Quick Tip Buttons */}
              <div className="mb-6">
                <label
                  className={`block text-sm font-medium mb-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <Percent className="w-4 h-4 inline mr-1" />
                  Quick Tip Selection
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {quickTipOptions.map((percent) => (
                    <button
                      key={percent}
                      onClick={() => setTipPercent(percent)}
                      className={`py-2 px-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                        tipPercent === percent
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                          : isDarkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                      }`}
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Tip Percentage */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Custom Tip Percentage
                  </label>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {tipPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={tipPercent}
                  onChange={(e) => setTipPercent(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Number of People */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <Users className="w-4 h-4 inline mr-1" />
                    Number of People
                  </label>
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {numPeople}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numPeople}
                  onChange={(e) => setNumPeople(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={saveToHistory}
                  disabled={!billAmount || results.totalAmount === 0}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Receipt className="w-5 h-5 inline mr-2" />
                  Save Calculation
                </button>
                <button
                  onClick={clearAll}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isDarkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <div
              className={`p-6 rounded-3xl shadow-xl backdrop-blur-sm transition-all duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-800/50 to-purple-900/30 border border-gray-700"
                  : "bg-gradient-to-br from-white/80 to-purple-50/80 border border-white/50"
              } animate-slide-left`}
            >
              {/* Results Display */}
              <div className="space-y-6">
                {/* Tip Amount */}
                <div
                  className={`p-4 rounded-2xl ${
                    isDarkMode ? "bg-gray-700/50" : "bg-white/60"
                  } backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Tip Amount
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-500 mt-1">
                    {formatCurrency(results.tipAmount)}
                  </div>
                </div>

                {/* Total Amount */}
                <div
                  className={`p-4 rounded-2xl ${
                    isDarkMode ? "bg-gray-700/50" : "bg-white/60"
                  } backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Total Amount
                    </span>
                    <DollarSign className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-blue-500 mt-1">
                    {formatCurrency(results.totalAmount)}
                  </div>
                </div>

                {/* Per Person */}
                <div
                  className={`p-4 rounded-2xl ${
                    isDarkMode ? "bg-gray-700/50" : "bg-white/60"
                  } backdrop-blur-sm transition-all duration-300 hover:scale-105`}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Per Person
                    </span>
                    <Users className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold text-purple-500 mt-1">
                    {formatCurrency(results.perPersonAmount)}
                  </div>
                </div>

                {/* Split Details Toggle */}
                {numPeople > 1 && (
                  <button
                    onClick={() => setShowSplitDetails(!showSplitDetails)}
                    className={`w-full p-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {showSplitDetails ? "Hide" : "Show"} Split Details
                  </button>
                )}

                {/* Split Details */}
                {showSplitDetails && numPeople > 1 && (
                  <div
                    className={`p-4 rounded-2xl ${
                      isDarkMode
                        ? "bg-gray-700/50 border border-gray-600"
                        : "bg-white/60 border border-gray-200"
                    } animate-fade-in`}
                  >
                    <h4
                      className={`font-medium mb-3 ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      } flex items-center`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Split Breakdown ({numPeople} people)
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div
                        className={`flex justify-between items-center p-2 rounded-lg ${
                          isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                        }`}
                      >
                        <span
                          className={`${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Bill per person:
                        </span>
                        <span
                          className={`font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {formatCurrency(
                            parseFloat(billAmount || 0) / numPeople
                          )}
                        </span>
                      </div>
                      <div
                        className={`flex justify-between items-center p-2 rounded-lg ${
                          isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                        }`}
                      >
                        <span
                          className={`${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Tip per person:
                        </span>
                        <span
                          className={`font-semibold ${
                            isDarkMode ? "text-green-400" : "text-green-600"
                          }`}
                        >
                          {formatCurrency(results.tipAmount / numPeople)}
                        </span>
                      </div>
                      <hr
                        className={`${
                          isDarkMode ? "border-gray-600" : "border-gray-300"
                        }`}
                      />
                      <div
                        className={`flex justify-between items-center p-3 rounded-lg ${
                          isDarkMode
                            ? "bg-purple-800/30 border border-purple-600/50"
                            : "bg-purple-50 border border-purple-200"
                        }`}
                      >
                        <span
                          className={`font-bold ${
                            isDarkMode ? "text-purple-300" : "text-purple-700"
                          }`}
                        >
                          Total per person:
                        </span>
                        <span
                          className={`font-bold text-lg ${
                            isDarkMode ? "text-purple-400" : "text-purple-600"
                          }`}
                        >
                          {formatCurrency(results.perPersonAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div
                className={`mt-6 p-4 rounded-2xl ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700"
                    : "bg-white/80 border border-white/50"
                } animate-fade-in`}
              >
                <h3
                  className={`font-medium mb-3 flex items-center ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <PiggyBank className="w-4 h-4 mr-2" />
                  Recent Calculations
                </h3>
                <div className="space-y-2">
                  {history.slice(0, 3).map((calc) => (
                    <div
                      key={calc.id}
                      className={`p-2 rounded-lg text-xs ${
                        isDarkMode ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>
                          {formatCurrency(calc.billAmount)} →{" "}
                          {formatCurrency(calc.results.totalAmount)}
                        </span>
                        <span
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {calc.tipPercent}% | {calc.numPeople} people
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default TipCraft;

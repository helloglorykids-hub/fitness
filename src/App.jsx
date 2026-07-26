import React, { useState, useEffect } from 'react';
import { ChevronUp, Plus, Trash2, TrendingUp, Calendar, Apple, Image, Zap } from 'lucide-react';

const FitnessApp = () => {
  const [activeTab, setActiveTab] = useState('workouts');
  const [workoutData, setWorkoutData] = useState({});
  const [weightData, setWeightData] = useState([]);
  const [nutritionData, setNutritionData] = useState([]);
  const [progressPhotos, setProgressPhotos] = useState([]);

  // PPL Program - Jandre's exact setup
  const PROGRAM = {
    'Monday - Push': [
      { name: 'Machine Bench Press', sets: 4, reps: '6-8', currentWeight: 45 },
      { name: 'Incline DB Press', sets: 4, reps: '8-10', currentWeight: 17.5 },
      { name: 'Machine Chest Flyes', sets: 3, reps: '10-12', currentWeight: 45 },
      { name: 'Shoulder Press (Machine)', sets: 3, reps: '8-10', currentWeight: 15 },
      { name: 'Lateral Raises (Cable)', sets: 3, reps: '12-15', currentWeight: 6 },
      { name: 'Tricep Rope Pushdowns', sets: 4, reps: '10-12', currentWeight: 17.5 },
      { name: 'Overhead Tricep Ext', sets: 4, reps: '10-12', currentWeight: 50 },
      { name: 'Skull Crushers (EZ Bar)', sets: 3, reps: '8-10', currentWeight: 20 },
      { name: 'Rope Curls (Cable)', sets: 3, reps: '12-15', currentWeight: 7.5 },
      { name: 'Ab Wheel Rollouts', sets: 3, reps: '8-12', currentWeight: 0 },
      { name: 'Cable Wood Chops', sets: 2, reps: '12/side', currentWeight: 15 },
    ],
    'Tuesday - Pull': [
      { name: 'Lat Pulldown', sets: 4, reps: '8-10', currentWeight: 45 },
      { name: 'Low Row Machine', sets: 4, reps: '8-10', currentWeight: 45 },
      { name: 'Seated Cable Rows', sets: 3, reps: '10-12', currentWeight: 35 },
      { name: 'Face Pulls', sets: 3, reps: '12-15', currentWeight: 20 },
      { name: 'Dumbbell Bicep Curls', sets: 4, reps: '10-12', currentWeight: 15 },
      { name: 'Barbell Curls', sets: 4, reps: '8-10', currentWeight: 20 },
      { name: 'Hammer Curls', sets: 3, reps: '12-15', currentWeight: 15 },
      { name: 'Cable Preacher Curls', sets: 3, reps: '12-15', currentWeight: 7.5 },
      { name: 'Reverse Flyes', sets: 3, reps: '12-15', currentWeight: 18 },
      { name: 'Ab Machine', sets: 3, reps: '12-15', currentWeight: 60 },
      { name: 'Hanging Leg Raises', sets: 2, reps: '8-12', currentWeight: 0 },
    ],
    'Wednesday - Legs': [
      { name: 'Smith Machine Squats', sets: 4, reps: '6-8', currentWeight: 45 },
      { name: 'Leg Press', sets: 4, reps: '8-10', currentWeight: 120 },
      { name: 'Romanian Deadlifts', sets: 3, reps: '8-10', currentWeight: 30 },
      { name: 'Leg Extensions', sets: 4, reps: '10-12', currentWeight: 50 },
      { name: 'Leg Curls', sets: 4, reps: '10-12', currentWeight: 50 },
      { name: 'Hip Thrusts', sets: 3, reps: '10-12', currentWeight: 30 },
      { name: 'Calf Raises (Machine)', sets: 3, reps: '12-15', currentWeight: 45 },
      { name: 'Hip Abductor Machine', sets: 3, reps: '12-15', currentWeight: 35 },
      { name: 'Sled Push', sets: 2, reps: '10-12', currentWeight: 0 },
    ],
    'Thursday - Push 2': [
      { name: 'Close-Grip Bench Press', sets: 3, reps: '8-10', currentWeight: 40 },
      { name: 'DB Shoulder Press', sets: 3, reps: '8-10', currentWeight: 25 },
      { name: 'Machine Chest Flyes', sets: 3, reps: '10-12', currentWeight: 50 },
      { name: 'Dumbbell Curls (Incline)', sets: 4, reps: '10-12', currentWeight: 12 },
      { name: 'Tricep Dips', sets: 3, reps: '8-10', currentWeight: 0 },
      { name: 'Cable Tricep Ext', sets: 3, reps: '12-15', currentWeight: 18 },
      { name: 'Barbell Curls (Light)', sets: 3, reps: '12-15', currentWeight: 15 },
      { name: 'Cable Lateral Raises', sets: 3, reps: '12-15', currentWeight: 8 },
      { name: 'Rear Delt Machine', sets: 3, reps: '12-15', currentWeight: 20 },
    ],
    'Friday - Pull 2': [
      { name: 'Deadlifts (Hex Bar)', sets: 3, reps: '3-5', currentWeight: 60 },
      { name: 'T-Bar Rows', sets: 4, reps: '8-10', currentWeight: 50 },
      { name: 'Wide-Grip Lat Pulldown', sets: 3, reps: '10-12', currentWeight: 40 },
      { name: 'Machine Preacher Curls', sets: 3, reps: '10-12', currentWeight: 35 },
      { name: 'Rope Curls (High Reps)', sets: 3, reps: '12-15', currentWeight: 7.5 },
      { name: 'Tricep Rope Pushdowns', sets: 3, reps: '12-15', currentWeight: 17.5 },
      { name: 'Assisted Back Extension', sets: 3, reps: '10-12', currentWeight: 40 },
      { name: 'Reverse Pec Deck', sets: 2, reps: '12-15', currentWeight: 18 },
    ],
  };

  const MEAL_PLAN = [
    { time: 'Breakfast (7-8 AM)', item: '6 whole eggs', cals: 430, protein: 36 },
    { time: '', item: '1 cappuccino', cals: 130, protein: 8 },
    { time: '', item: '1 banana', cals: 105, protein: 1 },
    { time: 'Lunch (12-1 PM)', item: '200g lean beef mince', cals: 330, protein: 54 },
    { time: '', item: '150g jasmine rice', cals: 165, protein: 3 },
    { time: '', item: '200g vegetables', cals: 70, protein: 6 },
    { time: 'Snack 1 (3-4 PM)', item: '150g blueberries', cals: 84, protein: 1 },
    { time: '', item: '200g full cream yogurt', cals: 150, protein: 20 },
    { time: '', item: '½ tbsp honey', cals: 60, protein: 0 },
    { time: 'Snack 2 (4-5 PM)', item: '1 avocado', cals: 240, protein: 3 },
    { time: '', item: '1 slice brown bread', cals: 80, protein: 3 },
    { time: '', item: '1 cappuccino', cals: 130, protein: 8 },
    { time: 'Dinner (6-7 PM)', item: '200g chicken', cals: 330, protein: 57 },
    { time: '', item: '200g vegetables', cals: 70, protein: 5 },
    { time: '', item: '130g sweet potato fries', cals: 130, protein: 2 },
    { time: 'Bedtime (8-9 PM)', item: '350ml whole milk', cals: 240, protein: 10.5 },
    { time: '', item: '2 scoops whey protein', cals: 180, protein: 48 },
    { time: '', item: '20g instant oats', cals: 75, protein: 2.5 },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('fitnessAppData');
    if (saved) {
      const data = JSON.parse(saved);
      setWorkoutData(data.workouts || {});
      setWeightData(data.weights || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fitnessAppData', JSON.stringify({ workouts: workoutData, weights: weightData, photos: progressPhotos }));
  }, [workoutData, weightData, progressPhotos]);

  const logSet = (day, idx, reps) => {
    const key = `${day}-${idx}`;
    const exercise = PROGRAM[day][idx];
    if (!workoutData[day]) workoutData[day] = {};
    if (!workoutData[day][key]) workoutData[day][key] = [];
    workoutData[day][key].push({ reps: parseInt(reps), weight: exercise.currentWeight, time: new Date().toLocaleTimeString() });
    setWorkoutData({ ...workoutData });
    const allReps = workoutData[day][key].map(s => s.reps);
    const [minReps, maxReps] = exercise.reps.split('-').map(Number);
    if (allReps.length === exercise.sets && allReps.every(r => r >= maxReps)) {
      const nextWeight = exercise.name.includes('Curl') || exercise.name.includes('Pushdown') ? exercise.currentWeight + 1 : exercise.currentWeight + 2.5;
      alert(`✅ Hit ${maxReps} reps all sets!\n${exercise.name}: ${exercise.currentWeight}kg → ${nextWeight}kg`);
    }
  };

  const addWeight = (w) => {
    setWeightData([...weightData, { weight: w, date: new Date().toISOString().split('T')[0] }]);
  };

  const getAvg = () => {
    if (weightData.length < 3) return '--';
    const recent = weightData.slice(-3);
    return (recent.reduce((sum, e) => sum + parseFloat(e.weight), 0) / 3).toFixed(1);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 sticky top-0 z-50 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-cyan-400">💪 Jandre's Fitness Dashboard</h1>
        <p className="text-sm text-gray-400">5-Day PPL | 92kg → 85kg | Week 1 of 12</p>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-32">
        {activeTab === 'workouts' && (
          <div className="space-y-4">
            {Object.entries(PROGRAM).map(([day, exercises]) => (
              <div key={day} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <h2 className="text-lg font-bold text-cyan-400 mb-3">{day}</h2>
                <div className="space-y-3">
                  {exercises.map((ex, idx) => {
                    const key = `${day}-${idx}`;
                    const logged = workoutData[day]?.[key] || [];
                    const remaining = ex.sets - logged.length;
                    const [minReps, maxReps] = ex.reps.split('-').map(Number);
                    return (
                      <div key={key} className="bg-gray-800 p-3 rounded border border-gray-700">
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="font-semibold text-white">{ex.name}</p>
                            <p className="text-sm text-gray-300">{ex.currentWeight}kg | {ex.sets}x{ex.reps} | {remaining} sets left</p>
                          </div>
                          {logged.length > 0 && <span className="bg-green-900 text-green-300 px-2 py-1 rounded text-xs font-bold">{logged.length}/{ex.sets}</span>}
                        </div>
                        {remaining > 0 && (
                          <div className="flex gap-2">
                            {[minReps, maxReps].map(r => (
                              <button key={r} onClick={() => logSet(day, idx, r)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded font-bold text-sm">
                                {r} reps
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'weights' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-4 border border-blue-700">
              <p className="text-gray-300 text-sm">Current</p>
              <p className="text-3xl font-bold">{weightData.length > 0 ? weightData[weightData.length - 1].weight : '--'}kg</p>
              <p className="text-cyan-300 text-sm">Weekly Avg: {getAvg()}kg</p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
              <h3 className="font-bold mb-3">Log Weight (Mon/Wed/Fri)</h3>
              <div className="flex gap-2">
                <input id="wInput" type="number" step="0.1" placeholder="kg" className="flex-1 bg-gray-800 text-white px-3 py-2 rounded border border-gray-700" />
                <button onClick={() => { const v = document.getElementById('wInput').value; if (v) { addWeight(v); document.getElementById('wInput').value = ''; } }} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold">Log</button>
              </div>
            </div>
            <div className="space-y-2">
              {weightData.slice().reverse().map((e, i) => <div key={i} className="bg-gray-900 p-3 rounded border border-gray-800"><p className="text-white font-bold">{e.weight}kg</p><p className="text-xs text-gray-400">{e.date}</p></div>)}
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <h2 className="text-lg font-bold text-cyan-400 mb-3">Your 3,000 Cal Meal Plan</h2>
            <div className="space-y-2 text-sm">
              {MEAL_PLAN.map((m, i) => <div key={i} className="p-2"><p className="text-white">{m.item} <span className="text-gray-400">({m.cals}cal)</span></p></div>)}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Total: 3,000 cal | 268g protein</p>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <h2 className="text-lg font-bold text-cyan-400 mb-4">Progress Tracking</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800 p-3 rounded"><p className="text-gray-400 text-xs">Starting</p><p className="text-2xl font-bold">92kg</p></div>
              <div className="bg-gray-800 p-3 rounded"><p className="text-gray-400 text-xs">Target</p><p className="text-2xl font-bold text-cyan-400">85kg</p></div>
              <div className="bg-gray-800 p-3 rounded"><p className="text-gray-400 text-xs">Current</p><p className="text-2xl font-bold">{weightData.length > 0 ? weightData[weightData.length - 1].weight : '--'}kg</p></div>
              <div className="bg-gray-800 p-3 rounded"><p className="text-gray-400 text-xs">Lost</p><p className="text-2xl font-bold text-green-400">{weightData.length > 0 ? (92 - parseFloat(weightData[weightData.length - 1].weight)).toFixed(1) : '--'}kg</p></div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around">
        {[{ id: 'workouts', icon: '💪', label: 'Workouts' }, { id: 'weights', icon: '⚖️', label: 'Weights' }, { id: 'nutrition', icon: '🍎', label: 'Nutrition' }, { id: 'progress', icon: '📈', label: 'Progress' }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex-1 py-3 font-bold border-t-2 transition ${activeTab === t.id ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FitnessApp;

import React, { useState, useEffect } from 'react';
import { ChevronUp, Plus, Trash2, AlertCircle, TrendingDown } from 'lucide-react';

const WORKOUT_TEMPLATE = {
  "Monday - Push": [
    { name: "Machine Bench Press", sets: 4, reps: "6-8", currentWeight: 45, notes: "Add 5kg at 10 reps" },
    { name: "Incline DB Press", sets: 4, reps: "8-10", currentWeight: 17.5, notes: "Jump 2.5kg weekly" },
    { name: "Machine Chest Flyes", sets: 3, reps: "10-12", currentWeight: 45, notes: "Controlled tempo" },
    { name: "Shoulder Press (Machine)", sets: 3, reps: "8-10", currentWeight: 15, notes: "Add 2.5kg weekly" },
    { name: "Lateral Raises (Cable)", sets: 3, reps: "12-15", currentWeight: 6, notes: "High reps" },
    { name: "Tricep Rope Pushdowns", sets: 4, reps: "10-12", currentWeight: 17.5, notes: "PRIORITY ARM" },
    { name: "Overhead Tricep Ext", sets: 4, reps: "10-12", currentWeight: 50, notes: "PRIORITY ARM" },
    { name: "Skull Crushers (EZ Bar)", sets: 3, reps: "8-10", currentWeight: 20, notes: "New exercise" },
    { name: "Rope Curls (Cable)", sets: 3, reps: "12-15", currentWeight: 7.5, notes: "Arm pump work" },
    { name: "Ab Wheel Rollouts", sets: 3, reps: "8-12", currentWeight: 0, notes: "CORE: 2 sec hold" },
    { name: "Cable Wood Chops", sets: 2, reps: "12/side", currentWeight: 15, notes: "CORE: Rotation" }
  ],
  "Tuesday - Pull": [
    { name: "Lat Pulldown", sets: 4, reps: "8-10", currentWeight: 45, notes: "Add 5kg at 10 reps" },
    { name: "Low Row Machine", sets: 4, reps: "8-10", currentWeight: 45, notes: "Heavy foundation" },
    { name: "Seated Cable Rows", sets: 3, reps: "10-12", currentWeight: 35, notes: "Focus squeeze" },
    { name: "Face Pulls", sets: 3, reps: "12-15", currentWeight: 20, notes: "Rear delts" },
    { name: "Dumbbell Bicep Curls", sets: 4, reps: "10-12", currentWeight: 15, notes: "PRIORITY ARM" },
    { name: "Barbell Curls", sets: 4, reps: "8-10", currentWeight: 20, notes: "PRIORITY ARM" },
    { name: "Hammer Curls", sets: 3, reps: "12-15", currentWeight: 15, notes: "Brachialis" },
    { name: "Cable Preacher Curls", sets: 3, reps: "12-15", currentWeight: 7.5, notes: "Finisher" },
    { name: "Reverse Flyes", sets: 3, reps: "12-15", currentWeight: 18, notes: "Back work" },
    { name: "Ab Machine", sets: 3, reps: "12-15", currentWeight: 60, notes: "CORE: Flexion" },
    { name: "Hanging Leg Raises", sets: 2, reps: "8-12", currentWeight: 0, notes: "CORE: Strength" }
  ],
  "Wednesday - Legs": [
    { name: "Smith Machine Squats", sets: 4, reps: "6-8", currentWeight: 50, notes: "PRIORITY LEGS" },
    { name: "Leg Press", sets: 4, reps: "8-10", currentWeight: 130, notes: "PRIORITY LEGS" },
    { name: "Romanian Deadlifts", sets: 3, reps: "8-10", currentWeight: 35, notes: "Hamstring growth" },
    { name: "Leg Extensions", sets: 4, reps: "10-12", currentWeight: 50, notes: "Quad isolation" },
    { name: "Leg Curls", sets: 4, reps: "10-12", currentWeight: 50, notes: "Ham isolation" },
    { name: "Hip Thrusts", sets: 3, reps: "10-12", currentWeight: 35, notes: "Glute growth" },
    { name: "Calf Raises (Machine)", sets: 3, reps: "12-15", currentWeight: 45, notes: "Calves 3x/week" },
    { name: "Hip Abductor Machine", sets: 3, reps: "12-15", currentWeight: 35, notes: "Glute support" },
    { name: "Sled Push (optional)", sets: 2, reps: "10-12", currentWeight: 0, notes: "Quad finisher" }
  ],
  "Thursday - Push 2": [
    { name: "Close-Grip Bench Press", sets: 3, reps: "8-10", currentWeight: 40, notes: "Secondary chest" },
    { name: "DB Shoulder Press", sets: 3, reps: "8-10", currentWeight: 25, notes: "Shoulder volume" },
    { name: "Machine Chest Flyes", sets: 3, reps: "10-12", currentWeight: 50, notes: "Chest finisher" },
    { name: "Dumbbell Curls (Incline)", sets: 4, reps: "10-12", currentWeight: 12, notes: "PRIORITY ARM" },
    { name: "Tricep Dips", sets: 3, reps: "8-10", currentWeight: 0, notes: "PRIORITY ARM" },
    { name: "Cable Tricep Ext", sets: 3, reps: "12-15", currentWeight: 18, notes: "Tri finisher" },
    { name: "Barbell Curls (Light)", sets: 3, reps: "12-15", currentWeight: 15, notes: "Volume work" },
    { name: "Cable Lateral Raises", sets: 3, reps: "12-15", currentWeight: 8, notes: "Shoulder width" },
    { name: "Rear Delt Machine", sets: 3, reps: "12-15", currentWeight: 20, notes: "Rear delts" }
  ],
  "Friday - Pull 2": [
    { name: "Deadlifts (Hex Bar)", sets: 3, reps: "3-5", currentWeight: 60, notes: "Heaviest lift" },
    { name: "T-Bar Rows", sets: 4, reps: "8-10", currentWeight: 50, notes: "Heavy rows" },
    { name: "Wide-Grip Lat Pulldown", sets: 3, reps: "10-12", currentWeight: 40, notes: "Back width" },
    { name: "Machine Preacher Curls", sets: 3, reps: "10-12", currentWeight: 35, notes: "PRIORITY ARM" },
    { name: "Rope Curls (High Reps)", sets: 3, reps: "12-15", currentWeight: 7.5, notes: "Arm pump" },
    { name: "Tricep Rope Pushdowns", sets: 3, reps: "12-15", currentWeight: 17.5, notes: "Tri pump" },
    { name: "Assisted Back Extension", sets: 3, reps: "10-12", currentWeight: 40, notes: "Lower back" },
    { name: "Reverse Pec Deck", sets: 2, reps: "12-15", currentWeight: 18, notes: "Rear delts" }
  ]
};

const PROGRESSION_RULES = {
  "Heavy Compounds": { increment: 2.5, frequency: "Every 2 weeks", examples: ["Bench", "Squat", "Rows", "Deadlifts"] },
  "Arms": { increment: 1, frequency: "Every week", examples: ["Curls", "Pushdowns", "Extensions"] },
  "Legs": { increment: 5, frequency: "Every 2 weeks", examples: ["Leg Press", "Squats"] }
};

export default function JandreFitnessDashboard() {
  const [activeTab, setActiveTab] = useState('workouts');
  const [workoutSessions, setWorkoutSessions] = useState([]);
  const [weights, setWeights] = useState([]);
  const [nutrition, setNutrition] = useState([]);
  const [progress, setProgress] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('jandreFitnessDashboard');
    if (savedData) {
      const data = JSON.parse(savedData);
      setWorkoutSessions(data.workoutSessions || []);
      setWeights(data.weights || []);
      setNutrition(data.nutrition || []);
      setProgress(data.progress || []);
    }
  }, []);

  // Save to localStorage whenever any data changes
  useEffect(() => {
    localStorage.setItem('jandreFitnessDashboard', JSON.stringify({
      workoutSessions,
      weights,
      nutrition,
      progress
    }));
  }, [workoutSessions, weights, nutrition, progress]);

  // ============ WORKOUT FUNCTIONS ============
  const addWorkoutSession = (dayKey) => {
    const newSession = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      day: dayKey,
      exercises: WORKOUT_TEMPLATE[dayKey].map(template => ({
        id: Date.now() + Math.random(),
        name: template.name,
        targetSets: template.sets,
        targetReps: template.reps,
        currentWeight: template.currentWeight,
        notes: template.notes,
        sets: []
      }))
    };
    setWorkoutSessions([...workoutSessions, newSession]);
  };

  const addSet = (sessionId, exerciseId) => {
    setWorkoutSessions(workoutSessions.map(w => {
      if (w.id === sessionId) {
        return {
          ...w,
          exercises: w.exercises.map(e => {
            if (e.id === exerciseId) {
              return {
                ...e,
                sets: [...e.sets, { id: Date.now(), reps: '', weight: '', completed: false }]
              };
            }
            return e;
          })
        };
      }
      return w;
    }));
  };

  const updateSet = (sessionId, exerciseId, setId, field, value) => {
    setWorkoutSessions(workoutSessions.map(w => {
      if (w.id === sessionId) {
        return {
          ...w,
          exercises: w.exercises.map(e => {
            if (e.id === exerciseId) {
              return {
                ...e,
                sets: e.sets.map(s => s.id === setId ? { ...s, [field]: value } : s)
              };
            }
            return e;
          })
        };
      }
      return w;
    }));
  };

  const deleteSet = (sessionId, exerciseId, setId) => {
    setWorkoutSessions(workoutSessions.map(w => {
      if (w.id === sessionId) {
        return {
          ...w,
          exercises: w.exercises.map(e => {
            if (e.id === exerciseId) {
              return {
                ...e,
                sets: e.sets.filter(s => s.id !== setId)
              };
            }
            return e;
          })
        };
      }
      return w;
    }));
  };

  const deleteSession = (sessionId) => {
    setWorkoutSessions(workoutSessions.filter(w => w.id !== sessionId));
  };

  const checkProgression = (exercise) => {
    if (!exercise.sets || exercise.sets.length === 0) return null;
    
    const repRange = exercise.targetReps.split('-').map(x => parseInt(x));
    const maxReps = Math.max(...repRange);
    const lastSet = exercise.sets[exercise.sets.length - 1];
    
    if (lastSet.reps >= maxReps) {
      let category = "Arms";
      if (["Bench", "Squat", "Row", "Deadlift", "Press"].some(word => exercise.name.includes(word))) {
        category = "Heavy Compounds";
      } else if (["Leg", "Hip", "Calf"].some(word => exercise.name.includes(word))) {
        category = "Legs";
      }
      
      const rule = PROGRESSION_RULES[category];
      const nextWeight = (parseFloat(exercise.currentWeight) + rule.increment).toFixed(1);
      
      return {
        message: `🎯 Hit ${lastSet.reps} reps! Ready to progress.`,
        nextWeight: nextWeight,
        increment: rule.increment,
        category: category
      };
    }
    return null;
  };

  const applyProgression = (sessionId, exerciseId) => {
    setWorkoutSessions(workoutSessions.map(w => {
      if (w.id === sessionId) {
        return {
          ...w,
          exercises: w.exercises.map(e => {
            if (e.id === exerciseId) {
              const progression = checkProgression(e);
              if (progression) {
                return {
                  ...e,
                  currentWeight: parseFloat(progression.nextWeight)
                };
              }
            }
            return e;
          })
        };
      }
      return w;
    }));
  };

  // ============ WEIGHT TRACKING ============
  const addWeightEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    setWeights([...weights, {
      id: Date.now(),
      weekStart: today,
      entries: { monday: null, wednesday: null, friday: null }
    }]);
  };

  const updateWeightEntry = (entryId, day, value) => {
    setWeights(weights.map(w => {
      if (w.id === entryId) {
        return {
          ...w,
          entries: { ...w.entries, [day]: value ? parseFloat(value) : null }
        };
      }
      return w;
    }));
  };

  const calculateWeeklyAverage = (entries) => {
    const values = Object.values(entries).filter(v => v !== null);
    if (values.length === 0) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  };

  // ============ NUTRITION ============
  const addNutritionEntry = () => {
    const today = new Date().toISOString().split('T')[0];
    setNutrition([...nutrition, {
      id: Date.now(),
      date: today,
      meals: [
        { id: Date.now(), name: "Breakfast (6 eggs, cappuccino, banana)", calories: 665, protein: 45, carbs: 15, fats: 20 }
      ],
      totals: { calories: 665, protein: 45, carbs: 15, fats: 20 }
    }]);
  };

  const addMeal = (entryId) => {
    setNutrition(nutrition.map(n => {
      if (n.id === entryId) {
        return {
          ...n,
          meals: [...n.meals, { id: Date.now(), name: '', calories: 0, protein: 0, carbs: 0, fats: 0 }]
        };
      }
      return n;
    }));
  };

  const updateMeal = (entryId, mealId, field, value) => {
    setNutrition(nutrition.map(n => {
      if (n.id === entryId) {
        const updatedMeals = n.meals.map(m => m.id === mealId ? { ...m, [field]: field === 'name' ? value : parseFloat(value) || 0 } : m);
        const totals = {
          calories: updatedMeals.reduce((sum, m) => sum + m.calories, 0),
          protein: updatedMeals.reduce((sum, m) => sum + m.protein, 0),
          carbs: updatedMeals.reduce((sum, m) => sum + m.carbs, 0),
          fats: updatedMeals.reduce((sum, m) => sum + m.fats, 0)
        };
        return { ...n, meals: updatedMeals, totals };
      }
      return n;
    }));
  };

  const deleteMeal = (entryId, mealId) => {
    setNutrition(nutrition.map(n => {
      if (n.id === entryId) {
        const updatedMeals = n.meals.filter(m => m.id !== mealId);
        const totals = {
          calories: updatedMeals.reduce((sum, m) => sum + m.calories, 0),
          protein: updatedMeals.reduce((sum, m) => sum + m.protein, 0),
          carbs: updatedMeals.reduce((sum, m) => sum + m.carbs, 0),
          fats: updatedMeals.reduce((sum, m) => sum + m.fats, 0)
        };
        return { ...n, meals: updatedMeals, totals };
      }
      return n;
    }));
  };

  // ============ PROGRESS NOTES ============
  const addProgressNote = () => {
    setProgress([...progress, {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      measurements: '',
      notes: ''
    }]);
  };

  const updateProgressNote = (id, field, value) => {
    setProgress(progress.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deleteProgressNote = (id) => {
    setProgress(progress.filter(p => p.id !== id));
  };

  // ============ RENDER FUNCTIONS ============
  const renderWorkouts = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Your 5-Day PPL Program</h3>
        <p className="text-sm text-blue-800">All exercises pre-loaded with your current weights and rep targets. Log each set, and the app will tell you when to increase weight.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(WORKOUT_TEMPLATE).map(day => (
          <button
            key={day}
            onClick={() => addWorkoutSession(day)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Plus size={20} /> {day}
          </button>
        ))}
      </div>

      {workoutSessions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No workouts logged yet. Click a day above to start.</p>
        </div>
      ) : (
        workoutSessions.map(session => (
          <div key={session.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{session.day}</h3>
                <input
                  type="date"
                  value={session.date}
                  className="px-3 py-1 border border-gray-300 rounded text-sm mt-1"
                  onChange={(e) => setWorkoutSessions(workoutSessions.map(w => w.id === session.id ? { ...w, date: e.target.value } : w))}
                />
              </div>
              <button
                onClick={() => deleteSession(session.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {session.exercises.map(exercise => {
                const progression = checkProgression(exercise);
                return (
                  <div key={exercise.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="border-b pb-3">
                      <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                      <p className="text-xs text-gray-600 mt-1">Target: {exercise.targetSets} sets x {exercise.targetReps} reps @ {exercise.currentWeight}kg | {exercise.notes}</p>
                    </div>

                    {progression && (
                      <div className="bg-emerald-50 border border-emerald-300 rounded p-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <ChevronUp className="text-emerald-600 flex-shrink-0 mt-0.5" size={16} />
                          <div>
                            <p className="text-emerald-700 text-sm font-semibold">{progression.message}</p>
                            <p className="text-emerald-600 text-xs mt-1">Next weight: <strong>{progression.nextWeight}kg</strong> (+{progression.increment}kg) — {progression.category}</p>
                            <button
                              onClick={() => applyProgression(session.id, exercise.id)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1 rounded mt-2 font-semibold"
                            >
                              Apply +{progression.increment}kg
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {exercise.sets.map((set, idx) => (
                        <div key={set.id} className="flex gap-2 items-center bg-gray-50 p-3 rounded">
                          <span className="text-sm font-semibold text-gray-600 w-8">Set {idx + 1}</span>
                          <input
                            type="number"
                            placeholder="Reps"
                            value={set.reps}
                            onChange={(e) => updateSet(session.id, exercise.id, set.id, 'reps', e.target.value)}
                            className="w-20 px-2 py-2 border border-gray-300 rounded text-sm font-semibold"
                          />
                          <span className="text-gray-600">x</span>
                          <input
                            type="number"
                            step="0.5"
                            placeholder="Weight"
                            value={set.weight}
                            className="w-24 px-2 py-2 border border-gray-300 rounded text-sm font-semibold"
                            onChange={(e) => updateSet(session.id, exercise.id, set.id, 'weight', e.target.value)}
                          />
                          <span className="text-gray-600">kg</span>
                          <button
                            onClick={() => deleteSet(session.id, exercise.id, set.id)}
                            className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addSet(session.id, exercise.id)}
                      className="text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded text-sm font-semibold flex items-center gap-1"
                    >
                      <Plus size={14} /> Add Set
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderWeights = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Weekly Weight Tracking</h3>
        <p className="text-sm text-blue-800">Log Monday, Wednesday, Friday. The app calculates your weekly average. Target: -0.5 to -0.7kg per week.</p>
      </div>

      <button
        onClick={addWeightEntry}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
      >
        <Plus size={20} /> New Week
      </button>

      {weights.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No weight entries yet. Start tracking this week.</p>
        </div>
      ) : (
        weights.map(entry => (
          <div key={entry.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold uppercase">Week Starting</p>
                <input
                  type="date"
                  value={entry.weekStart}
                  className="px-3 py-2 border border-gray-300 rounded text-sm mt-1"
                  onChange={(e) => setWeights(weights.map(w => w.id === entry.id ? { ...w, weekStart: e.target.value } : w))}
                />
              </div>
              <div className="text-right bg-emerald-50 rounded-lg p-4 border border-emerald-300">
                <p className="text-xs text-emerald-700 font-semibold uppercase">Weekly Average</p>
                <p className="text-4xl font-bold text-emerald-600">{calculateWeeklyAverage(entry.entries)}</p>
                <p className="text-sm text-emerald-600 font-semibold">kg</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['monday', 'wednesday', 'friday'].map(day => (
                <div key={day} className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">{day}</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="kg"
                    value={entry.entries[day] || ''}
                    onChange={(e) => updateWeightEntry(entry.id, day, e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded text-lg font-bold text-center"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderNutrition = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Daily Nutrition Tracking</h3>
        <p className="text-sm text-blue-800">Target: 3,000 cal | 250g protein. Pre-loaded with your meal plan. Adjust as needed.</p>
      </div>

      <button
        onClick={addNutritionEntry}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
      >
        <Plus size={20} /> New Day
      </button>

      {nutrition.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No nutrition entries yet. Click above to start.</p>
        </div>
      ) : (
        nutrition.map(entry => (
          <div key={entry.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
            <input
              type="date"
              value={entry.date}
              className="px-3 py-2 border border-gray-300 rounded text-sm"
              onChange={(e) => setNutrition(nutrition.map(n => n.id === entry.id ? { ...n, date: e.target.value } : n))}
            />

            <div className="grid grid-cols-4 gap-3 bg-white rounded-lg p-4 border border-gray-200">
              <div>
                <p className="text-xs text-gray-600 font-bold uppercase">Calories</p>
                <p className="text-2xl font-bold text-emerald-600">{Math.round(entry.totals.calories)}</p>
                <p className="text-xs text-gray-500">/ 3000</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-bold uppercase">Protein</p>
                <p className="text-2xl font-bold text-blue-600">{Math.round(entry.totals.protein)}g</p>
                <p className="text-xs text-gray-500">/ 250g</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-bold uppercase">Carbs</p>
                <p className="text-2xl font-bold text-orange-600">{Math.round(entry.totals.carbs)}g</p>
                <p className="text-xs text-gray-500">/ 300g</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-bold uppercase">Fats</p>
                <p className="text-2xl font-bold text-yellow-600">{Math.round(entry.totals.fats)}g</p>
                <p className="text-xs text-gray-500">/ 75g</p>
              </div>
            </div>

            <div className="space-y-3">
              {entry.meals.map(meal => (
                <div key={meal.id} className="bg-white border border-gray-200 rounded p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Meal name"
                      value={meal.name}
                      onChange={(e) => updateMeal(entry.id, meal.id, 'name', e.target.value)}
                      className="flex-1 px-2 py-2 border border-gray-300 rounded font-semibold text-sm"
                    />
                    <button
                      onClick={() => deleteMeal(entry.id, meal.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <input type="number" placeholder="Cal" value={meal.calories || ''} onChange={(e) => updateMeal(entry.id, meal.id, 'calories', e.target.value)} className="px-2 py-2 border border-gray-300 rounded text-xs" />
                    <input type="number" placeholder="Protein g" value={meal.protein || ''} onChange={(e) => updateMeal(entry.id, meal.id, 'protein', e.target.value)} className="px-2 py-2 border border-gray-300 rounded text-xs" />
                    <input type="number" placeholder="Carbs g" value={meal.carbs || ''} onChange={(e) => updateMeal(entry.id, meal.id, 'carbs', e.target.value)} className="px-2 py-2 border border-gray-300 rounded text-xs" />
                    <input type="number" placeholder="Fats g" value={meal.fats || ''} onChange={(e) => updateMeal(entry.id, meal.id, 'fats', e.target.value)} className="px-2 py-2 border border-gray-300 rounded text-xs" />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => addMeal(entry.id)}
              className="w-full border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 py-2 rounded font-medium text-sm flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Meal
            </button>
          </div>
        ))
      )}
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Progress Notes & Measurements</h3>
        <p className="text-sm text-blue-800">Use this for your 3-week check-ins. Log measurements, photos, and how training feels.</p>
      </div>

      <button
        onClick={addProgressNote}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
      >
        <Plus size={20} /> New Progress Note
      </button>

      {progress.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No notes yet. Add one for your week 3 check-in.</p>
        </div>
      ) : (
        progress.map(note => (
          <div key={note.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <input type="date" value={note.date} className="px-3 py-2 border border-gray-300 rounded text-sm" onChange={(e) => updateProgressNote(note.id, 'date', e.target.value)} />
              <button onClick={() => deleteProgressNote(note.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 size={18} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Measurements (Waist, Chest, Arms, Legs)</label>
              <textarea placeholder="e.g., Waist: 93cm, Chest: 102cm, Bicep: 35cm, Thigh: 60cm" value={note.measurements} onChange={(e) => updateProgressNote(note.id, 'measurements', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" rows="2" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Notes</label>
              <textarea placeholder="Energy levels, visual changes, strength progression, photos taken..." value={note.notes} onChange={(e) => updateProgressNote(note.id, 'notes', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm" rows="4" />
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">💪 Jandre's Fitness Dashboard</h1>
          <p className="text-emerald-100 mt-2">5-Day PPL Body Recomposition | 92kg → 85kg | Week 1 of 12</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0">
            {[
              { id: 'workouts', label: '🏋️ Workouts' },
              { id: 'weights', label: '⚖️ Weights' },
              { id: 'nutrition', label: '🍽️ Nutrition' },
              { id: 'progress', label: '📊 Progress' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-bold border-b-4 transition text-lg ${
                  activeTab === tab.id
                    ? 'text-emerald-600 border-emerald-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'workouts' && renderWorkouts()}
        {activeTab === 'weights' && renderWeights()}
        {activeTab === 'nutrition' && renderNutrition()}
        {activeTab === 'progress' && renderProgress()}
      </div>
    </div>
  );
}

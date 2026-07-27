import React, { useState, useEffect } from 'react';

const FitnessApp = () => {
  const [selectedDay, setSelectedDay] = useState('Monday - Push');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionData, setSessionData] = useState({});

  const PROGRAM = {
    'Monday - Push': [
      { name: 'Machine Bench Press', sets: 4, reps: '6-8', weight: 45 },
      { name: 'Incline DB Press', sets: 4, reps: '8-10', weight: 17.5 },
      { name: 'Machine Chest Flyes', sets: 3, reps: '10-12', weight: 45 },
      { name: 'Shoulder Press (Machine)', sets: 3, reps: '8-10', weight: 15 },
      { name: 'Lateral Raises (Cable)', sets: 3, reps: '12-15', weight: 6 },
      { name: 'Tricep Rope Pushdowns', sets: 4, reps: '10-12', weight: 17.5 },
      { name: 'Overhead Tricep Ext', sets: 4, reps: '10-12', weight: 50 },
      { name: 'Skull Crushers (EZ Bar)', sets: 3, reps: '8-10', weight: 20 },
      { name: 'Rope Curls (Cable)', sets: 3, reps: '12-15', weight: 7.5 },
      { name: 'Ab Wheel Rollouts', sets: 3, reps: '8-12', weight: 0 },
      { name: 'Cable Wood Chops', sets: 2, reps: '12/side', weight: 15 },
    ],
    'Tuesday - Pull': [
      { name: 'Lat Pulldown', sets: 4, reps: '8-10', weight: 45 },
      { name: 'Low Row Machine', sets: 4, reps: '8-10', weight: 45 },
      { name: 'Seated Cable Rows', sets: 3, reps: '10-12', weight: 35 },
      { name: 'Face Pulls', sets: 3, reps: '12-15', weight: 20 },
      { name: 'Dumbbell Bicep Curls', sets: 4, reps: '10-12', weight: 15 },
      { name: 'Barbell Curls', sets: 4, reps: '8-10', weight: 20 },
      { name: 'Hammer Curls', sets: 3, reps: '12-15', weight: 15 },
      { name: 'Cable Preacher Curls', sets: 3, reps: '12-15', weight: 7.5 },
      { name: 'Reverse Flyes', sets: 3, reps: '12-15', weight: 18 },
      { name: 'Ab Machine', sets: 3, reps: '12-15', weight: 60 },
      { name: 'Hanging Leg Raises', sets: 2, reps: '8-12', weight: 0 },
    ],
    'Wednesday - Legs': [
      { name: 'Smith Machine Squats', sets: 4, reps: '6-8', weight: 45 },
      { name: 'Leg Press', sets: 4, reps: '8-10', weight: 120 },
      { name: 'Romanian Deadlifts', sets: 3, reps: '8-10', weight: 30 },
      { name: 'Leg Extensions', sets: 4, reps: '10-12', weight: 50 },
      { name: 'Leg Curls', sets: 4, reps: '10-12', weight: 50 },
      { name: 'Hip Thrusts', sets: 3, reps: '10-12', weight: 30 },
      { name: 'Calf Raises (Machine)', sets: 3, reps: '12-15', weight: 45 },
      { name: 'Hip Abductor Machine', sets: 3, reps: '12-15', weight: 35 },
      { name: 'Sled Push', sets: 2, reps: '10-12', weight: 0 },
    ],
    'Thursday - Push 2': [
      { name: 'Close-Grip Bench Press', sets: 3, reps: '8-10', weight: 40 },
      { name: 'DB Shoulder Press', sets: 3, reps: '8-10', weight: 25 },
      { name: 'Machine Chest Flyes', sets: 3, reps: '10-12', weight: 50 },
      { name: 'Dumbbell Curls (Incline)', sets: 4, reps: '10-12', weight: 12 },
      { name: 'Tricep Dips', sets: 3, reps: '8-10', weight: 0 },
      { name: 'Cable Tricep Ext', sets: 3, reps: '12-15', weight: 18 },
      { name: 'Barbell Curls (Light)', sets: 3, reps: '12-15', weight: 15 },
      { name: 'Cable Lateral Raises', sets: 3, reps: '12-15', weight: 8 },
      { name: 'Rear Delt Machine', sets: 3, reps: '12-15', weight: 20 },
    ],
    'Friday - Pull 2': [
      { name: 'Deadlifts (Hex Bar)', sets: 3, reps: '3-5', weight: 60 },
      { name: 'T-Bar Rows', sets: 4, reps: '8-10', weight: 50 },
      { name: 'Wide-Grip Lat Pulldown', sets: 3, reps: '10-12', weight: 40 },
      { name: 'Machine Preacher Curls', sets: 3, reps: '10-12', weight: 35 },
      { name: 'Rope Curls (High Reps)', sets: 3, reps: '12-15', weight: 7.5 },
      { name: 'Tricep Rope Pushdowns', sets: 3, reps: '12-15', weight: 17.5 },
      { name: 'Assisted Back Extension', sets: 3, reps: '10-12', weight: 40 },
      { name: 'Reverse Pec Deck', sets: 2, reps: '12-15', weight: 18 },
    ],
  };

  useEffect(() => {
    const saved = localStorage.getItem('jandreSessionData');
    if (saved) setSessionData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('jandreSessionData', JSON.stringify(sessionData));
  }, [sessionData]);

  const addSet = (exerciseName) => {
    const key = `${selectedDate}-${selectedDay}-${exerciseName}`;
    const exercise = PROGRAM[selectedDay].find(e => e.name === exerciseName);
    
    if (!sessionData[key]) sessionData[key] = [];
    sessionData[key].push({ weight: exercise.weight, reps: parseInt(exercise.reps.split('-')[0]), id: Date.now() });
    setSessionData({ ...sessionData });
  };

  const deleteSet = (exerciseName, setId) => {
    const key = `${selectedDate}-${selectedDay}-${exerciseName}`;
    sessionData[key] = sessionData[key].filter(s => s.id !== setId);
    setSessionData({ ...sessionData });
  };

  const getProgressionNote = (exercise) => {
    const [minReps, maxReps] = exercise.reps.split('-').map(Number);
    const increment = exercise.name.includes('Curl') || exercise.name.includes('Pushdown') ? 1 : 2.5;
    return `Add ${increment}kg at ${maxReps} reps`;
  };

  const exercises = PROGRAM[selectedDay];
  const dayKey = (exerciseName) => `${selectedDate}-${selectedDay}-${exerciseName}`;

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#1e88e5', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>💪 Jandre's Fitness</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '20px' }}>
          {Object.keys(PROGRAM).map(day => (
            <button key={day} onClick={() => setSelectedDay(day)} style={{ padding: '14px', fontSize: '16px', fontWeight: 'bold', color: selectedDay === day ? '#fff' : '#333', backgroundColor: selectedDay === day ? '#1e88e5' : '#fff', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
              + {day}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '16px' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>{selectedDay}</h2>

          {exercises.map(exercise => {
            const key = dayKey(exercise.name);
            const logged = sessionData[key] || [];
            return (
              <div key={exercise.name} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>{exercise.name}</h3>
                <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>Target: {exercise.sets} sets x {exercise.reps} reps @ {exercise.weight}kg | {getProgressionNote(exercise)}</p>
                
                {logged.length > 0 && (
                  <div style={{ backgroundColor: '#f9f9f9', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                    {logged.map(set => (
                      <div key={set.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', color: '#333' }}>
                        <span>{set.weight}kg x {set.reps}</span>
                        <button onClick={() => deleteSet(exercise.name, set.id)} style={{ backgroundColor: '#ff5252', color: '#fff', border: 'none', padding: '2px 6px', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}>🗑</button>
                      </div>
                    ))}
                  </div>
                )}
                
                <button onClick={() => addSet(exercise.name)} style={{ color: '#1e88e5', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', padding: 0 }}>+ Add Set</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FitnessApp;

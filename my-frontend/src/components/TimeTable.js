import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimeTable = () => {
  const [timeTable, setTimeTable] = useState([]);

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const response = await axios.get('/api/timetable');
        setTimeTable(response.data);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimeTable();
  }, []);

  return (
    <div>
      {timeTable.map(entry => (
        <div key={entry.id}>
          <h2>{entry.date}</h2>
          <p>{entry.activity}</p>
        </div>
      ))}
    </div>
  );
}

export default TimeTable;

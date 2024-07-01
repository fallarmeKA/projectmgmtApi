import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get('/api/report');
        setReport(response.data);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    fetchReport();
  }, []);

  return (
    <div>
      {report.map(entry => (
        <div key={entry.id}>
          <h2>{entry.title}</h2>
          <p>{entry.details}</p>
        </div>
      ))}
    </div>
  );
}

export default Report;

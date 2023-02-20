import React from 'react';

function HistoryList() {
  return (
    <div className="quiz-history">
      <h2 className="text-xl mb-2">History</h2>
      <div className="quiz-history-list">
        <div className="quizdata bg-orange-200">
          <div>
            <h3 className="font-bold">Test Name:</h3>
            <p>Basic Mathematics</p>
          </div>
          <div>
            <h3 className="font-bold">Score:</h3>
            <p>180</p>
          </div>
          <div>
            <h3 className="font-bold">Date taken:</h3>
            <p>February 16, 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryList;

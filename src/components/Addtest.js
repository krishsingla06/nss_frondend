import React, { useState, useContext } from "react";
import { userContext } from "../App";

const Addtest = () => {
  const { userlist } = useContext(userContext);
  const [testNum, setTestNum] = useState("");
  const [scheduled, setScheduled] = useState("");
  const [questions, setQuestions] = useState([
    { q: "", options: ["", "", "", ""], ans: 0, marked: -1 },
  ]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "options") {
      updatedQuestions[index].options = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { q: "", options: ["", "", "", ""], ans: 0, marked: -1 },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const testDetails = {
      testnum: parseInt(testNum, 10),
      scheduled,
      questions,
      allocatedStudents: selectedStudents,
    };

    console.log(testDetails);

    try {
      const response = await fetch("http://localhost:8000/addtestadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testDetails),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Test added successfully!");
        setTestNum("");
        setScheduled("");
        setQuestions([
          { q: "", options: ["", "", "", ""], ans: 0, marked: -1 },
        ]);
        setSelectedStudents([]);
      } else {
        alert("Failed to add test. Please try again.");
      }
    } catch (error) {
      console.error("Error adding test:", error);
      alert("An error occurred while adding the test.");
    }
  };

  const handleQuestionDelete = (index) => () => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question, i) => i !== index)
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add Test</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="testNum" className="block text-sm font-medium">
            Test Number :
          </label>
          <input
            type="number"
            id="testNum"
            value={testNum}
            onChange={(e) => setTestNum(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="scheduled" className="block text-sm font-medium">
            Scheduled Time :
          </label>
          <input
            type="text"
            id="scheduled"
            value={scheduled}
            onChange={(e) => setScheduled(e.target.value)}
            className="w-full p-2 border rounded"
            title="MM/DD/YYYY HH:MM:SS AM/PM"
            placeholder="MM/DD/YYYY HH:MM:SS AM/PM"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Questions:</label>
          {questions.map((question, index) => (
            <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  value={question.q}
                  onChange={(e) =>
                    handleQuestionChange(index, "q", e.target.value)
                  }
                  className="w-full p-2 border rounded bg-white resize-x resize-y"
                  style={{
                    minWidth: "1250px",
                  }}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Options
                </label>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...question.options];
                        updatedOptions[optIndex] = e.target.value;
                        handleQuestionChange(index, "options", updatedOptions);
                      }}
                      className="w-full p-2 border rounded bg-white"
                      placeholder={`Option ${optIndex + 1}`}
                      required
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  Correct Answer Index
                </label>
                <input
                  type="number"
                  value={question.ans}
                  onChange={(e) =>
                    handleQuestionChange(
                      index,
                      "ans",
                      parseInt(e.target.value, 10)
                    )
                  }
                  className="w-full p-2 border rounded bg-white"
                  placeholder="Enter correct option index (0-3)"
                  min="0"
                  max="3"
                  required
                />
              </div>

              <button
                className="mt-4 bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm"
                type="button"
                onClick={handleQuestionDelete(index)}
              >
                Delete Question
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 mt-2"
          >
            Add Question
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Select Students:
          </label>
          <div className="space-y-2">
            {/* {selectall } */}

            <button
              className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
              type="button"
              onClick={() =>
                setSelectedStudents(userlist.map((user) => user.username))
              }
            >
              Select All
            </button>

            {userlist && userlist.length > 0 ? (
              userlist.map((user) => (
                <div key={user.username} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`student-${user.username}`}
                    value={user.username}
                    checked={selectedStudents.includes(user.username)}
                    onChange={() => handleStudentSelection(user.username)}
                    className="mr-2"
                  />
                  <label htmlFor={`student -`}>{user.username}</label>
                </div>
              ))
            ) : (
              <p>No students available.</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Test
        </button>
      </form>
    </div>
  );
};

export default Addtest;

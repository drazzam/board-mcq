const QuestionCard = ({ question, selectedAnswer, showExplanation, onAnswerSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-bold mb-4">Question {question.id}</h2>
      <p className="mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded ${
              selectedAnswer === null 
                ? 'bg-gray-100 hover:bg-gray-200' 
                : index === question.correctAnswer 
                  ? 'bg-green-100 text-green-800' 
                  : selectedAnswer === index 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-gray-100'
            }`}
            disabled={showExplanation}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const ExplanationCard = ({ explanation }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Explanation</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Main Reasoning</h3>
          <p>{explanation.mainReasoning}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Incorrect Options</h3>
          <ul className="list-disc pl-6 space-y-2">
            {explanation.incorrectOptions.map((exp, index) => (
              <li key={index}>{exp}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Related Concepts</h3>
          <ul className="list-disc pl-6 space-y-2">
            {explanation.relatedConcepts.map((concept, index) => (
              <li key={index}>{concept}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (index) => {
    if (!showExplanation) {
      setSelectedAnswer(index);
      setShowExplanation(true);
      if (index === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <button 
          onClick={nextQuestion}
          disabled={currentQuestion === questions.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      <div className="mb-4">
        Score: {score} / {questions.length}
      </div>

      <QuestionCard
        question={questions[currentQuestion]}
        selectedAnswer={selectedAnswer}
        showExplanation={showExplanation}
        onAnswerSelect={handleAnswerSelect}
      />

      {showExplanation && (
        <ExplanationCard explanation={questions[currentQuestion].explanation} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

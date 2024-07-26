import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Question = {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};

// List of questions for the quiz
const questions: Question[] = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Rome', 'Berlin'],
    correct: 'Paris',
    explanation: 'Paris is the capital and most populous city of France.',
  },
  {
    question: 'Who wrote "Hamlet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
    correct: 'William Shakespeare',
    explanation: 'William Shakespeare wrote the play "Hamlet" in the early 17th century.',
  },
  {
    question: 'What is the smallest prime number?',
    options: ['0', '1', '2', '3'],
    correct: '2',
    explanation: 'The smallest prime number is 2, as it is only divisible by 1 and itself.',
  },
  // Add more questions as needed
];

const JavascriptTestpage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track the current question index
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // State to track the selected option
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if the current answer is submitted

  const currentQuestion = questions[currentQuestionIndex]; // Get the current question based on the index

  // Function to handle the submission of the answer
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Function to handle navigation to the next question
  const handleNext = () => {
    setIsSubmitted(false); // Reset submission state
    setSelectedOption(null); // Reset selected option
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question if available
    } else {
      navigation.navigate('Home'); // Navigate back to Home after finishing the quiz
    }
  };

  // Function to handle navigation to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsSubmitted(false); // Reset submission state
      setSelectedOption(null); // Reset selected option
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Move to the previous question if available
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            // Apply styles based on the answer state (correct, incorrect, selected)
            isSubmitted && option === currentQuestion.correct ? styles.correctOption : null,
            isSubmitted && option === selectedOption && option !== currentQuestion.correct ? styles.incorrectOption : null,
            !isSubmitted && selectedOption === option ? styles.selectedOption : null,
          ]}
          onPress={() => setSelectedOption(option)} // Set the selected option
          disabled={isSubmitted} // Disable option selection after submission
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, !selectedOption || isSubmitted ? styles.disabledButton : null]}
          onPress={handleSubmit} // Handle answer submission
          disabled={!selectedOption || isSubmitted} // Disable submit button if no option is selected or already submitted
        >
          <Text style={styles.navigationButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {isSubmitted && (
        <View style={styles.explanationContainer}>
          {selectedOption === currentQuestion.correct ? (
            <Text style={styles.correctText}>Correct!</Text> // Show correct message
          ) : (
            <Text style={styles.incorrectText}>Incorrect. The correct answer is {currentQuestion.correct}.</Text> // Show incorrect message
          )}
           {/* // Show explanation for the answer */}
          <Text style={styles.explanationText}>{currentQuestion.explanation}</Text> 
          <View style={styles.navigationButtonsContainer}>
            <TouchableOpacity
              style={[styles.navigationButton, currentQuestionIndex === 0 ? styles.disabledButton : null]}
              onPress={handlePrevious} // Handle navigation to the previous question
              disabled={currentQuestionIndex === 0} // Disable previous button on the first question
            >
              <Text style={styles.navigationButtonText}>Previous</Text>
            </TouchableOpacity>
            {/* // Handle navigation to the next question */}
            <TouchableOpacity style={styles.navigationButton} onPress={handleNext}> 
              <Text style={styles.navigationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default JavascriptTestpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  optionButton: {
    backgroundColor: '#ECEAF1',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'left',
    width: '100%',
  },
  selectedOption: {
    backgroundColor: '#c2f9ff',
  },
  correctOption: {
    backgroundColor: '#d4edda', // Light green color for correct answer
    borderColor:'green',
    borderWidth:1
  },
  incorrectOption: {
    backgroundColor: '#f8d7da', // Light red color for incorrect answer
    borderColor:'red',
    borderWidth:1
  },
  optionText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  explanationContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  correctText: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  incorrectText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navigationButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width:"48%",
    // flexDirection:'row',
    // justifyContent:'space-around'
  },
  submitButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width:"100%"

  },
  navigationButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign:"center"
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});

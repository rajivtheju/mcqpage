import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type Question = {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
};

const CTestpage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [questions, setQuestions] = useState<Question[]>(
    [
      {
        "question": "What is the purpose of the `malloc()` function in C?",
        "options": ["Allocate memory dynamically", "Free allocated memory", "Perform mathematical calculations", "None of the above"],
        "correct": "Allocate memory dynamically",
        "explanation": "`malloc()` function is used to allocate memory dynamically in C."
      },
      {
        "question": "What does the `sizeof` operator return in C?",
        "options": ["Memory address of a variable", "Size of a variable in bytes", "Type of a variable", "Value of a variable"],
        "correct": "Size of a variable in bytes",
        "explanation": "The `sizeof` operator in C returns the size of a variable or data type in bytes."
      }
      
    ]
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://api.example.com/quiz-questions'); // Replace with your API endpoint
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleNext = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Home');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setIsSubmitted(false);
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No questions available.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            isSubmitted && option === currentQuestion.correct ? styles.correctOption : null,
            isSubmitted && option === selectedOption && option !== currentQuestion.correct ? styles.incorrectOption : null,
            !isSubmitted && selectedOption === option ? styles.selectedOption : null,
          ]}
          onPress={() => setSelectedOption(option)}
          disabled={isSubmitted}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.submitButton, !selectedOption || isSubmitted ? styles.disabledButton : null]}
          onPress={handleSubmit}
          disabled={!selectedOption || isSubmitted}
        >
          <Text style={styles.navigationButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      {isSubmitted && (
        <View style={styles.explanationContainer}>
          {selectedOption === currentQuestion.correct ? (
            <Text style={styles.correctText}>Correct!</Text>
          ) : (
            <Text style={styles.incorrectText}>Incorrect. The correct answer is {currentQuestion.correct}.</Text>
          )}
          <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
          <View style={styles.navigationButtonsContainer}>
            <TouchableOpacity
              style={[styles.navigationButton, currentQuestionIndex === 0 ? styles.disabledButton : null]}
              onPress={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <Text style={styles.navigationButtonText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navigationButton} onPress={handleNext}>
              <Text style={styles.navigationButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
    </ScrollView>
  );
};

export default CTestpage;

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
    backgroundColor: '#d4edda',
    borderColor: 'green',
    borderWidth: 1,
  },
  incorrectOption: {
    backgroundColor: '#f8d7da',
    borderColor: 'red',
    borderWidth: 1,
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
    width: '48%',
  },
  submitButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    width: '100%',
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

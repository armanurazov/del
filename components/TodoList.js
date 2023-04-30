import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Task = ({ task, onToggle, onDelete, date, completed }) => {
  return (
    <View style={styles.task}>
      <TouchableOpacity onPress={onToggle}>
        <View style={completed ? styles.complete : styles.incomplete} />
      </TouchableOpacity>
      <View style={styles.taskTextContainer}>
        <Text style={[styles.taskText, completed && styles.completedText]}>{task}</Text>
        <Text style={styles.taskDate}>{date}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const TodoList = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.length > 0 && date.length > 0) {
      const newTask = { id: Date.now(), text: task, completed: false, date: date };
      setTasks([...tasks, newTask]);
      setTask('');
      setDate('');
    }
  };

  const toggleTask = id => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = id => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter reminder"
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter date"
          value={date}
          onChangeText={text => setDate(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task.text}
          date={task.date}
          completed={task.completed}
          onToggle={() => toggleTask(task.id)}
          onDelete={() => deleteTask(task.id)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#008CBA',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
taskTextContainer: {
flex: 1,
marginLeft: 10,
},
taskText: {
fontSize: 18,
textDecorationLine: 'none',
},
taskDate: {
fontSize: 16,
color: '#999',
marginTop: 5,
},
complete: {
width: 20,
height: 20,
backgroundColor: '#008CBA',
},
incomplete: {
width: 20,
height: 20,
borderColor: '#008CBA',
borderWidth: 1,
},
deleteButton: {
color: '#999',
fontSize: 20,
marginLeft: 10,
},
});

export default TodoList;



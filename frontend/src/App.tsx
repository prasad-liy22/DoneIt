import TaskCard from "./features/task/taskCard";

function App() {
  return(
    <div className="App">
      <h1>DoneIt</h1>
      <TaskCard
        title="Design the task board"
        description="Lay out columns and card styles."
        priority="high"
        dueDate="Oct 15"
        tags={["design", "ui"]}
      />
      </div>
  );
}

export default App

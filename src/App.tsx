import "./App.css";
import { api } from "./assets";
import { Board, DragDropProvider } from "./components";

function App() {
  return (
    <div className="container mx-auto" style={{ userSelect: "none" }}>
      <DragDropProvider data={api.columns}>
        <Board />
      </DragDropProvider>
    </div>
  );
}

export default App;

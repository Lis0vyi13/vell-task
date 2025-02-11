import { UseMutationResult } from "@tanstack/react-query";
import { ITodo } from "@/types/todo";

interface TodoFormProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  addTodoMutation: UseMutationResult<ITodo, Error, string>;
}

export function TodoForm({
  newTodo,
  setNewTodo,
  addTodoMutation,
}: TodoFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    addTodoMutation.mutate(newTodo);
    setNewTodo("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        className="flex-1 text-black border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Add a new todo"
      />
      <button
        type="submit"
        className="bg-blue-500 transition-all duration-300 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!newTodo.trim()}
      >
        Add
      </button>
    </form>
  );
}

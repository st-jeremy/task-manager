export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  modified_at: string;
}

export interface IAddTask {
  title: string;
  description: string;
}

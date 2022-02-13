import { useAppDispatch } from '../app/hooks';
import {
  updateTodoAsync,
  deleteTodoAsync,
  TodoState
} from '../features/todo/todoSlice';
import styles from './Todo.module.css';

export function TodoItem({id, name, isComplete}: TodoState) {
  const dispatch = useAppDispatch();

  const handleCheckboxClick = () => {
    let updatedTodo: TodoState = {
      id: id,
      name: name,
      isComplete: !isComplete,
    }
    dispatch(updateTodoAsync(updatedTodo));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodoAsync(id));
  };

  return (
    <div className={styles.row}>
        <div>
            <input
                type='checkbox'
                className='mr-3'
                checked={isComplete}
                onChange={handleCheckboxClick}
                onClick={handleCheckboxClick}
            ></input>
            {name}
        </div>
        <div className={styles.separator}></div>
        <div>
            <button
                className={styles.button}
                onClick={handleDeleteClick}>
                Delete
            </button>
        </div>
    </div>
  );
}

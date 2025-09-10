import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoItem: React.FC<Props> = ({ todos }) => {
  const currentTodo = useAppSelector(
    state => state.currentTodoSlice.currentTodo,
  );

  const dispatch = useAppDispatch();

  const handleSetModal = (todo: Todo) => {
    dispatch(currentTodoActions.setUserIsLoading(true));

    getUser(todo.userId)
      .then(user => {
        dispatch(currentTodoActions.setAssignedUser(user));
        dispatch(currentTodoActions.set(todo));
      })
      .finally(() =>
        setTimeout(
          () => dispatch(currentTodoActions.setUserIsLoading(false)),
          300,
        ),
      );
  };

  return (
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id} data-cy="todo">
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            )}
          </td>

          <td className="is-vcentered is-expanded">
            <p
              className={
                !todo.completed ? 'has-text-danger' : 'has-text-success'
              }
            >
              {todo.title}
            </p>
          </td>

          <td className="has-text-right is-vcentered">
            <button data-cy="selectButton" className="button" type="button">
              <span className="icon" onClick={() => handleSetModal(todo)}>
                <i
                  className={
                    currentTodo?.id !== todo.id
                      ? 'far fa-eye'
                      : 'far fa-eye-slash'
                  }
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

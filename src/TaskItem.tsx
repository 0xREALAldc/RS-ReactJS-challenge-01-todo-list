import { Task } from './TaskList'
import {
  Trash,
  Circle,
  CheckCircle } from '@phosphor-icons/react';

import styles from './TaskItem.module.css'

interface TaskProps {
  id: string;
  isFinished: boolean;
  content: string;
  onCheckTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskItem({ id, isFinished, content, onCheckTask, onDeleteTask }: TaskProps) {
  function handleCheck() {
    onCheckTask(id)
  }

  function handleDelete() {
    onDeleteTask(id)
  }

  return (
    <div className={styles.task} key={id}>
      <button onClick={handleCheck}>
        {isFinished ? <CheckCircle size={24} /> : <Circle size={24} /> }
      </button>
      <p className={ isFinished ? styles.taskContentFinished : ''}>{content}</p>
      <button onClick={handleDelete}>
        <Trash size={24}/>
      </button>
    </div>
  )
}
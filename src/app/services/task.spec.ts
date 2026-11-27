import { TestBed } from '@angular/core/testing';
import { Task } from './task';

describe('Task service', () => {
  let service: Task;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Task);
  });

  it('empieza sin tareas', () => {
    expect(service.tasks()).toEqual([]);
    expect(service.pendingCount()).toBe(0);
  });

  it('añade una tarea recortando espacios y la devuelve', () => {
    const task = service.add('  Estudiar CI/CD  ');
    expect(task).toEqual({ id: 1, title: 'Estudiar CI/CD', done: false });
    expect(service.tasks().length).toBe(1);
    expect(service.pendingCount()).toBe(1);
  });

  it('no añade tareas vacías', () => {
    expect(service.add('   ')).toBeNull();
    expect(service.tasks().length).toBe(0);
  });

  it('marca y desmarca una tarea como hecha', () => {
    const task = service.add('Hacer la práctica')!;
    service.toggle(task.id);
    expect(service.tasks()[0].done).toBe(true);
    expect(service.pendingCount()).toBe(0);
    service.toggle(task.id);
    expect(service.tasks()[0].done).toBe(false);
  });

  it('elimina una tarea por id', () => {
    const a = service.add('A')!;
    service.add('B');
    service.remove(a.id);
    expect(service.tasks().map((t) => t.title)).toEqual(['B']);
  });
});

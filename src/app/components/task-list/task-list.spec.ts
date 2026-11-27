import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskList } from './task-list';

describe('TaskList', () => {
  let fixture: ComponentFixture<TaskList>;
  let el: HTMLElement;

  const addTask = async (title: string) => {
    const input = el.querySelector<HTMLInputElement>('input[type="text"]')!;
    input.value = title;
    el.querySelector<HTMLButtonElement>('button.add')!.click();
    await fixture.whenStable();
  };
  const items = () => Array.from(el.querySelectorAll('li:not(.empty)'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TaskList] }).compileComponents();
    fixture = TestBed.createComponent(TaskList);
    el = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('muestra un mensaje cuando no hay tareas', () => {
    expect(el.querySelector('li.empty')?.textContent).toContain('No hay tareas');
  });

  it('añade una tarea desde el formulario y limpia el input', async () => {
    await addTask('Configurar GitHub Actions');
    expect(items().length).toBe(1);
    expect(items()[0].textContent).toContain('Configurar GitHub Actions');
    expect(el.querySelector<HTMLInputElement>('input[type="text"]')!.value).toBe('');
    expect(el.querySelector('.pending')!.textContent).toContain('1');
  });

  it('no añade una tarea vacía', async () => {
    await addTask('   ');
    expect(items().length).toBe(0);
  });

  it('marca una tarea como hecha al pulsar el checkbox', async () => {
    await addTask('Tarea');
    el.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click();
    await fixture.whenStable();
    expect(items()[0].classList).toContain('done');
    expect(el.querySelector('.pending')!.textContent).toContain('0');
  });

  it('elimina una tarea al pulsar Eliminar', async () => {
    await addTask('Borrar');
    el.querySelector<HTMLButtonElement>('button.remove')!.click();
    await fixture.whenStable();
    expect(items().length).toBe(0);
  });
});

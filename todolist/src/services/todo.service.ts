import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {forkJoin, from, map, Observable, switchMap,} from 'rxjs';
import {environment} from '../environments/environment'
import {Todo} from "../app/model/Todo";
import {Injectable} from "@angular/core";
import {RouterUtil} from "../app/util/RouterUtil";
import {ToDoSearchResult} from "../app/dto/ToDoSearchResult";
import {ParamMap} from "@angular/router";
import {AllToDoSearchResult} from "../app/dto/AllToDoSearchResult";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  baseUrl: String = environment.todoResourceServerUrl;

  deleteTodo(todo: Todo): Observable<Todo> {

    return this.http.delete<Todo>(`${this.baseUrl}/todos/${todo.id}`);
    //return new Observable<Todo>( o => o.error("error"))s
    //return new Observable<Todo>(o => o.next(todo));
  }

  saveTodo(todo: Todo): Observable<Todo> {

    if (todo.id !== null) {
      return this.http.put<Todo>(`${this.baseUrl}/todos`, todo);
    } else {
      return this.http.post<Todo>(`${this.baseUrl}/todos`, todo);
    }
  }

  switchDone(todo: Todo): Observable<Boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/todos/${todo.id}/done`, {done: !todo.done});
  }

  getTodo(id: string | null): Observable<Todo> {

    if (id === null) {
      return new Observable<Todo>();
    }

    return this.http.get<Todo>(`${this.baseUrl}/todos/${id}`);
  }

  filterTodos(paramMap: ParamMap): Observable<ToDoSearchResult> {

    let params = RouterUtil.fromParamMapToObject(paramMap);

    return this.http.get<ToDoSearchResult>(`${this.baseUrl}/todos`, {params});
  }

  getUnscheduledAndTodayScheduledTodos(): Observable<AllToDoSearchResult> {

    let todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    let todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999)

    let scheduledTodos = this.http.get<ToDoSearchResult>(`${this.baseUrl}/todos`,
      {params: {scheduled: true, startTime: todayStart.getTime(), endTime: todayEnd.getTime()}});

    let unscheduledTodos = this.http.get<ToDoSearchResult>(`${this.baseUrl}/todos`,
      {params: {scheduled: false}})

    return forkJoin([scheduledTodos, unscheduledTodos])
      .pipe(map((rs: Array<ToDoSearchResult>) => ({scheduled: rs[0], unscheduled: rs[1]})))
  }

  getScheduledDaysOfMonthAndYears(month: number | undefined, fullYear: number | undefined): Observable<Array<number>> {

    if (month !== undefined && fullYear !== undefined) {

      return this.http.get<Array<number>>(`${this.baseUrl}/todos/scheduled-days/${month}/${fullYear}`);
    }

    return new Observable<Array<number>>(o => o.next([]))
  }
}

import { Observable } from 'rxjs';

export const filterArray =
  <T>(key: keyof T) =>
  (source: Observable<[string, T[]]>) =>
    new Observable<T[]>((subscriber) => {
      source.subscribe({
        next: ([searchValue, arr]) => {
          const result = arr.filter((value) => {
            const searchableField = value[key];
            if (typeof searchableField === 'string') {
              return searchableField
                .toLowerCase()
                .includes(searchValue);
            }
            return false;
          });

          subscriber.next(result);
        },
        complete: () => subscriber.complete(),
        error: (err: any) => subscriber.error(err),
      });
    });

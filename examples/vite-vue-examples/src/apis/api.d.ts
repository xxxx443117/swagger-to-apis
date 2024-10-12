declare namespace Api {
  interface Error {
    code: number;
    msg: string;
  }

  // If your API does not have an outer wrapper
  type Response<T> = T;

  // Your API has an outer layer that can be customized to modify the current structure
  // interface Response<T> {
  //   code: number;
  //   msg: string;
  //   message: string;
  //   data: T;
  // }
}

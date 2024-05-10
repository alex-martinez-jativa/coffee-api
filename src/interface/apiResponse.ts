type PageIndicator = number | null;
type DataType<T> = T[] | T;

interface IApiResponse<T> {
  data: DataType<T>;
  page?: number;
  totalCount?: number;
  nextPage?:  PageIndicator;
  prevPage?: PageIndicator;
}

export class ApiResponse<T> {
  private apiResponse: IApiResponse<T>;

  constructor(data: DataType<T>, page?: number, totalCount?: number, nextPage?: PageIndicator, prevPage?: PageIndicator) {
    
    this.apiResponse = {
      data: data,
      page: page,
      totalCount: totalCount,
      nextPage: nextPage,
      prevPage: prevPage
    };
  }

  getApiPaginationResponse(): IApiResponse<T> {
    return this.apiResponse;
  }

  getApiResponse(): IApiResponse<T> {
    return {
      data: this.apiResponse.data
    }
  }

}
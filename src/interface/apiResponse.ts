type PageIndicator = number | null;

interface IApiResponse<T> {
  data: T[];
  page: number;
  totalCount: number;
  nextPage:  PageIndicator;
  prevPage: PageIndicator;
}

export class ApiResponse<T> {
  private apiResponse: IApiResponse<T>;

  constructor(data: T[], page: number, totalCount: number, nextPage: PageIndicator, prevPage: PageIndicator) {
    this.apiResponse = {
      data: data,
      page: page,
      totalCount: totalCount,
      nextPage: nextPage,
      prevPage: prevPage
    };
  }

  getApiResponse(): IApiResponse<T> {
    return this.apiResponse;
  }
}
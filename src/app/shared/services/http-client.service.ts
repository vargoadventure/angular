import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { retry } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable()
export class HttpClientService {
  constructor(private readonly http: HttpClient) {}

  private getEndpointUrl(endpoint: string, params?: Params): string {
    const apiUrl = environment.apiUrl;
    const endpoints: { [key: string]: string } = environment.apiEndpoints;
    const endpointUrl = endpoints[ endpoint ];

    if (!endpointUrl) throw Error(`Invalid endpoint ${endpoint} code. `);

    let url: string = `${apiUrl}/${endpointUrl}`;

    if (params) {
      Object.keys(params).forEach((param: string) => {
        const pathVariable: string = `:${param}`;
        
        if (url.includes(pathVariable)) {
          url = url.replace(pathVariable, params[ param ]);
        }
      });
    }

    return url;
  }

  private buildHttpParams(queryParams?: Params): HttpParams {
    const httpParams: HttpParams = new HttpParams();

    if (queryParams) {
      Object.keys(queryParams).forEach((param: string) => {
        httpParams.set(param, queryParams[ param ]);
      });
    }

    return httpParams;
  }

  get(endpoint: string, params?: Params, queryParams?: Params): Observable<any> {
    const url: string = this.getEndpointUrl(endpoint, params);
    const httpParams: HttpParams = this.buildHttpParams(queryParams);
    const options = {
      params: httpParams
    }

    return this.http.get(url, options)
      .pipe(
        retry(3)
      );
  }

  // getData(): Observable<any> {
  //   const url = "https://jsonplaceholder.typicode.com/posts"
  //   return this.http.get<any>(url)
  // }
}
interface Data {
  option: string;
  type: string;
  data: any;
}

export interface Rule {
  [field: string]: any;
}

export interface Rules {
  field: string;
  option: string;
  type: string;
  data: any | Data[];
}

export interface QueryInterface {
  filter: boolean;
  sort: string;
  sortName: string;
  pageSize: number;
  pageNumber: number;
  searchFilters?: string;
  rules?: Rules[];
}

export interface Result {
  data: any[];
  pageSize: number;
  pageNumber: number;
  total: number;
  records: number;
}

export interface Response {
  status: number;
  type: string;
  msg?: string;
  data?: Result;
}

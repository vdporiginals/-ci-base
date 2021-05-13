export interface DataTable {
  [key: string]: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  address: string;
}

export interface KeyDataTable {
  [id: string]: DataTable;
}

export type ListLabel = {
  label: string;
  type: ActionTableEnum;
  id: string;
  image?: {
    edit?: string;
    delete?: string;
  };
  text?: {
    edit?: string;
    delete?: string;
  };
};

export type obj<T = unknown> = Record<string, T>;

type MyObjectType = {
  id: obj; // An object with unknown props
};

export interface IDictionary {
  id: Record<string, object>;
  [id: string]: any;
}

export enum ActionTableEnum {
  button = 'action-button',
  icon = 'action-icon',
  text = 'text',
  number = 'number',
  index = 'index',
  object = 'object',
  date = 'date',
}

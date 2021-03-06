export interface DataTable extends KeyDataTable {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  address: string;
}

export interface KeyDataTable {
  [key: string]: string;
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

export enum ActionTableEnum {
  button = 'action-button',
  icon = 'action-icon',
  text = 'text',
  number = 'number',
  index = 'index',
  object = 'object',
  date = 'date',
}

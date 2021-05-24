import { Directive, EventEmitter, Input, Output } from '@angular/core';

export enum TypeEventTable {
  edit = 'edit',
  delete = 'delete',
}
@Directive()
export abstract class BaseCiTable<TDataTable, TListTable> {
  @Input() dataTable!: TDataTable[];
  @Input() listLable!: TListTable[];
  @Input() classCiTable!: string;
  @Output() TableEmitEventEdit = new EventEmitter<{
    item: Partial<TDataTable>;
    type: TypeEventTable.edit;
  }>();
  @Output() TableEmitEventDelete = new EventEmitter<{
    item: Partial<TDataTable>;
    type: TypeEventTable.delete;
  }>();
  onClickSetting = (item: TDataTable, type: TypeEventTable) => {
    if (type == TypeEventTable.edit) {
      this.TableEmitEventEdit.emit({
        item,
        type: type,
      });
    } else if (type == TypeEventTable.delete) {
      this.TableEmitEventDelete.emit({
        item,
        type: type,
      });
    }
  };
}

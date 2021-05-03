import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive()
export abstract class CiBasePermissionDirective {
  private readonly _thenTemplateRef: TemplateRef<unknown> | null = null;
  private _thenViewRef: EmbeddedViewRef<unknown> | null = null;
  private _elseTemplateRef: TemplateRef<unknown> | null = null;
  private _elseViewRef: EmbeddedViewRef<unknown> | null = null;
  private _hasPermission = false;
  private _isConditionPassed = false;

  constructor(
    private readonly viewRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<unknown>
  ) {
    this._thenTemplateRef = this.templateRef;
  }

  @Input() set permissionElse(templateRef: TemplateRef<unknown>) {
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;
    this._updateView();
  }

  private _updateView() {
    if (this._isConditionPassed && this._hasPermission) {
      if (!this._thenViewRef) {
        this.viewRef.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef = this.viewRef.createEmbeddedView(
            this._thenTemplateRef,
            {
              hasPermission: this._hasPermission,
              condition: this._isConditionPassed,
            }
          );
          this._thenViewRef.markForCheck();
        }
      }
    } else {
      if (!this._elseViewRef) {
        this.viewRef.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef = this.viewRef.createEmbeddedView(
            this._elseTemplateRef,
            {
              hasPermission: this._hasPermission,
              condition: this._isConditionPassed,
            }
          );
          this._elseViewRef.markForCheck();
        }
      }
    }
  }
}

import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot } from '@angular/router';
import { getDeepestChildSnapshot } from '@ci/base';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  constructor(
    private readonly title: Title // @Inject(APP_RETAILER) private readonly appRetailer: AppRetailer
  ) {}

  setPageTitle(pageTitle: string) {
    this.title.setTitle(`${pageTitle}`);
  }

  setPageTitleByRouteSnapshot(snapshot: ActivatedRouteSnapshot) {
    const { data } = getDeepestChildSnapshot(snapshot);

    if (!data) {
      return;
    }

    let title;
    if (data.titleKey) {
      title = data.title;
    } else if (data.title) {
      title = data.title;
    }

    this.setPageTitle(title);
  }
}

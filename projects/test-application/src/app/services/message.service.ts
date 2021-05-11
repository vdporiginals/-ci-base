/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  API_URL = 'https://li1jm77bc8.execute-api.ap-southeast-1.amazonaws.com';
  constructor(
    protected http: HttpClient // private storageService: LocalStorageService
  ) {}

  getListMessage(receiveUser: any) {
    const loginUser: any = JSON.parse(
      localStorage.getItem('access_token') as any
    );
    return this.http.get(this.API_URL + '/prod/user/message', {
      params: {
        userProfileId1: loginUser.UserProfileId,
        userProfileId2: receiveUser,
        pageNumber: '1',
        pageSize: '50',
      },
    });
  }

  getHistoryMes(id: any) {
    return this.http
      .get(this.API_URL, {
        params: {
          SenderUserId: '198',
        },
        headers: new HttpHeaders({
          Authorization:
            'Bearer ' +
            'ere-ARcUYnJ19mgaREO28ylmtlmSCYNrxpmT7XLFRdFPYXkmowcr6f0_zwArDNn8rq6wDbFYZqAZFf4-nEocdK5ppibEUNnWCU3iP5oqjazx5BzWECLUZ-OlD865I3K45VHMcaewvxftFGonzEPksrCkOuoPIfBdlwH3uFHhF8DTthd93pEf9wsEXTe4HIk33ZwGQU3tdialrlHQqgaOM-9H9Bg7csRKwi7OKcgIr1JiM81anKgjBYg4b9JetJXV99ii-QbKbxUkGK--Td4AIcQgKeuYk2FMln7j4v_CrH_OcasYM2bX2Skgk9OOKr1syf-QWs9rsSZgpP3rvOrHRcYVCyfBjSwz5r4Mgqt7lTka9lCW59w6NsDOrhmNiD3BPYbOKVknS4vFJn9fuGX-DC2NVspXLQX7XMBoC96mpnUNm2QIM5VnUiMQ9O1o4bQZa13XQLRN22Q7iX0loXSx6PmfuveA0RdhWGvDgG67FMxYZ059nw6ifY5il40TrXqbNNxfIamHpP0NCIXLuLE1wehtJM6i6SvtWjJw6sIQw8TfmjHby7QemRAM9Qj6yAnnJ0ro4qBGbAekNBWXxrKmuY8CvzjNTrlwbT5RTaaztH7ASVEW1FvioOxyXH7GHGuSWUWULCChN15AOJaffIkd69XpcFX49Obuog3mAfh10_4',
        }),
      })
      .pipe(map((res: any) => res.Payload));
  }
}

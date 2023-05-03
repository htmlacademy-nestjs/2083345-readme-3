import {UserRdo} from '../rdo/user.rdo';
import {ApplicationServiceURL} from '../app.config';
import {HttpService} from '@nestjs/axios';

export async function fillAuthorData(postData, httpService: HttpService) {
  const authorData: UserRdo | string = postData.authorId !== "" ?
    (await httpService.axiosRef.get(`${ApplicationServiceURL.BlogUser}/${postData.authorId}`)).data : postData.authorId;
  const origAuthorData: UserRdo | string = postData.origAuthorId !== "" ?
    (await httpService.axiosRef.get(`${ApplicationServiceURL.BlogUser}/${postData.origAuthorId}`)).data : postData.origAuthorId;
  delete postData.authorId
  delete postData.origAuthorId
  return {...postData, author: authorData, origAuthor: origAuthorData};
}

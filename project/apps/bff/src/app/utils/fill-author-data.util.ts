import {UserRdo} from '../rdo/user.rdo';
import {ApplicationServiceURL} from '../app.config';
import {HttpService} from '@nestjs/axios';
import {PostRdo} from '../rdo/post.rdo';


export async function fillAuthorData(postData: PostRdo | PostRdo[], httpService: HttpService) {
  if (Array.isArray(postData)) {
    const authorDataRequestArray = postData.map((post) => {
      return {author: post.authorId, origAuthor: post.origAuthorId}
    });
    const authorDataArray: Array<{author: UserRdo, origAuthor: UserRdo}> =
      (await httpService.axiosRef.post(`${ApplicationServiceURL.BlogUser}/ids`, authorDataRequestArray)).data
    return postData.map((post, index) => {
      delete post.authorId;
      delete post.origAuthorId;
      return {...post, author: authorDataArray[index].author, origAuthor: authorDataArray[index].origAuthor}
    })
  } else {
    const origAuthorData: UserRdo | string =
      (await httpService.axiosRef.get(`${ApplicationServiceURL.BlogUser}/${postData.origAuthorId}`)).data ??
      postData.origAuthorId;

    const authorData: UserRdo | string =
      postData.isReposted ?
        ((await httpService.axiosRef.get(`${ApplicationServiceURL.BlogUser}/${postData.authorId}`)).data ?? postData.authorId) :
        origAuthorData;

    delete postData.authorId
    delete postData.origAuthorId
    return {...postData, author: authorData, origAuthor: origAuthorData};
  }
}

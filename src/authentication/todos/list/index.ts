import { Request, Response } from 'express';
import appContext from '../../../context/app';
import requestContext from '../../../context/request/todos/list';
import { HttpReturn } from '../../../internal/utils';
import { ListTodosPayload } from '../../../models';

export default async (
  appCtx: appContext,
  requestCtx: requestContext,
  payload: ListTodosPayload,
  req: Request,
  res: Response,
): Promise<HttpReturn | void> => {
  // check session
  if (!req.session.userID)
    return new HttpReturn(401, 'unauthorized');

  // check csrf
  if (req.session.csrf !== req.headers['X-CSRF'])
    return new HttpReturn(401, 'unauthorized');

  requestCtx.isAdmin = req.session.isAdmin;
  requestCtx.userID = req.session.userID;
}

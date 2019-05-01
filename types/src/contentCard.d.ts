import { ICuratedContent } from "./curatedContent";

export interface IUser {
  handle: string;
  fields: {
    avatar32?: string;
    name: string;
  };
}

export interface IRecommendation {
  comment: string; // why is it important - max. 140char
  user: IUser; // the handle of the user in GitHub
  twitterUrl?: string;
}

export interface IContentCard extends ICuratedContent {
  recommendations: IRecommendation[];
}

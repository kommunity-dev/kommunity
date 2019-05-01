export type TSkillLevels =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "allLevels";

export type TTopics =
  | "CSS"
  | "Javascript"
  | "HTML"
  | "React"
  | "Gatsby"
  | "Serverless"
  | "Unsorted";

export type TFormats =
  | "video"
  | "article"
  | "audio"
  | "tutorial"
  | "course"
  | "book"
  | "tool";

export interface ICuratedContent {
  title: string;
  url: string;
  topic: TTopics;
  format: TFormats;
  skillLevel?: TSkillLevels; // who is it for?
}

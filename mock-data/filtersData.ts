import { TTopics, TSkillLevels, TFormats } from "@kompanion/types";

export const contentTopics: TTopics[] = [
  "CSS",
  "Javascript",
  "HTML",
  "React",
  "Gatsby",
  "Serverless",
  "Unsorted"
];

export const prospectiveTopics = [
  ...contentTopics.filter(t => t !== "Unsorted"),
  "CMS",
  "GraphQL",
  "PWAs",
  "AMP",
  "Design",
  "Business",
  "Showcase"
];

export const contentLevels: TSkillLevels[] = [
  "allLevels",
  "beginner",
  "intermediate",
  "advanced"
];

export const contentFormats: TFormats[] = [
  "video",
  "article",
  "audio",
  "tutorial",
  "course",
  // "book",
  "tool"
];

export const readableLevels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  allLevels: "For everyone"
};

export const formatCTAs = {
  video: "Watch at",
  article: "Read at",
  audio: "Listen at",
  tutorial: "Follow at",
  course: "Start at",
  book: "Read at",
  tool: "Dive in"
};

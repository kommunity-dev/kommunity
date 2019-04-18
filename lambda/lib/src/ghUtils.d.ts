export declare const TEST = "a";
export interface ISubmissionPayload {
    title: string;
    url: string;
    category: any;
    skillLevel?: any;
    format?: any;
    recommendations: Array<{
        comment: string;
        user: string;
    }>;
}

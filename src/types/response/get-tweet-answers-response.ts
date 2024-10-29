
export type GetTweetAnswersResponse = ({
  User: {
      name: string;
      slug: string;
      avatar: string;
  };
  likes: {
      userSlug: string;
  }[];
} & {
  id: number;
  body: string;
  image: string | null;
  createdAt: Date;
  answerOf: number;
  userSlug: string;
})[]
export type  FindTweetsByUserResponseType = ({
  likes: {
    userSlug: string;
  }[];
} & {
  createdAt: Date;
  id: number;
  body: string;
  image: string | null;
  answerOf: number;
  userSlug: string;
})[]
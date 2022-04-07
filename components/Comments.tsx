interface CommentsProps {
  slug: string;
}

const Comments: React.FC<CommentsProps> = ({ slug }) => {
  return (
    <div>
      <h1>Comments</h1>
    </div>
  );
};

export default Comments;

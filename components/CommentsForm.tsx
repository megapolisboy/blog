import { useEffect, useRef, useState } from "react";
import { submitComment } from "../services";

interface CommentsFormProps {
  slug: string;
}

const CommentsForm: React.FC<CommentsFormProps> = ({ slug }) => {
  const [error, setError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef<HTMLTextAreaElement>(null);
  const nameEl = useRef<HTMLInputElement>(null);
  const emailEl = useRef<HTMLInputElement>(null);
  const [shouldStoreData, setShouldStoreData] = useState<boolean>(false);

  const comment = commentEl.current?.value;
  const name = nameEl.current?.value;
  const email = emailEl.current?.value;

  useEffect(() => {
    if (nameEl.current) {
      nameEl.current.value = window.localStorage.getItem("name") as string;
    }
    if (emailEl.current) {
      emailEl.current.value = window.localStorage.getItem("email") as string;
    }
  }, []);

  const handleCommentSubmition = () => {
    setError(false);
    if (!comment || !email || !name) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (shouldStoreData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        Leave a Reply
      </h3>
      <div className="mb-4 grid grid-cols-1 gap-4">
        <textarea
          ref={commentEl}
          className="w-full rounded-lg bg-gray-100
          p-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Comment"
          name="comment"
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          className="w-full rounded-lg bg-gray-100
          py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Name"
          name="name"
        />
        <input
          type="email"
          ref={emailEl}
          className="w-full rounded-lg bg-gray-100
          py-2 px-4 text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Email"
          name="email"
        />
      </div>
      <div>
        <div className="mb-4 grid grid-cols-1 gap-4">
          <div>
            <input
              type="checkbox"
              id="storeData"
              name="storeData"
              value="true"
              checked={shouldStoreData}
              onClick={() => setShouldStoreData(!shouldStoreData)}
            />
            <label className="ml-2 cursor-pointer" htmlFor="storeData">
              Save my email and name for the next time I comment
            </label>
          </div>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8">
        <button
          type="button"
          onClick={handleCommentSubmition}
          className="ease inline-block cursor-pointer rounded-full bg-pink-600 px-8
           py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="float-right mt-3 text-xl font-semibold text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;

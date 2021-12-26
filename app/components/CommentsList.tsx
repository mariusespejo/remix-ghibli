import { Form, useActionData, useTransition } from 'remix';
import { CommentEntry } from '~/api/comments';

type CommentsListProps = {
  filmId: string;
  comments: CommentEntry[];
};

export default function CommentsList({ filmId, comments }: CommentsListProps) {
  const transition = useTransition();
  const actionData = useActionData();

  const inputStyle = (fieldName: string) =>
    `border border-slate-400 rounded py-2 px-3 inline-block w-full ${
      actionData?.errors[fieldName] ? ' border-red-500' : ''
    }`;

  return (
    <div>
      <h2 className="text-3xl mb-2">Community Comments</h2>

      <div className="flex flex-col space-y-4 my-3">
        {comments.map((comment) => (
          <div className="p-4 rounded border border-slate-400">
            <div className="text-gray-700 font-bold text-xl mb-2">
              {comment.name}
            </div>
            <p className="text-gray-700">{comment.message}</p>
          </div>
        ))}

        <div className="p-4 rounded border border-slate-400">
          <Form method="post" action={`/films/${filmId}`}>
            <fieldset disabled={transition.state === 'submitting'}>
              <label className="inline-block my-2">Name:</label>
              <input name="name" type="text" className={inputStyle('name')} />
              {actionData?.errors.name && (
                <p className="text-red-500">{actionData.errors.name}</p>
              )}

              <label className="inline-block my-2">Message:</label>
              <textarea name="message" className={inputStyle('message')} />
              {actionData?.errors.message && (
                <p className="text-red-500">{actionData.errors.message}</p>
              )}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
              >
                {transition.state === 'submitting'
                  ? 'Adding...'
                  : 'Add comment'}
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}

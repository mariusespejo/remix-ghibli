import { useParams } from 'remix';

export default function DynamicChild() {
  const { someId } = useParams();
  return <div>I am dynamic {someId}</div>;
}

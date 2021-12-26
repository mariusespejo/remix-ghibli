import { Outlet } from 'remix';

export default function Parent() {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  );
}

import { Link, NavLink } from 'remix';
import { FilmCharacter } from '~/api/films';

type CharacterListProps = {
  characters?: FilmCharacter[];
};
export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="flex-1 max-w-md">
      <h3 className="text-3xl">Characters</h3>

      <ul className="flex flex-col space-y-3 my-3">
        {characters?.map((character) => (
          <li>
            <NavLink
              to={'characters/' + character.id}
              prefetch="intent"
              className={({ isActive }) =>
                `w-full hover:underline p-3 rounded border border-slate-400 inline-block ${
                  isActive
                    ? 'bg-slate-300 text-black font-bold border-2'
                    : 'text-blue-500 '
                } `
              }
            >
              {character.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

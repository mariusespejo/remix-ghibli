import { CommentEntry, getComments } from "./comments";

export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
};

export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
  characters?: FilmCharacter[];
  comments?: CommentEntry[]
};

export async function getFilms(title?: string | null) {
  const response = await fetch('https://ghibliapi.herokuapp.com/films');

  const films: Film[] = await response.json();

  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
}

export async function getFilmById(filmId: string) {
  const response = await fetch(
    `https://ghibliapi.herokuapp.com/films/${filmId}`
  );

  const film: Film = await response.json();

  const comments = await getComments(filmId);

  const characters = await Promise.all(
    film.people
      .filter((url) => url !== 'https://ghibliapi.herokuapp.com/people/')
      .map((url) => fetch(url).then((res) => res.json()))
  );

  return { ...film, characters, comments };
}

export async function getFilmCharacter(characterId: string): Promise<FilmCharacter> {
  const response = await fetch(
    `https://ghibliapi.herokuapp.com/people/${characterId}`
  );

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { api } from "../services/api";
interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}
interface Props {
  propSelectedGenreId: number;
  propHandleButtonId: (id: number) => void;
}

export function SideBar({ propSelectedGenreId, propHandleButtonId }: Props) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={genre.id}
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => propHandleButtonId(genre.id)}
            selected={propSelectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

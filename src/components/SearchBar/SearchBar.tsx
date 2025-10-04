import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  action: (formData: FormData) => void;
}

const SearchBar = ({ action }: SearchBarProps) => {

  const handleFormAction = (formData: FormData) => {
    const query = formData.get("query") as string;
    const trimmedQuery = query ? query.trim() : "";
    
    if (trimmedQuery === "") {
      toast.error("Please enter your search query.");
      return;
    }

    action(formData);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={css.form} action={handleFormAction}>
          <input
            className={css.input}
            type="text"
            name="query" 
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;

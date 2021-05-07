import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FiSearch, FiX } from 'react-icons/fi';

import Input from '../../components/Input';
import MovieTile from '../../components/MovieTile';
import MovieListItem from '../../components/MovieListItem';

import { useToast } from '../../hooks/toast';
import { useBanner } from '../../hooks/banner';
import { StorageContext } from '../../hooks/storage';

import debounce from '../../utils/debounce';

import {
  Container,
  Header,
  SelectionGrid,
  DropdownList,
  Panel,
} from './styles';

export interface RatingProps {
  Source: string;
  Value: string;
}

export interface MovieProps {
  imdbID: string;
  Title: string;
  Type: string;
  Year: string;
  Poster: string;
  Plot?: string;
  Ratings?: RatingProps[];
  Awards?: string;
  BoxOffice?: string;
}

const Landing: React.FC = () => {
  const {
    persistentNominations,
    persistentWinners,
    setPersistentNominations,
    setPersistentWinners,
  } = useContext(StorageContext);

  const [dropdownList, setDropdownList] = useState<MovieProps[]>([]);
  const [nominationsList, setNominationsList] = useState<MovieProps[]>([]);
  const [winnersList, setWinnersList] = useState<MovieProps[]>([]);

  const [hasInput, setHasInput] = useState(false);

  const { addToast } = useToast();
  const { addBanner } = useBanner();

  const fetchTitles = useCallback(async (search: MovieProps) => {
    const response = await axios.get(process.env.REACT_APP_API_URL || '', {
      params: {
        apikey: process.env.REACT_APP_API_KEY,
        s: search,
      },
    });

    if (response.data.Error) {
      return [];
    }

    return response.data.Search;
  }, []);

  const removeFromDropdown = useCallback(
    (movie: MovieProps) => {
      setDropdownList(dropdownList.filter(m => m.imdbID !== movie.imdbID));
    },
    [dropdownList],
  );

  const removeFromNominations = useCallback(
    (movie: MovieProps) => {
      let storedMovies = JSON.parse(
        localStorage.getItem('nominations') || '[]',
      );

      storedMovies = storedMovies.filter(
        (item: MovieProps) => item.imdbID !== movie.imdbID,
      );

      localStorage.setItem('nominations', JSON.stringify(storedMovies));

      setPersistentNominations(storedMovies);

      setNominationsList(
        nominationsList.filter(m => m.imdbID !== movie.imdbID),
      );
    },
    [nominationsList, setNominationsList, setPersistentNominations],
  );

  const removeFromWinners = useCallback(
    (movie: MovieProps) => {
      let storedMovies = JSON.parse(localStorage.getItem('winners') || '[]');

      storedMovies = storedMovies.filter(
        (item: MovieProps) => item.imdbID !== movie.imdbID,
      );

      localStorage.setItem('winners', JSON.stringify(storedMovies));

      setPersistentWinners(storedMovies);

      setWinnersList(winnersList.filter(m => m.imdbID !== movie.imdbID));
    },
    [winnersList, setPersistentWinners],
  );

  const handleInput = useCallback(
    async e => {
      const titles = await fetchTitles(e.target.value);
      const movies = titles.filter((m: MovieProps) => m.Type === 'movie');

      if (!movies.length) {
        setHasInput(false);
        setDropdownList([]);
        return;
      }

      setHasInput(true);
      setDropdownList(movies);
    },
    [fetchTitles],
  );

  const handleNomination = useCallback(
    async (movie: MovieProps) => {
      const response = await axios.get(process.env.REACT_APP_API_URL || '', {
        params: {
          apikey: process.env.REACT_APP_API_KEY,
          i: movie.imdbID,
        },
      });

      if (response.data.Error) {
        addToast({
          type: 'error',
          title: 'Error',
          description: response.data.Error,
        });
        return;
      }

      const currentNominations = JSON.parse(
        localStorage.getItem('nominations') || '[]',
      );
      const newNomination = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
      };

      currentNominations.push(newNomination);
      localStorage.setItem('nominations', JSON.stringify(currentNominations));

      setPersistentNominations(
        JSON.parse(localStorage.getItem('nominations') || '[]'),
      );

      setNominationsList([...persistentNominations, response.data]);

      addToast({
        type: 'success',
        title: 'Success!',
        description: 'A movie has been nominated!',
      });
    },
    [addToast, persistentNominations, setPersistentNominations],
  );

  const handleWin = useCallback(
    (movie: MovieProps) => {
      const currentWinners = JSON.parse(
        localStorage.getItem('winners') || '[]',
      );
      const newWinner = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
      };

      currentWinners.push(newWinner);
      localStorage.setItem('winners', JSON.stringify(currentWinners));

      setPersistentWinners(JSON.parse(localStorage.getItem('winners') || '[]'));

      setWinnersList([...persistentWinners, movie]);

      addToast({
        type: 'success',
        title: 'Success!',
        description: 'A winner has been selected!',
      });
    },
    [addToast, persistentWinners, setPersistentWinners],
  );

  useEffect(() => {
    persistentNominations.map(async (movie: MovieProps) => {
      const response = await axios.get(process.env.REACT_APP_API_URL || '', {
        params: {
          apikey: process.env.REACT_APP_API_KEY,
          i: movie.imdbID,
        },
      });

      if (response.data.Error) {
        addToast({
          type: 'error',
          title: 'Error',
          description: response.data.Error,
        });
        return;
      }

      setNominationsList(persistentNominations);
    });
  }, [persistentNominations, addToast]);

  useEffect(() => {
    persistentWinners.map(async (movie: MovieProps) => {
      const response = await axios.get(process.env.REACT_APP_API_URL || '', {
        params: {
          apikey: process.env.REACT_APP_API_KEY,
          i: movie.imdbID,
        },
      });

      if (response.data.Error) {
        addToast({
          type: 'error',
          title: 'Error',
          description: response.data.Error,
        });
        return;
      }

      setWinnersList(persistentWinners);
    });
  }, [persistentWinners, addToast]);

  useEffect(() => {
    if (dropdownList.length === 0) {
      setHasInput(false);
    }
  }, [dropdownList]);

  useEffect(() => {
    if (winnersList.length) {
      winnersList.forEach(m =>
        dropdownList.forEach((mo: MovieProps) => {
          if (mo.imdbID === m.imdbID) {
            removeFromDropdown(mo);
          }
        }),
      );
    }
  }, [
    nominationsList,
    winnersList,
    dropdownList,
    removeFromDropdown,
    persistentNominations,
  ]);

  useEffect(() => {
    if (persistentWinners.length === 5) {
      addBanner({
        title: 'Winning List Completed!',
        description: 'The five winning titles have been selected',
      });
    }
  }, [persistentWinners, addBanner]);

  return (
    <Container>
      <Header>
        <h1>Shoppies</h1>

        <div>
          <Input
            icon={FiSearch}
            placeholder="Search for a movie..."
            onChange={debounce(handleInput)}
            openDropdown={() => setHasInput(true)}
          />
          {hasInput && (
            <DropdownList>
              <FiX onClick={() => setHasInput(false)} color="#c53030" />
              {dropdownList.map((movie: MovieProps) => (
                <MovieListItem
                  data-testid="dropdown"
                  key={movie.imdbID}
                  id={movie.imdbID}
                  title={movie.Title}
                  type={movie.Type}
                  year={movie.Year}
                  poster={movie.Poster}
                  plot={movie.Plot}
                  awards={movie.Awards}
                  boxOffice={movie.BoxOffice}
                  ratings={movie.Ratings}
                  action={() => {
                    handleNomination(movie);
                  }}
                />
              ))}
            </DropdownList>
          )}
        </div>
      </Header>

      <SelectionGrid>
        <Panel>
          <h2>Nominations</h2>
          {nominationsList.length !== 0 &&
            nominationsList.map((nomination: MovieProps) => (
              <MovieTile
                key={nomination.imdbID}
                title={nomination.Title}
                type="nomination"
                poster={nomination.Poster}
                remove={() => removeFromNominations(nomination)}
                promote={() => {
                  removeFromNominations(nomination);
                  handleWin(nomination);
                }}
              />
            ))}
        </Panel>

        <Panel>
          <h2>Winners</h2>
          {winnersList.length !== 0 &&
            winnersList.map((winner: MovieProps) => (
              <MovieTile
                key={winner.imdbID}
                title={winner.Title}
                type="winner"
                poster={winner.Poster}
                remove={() => removeFromWinners(winner)}
              />
            ))}
        </Panel>
      </SelectionGrid>
    </Container>
  );
};

export default Landing;

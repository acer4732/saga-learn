import { useDispatch, useSelector } from 'react-redux';
import './PeopleTable.css';
import { selectPeople } from '../../redux/reducers/people/selectors';
import Pagination from '../Pagination';
import { LOAD_USERS } from '../../redux/reducers/people/actions';
import { Link } from 'react-router-dom';

function PeopleTable() {
  const people = useSelector(selectPeople);
  const dispatch = useDispatch();

  const changePage = newPage => dispatch({
    type: LOAD_USERS,
    payload: {
      page: newPage,
      search: people.search,
    }
  });

  const search = (event) => dispatch({
    type: LOAD_USERS,
    payload: {
      page: 1,
      search: event.target.value,
    }
  });

  return (
    <div>
      <h1>
        <span>Star wars people</span>

        <form className="search">
          <input
            type="text"
            value={people.search}
            placeholder="search people"
            onChange={search}
          />
        </form>
      </h1>

      {people.loading ? (
        <div>loading...</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>gender</th>
                <th>birth year</th>
                <th>height</th>
                <th>hair color</th>
                <th>eye color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {people?.data?.results.map(character => {
                const id = character.url.replaceAll(/\D/g, '');
                return (
                  <tr key={character.name}>
                    <td>{character.name}</td>
                    <td>{character.gender}</td>
                    <td>{character.birth_year}</td>
                    <td>{character.height}</td>
                    <td>{character.hair_color}</td>
                    <td>{character.eye_color}</td>
                    <td>
                      <Link to={`/people/${id}`}>
                        Details
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Pagination
            page={people.page}
            total={people.data.count}
            onChange={changePage}
          />
        </>
      )}
    </div>
  );
}

export default PeopleTable;

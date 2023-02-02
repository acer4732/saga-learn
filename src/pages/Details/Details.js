import { useSelector } from "react-redux";
import { selectPeopleDetails } from "../../redux/reducers/peopleDetails/selectors";

function Details() {
  const details = useSelector(selectPeopleDetails);

  if(details.loading) {
    return (
      <div>Loading...</div>
    )
  }

  const { name, mass, height } = details.data;

  return (
    <div>
      <h1>name: {name}</h1>
      <div>mass: {mass}</div>
      <div>height: {height}</div>
    </div>
  )
}

export default Details;

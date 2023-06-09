import useWorkoutContext from '../../hooks/useWorkoutContext';
import useAuthContext from '../../hooks/useAuthContext';

// date fns
import { formatDistanceToNow } from 'date-fns';
const WrokoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const handleDelete = async (e) => {
    console.log(user);
    if (!user) {
      return;
    }
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
    }
  };
  return (
    <>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Reps: </strong>
          {workout.reps}
        </p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true, includeSeconds: true })}</p>
        <span className="material-symbols-outlined" onClick={handleDelete}>
          Delete
        </span>
      </div>
    </>
  );
};

export default WrokoutDetails;

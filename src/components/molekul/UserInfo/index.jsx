import defaultProfile from '../../../assets/icons/default-profile.jpg';
const UserInfo = ({ userDetails, handleLogout, totalUnAnsweredQuestions }) => {
  return (
    <div>
      {userDetails ? (
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 my-8 items-center">
              <img
                src={userDetails.photo || defaultProfile}
                alt="profile picture"
                className="size-14 rounded"
              />
              <div>
                <h3 className="font-semibold">Halo, {userDetails.firstName}!</h3>
                <p>Kamu belum menyelesaikan kuis sebanyak {totalUnAnsweredQuestions} soal.</p>
              </div>
            </div>
            <button
              className="h-2/3 p-2 rounded border bg-red-200 hover:bg-red-300 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p>Not Login</p>
      )}
    </div>
  );
};

export default UserInfo;

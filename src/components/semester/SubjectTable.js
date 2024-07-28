import { useContext } from "react";
import SubjectContext from "../../context/subject/SubjectContext";
import Swal from "sweetalert2";

const SubjectTable = (props) => {
  const { subjects } = props;
  const { deleteSubject } = useContext(SubjectContext);
  const onDeleteClick = (subjectID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSubject(subjectID);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <>
    {subjects.length!==0?
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Credit Hrs.</th>
            <th scope="col">Grade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={subject._id}>
              <th scope="row">{index + 1}</th>
              <td>{subject.name}</td>
              <td>{subject.creditHrs}</td>
              <td>{subject.grade}</td>
              <td>
                <button onClick={() => onDeleteClick(subject._id)}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white transition duration-75 hover:text-red-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>:<p></p>}
        </>
  );
};

export default SubjectTable;

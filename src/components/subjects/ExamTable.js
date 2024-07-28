import Swal from "sweetalert2";
import ExamContext from "../../context/exam/ExamContext";
import { useContext } from "react";



const ExamTable = ({ subject,s }) => {
  const {deleteExam} = useContext(ExamContext)

  const onDeleteClick=(examID)=>{
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
        deleteExam(s._id,examID)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }


  return subject.length !== 0 ? (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="col" className="px-6 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              Total Marks
            </th>
            <th scope="col" className="px-6 py-3">
              Obtained Marks
            </th>
            <th scope="col" className="px-6 py-3">
              Average Marks
            </th>
            <th scope="col" className="px-6 py-3">
              Weightage
            </th>
            <th scope="col" className="px-6 py-3">
              Percentage
            </th>
            <th scope="col" className="px-6 py-3">
              Obtained Weightage
            </th>
            <th></th>
          </tr>
        </thead>
        {subject.map((ass, index) => (
          <tbody key={`${ass._id}-${index}`}>
            <>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{ass.totalMarks}</td>
                <td className="px-6 py-4">{ass.obtainedMarks}</td>
                <td className="px-6 py-4">{ass.averageMarks}</td>
                <td className="px-6 py-4">{ass.weightage}</td>
                <td className="px-6 py-4">{`${ass.percentage}%`}</td>
                <td className="px-6 py-4">{ass.obtainedWeightage}</td>
                <td>
                <button onClick={() => onDeleteClick(ass._id)}>
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
            </>
          </tbody>
        ))}
      </table>
    </div>
  ) : (
    <></>
  );
};

export default ExamTable;

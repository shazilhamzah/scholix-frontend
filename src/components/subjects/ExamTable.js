const ExamTable = ({ subject }) => {
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

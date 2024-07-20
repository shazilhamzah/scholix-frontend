const SubjectTable = (props) => {
    const { subjects } = props; 
    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Credit Hrs.</th>
                        <th scope="col">Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((subject, index) => (
                        <tr key={subject._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{subject.name}</td>
                            <td>{subject.creditHrs}</td>
                            <td>{subject.grade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default SubjectTable;

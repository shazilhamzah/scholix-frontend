export const SemesterItem = ({semester}) => {
  return (
    <>
      <div
        class="flex items-center justify-center flex-col h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800"
        style={{ marginBottom: 25 }}
      >
        <p class="text-2xl text-gray-400 dark:text-gray-500">
          {semester.name}
        </p>
        <p class="text-2xl text-gray-400 dark:text-gray-500">
          {semester.sgpa}
        </p>
      </div>
    </>
  );
};
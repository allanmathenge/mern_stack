import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
import PulseLoader from "react-spinners/PulseLoader"
import useTitle from "../../hooks/useTitle"

const NoteList = () => {
  useTitle('Notes')
  const { username, isManager, isAdmin } = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery('noteList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = <PulseLoader color={"#F00"} />

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = notes

    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(noteId => entities[noteId].username === username)
    }

    const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

    return (
      <table className="table table--notes">
        <thead className="table__head">
          <tr>
            <th scope="col" className="table__th note__status">Username</th>
            <th scope="col" className="table__th note__created">Created</th>
            <th scope="col" className="table__th noted__updated">Updated</th>
            <th scope="col" className="table__th note__title">Title</th>
            <th scope="col" className="table__th note__username">Owner</th>
            <th scope="col" className="table__th note__edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}

export default NoteList
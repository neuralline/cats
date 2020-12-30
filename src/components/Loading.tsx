const Loading = ({ message }: any) => {
  return (
    <div className="cat-cards shadow hop transition">
      <div className="loader"></div>
      {message ? message : 'Loading...'}
    </div>
  )
}

export default Loading
